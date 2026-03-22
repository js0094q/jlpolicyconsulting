import { describe, expect, it } from "vitest";
import { getInsightBySlug, getResearchBySlug } from "@/lib/content";

describe("content slug safety", () => {
  it("rejects invalid insight slugs", async () => {
    await expect(getInsightBySlug("../../etc/passwd")).resolves.toBeNull();
    await expect(getInsightBySlug("bad slug")).resolves.toBeNull();
  });

  it("rejects invalid research slugs", async () => {
    await expect(getResearchBySlug("../research")).resolves.toBeNull();
    await expect(getResearchBySlug("research/unsafe")).resolves.toBeNull();
  });
});
