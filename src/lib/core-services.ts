export type CoreServiceIcon =
  | "bookkeeping"
  | "payable"
  | "reporting"
  | "specialized"
  | "payroll"
  | "customer-service"
  | "it-support"
  | "cybersecurity"
  | "bpo"
  | "automation";

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
    slug: "accounting-bookkeeping",
    index: "01",
    shortTitle: "Accounting & Bookkeeping",
    title: "Accounting & Bookkeeping Support",
    icon: "bookkeeping",
    description:
      "Day-to-day accounting and bookkeeping within your systems, controls, and close calendar.",
    summary:
      "Atlas provides reliable day-to-day accounting and bookkeeping support — helping your team maintain accurate records, organized financial data, and a more efficient close process.",
    overview:
      "Our accounting professionals work within your systems, procedures, and established controls. From general ledger maintenance and journal entries to reconciliations and month-end support, we help your internal team stay accurate, organized, and on schedule.",
    capabilities: [
      {
        title: "General ledger maintenance",
        description:
          "Keep your chart of accounts, balances, and supporting schedules organized and current.",
      },
      {
        title: "Journal entries & adjustments",
        description:
          "Prepare and post recurring and ad hoc entries with appropriate documentation and review support.",
      },
      {
        title: "Account reconciliations",
        description:
          "Support balance sheet and subledger reconciliations aligned to your close standards.",
      },
      {
        title: "Month-end close support",
        description:
          "Execute assigned close tasks, follow checklists, and help your team finish on schedule.",
      },
      {
        title: "Financial record organization",
        description:
          "Maintain clean transaction history, supporting files, and audit-ready documentation.",
      },
    ],
    outcomes: [
      "More accurate and organized financial records",
      "A smoother, more predictable close process",
      "Less manual burden on your internal accounting team",
      "Support that follows your systems and controls",
    ],
  },
  {
    slug: "accounts-payable-receivable",
    index: "02",
    shortTitle: "AP & AR Support",
    title: "Accounts Payable & Receivable Support",
    icon: "payable",
    description:
      "Invoice processing, billing support, payment readiness, and reconciliations within your workflows.",
    summary:
      "Atlas supports your AP and AR workflows — from invoice processing and coding to payment readiness, billing support, and account reconciliation.",
    overview:
      "Our specialists work within your existing approval processes and accounting systems to keep transactions moving accurately and efficiently. We help reduce manual workload while maintaining documentation, consistency, and appropriate client controls.",
    capabilities: [
      {
        title: "Invoice processing & coding",
        description:
          "Review, code, and route vendor invoices according to your chart of accounts and policies.",
      },
      {
        title: "Payment readiness support",
        description:
          "Prepare payables for approval and payment while tracking open balances and aging.",
      },
      {
        title: "Billing & receivables support",
        description:
          "Assist with customer invoicing, cash application, and receivable account maintenance.",
      },
      {
        title: "AP & AR reconciliations",
        description:
          "Reconcile subledgers to the general ledger and resolve outstanding items.",
      },
      {
        title: "Documentation & controls",
        description:
          "Maintain consistent supporting records aligned with your approval and audit requirements.",
      },
    ],
    outcomes: [
      "Faster, more consistent AP and AR processing",
      "Better documentation across payables and receivables",
      "Reduced manual workload for your accounting team",
      "Workflows that respect your existing controls",
    ],
  },
  {
    slug: "financial-reporting",
    index: "03",
    shortTitle: "Financial Reporting",
    title: "Financial Reporting Support",
    icon: "reporting",
    description:
      "Timely financial statements, management reports, and month-end reporting packages.",
    summary:
      "Atlas helps turn accurate accounting data into timely, organized financial reporting that supports better business decisions.",
    overview:
      "We assist with financial statement preparation, management reports, budget-to-actual analysis, reconciliations, and month-end reporting packages. Your organization retains oversight and approval while Atlas provides the back-office support needed to keep reporting on schedule.",
    capabilities: [
      {
        title: "Financial statement preparation",
        description:
          "Support balance sheet, income statement, and cash flow schedules tied to the general ledger.",
      },
      {
        title: "Management reporting",
        description:
          "Prepare recurring packs, KPI summaries, and leadership-ready reporting formats.",
      },
      {
        title: "Budget-to-actual analysis",
        description:
          "Compare actual results to budget and document meaningful variances.",
      },
      {
        title: "Month-end reporting packages",
        description:
          "Assemble reporting binders, schedules, and supporting workpapers for review.",
      },
      {
        title: "Reconciliation support",
        description:
          "Help ensure reporting outputs tie cleanly to reconciled account balances.",
      },
    ],
    outcomes: [
      "Reporting delivered on schedule with organized support",
      "Clearer visibility into financial performance",
      "More capacity for review and decision-making",
      "Your team retains oversight and final approval",
    ],
  },
  {
    slug: "specialized-accounting",
    index: "04",
    shortTitle: "Specialized Accounting",
    title: "Specialized Accounting Support",
    icon: "specialized",
    description:
      "Flexible accounting support tailored to your industry, systems, and reporting requirements.",
    summary:
      "Atlas provides flexible accounting support tailored to the systems, workflows, and reporting requirements of your organization and industry.",
    overview:
      "Whether supporting property management organizations, associations, hospitality businesses, or other industries, our teams adapt to your established processes. Atlas operates as an extension of your accounting department—not as a replacement for your management or client relationships.",
    capabilities: [
      {
        title: "Industry-specific workflows",
        description:
          "Support accounting processes shaped by property management, HOA, hospitality, and other sectors.",
      },
      {
        title: "System-aligned execution",
        description:
          "Work inside your existing software, templates, and reporting structures.",
      },
      {
        title: "Process adaptation",
        description:
          "Follow your established procedures rather than forcing a one-size-fits-all model.",
      },
      {
        title: "Reporting customization",
        description:
          "Help produce the schedules, owner reports, and operational packages your organization requires.",
      },
      {
        title: "Extension-of-team support",
        description:
          "Augment your department while your leadership retains client and management relationships.",
      },
    ],
    outcomes: [
      "Accounting support that fits your industry context",
      "Less disruption to existing systems and relationships",
      "Scalable back-office capacity without replacing your team",
      "Processes built around how your organization already works",
    ],
  },
  {
    slug: "payroll-administration",
    index: "05",
    shortTitle: "Payroll & Admin",
    title: "Payroll & Financial Administration",
    icon: "payroll",
    description:
      "Administrative support for payroll, employee records, tax forms, and recurring financial tasks.",
    summary:
      "Atlas supports the administrative work behind payroll and financial operations — helping your internal team stay organized, accurate, and focused on higher-value responsibilities.",
    overview:
      "Services can include payroll processing support, employee data administration, financial recordkeeping, 1099/W-2 support, documentation, reconciliations, and other recurring financial administrative functions based on your organization's needs.",
    capabilities: [
      {
        title: "Payroll processing support",
        description:
          "Assist with payroll inputs, review, documentation, and post-payroll accounting tasks.",
      },
      {
        title: "Employee data administration",
        description:
          "Maintain employee records, changes, and supporting payroll documentation.",
      },
      {
        title: "1099 & W-2 support",
        description:
          "Help prepare year-end tax form workflows, reconciliations, and filing support materials.",
      },
      {
        title: "Financial recordkeeping",
        description:
          "Keep payroll-related transactions, schedules, and supporting files organized.",
      },
      {
        title: "Recurring admin functions",
        description:
          "Handle repeatable financial administration based on your operating calendar.",
      },
    ],
    outcomes: [
      "More organized payroll and financial administration",
      "Reduced administrative burden on internal staff",
      "Better documentation for payroll and tax workflows",
      "Flexible support scaled to your needs",
    ],
  },
  {
    slug: "customer-service",
    index: "06",
    shortTitle: "Customer Service",
    title: "Customer Service Support",
    icon: "customer-service",
    description:
      "Phone, email, chat, and ticket support aligned with your brand, processes, and standards.",
    summary:
      "Atlas extends your customer service capabilities with trained support professionals who operate under your company's processes, standards, and brand.",
    overview:
      "Our teams can assist with phone, email, chat, ticket management, routine inquiries, scheduling, follow-up, and administrative requests. Your organization maintains ownership of customer relationships while Atlas provides scalable support behind the scenes.",
    capabilities: [
      {
        title: "Phone, email & chat support",
        description:
          "Handle routine customer inquiries through the channels your organization uses.",
      },
      {
        title: "Ticket & queue management",
        description:
          "Track, prioritize, and follow up on customer requests within your systems.",
      },
      {
        title: "Scheduling & follow-up",
        description:
          "Support appointment coordination, reminders, and status updates.",
      },
      {
        title: "Administrative request handling",
        description:
          "Assist with forms, documentation, and recurring customer-facing tasks.",
      },
      {
        title: "Brand-aligned execution",
        description:
          "Follow your scripts, tone, and service standards while you retain relationship ownership.",
      },
    ],
    outcomes: [
      "Scalable customer support without losing brand control",
      "Faster response to routine inquiries and requests",
      "More time for your team to focus on complex customer needs",
      "Consistent service delivery under your processes",
    ],
  },
  {
    slug: "it-support",
    index: "07",
    shortTitle: "IT Support",
    title: "IT Support Services",
    icon: "it-support",
    description:
      "Help desk, Microsoft 365, onboarding, troubleshooting, and cloud support for your workforce.",
    summary:
      "Atlas provides responsive IT support designed to keep your workforce connected, productive, and supported across today's cloud-based business environment.",
    overview:
      "Our services can include help desk support, Microsoft 365 administration, user onboarding and offboarding, account management, software troubleshooting, cloud and virtual-desktop support, and day-to-day technical assistance—all aligned with your organization's technology policies.",
    capabilities: [
      {
        title: "Help desk support",
        description:
          "Respond to user issues, requests, and incident triage through your support channels.",
      },
      {
        title: "Microsoft 365 administration",
        description:
          "Support licensing, mailboxes, permissions, and routine tenant administration tasks.",
      },
      {
        title: "User onboarding & offboarding",
        description:
          "Provision and deprovision accounts according to your security and HR procedures.",
      },
      {
        title: "Software troubleshooting",
        description:
          "Resolve common application, access, and connectivity issues for end users.",
      },
      {
        title: "Cloud & virtual-desktop support",
        description:
          "Assist with remote access, cloud tools, and day-to-day technical operations.",
      },
    ],
    outcomes: [
      "A more supported and productive workforce",
      "Faster resolution of routine IT issues",
      "Consistent user lifecycle management",
      "Support aligned with your technology policies",
    ],
  },
  {
    slug: "cybersecurity",
    index: "08",
    shortTitle: "Cybersecurity",
    title: "Cybersecurity Support",
    icon: "cybersecurity",
    description:
      "Practical security support for identity, access, endpoints, monitoring, and email protection.",
    summary:
      "Atlas helps organizations strengthen their security posture through practical cybersecurity support focused on protecting users, systems, access, and business data.",
    overview:
      "We support identity and access management, multi-factor authentication, endpoint protection, security monitoring, email security, secure remote access, user provisioning, and cybersecurity administration based on the client's established security framework and requirements.",
    capabilities: [
      {
        title: "Identity & access management",
        description:
          "Support user provisioning, permissions, and access reviews within your framework.",
      },
      {
        title: "Multi-factor authentication",
        description:
          "Assist with MFA rollout, enrollment, and ongoing user support.",
      },
      {
        title: "Endpoint & email security",
        description:
          "Help maintain protection tools, policies, and monitoring for devices and mail.",
      },
      {
        title: "Security monitoring support",
        description:
          "Track alerts, document incidents, and support routine security operations tasks.",
      },
      {
        title: "Secure remote access",
        description:
          "Support VPN, remote work, and access controls aligned to your policies.",
      },
    ],
    outcomes: [
      "Stronger day-to-day security operations support",
      "Better protection for users, systems, and data",
      "More consistent access and identity management",
      "Security work aligned to your existing framework",
    ],
  },
  {
    slug: "business-process-outsourcing",
    index: "09",
    shortTitle: "BPO",
    title: "Business Process Outsourcing (BPO)",
    icon: "bpo",
    description:
      "Scalable back-office support for data entry, documents, workflows, and recurring processes.",
    summary:
      "Atlas provides scalable back-office support that helps organizations reduce repetitive workloads while maintaining control over their core operations and client relationships.",
    overview:
      "Our teams can support data entry, document management, administrative processing, workflow coordination, reporting, record maintenance, and other recurring business processes. We build our services around your procedures rather than forcing your organization into ours.",
    capabilities: [
      {
        title: "Data entry & record maintenance",
        description:
          "Handle structured data capture and ongoing record updates with consistency.",
      },
      {
        title: "Document management",
        description:
          "Organize, index, and process documents according to your filing standards.",
      },
      {
        title: "Administrative processing",
        description:
          "Support recurring back-office tasks that consume internal team time.",
      },
      {
        title: "Workflow coordination",
        description:
          "Move tasks through your defined steps, handoffs, and approval paths.",
      },
      {
        title: "Reporting & process support",
        description:
          "Assist with status tracking, operational reports, and routine process follow-through.",
      },
    ],
    outcomes: [
      "Less repetitive work for your internal teams",
      "Scalable back-office capacity on demand",
      "Processes executed under your control and standards",
      "Support built around your procedures, not ours",
    ],
  },
  {
    slug: "ai-automation",
    index: "10",
    shortTitle: "AI & Automation",
    title: "AI & Business Automation",
    icon: "automation",
    description:
      "Automation, AI-assisted processing, integrations, and digital workflows to reduce manual work.",
    summary:
      "Atlas combines technology, automation, and AI to help organizations reduce manual work, improve consistency, and operate more efficiently.",
    overview:
      "We identify repetitive workflows that can be streamlined through automation, AI-assisted processing, system integrations, reporting tools, and digital workflows. Our objective is practical: help your existing team accomplish more while maintaining appropriate human review and organizational controls.",
    capabilities: [
      {
        title: "Workflow automation",
        description:
          "Streamline repetitive tasks with rules-based and digital process improvements.",
      },
      {
        title: "AI-assisted processing",
        description:
          "Apply practical AI support to document handling, classification, and review tasks.",
      },
      {
        title: "System integrations",
        description:
          "Connect tools and data flows so information moves with fewer manual steps.",
      },
      {
        title: "Reporting & digital workflows",
        description:
          "Improve recurring reporting and operational workflows with better tooling.",
      },
      {
        title: "Human-in-the-loop controls",
        description:
          "Keep appropriate review, approval, and oversight in place as automation expands.",
      },
    ],
    outcomes: [
      "Less manual work across repetitive workflows",
      "More consistent processing and reporting",
      "Greater output from your existing team",
      "Automation with controls that fit your organization",
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
  eyebrow: "Services",
  title: "Support",
  titleAccent: "Atlas Provides",
  description:
    "From accounting and reporting to IT, cybersecurity, customer service, and automation — scalable back-office support built around your processes.",
  items: coreServicesData.map(({ index, title, description, slug }) => ({
    index,
    title,
    description,
    href: `/services/${slug}`,
  })),
} as const;
