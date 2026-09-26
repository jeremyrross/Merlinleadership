import type { Metadata } from "next";
import TalkRequestForm from "@/components/TalkRequestForm";

export const metadata: Metadata = {
  title: "Let's talk",
  description:
    "Book a free 20-minute leadership conversation. No pitch, no prep required.",
};

export default function TalkPage() {
  return (
    <main>
      <section className="bg-neutral-950 text-white py-[clamp(56px,9vw,96px)] px-5 sm:px-8 md:px-12">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="inline-block w-[26px] h-px bg-orange-500 mb-7" aria-hidden />
          <h1 className="font-serif italic font-medium text-[clamp(1.8rem,4.5vw,2.8rem)] leading-[1.1] text-balance">
            Book a free 20-minute leadership conversation.
          </h1>
          <p className="mt-5 text-lg text-neutral-300 text-balance">
            No pitch, no prep required. Bring the thing you&apos;re stuck on.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-[clamp(48px,8vw,88px)]">
        <div className="mx-auto max-w-[520px]">
          <div className="rounded-xl border border-neutral-200 shadow-lg p-8 sm:p-10">
            <div className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-2">
              Limited spots
            </div>
            <p className="text-sm text-neutral-500 mb-7">
              I read every submission myself, so I&apos;m working through
              them in order.
            </p>
            <TalkRequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
