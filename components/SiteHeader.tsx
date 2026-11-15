import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import MobileMenu from "@/components/MobileMenu";
import logoMark from "@/public/logos/merlin-mark-transparent.png";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 bg-white/92 backdrop-blur-sm backdrop-saturate-150 border-b border-neutral-200">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 h-auto py-3.5 flex items-center justify-between gap-3 sm:gap-6">
        <Link href="/" className="flex items-end gap-2.5 shrink-0" aria-label={site.name}>
          <Image src={logoMark} alt="" height={54} className="h-10 sm:h-[54px] w-auto" priority />
          {/* Sits on the wordmark's baseline: margin = space below "merlin" in the image minus the font's descender */}
          <span className="hidden sm:block font-logo text-[29px] leading-none text-neutral-700 mb-2" aria-hidden>
            Leadership
          </span>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-6 md:gap-8">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden sm:inline text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button href="/talk" variant="primary" size="md">
            Book a conversation
          </Button>
          <MobileMenu items={site.nav} />
        </nav>
      </div>
    </header>
  );
}
