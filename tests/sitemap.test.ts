import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { absoluteUrl } from "@/lib/site";

describe("sitemap", () => {
  it("includes expected primary static routes", async () => {
    const entries = await sitemap();
    const urls = new Set(entries.map((entry) => entry.url));

    expect(urls.has(absoluteUrl("/"))).toBe(true);
    expect(urls.has(absoluteUrl("/about"))).toBe(true);
    expect(urls.has(absoluteUrl("/consulting"))).toBe(true);
    expect(urls.has(absoluteUrl("/insights"))).toBe(true);
    expect(urls.has(absoluteUrl("/research"))).toBe(true);
    expect(urls.has(absoluteUrl("/contact"))).toBe(true);
  });
});
