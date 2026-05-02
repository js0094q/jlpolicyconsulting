import path from "node:path";
import { fileURLToPath } from "node:url";

export type ContentCollection = "insights" | "research";

export const ALLOWED_CATEGORIES = [
  "Medicare Policy",
  "Drug Pricing",
  "PBM and Formulary Dynamics",
  "Biosimilars and Generics",
  "Healthcare Data Analysis",
  "Market Access Strategy",
  "Gross-to-Net Modeling",
  "Reimbursement"
] as const;

export type AllowedCategory = (typeof ALLOWED_CATEGORIES)[number];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = __dirname;

export interface RepoConfig {
  project: {
    name: string;
    company: string;
    domain: string;
    repoVisibility: "private" | "public";
  };
  paths: {
    root: string;
    website: {
      app: string;
      public: string;
      content: string;
      docs: string;
      tests: string;
      api: string;
      components: string;
      lib: string;
    };
    output: {
      root: string;
      og: string;
      exports: string;
      reports: string;
      tmp: string;
    };
    archive: {
      root: string;
      prototypes: string;
    };
  };
  content: {
    collections: Record<
      ContentCollection,
      {
        dir: string;
        urlPrefix: string;
      }
    >;
    allowedCategories: readonly AllowedCategory[];
    specs: {
      insightArticle: string;
      researchArticle: string;
      presentationSystem: string;
    };
  };
  build: {
    nextStandalone: boolean;
    buildIgnoreGlobs: string[];
  };
  deployment: {
    vercel: {
      framework: "nextjs";
      buildCommand: string;
      installCommand: string;
      outputDirectory: string | null;
    };
  };
}

export const repoConfig: RepoConfig = {
  project: {
    name: "JL Policy Consulting Website",
    company: "JL Policy Consulting, LLC",
    domain: "jlpolicyconsulting.com",
    repoVisibility: "private",
  },

  paths: {
    root: ROOT,

    website: {
      app: path.join(ROOT, "app"),
      public: path.join(ROOT, "public"),
      content: path.join(ROOT, "content"),
      docs: path.join(ROOT, "docs"),
      tests: path.join(ROOT, "tests"),
      api: path.join(ROOT, "app", "api"),
      components: path.join(ROOT, "components"),
      lib: path.join(ROOT, "lib"),
    },

    output: {
      root: path.join(ROOT, "output"),
      og: path.join(ROOT, "output", "og"),
      exports: path.join(ROOT, "output", "exports"),
      reports: path.join(ROOT, "output", "reports"),
      tmp: path.join(ROOT, "output", "tmp"),
    },

    archive: {
      root: path.join(ROOT, "docs", "archive"),
      prototypes: path.join(ROOT, "docs", "archive", "prototypes"),
    },
  },

  content: {
    collections: {
      insights: {
        dir: path.join(ROOT, "content", "insights"),
        urlPrefix: "/insights",
      },
      research: {
        dir: path.join(ROOT, "content", "research"),
        urlPrefix: "/research",
      },
    },

    allowedCategories: ALLOWED_CATEGORIES,

    specs: {
      insightArticle: path.join(ROOT, "docs", "specs", "insight-article-spec.md"),
      researchArticle: path.join(ROOT, "docs", "specs", "research-article-spec.md"),
      presentationSystem: path.join(ROOT, "docs", "brand", "content-presentation-system.md"),
    },
  },

  build: {
    nextStandalone: true,
    buildIgnoreGlobs: [
      "output/**",
      "docs/archive/**",
      "**/*.csv",
      "**/*.pdf",
      "**/*.docx",
      "**/*.mdx.bak",
    ],
  },

  deployment: {
    vercel: {
      framework: "nextjs",
      installCommand: "npm install",
      buildCommand: "npm run build",
      outputDirectory: null,
    },
  },
};

export default repoConfig;
