import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag, tagSlug } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getAllTags()).map(({ tag }) => ({ tag: tagSlug(tag) }));
}

async function displayName(slug: string): Promise<string | null> {
  const match = (await getAllTags()).find(({ tag }) => tagSlug(tag) === slug);
  return match ? match.tag : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const name = await displayName(tag);
  if (!name) return {};
  return {
    title: `${name}`,
    description: `Entries tagged “${name}” from Merlin Leadership Collective.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const name = await displayName(tag);
  if (!name) notFound();

  const posts = await getPostsByTag(tag);

  return (
    <main className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(48px,7vw,96px)]">
      <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-3">Tag</p>
      <h1 className="font-serif italic font-medium text-[clamp(2rem,4.5vw,3rem)]">{name}</h1>
      <p className="mt-5 text-neutral-600 text-base">
        {posts.length} {posts.length === 1 ? "entry" : "entries"} ·{" "}
        <Link href="/posts" className="text-teal-700 hover:underline">
          all writing
        </Link>
      </p>

      <div className="mt-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}
