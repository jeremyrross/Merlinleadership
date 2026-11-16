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
  "Hard conversations keep getting put off.",
  "Good people leave, and the exit interviews don't explain why.",
  "Decisions keep landing on your desk that should be made below you.",
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

const steps = [
  { title: "Talk", body: "Tell me what's going on. No preparation needed." },
  { title: "Diagnose", body: "We find what's really getting in the way." },
  { title: "Build", body: "The skills, systems and habits your organization needs, built to stick." },
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
              For leaders of growing organizations
            </span>
          </div>
          <h1 className="font-serif italic font-medium text-[clamp(2.1rem,5.4vw,3.8rem)] leading-[1.06] tracking-[-0.015em] max-w-[20ch] text-balance">
            Most businesses that stall don&apos;t have a strategy problem. They
            have a leadership problem.
          </h1>
          <p className="mt-7 text-[clamp(1rem,1.6vw,1.2rem)] text-neutral-300 max-w-[58ch]">
            I help executives and owners build leaders who can carry more of the
            load, so the organization grows without everything running through you.
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

      {/* 2. Sound familiar? One big question, three symptoms, one hopeful turn */}
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(64px,9vw,120px)]">
        <div className="max-w-[48rem]">
          <div className="text-xs tracking-[0.24em] uppercase text-orange-500 mb-4">Sound familiar?</div>
          <h2 className="font-serif italic font-medium text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.12] text-balance">
            Your people are capable. So why does it still feel this hard?
          </h2>
        </div>
        <ul className="mt-12 space-y-4 max-w-[46rem]">
          {symptoms.map((item) => (
            <li key={item} className="flex gap-4 text-[clamp(1.15rem,2vw,1.4rem)] leading-snug text-neutral-800">
              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-12 pt-8 border-t border-neutral-200 font-serif italic text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug text-teal-800 max-w-[40ch]">
          Strong leadership teams aren&apos;t found. They&apos;re built, one leader at a time.
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
            matter in your organization and building them in, across three areas.
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
        </div>
      </section>

      {/* 4. What changes (dark band) */}
      <section className="bg-neutral-950 text-white">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(56px,8vw,104px)]">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-10 md:gap-16 items-start">
          <div>
            <div className="text-xs tracking-[0.2em] uppercase text-orange-300 mb-3.5">
              What changes
            </div>
            <h2 className="font-serif italic font-medium text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] text-balance">
              You can see it in how the work moves when you&apos;re not in the room.
            </h2>
          </div>
          <ul className="flex flex-col divide-y divide-white/15 border-y border-white/15">
            {changes.map((item) => (
              <li key={item} className="py-4 text-lg text-neutral-200 flex gap-4">
                <span className="text-teal-300 font-semibold" aria-hidden>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </section>

      {/* 6. How we start: a connected path that ends at the call to action */}
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(64px,9vw,120px)]">
        <div className="text-xs tracking-[0.22em] uppercase text-orange-700 mb-4">How we start</div>
        <h2 className="font-serif italic font-medium text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.12] max-w-[15ch] text-balance">
          The work isn&apos;t easy. The path is simple.
        </h2>
        <ol className="relative mt-14 grid grid-cols-1 md:grid-cols-[repeat(3,minmax(0,1fr))_auto] gap-10 md:gap-8">
          {/* Connecting line: vertical on phones, horizontal from md up, fading into orange at the button */}
          <span
            aria-hidden
            className="absolute left-[27px] top-7 bottom-7 w-0.5 bg-teal-500 md:left-7 md:right-36 md:top-[27px] md:bottom-auto md:h-0.5 md:w-auto md:bg-gradient-to-r md:from-teal-500 md:via-teal-500 md:to-orange-500"
          />
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex md:block gap-5">
              <div className="flex-none flex h-14 w-14 items-center justify-center rounded-full border-2 border-teal-500 bg-white text-xl font-bold text-teal-700">
                {i + 1}
              </div>
              <div className="md:mt-5">
                <h3 className="text-2xl font-bold font-sans">{s.title}</h3>
                <p className="mt-2 text-lg leading-snug text-neutral-600 max-w-[26ch]">{s.body}</p>
              </div>
            </li>
          ))}
          <li className="relative pl-[76px] md:pl-0 md:pt-0.5">
            <Button href="/talk" variant="accent" size="lg">
              Start with step 1 &rarr;
            </Button>
          </li>
        </ol>
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
            If any of this sounds familiar, let&apos;s talk. Bring
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
