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
              I&apos;ve spent more than twenty years leading teams and developing
              the leaders around them. This site is where I write down what
              that work has taught me.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              Most of what I know about leadership I learned the hard way:
              on the floor, in tough conversations, and through plenty of
              mistakes. That includes over a decade leading teams at Apple and
              at La Maison Simons, one of Canada&apos;s oldest family-owned
              retailers, and the work I do leading a team today.
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
              I&apos;m writing to sharpen my own thinking, and in the hope that
              some of it helps you lead a little better. If something here
              lands, or you see it differently, I&apos;d like to hear from you.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-8">
              <Button href="/posts" variant="primary" size="lg">
                Read the Field Notes
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
