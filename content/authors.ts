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
    bio: "Two decades leading teams, and the last several helping other people do it with less noise and more nerve.",
    image: portrait,
  },
};

export const defaultAuthorKey = "merlin";

export function getAuthor(key?: string): Author {
  return authors[key ?? defaultAuthorKey] ?? authors[defaultAuthorKey];
}
