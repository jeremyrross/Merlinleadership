import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import logoMark from "@/public/logos/merlin-mark-transparent.png";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-[1120px] px-5 sm:px-8 md:px-12 py-8 md:py-9 grid grid-cols-2 sm:grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-x-8 gap-y-6 items-start">
        <div className="col-span-2 sm:col-span-1">
          <Image
            src={logoMark}
            alt={site.name}
            className="h-10 md:h-11 w-auto max-w-full"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <a href={`mailto:${site.email}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
            Email
          </a>
          <a
            href={site.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a href="/feed.xml" className="text-sm text-neutral-400 hover:text-white transition-colors">
            RSS
          </a>
        </div>

        <div className="text-xs leading-relaxed text-neutral-500 col-span-2 sm:col-span-1">
          © {year} {site.name}
        </div>
      </div>
    </footer>
  );
}
