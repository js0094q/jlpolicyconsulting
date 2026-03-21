import { describe, expect, it } from "vitest";
import { safeJsonLd } from "@/lib/json-ld";

describe("safeJsonLd", () => {
  it("escapes characters that can break script tag context", () => {
    const payload = {
      value: "</script><script>alert(1)</script>&",
    };

    const serialized = safeJsonLd(payload);

    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c");
    expect(serialized).toContain("\\u003e");
    expect(serialized).toContain("\\u0026");
  });
});
