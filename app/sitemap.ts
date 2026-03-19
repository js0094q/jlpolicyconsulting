import type { MetadataRoute } from "next";
import { getInsights, getResearch } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [insights, research] = await Promise.all([getInsights(), getResearch()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/about",
    "/consulting",
    "/insights",
    "/research",
    "/contact",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((post) => ({
    url: absoluteUrl(post.url),
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const researchRoutes: MetadataRoute.Sitemap = research.map((post) => ({
    url: absoluteUrl(post.url),
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...insightRoutes, ...researchRoutes];
}
