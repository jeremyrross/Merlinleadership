import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import portrait from "@/public/images/jeremy-ross.jpg";

export const revalidate = 300;

export default async function Home() {
  const posts = await getAllPosts();
  const [latest] = posts;
  const recent = posts.slice(1, 5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        description: site.description,
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: "Jeremy Ross",
        jobTitle: `Founder, ${site.name}`,
        url: `${site.url}/about`,
        sameAs: site.linkedinUrl.startsWith("http") ? [site.linkedinUrl] : undefined,
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero — latest essay */}
      {latest ? (
        <section className="bg-neutral-950 text-white py-[clamp(56px,9vw,120px)] px-5 sm:px-8 md:px-12">
          <div className="mx-auto max-w-[1120px]">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-[26px] h-px bg-orange-500 block" aria-hidden />
              <span className="text-xs tracking-[0.2em] uppercase text-orange-300">
                Latest essay ·{" "}
                {new Date(latest.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  timeZone: "UTC",
                })}
              </span>
            </div>
            <h1 className="font-serif italic font-medium text-[clamp(2rem,5.2vw,3.6rem)] leading-[1.05] tracking-[-0.015em] max-w-[22ch] text-balance">
              {latest.frontmatter.title}
            </h1>
            <p className="mt-7 text-[clamp(1rem,1.6vw,1.2rem)] text-neutral-300 max-w-[60ch]">
              {latest.frontmatter.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-5 mt-10">
              <Button href={`/posts/${latest.slug}`} variant="accent" size="lg">
                Read the essay
              </Button>
              <span className="text-sm text-neutral-400">
                {latest.readingTime}
                {latest.frontmatter.tags?.[0] && ` · On ${latest.frontmatter.tags[0]}`}
              </span>
            </div>
          </div>
        </section>
      ) : (
        <section className="border-b border-neutral-200 py-20 px-5 sm:px-8 md:px-12">
          <div className="mx-auto max-w-[1120px]">
            <p className="text-neutral-500 text-sm">
              The first essays are being written. Check back soon, or{" "}
              <Link href="/about" className="text-teal-700 hover:underline">
                read what this is
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      {/* Manifesto */}
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,34rem)_minmax(0,24rem)] gap-8 md:gap-14 items-center">
          <p className="font-serif italic font-medium text-[clamp(1.3rem,2.6vw,1.9rem)] leading-[1.45] text-balance">
            A place where good leadership ideas and tools live — written
            down, argued with, and kept useful.
          </p>
          <p className="border-l-2 border-orange-500 pl-6 text-lg leading-relaxed text-neutral-600">
            It started as notes I kept sending to people who were new to
            leading. Now they&apos;re here, where you can read them too.
          </p>
        </div>
      </section>

      {/* About strip */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(48px,7vw,88px)] grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
          <div className="aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 max-w-[280px]">
            <Image
              src={portrait}
              alt="Jeremy Ross"
              className="w-full h-full object-cover"
              placeholder="blur"
            />
          </div>
          <div className="sm:col-span-2 min-w-0">
            <div className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-3.5">
              Who&apos;s writing
            </div>
            <p className="text-lg max-w-[56ch] text-balance">
              I&apos;m <strong className="font-semibold">Jeremy Ross</strong>.
              I&apos;ve spent two decades leading teams and the last several
              helping other people do it with less noise and more nerve.{" "}
              {site.name} is where I keep what I&apos;ve learned — essays,
              tools, and the occasional argument with my own advice.
            </p>
            <Link href="/about" className="inline-block mt-5 text-sm font-semibold text-teal-700 hover:text-teal-800">
              More about me →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent writing */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
          <div className="flex items-baseline justify-between gap-6 mb-2">
            <h2 className="text-2xl font-bold font-sans">Recent writing</h2>
            <Link href="/posts" className="text-sm font-medium text-teal-700 hover:text-teal-800">
              All essays →
            </Link>
          </div>
          <div>
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Email capture band */}
      <section id="subscribe" className="border-t border-neutral-200 bg-neutral-50 scroll-mt-20">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(32px,5vw,56px)] grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14 items-center">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3.5">
              Free guide · 7 lessons
            </div>
            <h2 className="font-serif italic font-medium text-[clamp(1.3rem,2.6vw,1.9rem)] text-balance">
              7 Leadership Lessons, learned in the field
            </h2>
            <p className="mt-4 text-base text-neutral-600 max-w-[46ch]">
              Mostly through making mistakes. Seven moments that changed how I
              lead, sent straight to your inbox.
            </p>
          </div>
          <div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
