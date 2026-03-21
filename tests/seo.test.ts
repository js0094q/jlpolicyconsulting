import { describe, expect, it } from "vitest";
import { resolveArticleSeo } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

describe("resolveArticleSeo", () => {
  it("falls back to local canonical when override host is invalid", () => {
    const seo = resolveArticleSeo(
      {
        title: "Example",
        summary: "Summary",
        url: "/insights/example",
        seo: {
          canonicalUrl: "https://example.com/wrong",
        },
      },
      "Insight",
    );

    expect(seo.canonical).toBe(absoluteUrl("/insights/example"));
  });

  it("keeps site-relative ogImage overrides", () => {
    const seo = resolveArticleSeo(
      {
        title: "Example",
        summary: "Summary",
        url: "/insights/example",
        seo: {
          ogImage: "/custom-og.png",
        },
      },
      "Insight",
    );

    expect(seo.imageUrl).toBe(absoluteUrl("/custom-og.png"));
  });
});
