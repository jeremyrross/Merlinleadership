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
              I help owners and organizations deliver results today and build
              the leaders and systems to keep winning tomorrow.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              Most businesses I talk to don&apos;t have a talent problem. They
              have a leadership problem that looks like one: turnover,
              managers who pass problems up instead of solving them, owners
              pulled back into
              problems that should be solved two levels down.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I&apos;ve spent more than twenty years in leadership, including
              over a decade leading teams at Apple and at La Maison Simons,
              one of Canada&apos;s oldest family-owned retailers. That&apos;s
              where I learned how organizations actually run, and where they
              get stuck.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              I hold an Executive MBA in Innovation Leadership from the
              University of Fredericton, and certificates in Organizational
              Leadership from Northwestern University and in Strategic
              Management and Innovation from Copenhagen Business School.
            </p>
            <p className="mt-5 text-base text-neutral-600 text-balance">
              {site.name} started as a folder of notes I kept re-sending to
              new managers. The essays here are that folder, in public. If
              something&apos;s wrong, tell me. I&apos;d rather fix it than
              defend it.
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
