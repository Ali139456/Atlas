export type ServiceCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  summary: string;
  heroImage: string;
  icon: "owners" | "property" | "asset" | "investors";
  subServices: readonly {
    title: string;
    description: string;
    image: string;
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
    heroImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=75",
    icon: "owners",
    subServices: [
      {
        title: "Residential Property Accounting",
        description:
          "Monthly books, rent rolls, and owner statements for residential portfolios and single-asset owners.",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Commercial Property Accounting",
        description:
          "CAM structures, tenant billing, and GL maintenance for office, retail, and mixed-use assets.",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "HOA / Condo Accounting",
        description:
          "Assessments, reserves, vendor payables, and member reporting for associations and condo boards.",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Construction Accounting",
        description:
          "Job costing, WIP schedules, draw reporting, and project-level P&L for active developments.",
        image:
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Lease Abstraction",
        description:
          "Key term extraction, rent schedules, and abstract summaries to support acquisitions and asset management.",
        image:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Investment Analysis",
        description:
          "Scenario modeling, IRR/NPV support, and underwriting packages for new deals and refinances.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Acquisition Support",
        description:
          "Due diligence checklists, QoE support, and transition plans when you buy or sell assets.",
        image:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Financial Dashboards",
        description:
          "Custom KPI dashboards for occupancy, NOI, cash flow, and portfolio performance.",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=75",
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
    heroImage:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=75",
    icon: "property",
    subServices: [
      {
        title: "Residential Property Accounting",
        description:
          "Trust accounting, owner distributions, and monthly reporting aligned to your PM software.",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Commercial Property Accounting",
        description:
          "Tenant ledgers, CAM reconciliations prep, and management fee calculations.",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "HOA / Condo Accounting",
        description:
          "Association billing, delinquency tracking, and board-ready financial packages.",
        image:
          "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Construction Accounting",
        description:
          "Progress billings, subcontractor AP, and project closeout for managed construction lines.",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Back Office Support",
        description:
          "AP/AR, bank recs, and month-end close executed as an extension of your PM team.",
        image:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "CAM Reconciliation Services",
        description:
          "Expense pools, tenant share calculations, and annual reconciliation workpapers.",
        image:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=75",
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
    heroImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=75",
    icon: "asset",
    subServices: [
      {
        title: "Asset Management Services",
        description:
          "Fund- and entity-level books, investor allocations, and recurring reporting cadences.",
        image:
          "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Portfolio Accounting",
        description:
          "Multi-asset consolidation, intercompany eliminations, and balance-sheet integrity across holdings.",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Acquisition Support",
        description:
          "Closing binders, opening balance setup, and integration into your existing chart of accounts.",
        image:
          "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=75",
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
    heroImage:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1400&q=75",
    icon: "investors",
    subServices: [
      {
        title: "Portfolio Accounting",
        description:
          "Asset- and fund-level statements, capital accounts, and distribution waterfalls.",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Investment Analysis",
        description:
          "Pro formas, sensitivity models, and return metrics for hold/sell/refinance decisions.",
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=75",
      },
      {
        title: "Acquisition Support",
        description:
          "Historical book cleanup, diligence schedules, and post-close reporting setup.",
        image:
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=75",
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
  eyebrow: "Services",
  title: "Expert accounting services for your business",
  description:
    "Stay compliant, organized, and confident with professional financial management.",
} as const;
