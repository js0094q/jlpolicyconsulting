import { absoluteUrl } from "@/lib/site";

interface BuildOgImageUrlInput {
  title: string;
  subtitle?: string;
  kicker?: string;
}

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

function compact(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}...`;
}

export function buildOgImageUrl({ title, subtitle, kicker }: BuildOgImageUrlInput): string {
  const params = new URLSearchParams();

  params.set("title", truncate(compact(title), 140));

  if (subtitle) {
    params.set("subtitle", truncate(compact(subtitle), 200));
  }

  if (kicker) {
    params.set("kicker", truncate(compact(kicker), 60));
  }

  return absoluteUrl(`/api/og?${params.toString()}`);
}
