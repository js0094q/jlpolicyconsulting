export const siteConfig = {
  name: "JL Policy Consulting",
  legalName: "JL Policy Consulting, LLC",
  domain: "jlpolicyconsulting.com",
  url: "https://jlpolicyconsulting.com",
  description:
    "Policy and analytics for pharmaceutical reimbursement, drug pricing strategy, market access, Medicare Part D, and payer formulary behavior using integrated multi-source data.",
  email: "contact@jlpolicyconsulting.com",
  linkedin: "https://www.linkedin.com/in/joseph-stewart",
  navItems: [
    { label: "About", href: "/about" },
    { label: "Consulting", href: "/consulting" },
    { label: "Insights", href: "/insights" },
    { label: "Research", href: "/research" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const defaultKeywords = [
  "pharmaceutical reimbursement",
  "drug pricing strategy",
  "market access",
  "Medicare Part D",
  "PBM formulary behavior",
  "payer economics",
  "biosimilars policy",
  "generics policy",
  "commercialization implications of policy",
  "healthcare data analysis",
];

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
