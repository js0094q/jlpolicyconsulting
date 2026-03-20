import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { buildOgImageUrl } from "@/lib/og";
import { defaultKeywords, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Reimbursement, Pricing, and Payer Dynamics`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: defaultKeywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Reimbursement, Pricing, and Payer Dynamics`,
    description: siteConfig.description,
    images: [
      {
        url: buildOgImageUrl({
          title: "Reimbursement Strategy, Drug Pricing Policy, and Market Access Insight",
          subtitle: siteConfig.description,
          kicker: siteConfig.legalName,
        }),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Reimbursement, Pricing, and Payer Dynamics`,
    description: siteConfig.description,
    images: [
      buildOgImageUrl({
        title: "Reimbursement Strategy, Drug Pricing Policy, and Market Access Insight",
        subtitle: siteConfig.description,
        kicker: siteConfig.legalName,
      }),
    ],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  url: siteConfig.url,
  email: siteConfig.email,
  sameAs: [siteConfig.linkedin],
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-page text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-slate-900 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="min-h-screen">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
