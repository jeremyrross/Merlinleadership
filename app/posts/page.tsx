import type { Metadata } from "next";
import { getAllPosts, getAllTags, tagSlug } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import { TagLink } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on leading people by Jeremy Ross.",
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const allPosts = await getAllPosts();
  const tags = await getAllTags();

  const posts = tag
    ? allPosts.filter((p) =>
        (p.frontmatter.tags ?? []).map(tagSlug).includes(tagSlug(tag))
      )
    : allPosts;

  return (
    <main className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(48px,7vw,96px)]">
      <h1 className="font-serif italic font-medium text-[clamp(2rem,4.5vw,3rem)]">
        Writing
      </h1>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2.5 mt-9 mb-2">
          <TagLink href="/posts" active={!tag}>
            All
          </TagLink>
          {tags.map(({ tag: t, count }) => (
            <TagLink key={t} href={`/posts?tag=${tagSlug(t)}`} active={tagSlug(t) === tagSlug(tag ?? "")}>
              {t} <span className="opacity-60">{count}</span>
            </TagLink>
          ))}
        </div>
      )}

      <div className="mt-6">
        {posts.length === 0 ? (
          <p className="text-neutral-500 text-sm py-16">Nothing here yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </main>
  );
}
