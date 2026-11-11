import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import PostCard from "@/components/PostCard";
import NewsletterForm from "@/components/NewsletterForm";
import portrait from "@/public/images/jeremy-ross.jpg";

export const revalidate = 300;

// Mockup copy for the consulting-focused homepage (branch: consulting-homepage).
// Wording is a first draft, meant to be edited.

const symptoms = [
  "Good people leave, and you're not always sure why.",
  "Your managers pass messages along instead of leading.",
  "Problems land back on your desk that should have been solved below you.",
  "The team is busy, but not pulling in the same direction.",
  "Hard conversations keep getting put off.",
  "The business can't run for a week without you.",
];

const pillars = [
  {
    label: "The leader",
    body: "How you and your managers spend your time, make decisions and set the tone. The habits that make you easy or hard to follow.",
  },
  {
    label: "The people",
    body: "Whether your team has the clarity, skills and ownership to solve problems without you. Developing the leaders you'll need next year, not just this quarter.",
  },
  {
    label: "The results",
    body: "The numbers that tell you it's working: turnover, engagement, how fast decisions get made, and how much of your week goes back to running the business.",
  },
];

const changes = [
  "Decisions get made at the right level.",
  "Managers deal with performance issues early.",
  "Your people bring you solutions, not just problems.",
  "Turnover drops because people want to stay.",
  "You get time back to work on where the business goes next.",
];

const goodFit = [
  "You own or run a growing business with roughly 25 to 150 people.",
  "You can see the people problem, even if you can't name it yet.",
  "You want to build your leaders, not hand the problem to someone else.",
  "You're willing to look at your own part in it.",
];

const notFit = [
  "You're looking for a one-off workshop to tick a box.",
  "You want someone to come in and manage your team for you.",
  "You've already decided the answer and need it signed off.",
];

const steps = [
  {
    title: "Start with a conversation",
    body: "No preparation needed. Tell me what's going on and I'll listen. I reply personally within two business days.",
  },
  {
    title: "Find the real problem",
    body: "We look at what's actually getting in the way: the leader, the team or the systems around them.",
  },
  {
    title: "Build it in",
    body: "We work on the small number of leadership habits that will make the biggest difference in your business, and track whether they stick.",
  },
];

