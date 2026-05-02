import { absoluteUrl } from "@/lib/site";

interface BuildOgImageUrlInput {
  title: string;
  subtitle?: string;
  kicker?: string;
}

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_TITLE_MAX_LENGTH = 140;
export const OG_SUBTITLE_MAX_LENGTH = 200;
export const OG_KICKER_MAX_LENGTH = 60;

function compact(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  if (maxLength <= 3) {
    return value.slice(0, maxLength);
  }

  return `${value.slice(0, maxLength - 3).trim()}...`;
}

export function buildOgImageUrl({ title, subtitle, kicker }: BuildOgImageUrlInput): string {
  const params = new URLSearchParams();

  params.set("title", truncate(compact(title), OG_TITLE_MAX_LENGTH));

  if (subtitle) {
    params.set("subtitle", truncate(compact(subtitle), OG_SUBTITLE_MAX_LENGTH));
  }

  if (kicker) {
    params.set("kicker", truncate(compact(kicker), OG_KICKER_MAX_LENGTH));
  }

  return absoluteUrl(`/api/og?${params.toString()}`);
}
