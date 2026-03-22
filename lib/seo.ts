import type { Metadata } from "next";
import type { ArticleMeta } from "@/lib/content";
import { buildOgImageUrl, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/og";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  kicker?: string;
}

type ArticleSeoSource = Pick<ArticleMeta, "title" | "summary" | "url" | "seo">;

function parseHttpsUrl(value: string): URL | null {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" ? parsed : null;
  } catch {
    return null;
  }
}

function isSiteHost(hostname: string): boolean {
  return hostname === siteConfig.domain || hostname === `www.${siteConfig.domain}`;
}

function resolveCanonicalUrl(override: string | undefined, fallback: string): string {
  if (!override) {
    return fallback;
  }

  const parsed = parseHttpsUrl(override);

  if (!parsed) {
    return fallback;
  }

  return isSiteHost(parsed.hostname) ? parsed.toString() : fallback;
}

function resolveOgImageUrl(override: string | undefined, fallback: string): string {
  if (!override) {
    return fallback;
  }

  if (override.startsWith("/")) {
    return absoluteUrl(override);
  }

  const parsed = parseHttpsUrl(override);
  if (!parsed) {
    return fallback;
  }

  return isSiteHost(parsed.hostname) ? parsed.toString() : fallback;
}

export function resolveArticleSeo(article: ArticleSeoSource, kicker: string) {
  const title = article.seo.title ?? article.title;
  const description = article.seo.description ?? article.summary;
  const canonical = resolveCanonicalUrl(article.seo.canonicalUrl, absoluteUrl(article.url));
  const generatedImageUrl = buildOgImageUrl({
    title,
    subtitle: description,
    kicker,
  });
  const imageUrl = resolveOgImageUrl(article.seo.ogImage, generatedImageUrl);

  return {
    title,
    description,
    canonical,
    imageUrl,
    images: [
      {
        url: imageUrl,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: title,
      },
    ],
  };
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  kicker,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = buildOgImageUrl({
    title,
    subtitle: description,
    kicker: kicker ?? siteConfig.legalName,
  });

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
