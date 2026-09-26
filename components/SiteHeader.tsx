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
        <Link href="/" className="flex items-center gap-3.5 shrink-0">
          <Image src={logoMark} alt={site.name} height={54} className="h-10 sm:h-[54px] w-auto" priority />
          <span className="hidden sm:block w-px h-[26px] bg-neutral-300" aria-hidden />
          <span className="hidden sm:inline-block font-mono text-[10px] leading-[1.5] tracking-[0.2em] uppercase text-neutral-600 max-w-[6em]">
            Leadership Collective
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
          <Button href="/#subscribe" variant="primary" size="md">
            Get the free guide
          </Button>
          <MobileMenu items={site.nav} />
        </nav>
      </div>
    </header>
  );
}
