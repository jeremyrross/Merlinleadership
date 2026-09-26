import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles the information you share and how visits to this site are measured.`,
};

const sectionHeading = "text-neutral-900 text-xs tracking-widest uppercase mb-3";

export default function Privacy() {
  return (
    <main className="mx-auto max-w-xl px-5 sm:px-8 py-16">
      <h1 className="text-2xl font-bold mb-10">Privacy Policy</h1>

      <div className="space-y-8 text-neutral-600 text-sm leading-relaxed">
        <section>
          <h2 className={sectionHeading}>Information We Collect</h2>
          <p>
            <strong className="text-neutral-900 font-medium">If you sign up</strong> for
            the free guide or updates, we collect your email address.
          </p>
          <p className="mt-3">
            <strong className="text-neutral-900 font-medium">If you use the /talk form</strong>,
            we collect your email address, and, if you choose to give them,
            your name and a short note about what you&apos;re interested in.
          </p>
          <p className="mt-3">
            <strong className="text-neutral-900 font-medium">When you visit</strong> the
            site, we collect anonymous traffic statistics, such as which pages
            are viewed, your country, and your browser type. This does not use
            cookies and is not used to identify you personally.
          </p>
        </section>

        <section>
          <h2 className={sectionHeading}>How We Use Your Information</h2>
          <p>
            Your email address is used to send you the guide and updates from{" "}
            {site.name}, and, if you used the /talk form, to reply to your
            request. Anonymous traffic statistics are used to understand which
            writing is useful and to improve the site. We do not sell, rent, or
            share your personal information with third parties for their own
            purposes.
          </p>
        </section>

        <section>
          <h2 className={sectionHeading}>Your Rights</h2>
          <p>
            You may withdraw your consent and unsubscribe at any time by
            emailing{" "}
            <a href={`mailto:${site.email}`} className="text-teal-700 hover:underline">
              {site.email}
            </a>{" "}
            or replying to any email we send you. You can also ask us to
            access, correct, or delete the information we hold about you. We
            will respond promptly.
          </p>
        </section>

        <section>
          <h2 className={sectionHeading}>Service Providers</h2>
          <p>
            We use a small number of trusted services to run this site. They
            process information only to provide their service to us:
          </p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>
              <strong className="text-neutral-900 font-medium">Formspree</strong> stores
              and delivers form submissions (signups and /talk requests).
            </li>
            <li>
              <strong className="text-neutral-900 font-medium">Resend</strong> sends the
              emails we send you.
            </li>
            <li>
              <strong className="text-neutral-900 font-medium">Cloudflare</strong> protects
              forms from spam (Turnstile), delivers the site, and provides
              anonymous traffic statistics. The spam check runs invisibly when
              you use a form; see Cloudflare&apos;s{" "}
              <a
                href="https://www.cloudflare.com/turnstile-privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 hover:underline"
              >
                Turnstile Privacy Addendum
              </a>
              .
            </li>
            <li>
              <strong className="text-neutral-900 font-medium">Vercel</strong> hosts the
              site and provides anonymous traffic statistics.
            </li>
            <li>
              <strong className="text-neutral-900 font-medium">Notion</strong> is where
              the writing on this site is drafted. It does not receive any
              information about visitors.
            </li>
          </ul>
          <p className="mt-3">
            Some of these providers process information outside Canada. Their
            own privacy policies describe how they handle it.
          </p>
        </section>

        <section>
          <h2 className={sectionHeading}>Contact</h2>
          <p>
            For any privacy-related questions, contact us at{" "}
            <a href={`mailto:${site.email}`} className="text-teal-700 hover:underline">
              {site.email}
            </a>
            .
          </p>
        </section>

        <p className="text-neutral-400 text-xs pt-4">Last updated: September 2026</p>
      </div>

      <div className="mt-12">
        <Link href="/" className="text-teal-700 text-xs tracking-widest uppercase hover:underline">
          ← Back
        </Link>
      </div>
    </main>
  );
}
