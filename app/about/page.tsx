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
              I help owners and leadership teams deliver results today while
              building the leaders and systems that keep the business growing
              tomorrow.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              Most organizations I work with don&apos;t have a talent problem.
              They have a leadership gap that looks like one: turnover that
              keeps repeating, managers who pass problems up instead of solving
              them, and owners who can&apos;t get out of the day-to-day long
              enough to lead where the business goes next.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I&apos;ve spent more than twenty years in leadership, including
              over a decade leading teams at Apple and at La Maison Simons,
              one of Canada&apos;s oldest family-owned retailers. That&apos;s
              where I learned how organizations actually run, where they get
              stuck, and what it takes to get them moving again.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I work with owner-led businesses that have grown past the point
              where one person can lead everything. My work focuses on four
              areas:
            </p>
            <ul className="mt-4 space-y-3 text-base text-neutral-600 list-disc pl-5 marker:text-teal-700">
              <li>
                <strong className="font-semibold text-neutral-800">Leadership development:</strong>{" "}
                building the layer of leaders a growing business needs to keep
                moving.
              </li>
              <li>
                <strong className="font-semibold text-neutral-800">Innovation and growth strategy:</strong>{" "}
                finding the problems worth solving and testing new ideas before
                betting the business on them.
              </li>
              <li>
                <strong className="font-semibold text-neutral-800">Innovation culture:</strong>{" "}
                creating an environment where people bring ideas forward
                instead of waiting to be told.
              </li>
              <li>
                <strong className="font-semibold text-neutral-800">Leading change and scale:</strong>{" "}
                guiding the business through growth and transformation without
                losing what made it work.
              </li>
            </ul>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              Wherever we start, the goal is the same: an organization that
              performs at its best because its leaders do.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I&apos;m completing an Executive MBA in Innovation Leadership at
              the University of Fredericton, which includes a certificate from
              Columbia University. I also hold certificates in Organizational
              Leadership from Northwestern University and in Strategic
              Management and Innovation from Copenhagen Business School.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              {site.name} is built on a simple belief: leaders get better
              when they surround themselves with other leaders. The essays here
              are where I share what I&apos;ve learned. The work is where we put
              it into practice together. If your business is ready to lead
              differently, let&apos;s talk.
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
    </main>
  );
}
