import type { Metadata } from "next";
import Image from "next/image";
import TalkRequestForm from "@/components/TalkRequestForm";
import portrait from "@/public/images/jeremy-ross.jpg";

export const metadata: Metadata = {
  title: "Work with me",
  description:
    "Reach out to Jeremy Ross directly. Tell me what's going on, and if it's something I can help with, we'll set up a conversation.",
};

export default function TalkPage() {
  return (
    <main>
      <section className="bg-neutral-950 text-white py-[clamp(56px,9vw,96px)] px-5 sm:px-8 md:px-12">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="inline-block w-[26px] h-px bg-orange-500 mb-7" aria-hidden />
          <h1 className="font-serif italic font-medium text-[clamp(1.8rem,4.5vw,2.8rem)] leading-[1.1] text-balance">
            Work with me.
          </h1>
          <p className="mt-5 text-lg text-neutral-300 text-balance">
            Tell me what&apos;s going on. If it&apos;s something I can help
            with, we&apos;ll set up a time to talk. No pitch, no prep required.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 py-[clamp(48px,8vw,88px)]">
        <div className="mx-auto max-w-[520px]">
          <div className="rounded-xl border border-neutral-200 shadow-lg p-8 sm:p-10">
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-neutral-200">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                <Image
                  src={portrait}
                  alt="Jeremy Ross"
                  fill
                  sizes="64px"
                  placeholder="blur"
                  className="object-cover object-[50%_20%]"
                />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-neutral-900">Jeremy Ross</div>
                <p className="text-sm text-neutral-600">
                  I help owners build leaders and teams that keep winning.
                </p>
              </div>
            </div>
            <div className="text-xs tracking-[0.2em] uppercase text-orange-500 mb-2">
              Request to connect
            </div>
            <p className="text-sm text-neutral-500 mb-7">
              I read and reply to every note myself, usually within two
              business days.
            </p>
            <TalkRequestForm />
          </div>
        </div>
      </section>
    </main>
  );
}
