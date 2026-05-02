import { describe, expect, it } from "vitest";
import {
  buildOgImageUrl,
  OG_KICKER_MAX_LENGTH,
  OG_SUBTITLE_MAX_LENGTH,
  OG_TITLE_MAX_LENGTH,
} from "@/lib/og";

describe("buildOgImageUrl", () => {
  it("truncates title, subtitle, and kicker query params", () => {
    const url = new URL(
      buildOgImageUrl({
        title: "A".repeat(OG_TITLE_MAX_LENGTH + 10),
        subtitle: "B".repeat(OG_SUBTITLE_MAX_LENGTH + 10),
        kicker: "C".repeat(OG_KICKER_MAX_LENGTH + 10),
      }),
    );

    expect(url.pathname).toBe("/api/og");
    expect(url.searchParams.get("title")).toHaveLength(OG_TITLE_MAX_LENGTH);
    expect(url.searchParams.get("subtitle")).toHaveLength(OG_SUBTITLE_MAX_LENGTH);
    expect(url.searchParams.get("kicker")).toHaveLength(OG_KICKER_MAX_LENGTH);
  });
});
