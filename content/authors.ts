import type { StaticImageData } from "next/image";
import portrait from "@/public/images/jeremy-ross.jpg";

export type Author = {
  name: string;
  title?: string;
  bio?: string;
  url?: string;
  image?: StaticImageData;
};

// Add contributors here and reference them by key in a post's `author` frontmatter.
export const authors: Record<string, Author> = {
  merlin: {
    name: "Jeremy Ross",
    title: "Merlin Leadership Collective",
    bio: "Over twenty years developing leaders and the teams around them. I help owner-led businesses build the leadership to keep growing.",
    image: portrait,
  },
};

export const defaultAuthorKey = "merlin";

export function getAuthor(key?: string): Author {
  return authors[key ?? defaultAuthorKey] ?? authors[defaultAuthorKey];
}
