export const site = {
  brand: "Atlas Global Finance",
  logo: "/atlas-logo.png",
  email: "hello@atlasglobalfinance.com",
  tagline: "Accounting & Finance Outsourcing",
  phone: "+1 (555) 000-0000",
  address: "Remote-first · US, Canada & worldwide",
} as const;

export const navLinks = [
  { href: "/#mission", label: "About" },
  { href: "/#features", label: "Why us" },
  { href: "/#process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Hash links that must include `/` so they work from any page. */
export const homeAnchors = {
  contact: "/#contact",
  services: "/#services",
  mission: "/#mission",
  features: "/#features",
  process: "/#process",
  faq: "/#faq",
  industries: "/#industries",
  roles: "/#roles",
  standards: "/#standards",
} as const;

export const images = {
  hero: "/images/hero-banner.png",
  mission: "/images/mission-team.png",
  services: "/images/services-visual.png",
  trust: "/images/trust-team.png",
  contact: "/images/feature-focus.png",
} as const;

export const hero = {
  eyebrow: "Accounting outsourcing",
  title: "Finance &",
  titleAccent: "bookkeeping",
  titleSuffix: "done for you.",
  description:
    "Outsource accounts payable, receivable, payroll, reconciliations, and reporting on major ERP platforms with delivery built for growing businesses.",
  primaryCta: "Free consultation",
  secondaryCta: "View services",
  trustLine: "Trusted outsourcing partner for businesses from $1M–$500M in revenue",
  image: images.hero,
  imageAlt: "Accounting team managing financial reports and dashboards",
} as const;

export const marqueeItems = [
  "Accounts Payable",
  "Accounts Receivable",
  "Bookkeeping",
  "Payroll Processing",
  "Bank Reconciliations",
  "Financial Reporting",
  "Management Dashboards",
  "QuickBooks · Xero",
  "NetSuite · SAP",
  "Year-End Close",
] as const;

export const stats = [
  { value: "40", suffix: "–60%", label: "Typical cost savings vs in-house" },
  { value: "8", suffix: "+", label: "Core finance processes covered" },
  { value: "48", suffix: "h", label: "Report turnaround on Growth plans" },
  { value: "100", suffix: "%", label: "Remote delivery & secure portals" },
] as const;

export const mission = {
  eyebrow: "About Atlas",
  lead: "We provide end-to-end",
  highlight1: "accounting outsourcing",
  mid: ", from daily bookkeeping and AP/AR to",
  highlight2: "financial reporting & budgeting",
  end: ", so you scale finance without scaling overhead.",
  image: images.mission,
  imageAlt: "Finance professionals reviewing accounts and reports",
} as const;

export const industries = [
  "CPA & accounting firms",
  "Real estate",
  "Logistics",
  "Retail & eCommerce",
  "IT & professional services",
  "Healthcare",
  "Manufacturing",
  "Startups & SMBs",
] as const;

export const features = {
  eyebrow: "Why outsource",
  title: "Benefits of",
  titleAccent: "outsourced finance",
  items: [
    {
      title: "40–60% cost savings",
      description:
        "Reduce in-house headcount and overhead while maintaining accuracy. Pay for the hours and scope you actually need.",
      icon: "expert",
      image: "/images/feature-expert.png",
    },
    {
      title: "Scalable engagements",
      description:
        "Full-time, part-time, or as-needed support. Scale up for month-end, year-end, or busy seasons without long hiring cycles.",
      icon: "process",
      image: "/images/feature-process.png",
    },
    {
      title: "Dedicated team",
      description:
        "Bookkeepers and accountants who live in AP, AR, payroll, and close, not generic ticket queues or one-size automation.",
      icon: "focus",
      image: "/images/feature-focus.png",
    },
    {
      title: "Multi-ERP expertise",
      description:
        "QuickBooks Online, Xero, NetSuite, SAP, and secure cloud workflows. We work inside the tools your business already uses.",
      icon: "network",
      image: "/images/feature-network.png",
    },
  ],
} as const;

export const services = {
  eyebrow: "Our services",
  title: "Finance processes",
  titleAccent: "we run for you",
  description:
    "The same core accounting and finance workflows trusted by outsourcing firms worldwide, delivered remotely with documented processes and CPA-ready outputs.",
  image: images.services,
  imageAlt: "Outsourced accounting and bookkeeping workspace",
  items: [
    {
      title: "Accounts Payable",
      description:
        "Invoice entry, PO matching, vendor reconciliations, disbursement processing, and timely payments without late penalties.",
      icon: "payable",
    },
    {
      title: "Accounts Receivable",
      description:
        "Customer billing, cash application, aging reports, and collections support to keep cash flow predictable.",
      icon: "receivable",
    },
    {
      title: "Bookkeeping & general accounting",
      description:
        "Daily transaction recording, categorization, journal entries, and clean ledgers maintained to GAAP standards.",
      icon: "book",
    },
    {
      title: "Payroll processing",
      description:
        "Gross-to-net calculations, tax withholdings, compliance updates, and electronic filing of payroll returns.",
      icon: "payroll",
    },
    {
      title: "Bank & account reconciliations",
      description:
        "Monthly bank, credit card, and balance-sheet reconciliations with variance research and documentation.",
      icon: "reconcile",
    },
    {
      title: "Financial reporting",
      description:
        "P&L, balance sheet, cash flow, and custom management reports delivered on your close calendar.",
      icon: "chart",
    },
    {
      title: "Dashboards & budgeting",
      description:
        "KPI dashboards, variance analysis, forecasts, and budget models leadership can act on.",
      icon: "dashboard",
    },
    {
      title: "Inventory & fixed assets",
      description:
        "Inventory tracking support, travel & expense processing, and fixed-asset register maintenance.",
      icon: "folder",
    },
    {
      title: "Catch-up & year-end close",
      description:
        "Backlog cleanup, audit-ready year-end close, and controller-level review before filing season.",
      icon: "tax",
    },
    {
      title: "CFO & controller advisory",
      description:
        "Financial modeling, strategic analysis, and part-time controller oversight without a full-time hire.",
      icon: "advisory",
    },
  ],
} as const;

export const standards = {
  eyebrow: "Why Atlas",
  title: "Built like a leading",
  titleAccent: "outsourcing firm",
  description:
    "Enterprise-grade delivery, secure systems, and clear engagement models without the overhead of building an in-house finance team.",
  items: [
    {
      num: "01",
      title: "Process-driven delivery",
      body: "Documented workflows for AP, AR, payroll, reconciliations, and close with consistent quality every month.",
    },
    {
      num: "02",
      title: "Secure cloud operations",
      body: "Role-based access, encrypted portals, and industry-standard platforms to protect your financial data.",
    },
    {
      num: "03",
      title: "Transparent engagement models",
      body: "Clear scope, flat-rate tiers, and FTE or hourly options with no surprise invoices.",
    },
    {
      num: "04",
      title: "US-friendly communication",
      body: "Responsive support, scheduled reviews, and month-end status updates your team and CPA can rely on.",
    },
  ],
} as const;

export const popularRoles = {
  eyebrow: "Outsourced talent",
  title: "Popular",
  titleAccent: "roles",
  description:
    "Dedicated finance professionals placed in your workflows, from AP/AR through property accounting and lease administration.",
  items: [
    {
      title: "Accounts Payable Specialist",
      description:
        "2- and 3-way invoice matching with POs and GRs, utility and vendor bill entry, expense coding, and vendor reconciliations.",
    },
    {
      title: "Accounts Receivable Specialist",
      description:
        "Invoicing, rent runs, tenant and customer setup, late-fee processing, and collection support aligned to your PM or ERP.",
    },
    {
      title: "Property Accountant",
      description:
        "General ledger accounting, payroll support, bank reconciliations, month-end close, and reporting with variance analysis.",
    },
    {
      title: "Sr. Property Accountant",
      description:
        "Cash flow projections, budget prep, expense variance analysis, balance sheet review, and controller support.",
    },
    {
      title: "Financial Analyst",
      description:
        "Financial modeling, business plans, market research, and analysis of statements for owners and asset managers.",
    },
    {
      title: "Lease Administrator",
      description:
        "Lease abstraction, residential and commercial real estate accounting, including CAM reconciliation support.",
    },
  ],
} as const;

export const industriesServed = {
  eyebrow: "Who we serve",
  title: "Other industries",
  titleAccent: "served",
  description:
    "Outsourced accounting and finance support tailored to how your industry books, bills, and reports.",
  items: [
    {
      title: "Construction",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    },
    {
      title: "Logistics & transportation",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
    },
    {
      title: "Retail",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    },
    {
      title: "CPA firms",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    },
  ],
} as const;

export const process = {
  eyebrow: "How it works",
  title: "Simple onboarding,",
  titleAccent: "steady execution",
  description:
    "We mirror proven outsourcing playbooks: discovery, secure handoff, then recurring delivery on your calendar.",
  steps: [
    {
      num: "01",
      title: "Discovery & scoping",
      body: "We map your ERP, chart of accounts, AP/AR volume, payroll needs, and reporting deadlines on a free call.",
    },
    {
      num: "02",
      title: "Secure transition",
      body: "Portal setup, access controls, process documentation, and a reconciled opening baseline.",
    },
    {
      num: "03",
      title: "Ongoing outsourcing",
      body: "Daily/weekly processing plus month-end close, reports, and advisory touchpoints on rhythm.",
    },
  ],
} as const;

export const pricingPlans = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    billing: "Monthly · part-time support",
    description: "Bookkeeping & reconciliations for smaller volumes.",
    features: [
      "Bookkeeping & categorization",
      "Bank reconciliations",
      "P&L & balance sheet",
      "Email support",
      "Secure client portal",
    ],
    highlighted: false,
    cta: "Get started now",
  },
  {
    name: "Growth",
    price: "$899",
    period: "/month",
    billing: "Monthly · dedicated bookkeeper",
    description: "AP/AR, payroll support, and management reporting.",
    features: [
      "Everything in Starter",
      "Accounts payable & receivable",
      "Payroll processing support",
      "Cash flow & dashboards",
      "48h report turnaround",
      "Priority support",
    ],
    highlighted: true,
    cta: "Get started now",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    billing: "FTE / multi-entity engagements",
    description: "Controller services, catch-up, and multi-ERP teams.",
    features: [
      "Catch-up & year-end close",
      "Financial modeling & budgeting",
      "CFO / controller hours",
      "NetSuite · SAP · multi-entity",
      "Inventory & fixed assets",
      "Dedicated account lead",
    ],
    highlighted: false,
    cta: "Contact sales",
  },
] as const;

