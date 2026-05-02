import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/container";
import { mdxComponents } from "@/components/mdx-components";
import { formatDisplayDate, getInsightBySlug, getInsightSlugs, getLatestResearch } from "@/lib/content";
import { safeJsonLd } from "@/lib/json-ld";
import { resolveArticleSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

interface InsightPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);

  if (!post) {
    return {
      title: "Insight Not Found",
    };
  }

  const seo = resolveArticleSeo(post, "Insight");

  return {
    title: seo.title,
    description: seo.description,
    keywords: post.tags,
    alternates: {
      canonical: seo.canonical,
    },
    openGraph: {
      type: "article",
      url: seo.canonical,
      title: seo.title,
      description: seo.description,
      section: post.category,
      tags: post.tags,
      publishedTime: post.publishDate,
      authors: ["Joseph Stewart"],
      images: seo.images,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.imageUrl],
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const [post, relatedResearch] = await Promise.all([getInsightBySlug(slug), getLatestResearch(2)]);
  const requestHeaders = await headers();
  const cspNonce = requestHeaders.get("x-csp-nonce") ?? undefined;

  if (!post) {
    notFound();
  }

  const seo = resolveArticleSeo(post, "Insight");

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: seo.title,
    description: seo.description,
    url: seo.canonical,
    datePublished: post.publishDate,
    dateModified: post.lastModified,
    image: [seo.imageUrl],
    author: {
      "@type": "Person",
      name: "Joseph Stewart",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
    mainEntityOfPage: seo.canonical,
  };

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <Link href="/insights" className="editorial-link">
          ← Back to insights
        </Link>
        <header className="mt-6 border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag">Insight</span>
            <span className="tag">{post.category}</span>
          </div>
          <h1 className="mt-4 text-4xl leading-tight text-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{post.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted)]">
            <time dateTime={post.publishDate}>{formatDisplayDate(post.publishDate)}</time>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10 border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSanitize],
              },
            }}
          />
        </div>

        <section className="mt-10 border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <h2 className="text-2xl leading-tight text-ink">Related strategy and analysis</h2>
          <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
            For advisory application, review{" "}
            <Link href="/consulting" className="editorial-link">
              Consulting
            </Link>
            . For deeper data-backed work, review recent{" "}
            <Link href="/research" className="editorial-link">
              Research
            </Link>
            :
          </p>
          {relatedResearch.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--color-muted)]">
              {relatedResearch.map((item) => (
                <li key={item.slug} className="border-b border-[var(--color-border)] pb-2">
                  <Link href={item.url} className="editorial-link">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              Recent research is currently being updated, so related links will appear when new work is
              published.
            </p>
          )}
        </section>
      </Container>

      <script
        nonce={cspNonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(articleSchema) }}
      />
    </article>
  );
}
