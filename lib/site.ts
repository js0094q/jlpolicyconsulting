export const siteConfig = {
  name: "JL Policy Consulting",
  legalName: "JL Policy Consulting, LLC",
  domain: "jlpolicyconsulting.com",
  url: "https://jlpolicyconsulting.com",
  description:
    "Analysis and advisory at the intersection of pharmaceutical policy, pricing, access, and payer economics.",
  email: "contact@jlpolicyconsulting.com",
  linkedin: "https://www.linkedin.com/in/joseph-stewart-mph-cpht-309bb5215",
  navItems: [
    { label: "About", href: "/about" },
    { label: "Consulting", href: "/consulting" },
    { label: "Insights", href: "/insights" },
    { label: "Research", href: "/research" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const defaultKeywords = [
  "pharmaceutical reimbursement strategy",
  "Medicare Part D policy",
  "PBM formulary dynamics",
  "drug pricing policy",
  "market access strategy",
  "healthcare policy analytics",
];

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}
