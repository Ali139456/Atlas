export type CoreServiceIcon = "payable" | "reconciliation" | "ledger";

export type CoreService = {
  slug: string;
  index: string;
  shortTitle: string;
  title: string;
  icon: CoreServiceIcon;
  description: string;
  summary: string;
  overview: string;
  capabilities: readonly { title: string; description: string }[];
  outcomes: readonly string[];
};

export const coreServicesData: readonly CoreService[] = [
  {
    slug: "accounts-payable",
    index: "01",
    shortTitle: "Accounts Payable",
    title: "Accounts Payable Support",
    icon: "payable",
    description:
      "Invoice review, coding support, approval-ready workflows, and payable tracking.",
    summary:
      "Atlas supports the full accounts payable cycle — from invoice intake through payment readiness — so your team spends less time on manual entry and more time on controls, vendor relationships, and close.",
    overview:
      "Our AP specialists work inside your systems and processes to keep payables moving accurately and on schedule. We focus on clean coding, organized documentation, and consistent follow-through so approvals, payments, and month-end accruals stay under control.",
    capabilities: [
      {
        title: "Invoice intake & review",
        description:
          "Receive, organize, and review vendor invoices for completeness, accuracy, and proper supporting detail before coding.",
      },
      {
        title: "Coding & GL assignment",
        description:
          "Apply consistent account, department, and class coding based on your chart of accounts and approval policies.",
      },
      {
        title: "Approval workflow support",
        description:
          "Route invoices through your approval hierarchy, track status, and follow up on items pending review or sign-off.",
      },
      {
        title: "Vendor master maintenance",
        description:
          "Support new vendor setup, W-9 collection, banking details, and updates to existing vendor records.",
      },
      {
        title: "Payment tracking & reporting",
        description:
          "Monitor scheduled payments, aging, and open balances with clear reporting for your accounting and operations teams.",
      },
      {
        title: "Month-end AP support",
        description:
          "Assist with accruals, cut-off review, and documentation needed for an accurate and timely close.",
      },
    ],
    outcomes: [
      "Fewer manual touchpoints on routine invoice processing",
      "More consistent coding and documentation across vendors",
      "Better visibility into open payables and approval bottlenecks",
      "Stronger support for month-end close and audit readiness",
    ],
  },
  {
    slug: "bank-reconciliation",
    index: "02",
    shortTitle: "Bank Reconciliation",
    title: "Bank Reconciliation Support",
    icon: "reconciliation",
    description:
      "Disciplined reconciliation workflows designed for timely and accurate close support.",
    summary:
      "Reliable reconciliations are the foundation of accurate books. Atlas applies structured workflows to reconcile bank, credit card, and merchant accounts — researching differences, documenting resolutions, and keeping your cash positions clear.",
    overview:
      "We reconcile accounts on your schedule — daily, weekly, or monthly — with clear paper trails for every adjustment. Our team identifies timing differences, missing transactions, and duplicate entries so your GL and subledgers stay aligned with actual cash activity.",
    capabilities: [
      {
        title: "Bank & credit card reconciliations",
        description:
          "Match transactions between bank feeds, credit card statements, and your accounting system with disciplined review.",
      },
      {
        title: "Uncleared item research",
        description:
          "Investigate outstanding checks, deposits in transit, and unreconciled items until each difference is resolved or properly documented.",
      },
      {
        title: "Multi-entity reconciliations",
        description:
          "Support organizations with multiple bank accounts, locations, or legal entities while maintaining consistent standards.",
      },
      {
        title: "Reconciliation documentation",
        description:
          "Prepare clear reconciliation workpapers and supporting notes for internal review, management, and external auditors.",
      },
      {
        title: "Integration with AP & AR",
        description:
          "Coordinate with payables and receivables workflows so cash activity ties cleanly to operational transactions.",
      },
      {
        title: "Exception reporting",
        description:
          "Flag unusual activity, stale items, and recurring discrepancies so your team can act before close deadlines.",
      },
    ],
    outcomes: [
      "Cash balances that tie reliably to the general ledger",
      "Faster resolution of outstanding reconciliation items",
      "Cleaner audit support with organized workpapers",
      "More predictable month-end and year-end close timing",
    ],
  },
  {
    slug: "general-ledger-close",
    index: "03",
    shortTitle: "General Ledger & Close",
    title: "General Ledger & Close Support",
    icon: "ledger",
    description:
      "GL accounting, journal support, month-end processes, and financial reporting.",
    summary:
      "From recurring journal entries to month-end close checklists, Atlas helps your accounting function stay organized, accurate, and ready for reporting — without adding unnecessary overhead to your in-house team.",
    overview:
      "Our GL support is built around your close calendar and reporting requirements. We assist with journal preparation, account analysis, reconciliations, and financial statement support so leadership receives dependable numbers on time.",
    capabilities: [
      {
        title: "Journal entry support",
        description:
          "Prepare, review, and post recurring and ad hoc journal entries with appropriate supporting documentation.",
      },
      {
        title: "Month-end close execution",
        description:
          "Follow your close checklist, complete assigned tasks, and coordinate with other accounting workflows through sign-off.",
      },
      {
        title: "Account analysis & flux review",
        description:
          "Review balance changes period over period and document explanations for significant variances.",
      },
      {
        title: "Financial reporting support",
        description:
          "Assist with trial balance preparation, balance sheet and income statement schedules, and management reporting packs.",
      },
      {
        title: "Fixed asset & prepaid schedules",
        description:
          "Maintain depreciation, amortization, and prepaid schedules tied to the general ledger.",
      },
      {
        title: "Intercompany & consolidation prep",
        description:
          "Support eliminations, due-to/due-from entries, and consolidation workpapers for multi-entity groups.",
      },
    ],
    outcomes: [
      "A more structured and repeatable close process",
      "Reduced backlog on journals, schedules, and account reviews",
      "Financial statements supported by organized GL documentation",
      "Greater capacity for your team to focus on analysis and controls",
    ],
  },
] as const;

export type CoreServiceSlug = (typeof coreServicesData)[number]["slug"];

export function getCoreService(slug: string) {
  return coreServicesData.find((service) => service.slug === slug);
}

export function getAllCoreServiceSlugs() {
  return coreServicesData.map((service) => service.slug);
}

export const coreServicesSection = {
  eyebrow: "Core services",
  title: "Accounting Work",
  titleAccent: "Atlas Performs",
  description:
    "Concise support for the workflows that keep your books accurate, your close on time, and your team focused.",
  items: coreServicesData.map(({ index, title, description, slug }) => ({
    index,
    title,
    description,
    href: `/services/${slug}`,
  })),
} as const;
