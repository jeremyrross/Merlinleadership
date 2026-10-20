import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import portrait from "@/public/images/jeremy-ross.jpg";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

const pillars = [
  {
    no: "01",
    title: "Trust, mechanically",
    body: "Delegation, decision rights, and what you are actually transferring when you let go of something.",
  },
  {
    no: "02",
    title: "Attention as budget",
    body: "Meetings, interruptions, and the unglamorous work of protecting a team's ability to think.",
  },
  {
    no: "03",
    title: "Hard conversations",
    body: "Conflict, feedback, and promotions: the moments where leadership is a specific sentence you have to say out loud.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(48px,7vw,96px)]">
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-8 sm:gap-14 items-start">
          <div className="aspect-[4/5] w-full max-w-[320px] rounded-lg overflow-hidden bg-neutral-100">
            <Image
              src={portrait}
              alt="Jeremy Ross"
              className="w-full h-full object-cover"
              placeholder="blur"
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-serif italic font-medium text-[clamp(2rem,4.2vw,2.9rem)]">
              Jeremy Ross
            </h1>
            <p className="mt-6 text-lg text-balance">
              I&apos;ve led teams for twenty years, long enough to remember
              exactly how it felt to be a brand-new manager, and long enough
              to have made most of the mistakes worth writing about.{" "}
              {site.name} started as a folder of notes I kept re-sending to
              people. This is that folder, in public.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I write because writing is how I find out what I actually think,
              and because the advice I got as a new manager was mostly
              slogans. If something here is wrong, tell me. I&apos;d rather
              fix it than defend it.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I&apos;ve also gone back to school along the way: certificates in
              Organizational Leadership from Northwestern University and in
              Strategic Management and Innovation from Copenhagen Business
              School, and this December I finish my Executive MBA at the
              University of Fredericton.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-8">
              <Button href={`mailto:${site.email}`} variant="primary" size="lg">
                Email me
              </Button>
              <Button href={site.linkedinUrl} variant="secondary" size="lg">
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-[clamp(48px,7vw,88px)]">
          <h2 className="text-2xl font-bold mb-8">What I write about</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {pillars.map((pillar) => (
              <div key={pillar.no}>
                <div className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-3">
                  {pillar.no}
                </div>
                <h3 className="text-lg font-bold mb-2.5">{pillar.title}</h3>
                <p className="text-base text-neutral-600">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
