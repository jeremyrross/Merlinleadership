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
              I&apos;ve led teams for twenty years. Long enough to have made
              most of the mistakes worth writing about, and long enough to
              have coached plenty of new managers through the same ones.{" "}
              {site.name} started as a folder of notes I kept re-sending to
              people. This is that folder, in public.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              Those years on the ground taught me how organizations actually
              run, and where they get stuck. Now my focus is the wider view:
              operational strategy, organizational transformation, change
              management, and building leadership capability that lets a
              business grow without wearing out its people.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I complete my Executive MBA in Innovation Leadership at the
              University of Fredericton in November 2026. In practice, that
              means I help organizations optimize and transform for growth.
              I also hold
              certificates in Organizational Leadership from Northwestern
              University and in Strategic Management and Innovation from
              Copenhagen Business School.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I write because writing is how I find out what I actually think,
              and because the advice I got as a new manager was mostly
              slogans. If something here is wrong, tell me. I&apos;d rather
              fix it than defend it.
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
