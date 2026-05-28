import path from "node:path";
import { describe, expect, it } from "vitest";
import { validateDocument } from "../scripts/validate-content.mjs";

const validFrontmatter = `---
title: "Valid Article"
summary: "A valid article summary."
publishDate: "2026-05-28"
category: "Provider Economics"
tags:
  - reimbursement
---
`;

function validateBody(body: string): string[] {
  return validateDocument(path.join(process.cwd(), "content", "research", "test-article.mdx"), `${validFrontmatter}\n${body}`);
}

describe("content validation", () => {
  it("allows registered MDX component usage", () => {
    expect(validateBody("<ProviderNetPositionFormula />")).toEqual([]);
  });

  it("rejects script tags and inline event handlers", () => {
    expect(validateBody("<script>alert('x')</script>")).toContain(
      "content/research/test-article.mdx: body contains forbidden pattern (script_tag)",
    );
    expect(validateBody('<div onClick={() => alert("x")}>Click</div>')).toContain(
      "content/research/test-article.mdx: body contains forbidden pattern (inline_event_handler)",
    );
  });

  it("rejects unsafe javascript and data URL payloads", () => {
    expect(validateBody("[bad](javascript:alert(1))")).toContain(
      "content/research/test-article.mdx: body contains forbidden pattern (javascript_url)",
    );
    expect(validateBody('<a href="data:text/html;base64,PHNjcmlwdD4=">bad</a>')).toContain(
      "content/research/test-article.mdx: body contains forbidden pattern (unsafe_data_url)",
    );
  });
});