export const pricingPerks = [
  "40–60% savings vs in-house",
  "FTE or hourly models",
  "Free consultation call",
] as const;

export const paymentMethods = [
  { name: "Credit & debit cards", detail: "Visa, Mastercard, Amex" },
  { name: "ACH bank transfer", detail: "US business checking" },
  { name: "Wire transfer", detail: "For annual engagements" },
  { name: "Invoicing", detail: "Net-15 for approved accounts" },
] as const;

export const faqs = [
  {
    q: "What accounting processes can you outsource?",
    a: "We handle accounts payable, accounts receivable, bookkeeping, payroll, reconciliations, financial reporting, dashboards, budgeting, inventory support, fixed assets, catch-up work, and controller-level advisory.",
  },
  {
    q: "Which software platforms do you support?",
    a: "QuickBooks Online, Xero, NetSuite, SAP, and other cloud ERPs. We work inside your existing stack with documented, secure access.",
  },
  {
    q: "Can you work with my CPA or accounting firm?",
    a: "Yes. We deliver tax-ready books, reconciliations, and schedules your CPA needs. Many of our clients are businesses and firms that white-label or supplement outsourced capacity.",
  },
  {
    q: "Do you offer full-time and part-time outsourcing?",
    a: "Absolutely. Engagements can be full-time equivalent, part-time monthly, or project-based for catch-up, year-end, or seasonal spikes.",
  },
  {
    q: "What industries do you serve?",
    a: "CPA firms, real estate, logistics, retail, IT, healthcare, manufacturing, and growth-stage businesses typically between $1M and $500M in annual revenue.",
  },
  {
    q: "How do we get started?",
    a: "Book a free consultation below. We'll review your volumes, tools, and timeline, then recommend the right plan or custom FTE model.",
  },
] as const;
