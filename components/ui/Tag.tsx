import Link from "next/link";
import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[13px] font-medium font-sans bg-neutral-50 border border-neutral-200 text-neutral-900">
      {children}
    </span>
  );
}

export function TagLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[13px] font-medium font-sans border transition-colors duration-fast ${
        active
          ? "bg-teal-500 border-teal-500 text-white"
          : "bg-neutral-50 border-neutral-200 text-neutral-900 hover:border-neutral-300"
      }`}
    >
      {children}
    </Link>
  );
}
