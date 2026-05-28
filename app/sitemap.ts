import type { MetadataRoute } from "next";
import { getInsights, getResearch } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/consulting",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/insights",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/research",
    changeFrequency: "weekly",
    priority: 0.7,
  },
  {
    path: "/frameworks/provider-economics-launch-readiness",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

const STATIC_SITE_LAST_MODIFIED = new Date(siteConfig.lastUpdated);

function latestDate(values: Array<string | Date | undefined>): Date {
  let latestTimestamp = Number.NaN;

  for (const value of values) {
    if (!value) {
      continue;
    }

    const timestamp = value instanceof Date ? value.getTime() : new Date(value).getTime();

    if (!Number.isNaN(timestamp)) {
      latestTimestamp = Number.isNaN(latestTimestamp) ? timestamp : Math.max(latestTimestamp, timestamp);
    }
  }

  return Number.isNaN(latestTimestamp) ? STATIC_SITE_LAST_MODIFIED : new Date(latestTimestamp);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [insights, research] = await Promise.all([getInsights(), getResearch()]);
  const latestInsightUpdate = latestDate(insights.map((post) => post.lastModified));
  const latestResearchUpdate = latestDate(research.map((post) => post.lastModified));

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => {
    if (route.path === "/") {
      return {
        url: absoluteUrl(route.path),
        lastModified: latestDate([STATIC_SITE_LAST_MODIFIED, latestInsightUpdate, latestResearchUpdate]),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      };
    }

    if (route.path === "/insights") {
      return {
        url: absoluteUrl(route.path),
        lastModified: latestDate([STATIC_SITE_LAST_MODIFIED, latestInsightUpdate]),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      };
    }

    if (route.path === "/research") {
      return {
        url: absoluteUrl(route.path),
        lastModified: latestDate([STATIC_SITE_LAST_MODIFIED, latestResearchUpdate]),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      };
    }

    return {
      url: absoluteUrl(route.path),
      lastModified: STATIC_SITE_LAST_MODIFIED,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });

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
