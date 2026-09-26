import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <Link
      href={`/posts/${slug}`}
      className="group grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_auto] gap-x-8 gap-y-2 items-baseline py-6 px-3 -mx-3 rounded-md border-t border-neutral-200 hover:bg-neutral-50 transition-colors"
    >
      <div>
        <h3 className="font-serif italic font-medium text-[clamp(1.15rem,2.1vw,1.5rem)] text-neutral-900 text-balance">
          {frontmatter.title}
          {frontmatter.draft && (
            <span className="ml-2 align-middle font-sans not-italic text-[10px] font-semibold uppercase tracking-widest text-orange-600 border border-orange-200 rounded-sm px-1.5 py-0.5">
              Draft
            </span>
          )}
        </h3>
        <p className="mt-2.5 text-base text-neutral-600 max-w-[62ch]">{frontmatter.excerpt}</p>
      </div>
      <div className="text-xs tracking-[0.14em] uppercase text-neutral-400 whitespace-nowrap">
        {formatDate(frontmatter.date)}
        <span className="mx-1.5" aria-hidden>
          ·
        </span>
        {readingTime}
      </div>
    </Link>
  );
}