export default async function Home() {
  const posts = await getAllPosts();
  const recent = posts.slice(0, 3);

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

      {/* 1. Hero: who it's for and the problem */}
      <section className="bg-neutral-950 text-white py-[clamp(64px,10vw,136px)] px-5 sm:px-8 md:px-12">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex items-center gap-3 mb-7">
            <span className="w-[26px] h-px bg-orange-500 block" aria-hidden />
            <span className="text-xs tracking-[0.2em] uppercase text-orange-300">
              For owners of growing businesses
            </span>
          </div>
          <h1 className="font-serif italic font-medium text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.06] tracking-[-0.015em] max-w-[20ch] text-balance">
            Most businesses that stall don&apos;t have a strategy problem. They
            have a leadership problem.
          </h1>
          <p className="mt-7 text-[clamp(1rem,1.6vw,1.2rem)] text-neutral-300 max-w-[58ch]">
            I help owners build leaders who can carry more of the load, so the
            business grows without everything running through you.
          </p>
          <div className="flex flex-wrap items-center gap-5 mt-10">
            <Button href="/talk" variant="accent" size="lg">
              Book a conversation
            </Button>
            <Link
              href="#approach"
              className="text-sm font-semibold text-neutral-300 hover:text-white transition-colors"
            >
              How I work →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Sound familiar? */}
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-10 md:gap-16">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3.5">
              Sound familiar?
            </div>
            <h2 className="font-serif italic font-medium text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] text-balance">
              Your people are capable. So why does it still feel this hard?
            </h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
            {symptoms.map((item) => (
              <li key={item} className="flex gap-3 text-lg leading-snug text-neutral-800">
                <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-14 border-l-2 border-orange-500 pl-6 text-xl leading-relaxed text-neutral-700 max-w-[60ch]">
          None of this is an effort problem. Your people are working hard. What&apos;s
          usually missing is leadership below you that can take the weight.
        </p>
      </section>

      {/* 3. The approach */}
      <section id="approach" className="border-y border-neutral-200 bg-neutral-50 scroll-mt-20">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
          <div className="text-xs tracking-[0.2em] uppercase text-teal-700 mb-3.5">
            How I work
          </div>
          <h2 className="font-serif italic font-medium text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] max-w-[28ch] text-balance">
            The 20% of leadership that drives 80% of the results.
          </h2>
          <p className="mt-5 text-lg text-neutral-600 max-w-[62ch]">
            Not every leadership habit matters equally. A small set of them
            makes most of the difference. The work is finding the ones that
            matter in your business and building them in, across three areas.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div key={p.label} className="rounded-lg border border-neutral-200 bg-white p-7 shadow-sm">
                <div className="font-mono text-xs text-orange-500">0{i + 1}</div>
                <h3 className="mt-3 text-xl font-bold font-sans">{p.label}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-neutral-500 max-w-[70ch]">
            Built on Peter Drucker&apos;s three areas of executive contribution
            from <em>The Effective Executive</em>: direct results, values, and
            developing people for tomorrow.
          </p>
        </div>
      </section>

      {/* 4. What changes */}
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-10 md:gap-16 items-start">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3.5">
              What changes
            </div>
            <h2 className="font-serif italic font-medium text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] text-balance">
              You can see it in how the work moves when you&apos;re not in the room.
            </h2>
          </div>
          <ul className="flex flex-col divide-y divide-neutral-200 border-y border-neutral-200">
            {changes.map((item) => (
              <li key={item} className="py-4 text-lg text-neutral-800 flex gap-4">
                <span className="text-teal-600 font-semibold" aria-hidden>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Is this for you? */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
          <div className="text-xs tracking-[0.2em] uppercase text-orange-300 mb-3.5">
            Is this for you?
          </div>
          <h2 className="font-serif italic font-medium text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] max-w-[30ch] text-balance">
            I work best with owners who want to grow their leaders, not replace them.
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-teal-300">
                A good fit if
              </h3>
              <ul className="mt-5 flex flex-col gap-4">
                {goodFit.map((item) => (
                  <li key={item} className="flex gap-3 text-lg text-neutral-200">
                    <span className="text-teal-300" aria-hidden>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-400">
                Probably not a fit if
              </h3>
              <ul className="mt-5 flex flex-col gap-4">
                {notFit.map((item) => (
                  <li key={item} className="flex gap-3 text-lg text-neutral-400">
                    <span aria-hidden>×</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How we start */}
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
        <div className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3.5">
          How we start
        </div>
        <h2 className="font-serif italic font-medium text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] max-w-[28ch] text-balance">
          It starts with a conversation, not a proposal.
        </h2>
        <ol className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-orange-500 pt-5">
              <div className="font-mono text-xs text-neutral-400">Step {i + 1}</div>
              <h3 className="mt-2 text-xl font-bold font-sans">{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-neutral-600">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Button href="/talk" variant="accent" size="lg">
            Book a conversation
          </Button>
        </div>
      </section>

      {/* 7. Who you'll work with */}
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
              Who you&apos;ll work with
            </div>
            <p className="text-lg max-w-[56ch] text-balance">
              I&apos;m <strong className="font-semibold">Jeremy Ross</strong>. I&apos;ve
              spent over twenty years developing leaders and the teams around
              them, including more than a decade at Apple and La Maison Simons.
            </p>
            <p className="text-lg max-w-[56ch] text-balance mt-4">
              I hold an Executive MBA in Innovation Leadership and I&apos;m a
              certified trainer in the GROW coaching model. I coach first, but I
              believe clarity is kindness and standards matter.
            </p>
            <Link href="/about" className="inline-block mt-5 text-sm font-semibold text-teal-700 hover:text-teal-800">
              More about me →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Writing, as proof of thinking */}
      {recent.length > 0 && (
        <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
          <div className="flex items-baseline justify-between gap-6 mb-2">
            <h2 className="text-2xl font-bold font-sans">How I think about leadership</h2>
            <Link href="/posts" className="text-sm font-medium text-teal-700 hover:text-teal-800">
              All writing →
            </Link>
          </div>
          <div>
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* 9. Free guide (secondary path) */}
      <section id="subscribe" className="border-t border-neutral-200 bg-neutral-50 scroll-mt-20">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(32px,5vw,56px)] grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-14 items-center">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3.5">
              Not ready to talk? · Free guide
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

      {/* 10. Closing call to action */}
      <section className="bg-neutral-950 text-white px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,96px)]">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="inline-block w-[26px] h-px bg-orange-500 mb-7" aria-hidden />
          <h2 className="font-serif italic font-medium text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.15] text-balance">
            Results today. Leaders for tomorrow.
          </h2>
          <p className="mt-5 text-lg text-neutral-300 text-balance">
            If any of this sounds like your business, let&apos;s talk. Bring
            what you&apos;re dealing with. No preparation needed.
          </p>
          <div className="mt-9">
            <Button href="/talk" variant="accent" size="lg">
              Book a conversation
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
