import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags, tagSlug } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getAllPosts()).filter((p) => !p.frontmatter.draft);

  const staticRoutes = ["/", "/posts", "/about", "/talk", "/privacy"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: absoluteUrl(`/posts/${post.slug}`),
    lastModified: new Date(post.frontmatter.date),
  }));

  const tagRoutes = (await getAllTags()).map(({ tag }) => ({
    url: absoluteUrl(`/tags/${tagSlug(tag)}`),
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
