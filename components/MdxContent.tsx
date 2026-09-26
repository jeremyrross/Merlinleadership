import Link from "next/link";
import { compile, run } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { ComponentPropsWithoutRef } from "react";

const components = {
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return <Link href={href} {...props} />;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  },
};

export default async function MdxContent({
  source,
  format = "mdx",
}: {
  source: string;
  format?: "mdx" | "md";
}) {
  const compiled = String(
    await compile(source, {
      format,
      outputFormat: "function-body",
      development: false,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          { behavior: "wrap", properties: { className: "heading-anchor" } },
        ],
      ],
    })
  );

  const { default: Content } = await run(compiled, {
    ...jsxRuntime,
    baseUrl: import.meta.url,
  });

  return (
    <div className="prose-merlin">
      <Content components={components} />
    </div>
  );
}
