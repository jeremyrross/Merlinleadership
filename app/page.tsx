import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllTags, tagSlug, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { TagLink } from "@/components/ui/Tag";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import portrait from "@/public/images/jeremy-ross.jpg";

export const revalidate = 300;

// Writing-first homepage (branch: writing-first).
// The consulting homepage is preserved on the sales-funnel branch.
// Wording is a first draft, meant to be edited.

const lenses = [
  {
    label: "The Leader",
    body: "How you spend your time, make decisions and set the tone. The small habits that make you easy or hard to follow.",
  },
  {
    label: "The People",
    body: "Whether the people around you have the clarity, skills and ownership to solve problems without you. Growing the leaders you'll need next.",
  },
  {
    label: "The Results",
    body: "The evidence that it's working: who stays, how fast decisions get made, and how much of your week goes to where things are headed.",
  },
];

export default async function Home() {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const [latest, ...rest] = posts;
  const recent = rest.slice(0, 2);

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

      {/* 1. Hero: what this place is */}
      <section className="bg-neutral-950 text-white py-[clamp(64px,10vw,136px)] px-5 sm:px-8 md:px-12">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex items-center gap-3 mb-7">
            <span className="w-[26px] h-px bg-orange-500 block" aria-hidden />
            <span className="text-xs tracking-[0.2em] uppercase text-orange-300">
              Essays on leadership
            </span>
          </div>
          <h1 className="font-serif italic font-medium text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.06] tracking-[-0.015em] max-w-[20ch] text-balance">
            Leadership is a practice, not a title.
          </h1>
          <p className="mt-7 text-[clamp(1rem,1.6vw,1.2rem)] text-neutral-300 max-w-[58ch]">
            I&apos;m Jeremy Ross. I&apos;ve spent twenty years leading teams and
            developing the leaders around them. This is where I write down what
            I&apos;m learning: how to see leadership more clearly, and how to
            practice it a little better.
          </p>
          <div className="flex flex-wrap items-center gap-5 mt-10">
            <Button href="#subscribe" variant="accent" size="lg">
              Get the free guide
            </Button>
            <Link
              href="/posts"
              className="text-sm font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              Browse all essays →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Latest essay, featured */}
      {latest && (
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(48px,7vw,88px)]">
          <div className="text-xs tracking-[0.24em] uppercase text-orange-600 mb-4">Latest</div>
          <Link
            href={`/posts/${latest.slug}`}
            className="group block rounded-xl border border-neutral-200 bg-neutral-50 p-7 sm:p-10 hover:border-neutral-300 hover:bg-white transition-colors"
          >
            <h2 className="font-serif italic font-medium text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.15] max-w-[26ch] text-balance group-hover:text-teal-800 transition-colors">
              {latest.frontmatter.title}
            </h2>
            <p className="mt-4 text-lg text-neutral-600 max-w-[62ch]">
              {latest.frontmatter.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-xs tracking-[0.14em] uppercase text-neutral-400">
                {formatDate(latest.frontmatter.date)} · {latest.readingTime}
              </span>
              <span className="text-sm font-semibold text-teal-700">Read it →</span>
            </div>
          </Link>
        </section>
      )}

      {/* 4. The lens: how I look at leadership */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
          <div className="text-xs tracking-[0.2em] uppercase text-teal-700 mb-3.5">
            How I look at leadership
          </div>
          <h2 className="font-serif italic font-medium text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] max-w-[28ch] text-balance">
            A small set of habits does most of the work.
          </h2>
          <p className="mt-5 text-lg text-neutral-600 max-w-[62ch]">
            Not every leadership habit matters equally. Most of what I write
            comes back to finding the 20% that drives 80% of the results, and
            I look for it in three places.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {lenses.map((p, i) => (
              <div key={p.label} className="rounded-lg border border-neutral-200 bg-white p-7 shadow-sm text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 font-mono text-sm font-medium text-white">0{i + 1}</div>
                <h3 className="mt-3 text-xl font-bold font-sans">{p.label}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Who's writing */}
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(48px,7vw,88px)] grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
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
            I&apos;m <strong className="font-semibold">Jeremy Ross</strong>,
            and I&apos;ve spent over twenty years developing leaders and the
            teams around them, including more than a decade inside respected
            global and Canadian brands.
          </p>
          <p className="text-lg max-w-[56ch] text-balance mt-4">
            I write because I believe the world needs better leaders. It&apos;s
            my sincere hope that what I share here helps shape them.
          </p>
          <Link href="/about" className="inline-block mt-5 text-sm font-semibold text-teal-700 hover:text-teal-800">
            More about me →
          </Link>
        </div>
      </section>

      {/* 3. More essays */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 pt-0 pb-[clamp(48px,7vw,88px)]">
          <div className="flex items-baseline justify-between gap-6 mb-2">
            <h2 className="text-2xl font-bold font-sans">More essays</h2>
            <Link href="/posts" className="text-sm font-medium text-teal-700 hover:text-teal-800">
              All essays →
            </Link>
          </div>
          <div>
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
          {tags.length > 0 && (
            <div className="mt-10">
              <div className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-3.5">
                Browse by topic
              </div>
              <div className="flex flex-wrap gap-2.5">
                {tags.map(({ tag, count }) => (
                  <TagLink key={tag} href={`/posts?tag=${tagSlug(tag)}`} active={false}>
                    {tag} <span className="opacity-60">{count}</span>
                  </TagLink>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* 6. Subscribe */}
      <section id="subscribe" className="bg-neutral-950 text-white scroll-mt-20">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(48px,7vw,88px)] grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14 items-center">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-orange-300 mb-3.5">
              Free guide
            </div>
            <h2 className="font-serif italic font-medium text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] text-balance">
              7 Leadership Lessons, learned in the field
            </h2>
            <p className="mt-4 text-base text-neutral-300 max-w-[46ch]">
              Mostly through making mistakes. Seven moments that changed how I
              lead, sent straight to your inbox, along with new essays as I
              write them.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 text-neutral-900">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
