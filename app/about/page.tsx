import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import portrait from "@/public/images/jeremy-ross.jpg";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

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
              I&apos;ve spent over twenty years developing leaders and the teams
              around them, including more than a decade inside respected
              global and Canadian brands.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              That&apos;s where I learned how organizations actually run, where they get
              stuck, and what it takes to get them moving again.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              The ideas I keep coming back to:
            </p>
            <ul className="mt-4 space-y-3 text-base text-neutral-600 list-disc pl-5 marker:text-teal-700">
              <li>
                <strong className="font-semibold text-neutral-800">Leadership is a practice.</strong>{" "}
                It shows up in small, repeated habits far more than in a title.
              </li>
              <li>
                <strong className="font-semibold text-neutral-800">A few habits do most of the work.</strong>{" "}
                Not everything matters equally. Finding the 20% that drives
                80% of the results is most of the job.
              </li>
              <li>
                <strong className="font-semibold text-neutral-800">Develop people, protect standards.</strong>{" "}
                Coaching and accountability aren&apos;t opposites. Clarity is
                kindness.
              </li>
              <li>
                <strong className="font-semibold text-neutral-800">Leaders need room to build.</strong>{" "}
                Innovation happens when people bring ideas forward instead of
                waiting to be told.
              </li>
            </ul>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I pair that experience with formal training in innovation and
              strategy, including an Executive MBA in Innovation Leadership
              from the University of Fredericton and certificates from
              Northwestern University and Copenhagen Business School.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I write because I believe the world needs better leaders, and
              it&apos;s my sincere hope that what I share here helps shape them.
              If something lands, or you see it differently, I&apos;d like to
              hear from you.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-8">
              <Button href="/posts" variant="primary" size="lg">
                Read the essays
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary" size="lg">
                Email me
              </Button>
              <Button href={site.linkedinUrl} variant="secondary" size="lg">
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
