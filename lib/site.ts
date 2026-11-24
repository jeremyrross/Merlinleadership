export const site = {
  name: "Merlin Leadership",
  shortName: "Merlin",
  tagline: "Field notes on leadership",
  description:
    "Essays and field notes from Jeremy Ross on how to see leadership more clearly and practice it better, drawn from twenty years of leading teams and developing leaders.",
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
    { label: "Field Notes", href: "/posts" },
    { label: "About", href: "/about" },
  ],
} as const;

export function absoluteUrl(path = ""): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
