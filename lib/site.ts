export const site = {
  name: "Merlin Leadership Collective",
  shortName: "MLC",
  tagline: "Essays and tools for leading people",
  description:
    "Merlin Leadership Collective is Jeremy Ross's home for leadership essays and tools. It's the thinking he'd want if he were leading a team this week.",
  // Override in production via NEXT_PUBLIC_SITE_URL (no trailing slash).
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://merlinleadership.com").replace(/\/$/, ""),
  email: "begin@merlinleadership.com",
  linkedinUrl: "https://www.linkedin.com/in/jeremyrross/",
  // Canada's anti-spam law (CASL) requires a mailing address in marketing
  // emails. Currently NOT shown in the welcome email footer (removed by
  // request); re-add it there once a PO box or business address is set.
  // Kept in an env var, not in code, because this repo is public.
  mailingAddress: process.env.MAILING_ADDRESS ?? "",
  nav: [
    { label: "Home", href: "/" },
    { label: "Writing", href: "/posts" },
    { label: "About", href: "/about" },
  ],
} as const;

export function absoluteUrl(path = ""): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
