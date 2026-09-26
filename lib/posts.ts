import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getAuthor, defaultAuthorKey, type Author } from "@/content/authors";
import { fetchNotionPosts } from "@/lib/notion";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  author?: string;
  /** Set when the canonical version lives elsewhere (e.g. a Medium cross-post). */
  canonicalUrl?: string;
  draft?: boolean;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  /** Local files are MDX; Notion content is converted to plain markdown. */
  format: "mdx" | "md";
  readingTime: string;
  author: Author;
};

export type PostMeta = Omit<Post, "content">;

function readLocalPost(slug: string): Post {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    slug,
    frontmatter,
    content,
    format: "mdx",
    readingTime: readingTime(content).text,
    author: getAuthor(frontmatter.author),
  };
}

function getLocalPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => readLocalPost(file.replace(/\.mdx$/, "")));
}

const getNotionPosts = cache(async (): Promise<Post[]> => {
  try {
    const posts = await fetchNotionPosts();
    return posts.map((p) => ({
      slug: p.slug,
      frontmatter: {
        title: p.title,
        date: p.date,
        excerpt: p.excerpt,
        tags: p.tags,
        author: defaultAuthorKey,
        draft: p.draft,
      },
      content: p.markdown,
      format: "md" as const,
      readingTime: readingTime(p.markdown).text,
      author: getAuthor(defaultAuthorKey),
    }));
  } catch (error) {
    // Never take the whole site down because Notion is unreachable.
    console.error("[notion] failed to load posts:", error);
    return [];
  }
});

const includeDrafts = process.env.NODE_ENV !== "production";

// Notion wins over a local file with the same slug.
const getAllFullPosts = cache(async (): Promise<Post[]> => {
  const notion = await getNotionPosts();
  const notionSlugs = new Set(notion.map((p) => p.slug));
  const local = getLocalPosts().filter((p) => !notionSlugs.has(p.slug));

  return [...notion, ...local]
    .filter((post) => includeDrafts || !post.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
});

export async function getPostSlugs(): Promise<string[]> {
  return (await getAllFullPosts()).map((p) => p.slug);
}

export async function getPost(slug: string): Promise<Post | null> {
  return (await getAllFullPosts()).find((p) => p.slug === slug) ?? null;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  return (await getAllFullPosts()).map(({ content: _content, ...meta }) => {
    void _content;
    return meta;
  });
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const post of await getAllPosts()) {
    for (const tag of post.frontmatter.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  return (await getAllPosts()).filter((post) =>
    (post.frontmatter.tags ?? []).map(tagSlug).includes(tagSlug(tag))
  );
}

export function tagSlug(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
