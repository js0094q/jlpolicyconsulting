import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/container";
import { mdxComponents } from "@/components/mdx-components";
import { formatDisplayDate, getResearch, getResearchBySlug } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface ResearchPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getResearch();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getResearchBySlug(slug);

  if (!post) {
    return {
      title: "Research Not Found",
    };
  }

  const title = post.seo.title ?? post.title;
  const description = post.seo.description ?? post.summary;
  const canonical = post.seo.canonicalUrl ?? absoluteUrl(post.url);
  const images = post.seo.ogImage ? [{ url: absoluteUrl(post.seo.ogImage) }] : undefined;

  return {
    title,
    description,
    keywords: post.tags,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: canonical,
      title,
      description,
      section: "Research",
      tags: post.tags,
      publishedTime: post.publishDate,
      authors: ["Joseph Stewart"],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images?.map((image) => image.url),
    },
  };
}

export default async function ResearchDetailPage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const post = await getResearchBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishDate,
    author: {
      "@type": "Person",
      name: "Joseph Stewart",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
    mainEntityOfPage: absoluteUrl(post.url),
  };

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <Link href="/research" className="editorial-link">
          ← Back to research
        </Link>

        <header className="mt-6 border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tag">Research Analysis</span>
            <span className="tag">{post.category}</span>
          </div>
          <h1 className="mt-4 text-4xl leading-tight text-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{post.summary}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            This format includes structured sections, dataset framing, and table/chart placeholders
            for reusable policy and market analysis workflows.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-[var(--color-muted)]">
            <time dateTime={post.publishDate}>{formatDisplayDate(post.publishDate)}</time>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="mt-10 border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </Container>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </article>
  );
}
