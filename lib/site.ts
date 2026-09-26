export const site = {
  name: "Merlin Leadership Collective",
  shortName: "MLC",
  tagline: "Essays and tools for leading people",
  description:
    "Merlin Leadership Collective is Jeremy Ross's home for leadership essays and tools — the thinking he'd want if he were leading a team this week.",
  // Override in production via NEXT_PUBLIC_SITE_URL (no trailing slash).
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://merlinleadership.com").replace(/\/$/, ""),
  email: "begin@merlinleadership.com",
  linkedinUrl: "https://www.linkedin.com/in/jeremyrross/",
  // Canada's anti-spam law (CASL) requires a mailing address in marketing
  // emails; it appears in the email footer. Kept in an env var, not in code,
  // because this repo is public. Set MAILING_ADDRESS in .env.local and Vercel.
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
