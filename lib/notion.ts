const NOTION_VERSION = "2022-06-28";
const REVALIDATE_SECONDS = 300;

// The "Blog" database under Merlin Leadership in Notion.
const DEFAULT_DATABASE_ID = "31145741-3570-805e-846d-e7430c893371";

type RichText = {
  plain_text: string;
  href: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    code: boolean;
  };
};

type Block = {
  id: string;
  type: string;
  has_children: boolean;
  children?: Block[];
  [key: string]: unknown;
};

type NotionPage = {
  id: string;
  created_time: string;
  properties: Record<string, any>;
};

export type NotionPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
  markdown: string;
};

export function notionConfigured(): boolean {
  return Boolean(process.env.NOTION_TOKEN);
}

async function notionFetch(path: string, init?: RequestInit, attempt = 0): Promise<any> {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (res.status === 429 && attempt < 4) {
    const wait = Number(res.headers.get("retry-after") ?? "1") * 1000;
    await new Promise((r) => setTimeout(r, wait));
    return notionFetch(path, init, attempt + 1);
  }
  if (!res.ok) {
    throw new Error(`Notion API ${res.status} on ${path}: ${await res.text()}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Rich text -> markdown
// ---------------------------------------------------------------------------

function escapeMd(text: string): string {
  return text.replace(/([\\*_`\[\]<~])/g, "\\$1");
}

function richText(items: RichText[] = []): string {
  return items
    .map((item) => {
      const { bold, italic, strikethrough, code } = item.annotations;
      let out = code ? `\`${item.plain_text.replace(/`/g, "")}\`` : escapeMd(item.plain_text);
      if (!out.trim()) return out;
      if (bold) out = `**${out}**`;
      if (italic) out = `*${out}*`;
      if (strikethrough) out = `~~${out}~~`;
      if (item.href) out = `[${out}](${item.href})`;
      return out;
    })
    .join("");
}

// ---------------------------------------------------------------------------
// Blocks -> markdown
// ---------------------------------------------------------------------------

async function fetchChildren(blockId: string): Promise<Block[]> {
  const blocks: Block[] = [];
  let cursor: string | undefined;
  do {
    const qs = cursor ? `?page_size=100&start_cursor=${cursor}` : "?page_size=100";
    const data = await notionFetch(`/blocks/${blockId}/children${qs}`);
    blocks.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  for (const block of blocks) {
    if (block.has_children) block.children = await fetchChildren(block.id);
  }
  return blocks;
}

const LIST_TYPES = new Set(["bulleted_list_item", "numbered_list_item", "to_do"]);

function indent(text: string): string {
  return text
    .split("\n")
    .map((line) => (line ? `    ${line}` : line))
    .join("\n");
}

export function renderBlocks(blocks: Block[]): string {
  const parts: { type: string; text: string }[] = [];

  for (const block of blocks) {
    const text = renderBlock(block);
    if (text !== null && text !== "") parts.push({ type: block.type, text });
  }

  return parts
    .map((part, i) => {
      if (i === 0) return part.text;
      const prev = parts[i - 1];
      const tight = LIST_TYPES.has(part.type) && prev.type === part.type;
      return (tight ? "\n" : "\n\n") + part.text;
    })
    .join("");
}

function renderBlock(block: Block): string | null {
  const data = block[block.type] as any;
  const children = block.children?.length ? renderBlocks(block.children) : "";
  const text = data?.rich_text ? richText(data.rich_text) : "";

  switch (block.type) {
    case "paragraph":
      return children ? `${text}\n\n${children}` : text;
    case "heading_1":
      return `## ${text}`;
    case "heading_2":
      return `### ${text}`;
    case "heading_3":
      return `#### ${text}`;
    case "bulleted_list_item":
      return `- ${text}${children ? `\n${indent(children)}` : ""}`;
    case "numbered_list_item":
      return `1. ${text}${children ? `\n${indent(children)}` : ""}`;
    case "to_do":
      return `- [${data.checked ? "x" : " "}] ${text}${children ? `\n${indent(children)}` : ""}`;
    case "quote":
    case "callout": {
      const inner = [text, children].filter(Boolean).join("\n\n");
      return inner
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
    }
    case "toggle":
      return [`**${text}**`, children].filter(Boolean).join("\n\n");
    case "code": {
      const lang = data.language === "plain text" ? "" : data.language;
      const code = (data.rich_text as RichText[]).map((t) => t.plain_text).join("");
      return `\`\`\`${lang}\n${code}\n\`\`\``;
    }
    case "divider":
      return "---";
    case "image": {
      const url = data.type === "external" ? data.external.url : data.file.url;
      const caption = richText(data.caption);
      return `![${caption.replace(/[\[\]]/g, "")}](${url})`;
    }
    case "bookmark":
    case "embed":
    case "link_preview":
      return data.url ? `[${data.url}](${data.url})` : null;
    case "table": {
      const rows = (block.children ?? []).map((row) =>
        ((row.table_row as any).cells as RichText[][]).map((cell) =>
          richText(cell).replace(/\|/g, "\\|")
        )
      );
      if (rows.length === 0) return null;
      const [head, ...body] = rows;
      const line = (cells: string[]) => `| ${cells.join(" | ")} |`;
      return [line(head), line(head.map(() => "---")), ...body.map(line)].join("\n");
    }
    case "column_list":
    case "column":
      return children;
    default:
      return children || null;
  }
}

// ---------------------------------------------------------------------------
// Pages -> posts
// ---------------------------------------------------------------------------

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

function plain(prop: any): string {
  const items = prop?.title ?? prop?.rich_text ?? [];
  return (items as RichText[]).map((t) => t.plain_text).join("").trim();
}

async function pageToPost(page: NotionPage): Promise<NotionPost | null> {
  const props = page.properties;
  const title = plain(props.Title);
  if (!title) return null;

  const status: string = props.Status?.status?.name ?? "";
  const published = status === "Published";

  return {
    slug: plain(props.Slug) || slugify(title),
    title,
    date: props.Date?.date?.start ?? page.created_time,
    excerpt: plain(props.Description),
    tags: ((props.Tags ?? props["Multi-select"])?.multi_select ?? []).map(
      (o: { name: string }) => o.name
    ),
    draft: !published,
    markdown: renderBlocks(await fetchChildren(page.id)),
  };
}

export async function fetchNotionPosts(): Promise<NotionPost[]> {
  if (!notionConfigured()) return [];

  const databaseId = process.env.NOTION_DATABASE_ID || DEFAULT_DATABASE_ID;

  // Production only ships "Published". Locally, "In progress" also shows up
  // (flagged as a draft) so posts can be previewed while writing.
  const statuses =
    process.env.NODE_ENV === "production" ? ["Published"] : ["Published", "In progress"];

  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const data = await notionFetch(`/databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify({
        page_size: 100,
        start_cursor: cursor,
        filter: {
          or: statuses.map((name) => ({ property: "Status", status: { equals: name } })),
        },
      }),
    });
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  const posts: NotionPost[] = [];
  for (const page of pages) {
    const post = await pageToPost(page);
    if (post) posts.push(post);
  }
  return posts;
}
