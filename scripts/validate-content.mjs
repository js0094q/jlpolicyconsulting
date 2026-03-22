import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT_DIRECTORIES = [
  path.join(ROOT, "content", "insights"),
  path.join(ROOT, "content", "research"),
];

const REQUIRED_STRING_FIELDS = ["title", "summary", "publishDate", "category"];
const REQUIRED_ARRAY_FIELDS = ["tags"];
const ALLOWED_CATEGORIES = new Set([
  "Medicare Policy",
  "Drug Pricing",
  "PBM and Formulary Dynamics",
  "Biosimilars and Generics",
  "Healthcare Data Analysis",
  "Market Access Strategy",
]);
const ALLOWED_SEO_HOSTS = new Set(["jlpolicyconsulting.com", "www.jlpolicyconsulting.com"]);
const FORBIDDEN_CONTENT_PATTERNS = [
  {
    label: "script_tag",
    pattern: /<script\b/i,
  },
  {
    label: "inline_event_handler",
    pattern: /\son[a-z]+\s*=/i,
  },
  {
    label: "javascript_url",
    pattern: /\[[^\]]*]\(\s*javascript:/i,
  },
  {
    label: "mdx_import_export",
    pattern: /^\s*(import|export)\s/m,
  },
];

function parseHttpsUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" ? parsed : null;
  } catch {
    return null;
  }
}

function validateDocument(filePath, source) {
  const issues = [];
  const { data, content } = matter(source);
  const name = path.relative(ROOT, filePath);

  for (const field of REQUIRED_STRING_FIELDS) {
    const value = data[field];
    if (typeof value !== "string" || !value.trim()) {
      issues.push(`${name}: missing required string field "${field}"`);
    }
  }

  for (const field of REQUIRED_ARRAY_FIELDS) {
    const value = data[field];
    if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string" || !entry.trim())) {
      issues.push(`${name}: field "${field}" must be a non-empty string array`);
    }
  }

  if (typeof data.publishDate === "string" && Number.isNaN(new Date(data.publishDate).getTime())) {
    issues.push(`${name}: publishDate is not a valid date (${data.publishDate})`);
  }

  if (typeof data.category === "string" && !ALLOWED_CATEGORIES.has(data.category)) {
    issues.push(
      `${name}: category "${data.category}" is invalid. Allowed values: ${Array.from(ALLOWED_CATEGORIES).join(", ")}`,
    );
  }

  if (typeof data.canonicalUrl === "string") {
    const parsedCanonical = parseHttpsUrl(data.canonicalUrl);
    if (!parsedCanonical) {
      issues.push(`${name}: canonicalUrl must be an absolute https URL`);
    } else if (!ALLOWED_SEO_HOSTS.has(parsedCanonical.hostname)) {
      issues.push(
        `${name}: canonicalUrl host must be one of: ${Array.from(ALLOWED_SEO_HOSTS).join(", ")}`,
      );
    }
  }

  if (typeof data.ogImage === "string" && !data.ogImage.startsWith("/")) {
    const parsedOgImage = parseHttpsUrl(data.ogImage);
    if (!parsedOgImage) {
      issues.push(`${name}: ogImage must be an absolute https URL or a leading-slash site path`);
    } else if (!ALLOWED_SEO_HOSTS.has(parsedOgImage.hostname)) {
      issues.push(
        `${name}: ogImage host must be one of: ${Array.from(ALLOWED_SEO_HOSTS).join(", ")}`,
      );
    }
  }

  for (const rule of FORBIDDEN_CONTENT_PATTERNS) {
    if (rule.pattern.test(content)) {
      issues.push(`${name}: body contains forbidden pattern (${rule.label})`);
    }
  }

  return issues;
}

async function getContentFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(directory, entry.name));
}

async function main() {
  const filesNested = await Promise.all(CONTENT_DIRECTORIES.map((directory) => getContentFiles(directory)));
  const files = filesNested.flat();

  const issueSets = await Promise.all(
    files.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      return validateDocument(filePath, source);
    }),
  );

  const issues = issueSets.flat();

  if (issues.length > 0) {
    for (const issue of issues) {
      console.error(issue);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${files.length} MDX files successfully.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
