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

export function resolveArticleSeo(article: ArticleSeoSource, kicker: string) {
  const title = article.seo.title ?? article.title;
  const description = article.seo.description ?? article.summary;
  const canonical = article.seo.canonicalUrl ?? absoluteUrl(article.url);
  const imageUrl = article.seo.ogImage
    ? absoluteUrl(article.seo.ogImage)
    : buildOgImageUrl({
        title,
        subtitle: description,
        kicker,
      });

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
