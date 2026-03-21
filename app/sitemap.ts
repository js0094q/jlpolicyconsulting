import fs from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";
import { getInsights, getResearch } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const STATIC_ROUTE_FILES = {
  "/": path.join(process.cwd(), "app", "page.tsx"),
  "/about": path.join(process.cwd(), "app", "about", "page.tsx"),
  "/consulting": path.join(process.cwd(), "app", "consulting", "page.tsx"),
  "/insights": path.join(process.cwd(), "app", "insights", "page.tsx"),
  "/research": path.join(process.cwd(), "app", "research", "page.tsx"),
  "/contact": path.join(process.cwd(), "app", "contact", "page.tsx"),
} as const;

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
type StaticRouteEntry = {
  path: keyof typeof STATIC_ROUTE_FILES;
  lastModified: Date;
  changeFrequency: ChangeFrequency;
  priority: number;
};

function latestDate(values: Array<string | Date | undefined>): Date {
  let latestTimestamp = 0;

  for (const value of values) {
    if (!value) {
      continue;
    }

    const timestamp = value instanceof Date ? value.getTime() : new Date(value).getTime();

    if (!Number.isNaN(timestamp)) {
      latestTimestamp = Math.max(latestTimestamp, timestamp);
    }
  }

  return latestTimestamp > 0 ? new Date(latestTimestamp) : new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = Object.entries(STATIC_ROUTE_FILES) as Array<[keyof typeof STATIC_ROUTE_FILES, string]>;
  const [insights, research, staticRouteDates] = await Promise.all([
    getInsights(),
    getResearch(),
    Promise.all(
      staticEntries.map(async ([route, filePath]) => [route, (await fs.stat(filePath)).mtime] as const),
    ),
  ]);
  const staticRouteLastModified = new Map(staticRouteDates);
  const latestInsightUpdate = latestDate(insights.map((post) => post.lastModified));
  const latestResearchUpdate = latestDate(research.map((post) => post.lastModified));

  const staticRouteEntries: StaticRouteEntry[] = [
    {
      path: "/",
      lastModified: latestDate([
        staticRouteLastModified.get("/"),
        latestInsightUpdate,
        latestResearchUpdate,
      ]),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      path: "/about",
      lastModified: staticRouteLastModified.get("/about") ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: "/consulting",
      lastModified: staticRouteLastModified.get("/consulting") ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      path: "/insights",
      lastModified: latestDate([staticRouteLastModified.get("/insights"), latestInsightUpdate]),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      path: "/research",
      lastModified: latestDate([staticRouteLastModified.get("/research"), latestResearchUpdate]),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      path: "/contact",
      lastModified: staticRouteLastModified.get("/contact") ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticRouteEntries.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((post) => ({
    url: absoluteUrl(post.url),
    lastModified: new Date(post.lastModified),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const researchRoutes: MetadataRoute.Sitemap = research.map((post) => ({
    url: absoluteUrl(post.url),
    lastModified: new Date(post.lastModified),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...insightRoutes, ...researchRoutes];
}
