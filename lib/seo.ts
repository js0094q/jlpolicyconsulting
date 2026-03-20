import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { buildOgImageUrl } from "@/lib/og";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  kicker?: string;
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
