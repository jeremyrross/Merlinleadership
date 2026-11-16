import type { Metadata } from "next";
import Image from "next/image";
import TalkRequestForm from "@/components/TalkRequestForm";
import portrait from "@/public/images/jeremy-ross.jpg";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "For leaders ready to build an organization that doesn't depend on them for every answer. Start a conversation with Jeremy Ross.",
};

export default function TalkPage() {
  return (
    <main>
      <section className="bg-neutral-950 text-white py-[clamp(56px,9vw,96px)] px-5 sm:px-8 md:px-12">
        <div className="mx-auto max-w-[680px] text-center">
          <span className="inline-block w-[26px] h-px bg-orange-500 mb-7" aria-hidden />
          <h1 className="font-serif italic font-medium text-[clamp(1.8rem,4.5vw,2.8rem)] leading-[1.1] text-balance">
            Work with me.
          </h1>
          <p className="mt-5 text-lg text-neutral-300 text-balance">
            For leaders ready to build an organization that doesn&apos;t depend
            on them for every answer.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-[clamp(40px,6vw,64px)]">
        <div className="mx-auto max-w-[1120px] grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] gap-12 lg:gap-16 items-center">
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                <Image
                  src={portrait}
                  alt="Jeremy Ross"
                  fill
                  sizes="80px"
                  placeholder="blur"
                  className="object-cover object-[50%_20%]"
                />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-neutral-900 text-lg">Jeremy Ross</div>
                <p className="text-sm text-neutral-600 max-w-[44ch]">
                  20+ years leading teams. Executive MBA in Innovation
                  Leadership.
                </p>
              </div>
            </div>

            <div className="mt-10 border-l-2 border-orange-500 pl-5">
              <h2 className="text-xs tracking-[0.2em] uppercase text-orange-500">
                What you&apos;ll leave with
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-neutral-800 max-w-[44ch]">
                A clearer view of what&apos;s holding your team back, and a plan for
                your next steps.
              </p>
            </div>
          </div>

          <div id="start" className="rounded-xl border border-neutral-200 shadow-lg p-8 sm:p-10">
            <h2 className="font-serif italic text-2xl text-neutral-900">
              Start the conversation
            </h2>
            <p className="mt-2 mb-7 text-sm text-neutral-500">
              Tell me where things stand. I&apos;ll take it from there.
            </p>
            <TalkRequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
