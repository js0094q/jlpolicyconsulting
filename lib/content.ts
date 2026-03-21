import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export const INSIGHT_CATEGORIES = [
  "Medicare Policy",
  "Drug Pricing",
  "PBM and Formulary Dynamics",
  "Biosimilars and Generics",
  "Healthcare Data Analysis",
  "Market Access Strategy",
] as const;

export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number];
export type ArticleType = "insight" | "research";

interface RawArticleFrontmatter {
  title: string;
  summary: string;
  publishDate: string;
  category: InsightCategory;
  tags: string[];
  readingTime?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  summary: string;
  publishDate: string;
  lastModified: string;
  category: InsightCategory;
  tags: string[];
  readingTime: string;
  type: ArticleType;
  url: string;
  seo: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: string;
  };
}

export interface Article extends ArticleMeta {
  content: string;
}

const CONTENT_DIRECTORIES: Record<ArticleType, string> = {
  insight: path.join(process.cwd(), "content", "insights"),
  research: path.join(process.cwd(), "content", "research"),
};

function isInsightCategory(category: string): category is InsightCategory {
  return INSIGHT_CATEGORIES.includes(category as InsightCategory);
}

function requiredString(
  data: Record<string, unknown>,
  key: keyof RawArticleFrontmatter,
  slug: string,
): string {
  const value = data[key];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing required field \"${key}\" in ${slug}.mdx`);
  }

  return value.trim();
}

function requiredStringArray(
  data: Record<string, unknown>,
  key: keyof RawArticleFrontmatter,
  slug: string,
): string[] {
  const value = data[key];

  if (!Array.isArray(value) || value.some((entry) => typeof entry !== "string")) {
    throw new Error(`Field \"${key}\" must be an array of strings in ${slug}.mdx`);
  }

  return value.map((entry) => entry.trim()).filter(Boolean);
}

function optionalString(
  data: Record<string, unknown>,
  key: keyof RawArticleFrontmatter,
): string | undefined {
  const value = data[key];

  if (typeof value !== "string") {
    return undefined;
  }

  return value.trim() || undefined;
}

function normalizeFrontmatter(data: unknown, slug: string): RawArticleFrontmatter {
  if (!data || typeof data !== "object") {
    throw new Error(`Frontmatter is required for ${slug}.mdx`);
  }

  const record = data as Record<string, unknown>;
  const category = requiredString(record, "category", slug);

  if (!isInsightCategory(category)) {
    throw new Error(
      `Invalid category \"${category}\" in ${slug}.mdx. Use one of: ${INSIGHT_CATEGORIES.join(", ")}.`,
    );
  }

  return {
    title: requiredString(record, "title", slug),
    summary: requiredString(record, "summary", slug),
    publishDate: requiredString(record, "publishDate", slug),
    category,
    tags: requiredStringArray(record, "tags", slug),
    readingTime: optionalString(record, "readingTime"),
    seoTitle: optionalString(record, "seoTitle"),
    seoDescription: optionalString(record, "seoDescription"),
    canonicalUrl: optionalString(record, "canonicalUrl"),
    ogImage: optionalString(record, "ogImage"),
  };
}

function createReadingTimeLabel(content: string, value?: string): string {
  if (value) {
    return value;
  }

  const minutes = Math.max(2, Math.round(readingTime(content).minutes));
  return `${minutes} min read`;
}

async function listMdxSlugs(type: ArticleType): Promise<string[]> {
  const directory = CONTENT_DIRECTORIES[type];

  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => entry.name.replace(/\.mdx$/, ""));
  } catch (error) {
    const maybeErr = error as NodeJS.ErrnoException;

    if (maybeErr.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

function mapToArticleMeta(
  slug: string,
  type: ArticleType,
  frontmatter: RawArticleFrontmatter,
  content: string,
  lastModified: string,
): ArticleMeta {
  const publishDate = new Date(frontmatter.publishDate);

  if (Number.isNaN(publishDate.getTime())) {
    throw new Error(`Invalid publishDate in ${slug}.mdx`);
  }

  return {
    slug,
    title: frontmatter.title,
    summary: frontmatter.summary,
    publishDate: publishDate.toISOString(),
    lastModified,
    category: frontmatter.category,
    tags: frontmatter.tags,
    readingTime: createReadingTimeLabel(content, frontmatter.readingTime),
    type,
    url: type === "insight" ? `/insights/${slug}` : `/research/${slug}`,
    seo: {
      title: frontmatter.seoTitle,
      description: frontmatter.seoDescription,
      canonicalUrl: frontmatter.canonicalUrl,
      ogImage: frontmatter.ogImage,
    },
  };
}

async function readArticle(type: ArticleType, slug: string): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIRECTORIES[type], `${slug}.mdx`);

  try {
    const [source, fileStats] = await Promise.all([fs.readFile(filePath, "utf-8"), fs.stat(filePath)]);
    const parsed = matter(source);
    const frontmatter = normalizeFrontmatter(parsed.data, slug);
    const meta = mapToArticleMeta(slug, type, frontmatter, parsed.content, fileStats.mtime.toISOString());

    return {
      ...meta,
      content: parsed.content,
    };
  } catch (error) {
    const maybeErr = error as NodeJS.ErrnoException;

    if (maybeErr.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

function toArticleMeta(article: Article): ArticleMeta {
  return {
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    publishDate: article.publishDate,
    lastModified: article.lastModified,
    category: article.category,
    tags: article.tags,
    readingTime: article.readingTime,
    type: article.type,
    url: article.url,
    seo: article.seo,
  };
}

export async function getArticles(type: ArticleType): Promise<ArticleMeta[]> {
  const slugs = await listMdxSlugs(type);

  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const article = await readArticle(type, slug);
      return article;
    }),
  );

  return articles
    .filter((article): article is Article => article !== null)
    .map((article) => toArticleMeta(article))
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export async function getInsights(): Promise<ArticleMeta[]> {
  return getArticles("insight");
}

export async function getResearch(): Promise<ArticleMeta[]> {
  return getArticles("research");
}

export async function getLatestInsights(count = 3): Promise<ArticleMeta[]> {
  return getLatestArticles("insight", count);
}

export async function getLatestResearch(count = 3): Promise<ArticleMeta[]> {
  return getLatestArticles("research", count);
}

async function getLatestArticles(type: ArticleType, count: number): Promise<ArticleMeta[]> {
  const articles = await getArticles(type);
  return articles.slice(0, count);
}

export async function getInsightBySlug(slug: string): Promise<Article | null> {
  return readArticle("insight", slug);
}

export async function getResearchBySlug(slug: string): Promise<Article | null> {
  return readArticle("research", slug);
}

export function formatDisplayDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export function getCategoryCounts(articles: ArticleMeta[]): Array<{ category: InsightCategory; count: number }> {
  const counts = new Map<InsightCategory, number>(
    INSIGHT_CATEGORIES.map((category) => [category, 0]),
  );

  for (const article of articles) {
    counts.set(article.category, (counts.get(article.category) ?? 0) + 1);
  }

  return INSIGHT_CATEGORIES.map((category) => ({
    category,
    count: counts.get(category) ?? 0,
  }));
}
