import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/container";
import { mdxComponents } from "@/components/mdx-components";
import { formatDisplayDate, getInsights, getResearch, getResearchBySlug } from "@/lib/content";
import { resolveArticleSeo } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

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

  const seo = resolveArticleSeo(post, "Research Analysis");

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
      section: "Research",
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

export default async function ResearchDetailPage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const [post, insightPosts] = await Promise.all([getResearchBySlug(slug), getInsights()]);

  if (!post) {
    notFound();
  }

  const relatedInsights = insightPosts.slice(0, 3);
  const seo = resolveArticleSeo(post, "Research Analysis");

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

        <section className="mt-10 border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <h2 className="text-2xl leading-tight text-ink">Related Commentary</h2>
          <p className="mt-3 text-base leading-8 text-[var(--color-muted)]">
            For shorter interpretation and policy commentary, see recent{" "}
            <Link href="/insights" className="editorial-link">
              Insights
            </Link>
            . Advisory context is available on{" "}
            <Link href="/consulting" className="editorial-link">
              Consulting
            </Link>
            .
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--color-muted)]">
            {relatedInsights.map((item) => (
              <li key={item.slug} className="border-b border-[var(--color-border)] pb-2">
                <Link href={item.url} className="editorial-link">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </article>
  );
}
