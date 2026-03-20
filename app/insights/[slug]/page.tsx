import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/container";
import { mdxComponents } from "@/components/mdx-components";
import { formatDisplayDate, getInsightBySlug, getInsights, getResearch } from "@/lib/content";
import { buildOgImageUrl, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/lib/og";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface InsightPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);

  if (!post) {
    return {
      title: "Insight Not Found",
    };
  }

  const title = post.seo.title ?? post.title;
  const description = post.seo.description ?? post.summary;
  const canonical = post.seo.canonicalUrl ?? absoluteUrl(post.url);
  const imageUrl = post.seo.ogImage
    ? absoluteUrl(post.seo.ogImage)
    : buildOgImageUrl({
        title,
        subtitle: description,
        kicker: "Insight",
      });
  const images = [
    {
      url: imageUrl,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: title,
    },
  ];

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
      section: post.category,
      tags: post.tags,
      publishedTime: post.publishDate,
      authors: ["Joseph Stewart"],
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const [post, researchPosts] = await Promise.all([getInsightBySlug(slug), getResearch()]);

  if (!post) {
    notFound();
  }

  const relatedResearch = researchPosts.slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
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
              },
            }}
          />
        </div>

        <section className="mt-10 border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
          <h2 className="text-2xl leading-tight text-ink">Related Strategy and Analysis</h2>
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
          <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--color-muted)]">
            {relatedResearch.map((item) => (
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
