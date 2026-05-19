export type ServiceCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  icon: "owners" | "property" | "asset" | "investors";
  subServices: readonly {
    title: string;
    description: string;
  }[];
};

export const serviceCategories = [
  {
    slug: "owners-developers",
    title: "Owners / Developers",
    shortTitle: "Owners & Developers",
    description:
      "Accounting and reporting for owners and developers across residential, commercial, HOA, and construction portfolios.",
    summary:
      "From lease abstraction to investment analysis: full-cycle books for development and ownership entities.",
    icon: "owners",
    subServices: [
      {
        title: "Residential Property Accounting",
        description:
          "Monthly books, rent rolls, and owner statements for residential portfolios and single-asset owners.",
      },
      {
        title: "Commercial Property Accounting",
        description:
          "CAM structures, tenant billing, and GL maintenance for office, retail, and mixed-use assets.",
      },
      {
        title: "HOA / Condo Accounting",
        description:
          "Assessments, reserves, vendor payables, and member reporting for associations and condo boards.",
      },
      {
        title: "Construction Accounting",
        description:
          "Job costing, WIP schedules, draw reporting, and project-level P&L for active developments.",
      },
      {
        title: "Lease Abstraction",
        description:
          "Key term extraction, rent schedules, and abstract summaries to support acquisitions and asset management.",
      },
      {
        title: "Investment Analysis",
        description:
          "Scenario modeling, IRR/NPV support, and underwriting packages for new deals and refinances.",
      },
      {
        title: "Acquisition Support",
        description:
          "Due diligence checklists, QoE support, and transition plans when you buy or sell assets.",
      },
      {
        title: "Financial Dashboards",
        description:
          "Custom KPI dashboards for occupancy, NOI, cash flow, and portfolio performance.",
      },
    ],
  },
  {
    slug: "property-management",
    title: "Property Management",
    shortTitle: "Property Management",
    description:
      "Back-office accounting for property managers with scalable support for residential, commercial, and mixed books.",
    summary:
      "We run the books behind your PM operations so your team can focus on tenants and owners.",
    icon: "property",
    subServices: [
      {
        title: "Residential Property Accounting",
        description:
          "Trust accounting, owner distributions, and monthly reporting aligned to your PM software.",
      },
      {
        title: "Commercial Property Accounting",
        description:
          "Tenant ledgers, CAM reconciliations prep, and management fee calculations.",
      },
      {
        title: "HOA / Condo Accounting",
        description:
          "Association billing, delinquency tracking, and board-ready financial packages.",
      },
      {
        title: "Construction Accounting",
        description:
          "Progress billings, subcontractor AP, and project closeout for managed construction lines.",
      },
      {
        title: "Back Office Support",
        description:
          "AP/AR, bank recs, and month-end close executed as an extension of your PM team.",
      },
      {
        title: "CAM Reconciliation Services",
        description:
          "Expense pools, tenant share calculations, and annual reconciliation workpapers.",
      },
    ],
  },
  {
    slug: "asset-management",
    title: "Asset Management",
    shortTitle: "Asset Management",
    description:
      "Portfolio-level accounting and reporting for asset managers overseeing multi-property investments.",
    summary:
      "Consolidated reporting, acquisitions support, and ongoing portfolio accounting in one outsourced team.",
    icon: "asset",
    subServices: [
      {
        title: "Asset Management Services",
        description:
          "Fund- and entity-level books, investor allocations, and recurring reporting cadences.",
      },
      {
        title: "Portfolio Accounting",
        description:
          "Multi-asset consolidation, intercompany eliminations, and balance-sheet integrity across holdings.",
      },
      {
        title: "Acquisition Support",
        description:
          "Closing binders, opening balance setup, and integration into your existing chart of accounts.",
      },
    ],
  },
  {
    slug: "investors",
    title: "Investors",
    shortTitle: "Investors",
    description:
      "Reporting and analysis for real estate investors, from single assets to diversified portfolios.",
    summary:
      "Clear financials, investment metrics, and acquisition support tailored to LP and GP needs.",
    icon: "investors",
    subServices: [
      {
        title: "Portfolio Accounting",
        description:
          "Asset- and fund-level statements, capital accounts, and distribution waterfalls.",
      },
      {
        title: "Investment Analysis",
        description:
          "Pro formas, sensitivity models, and return metrics for hold/sell/refinance decisions.",
      },
      {
        title: "Acquisition Support",
        description:
          "Historical book cleanup, diligence schedules, and post-close reporting setup.",
      },
    ],
  },
] as const satisfies readonly ServiceCategory[];

export type ServiceCategorySlug = (typeof serviceCategories)[number]["slug"];

export function getServiceCategory(slug: string) {
  return serviceCategories.find((c) => c.slug === slug);
}

export function getAllServiceSlugs() {
  return serviceCategories.map((c) => c.slug);
}

export const servicesOverview = {
  eyebrow: "Our services",
  title: "Four specialized",
  titleAccent: "service lines",
  description:
    "Choose your path. Each service line includes dedicated sub-services delivered by our outsourced finance team.",
} as const;
