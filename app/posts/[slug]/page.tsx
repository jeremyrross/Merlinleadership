import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPost,
  getPostSlugs,
  getAllPosts,
  formatDate,
  tagSlug,
} from "@/lib/posts";
import { site, absoluteUrl } from "@/lib/site";
import MdxContent from "@/components/MdxContent";
import ShareLinks from "@/components/ShareLinks";
import PostCard from "@/components/PostCard";
import AuthorBox from "@/components/AuthorBox";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const { frontmatter } = post;
  const url = absoluteUrl(`/posts/${slug}`);
  const ogImage = absoluteUrl(`/posts/${slug}/opengraph-image`);

  return {
    title: frontmatter.title,
    description: frontmatter.excerpt,
    alternates: { canonical: frontmatter.canonicalUrl || url },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      url,
      publishedTime: frontmatter.date,
      authors: [post.author.name],
      tags: frontmatter.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: frontmatter.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.excerpt,
      images: [ogImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { frontmatter, content, format, readingTime, author } = post;
  const url = absoluteUrl(`/posts/${slug}`);

  const related = (await getAllPosts())
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.frontmatter.tags ?? []).some((t) =>
          (frontmatter.tags ?? []).map(tagSlug).includes(tagSlug(t))
        )
    )
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    author: { "@type": "Organization", name: author.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: frontmatter.canonicalUrl || url,
    keywords: (frontmatter.tags ?? []).join(", "),
  };

  return (
    <main className="mx-auto max-w-[720px] px-5 sm:px-8 py-[clamp(48px,7vw,88px)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/posts" className="text-sm font-medium text-teal-700 hover:text-teal-800">
        ← All essays
      </Link>

      <article className="mt-9">
        <header>
          <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] uppercase text-orange-500">
            {frontmatter.tags?.[0] && <span>On {frontmatter.tags[0]}</span>}
            {frontmatter.tags?.[0] && <span aria-hidden>·</span>}
            <span>{readingTime}</span>
            {frontmatter.draft && (
              <span className="text-orange-600 border border-orange-200 rounded-sm px-1.5 py-0.5 normal-case tracking-normal">
                Draft
              </span>
            )}
          </div>

          <h1 className="mt-[18px] font-serif italic font-medium text-[clamp(2rem,4.6vw,3rem)] leading-[1.1] text-balance">
            {frontmatter.title}
          </h1>

          <p className="mt-5 text-base leading-relaxed text-neutral-500 text-balance">{frontmatter.excerpt}</p>

          {frontmatter.canonicalUrl && (
            <p className="mt-4 text-neutral-400 text-xs">
              Originally published{" "}
              <a
                href={frontmatter.canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:underline"
              >
                elsewhere
              </a>
              .
            </p>
          )}
        </header>

        <div className="h-px bg-neutral-200 my-11" />

        <MdxContent source={content} format={format} />

        {/* Footer of the post */}
        <div className="mt-14 pt-8 border-t border-neutral-200 space-y-6">
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tagSlug(tag)}`}>
                  <Tag>{tag}</Tag>
                </Link>
              ))}
            </div>
          )}

          <ShareLinks url={url} title={frontmatter.title} />

          <AuthorBox author={author} />
        </div>

        <div className="mt-14 pt-9 border-t border-neutral-200 flex flex-wrap gap-5 items-center justify-between">
          <p className="text-base text-neutral-600 max-w-[34ch]">
            Get the next essay and a free copy of <em>7 Leadership Lessons</em>,
            straight to your inbox.
          </p>
          <Button href="/#subscribe" variant="primary" size="lg">
            Subscribe
          </Button>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-neutral-400 text-xs tracking-[0.22em] uppercase mb-2">
            Related
          </h2>
          {related.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </section>
      )}
    </main>
  );
}
