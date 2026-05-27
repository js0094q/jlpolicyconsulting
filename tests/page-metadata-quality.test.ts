import type { Metadata } from "next";
import { describe, expect, it } from "vitest";
import { absoluteUrl, siteConfig } from "@/lib/site";
import * as AboutPage from "@/app/about/page";
import * as ConsultingPage from "@/app/consulting/page";
import * as ContactPage from "@/app/contact/page";
import * as HomePage from "@/app/page";
import * as InsightsPage from "@/app/insights/page";
import * as ResearchPage from "@/app/research/page";

type MetadataValue = Metadata["title"];

function resolveMetadataTitle(title: MetadataValue): string {
  if (typeof title === "string") {
    return title;
  }

  if (typeof title === "object" && title !== null) {
    const titleLike = title as { default?: unknown };
    if (typeof titleLike.default === "string") {
      return titleLike.default;
    }
  }

  return "";
}

const routes = [
  { label: "Home", route: "/", module: HomePage },
  { label: "About", route: "/about", module: AboutPage },
  { label: "Consulting", route: "/consulting", module: ConsultingPage },
  { label: "Insights", route: "/insights", module: InsightsPage },
  { label: "Research", route: "/research", module: ResearchPage },
  { label: "Contact", route: "/contact", module: ContactPage },
];

describe("page metadata quality", () => {
  it("uses absolute canonical URLs for key pages", () => {
    for (const entry of routes) {
      const metadata = (entry.module as { metadata?: Metadata }).metadata;
      expect(metadata, `${entry.label} metadata exists`).toBeDefined();

      const canonical = metadata?.alternates?.canonical;
      expect(canonical, `${entry.label} canonical exists`).toBe(absoluteUrl(entry.route));
      expect(typeof canonical === "string" && canonical.startsWith(siteConfig.url)).toBe(true);
    }
  });

  it("keeps title and description length within SEO limits", () => {
    for (const entry of routes) {
      const metadata = (entry.module as { metadata?: Metadata }).metadata;
      const title = metadata ? resolveMetadataTitle(metadata.title) : "";
      const description = metadata?.description;

      expect(title.length, `${entry.label} title present`).toBeGreaterThan(24);
      expect(title.length, `${entry.label} title length`).toBeLessThanOrEqual(82);

      expect(description, `${entry.label} description present`).toBeTypeOf("string");
      const descriptionText = String(description);
      expect(descriptionText.length, `${entry.label} description length`).toBeGreaterThan(70);
      expect(descriptionText.length, `${entry.label} description length`).toBeLessThanOrEqual(200);

      expect(typeof metadata?.openGraph?.title === "string", `${entry.label} OG title` ).toBe(true);
      expect(typeof metadata?.openGraph?.description === "string", `${entry.label} OG description`).toBe(true);
    }
  });

  it("keeps open graph URL in sync with canonical", () => {
    for (const entry of routes) {
      const metadata = (entry.module as { metadata?: Metadata }).metadata;

      expect(metadata?.openGraph?.url, `${entry.label} OG url exists`).toBe(absoluteUrl(entry.route));
    }
  });
});
