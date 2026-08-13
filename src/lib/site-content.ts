import { industries } from "./industries";
import { coreServicesSection } from "./core-services";

export const site = {
  brand: "Atlas Global Finance",
  logo: "/atlas-logo.png",
  email: "Support@atlasglobalfinances.com",
  tagline: "Technology-Driven Accounting Operations",
  phone: "+1 (407) 968-5277",
  phoneAlt: "+1 (407) 535-9192",
  phones: ["+1 (407) 968-5277", "+1 (407) 535-9192"] as const,
  addressLine1: "1683 N Hancock Rd, Suite 103, Minneola, FL 34715, USA",
} as const;

/** Hash links that must include `/` so they work from any page. */
export const homeAnchors = {
  contact: "/#contact",
  services: "/#services",
  value: "/#value",
  whyUs: "/#why-us",
  technology: "/#technology",
  industries: "/#industries",
  security: "/#security",
  howItWorks: "/#how-it-works",
  /** @deprecated use value — kept for older links */
  features: "/#value",
  roles: "/#why-us",
  reviews: "/#contact",
} as const;

/** Shared conversion CTA across the site */
export const siteCta = {
  label: "Inquire Now",
  href: "/#contact",
} as const;

export const hero = {
  title: "Smarter Accounting. Greater Efficiency. Lower Cost.",
  titleLines: [
    [
      { text: "Smarter Accounting." },
      { text: "Greater Efficiency." },
    ],
    [{ text: "Lower Cost.", accent: true }],
  ],
  subtitle:
    "Atlas combines experienced accounting professionals, global talent, technology, automation, and AI-assisted workflows to help businesses build more efficient and scalable financial operations.",
  positioning:
    "Modern accounting operations partner — not a generic offshore staffing company.",
  primaryCta: siteCta.label,
  primaryCtaHref: siteCta.href,
  secondaryCta: "Explore Our Services",
  secondaryCtaHref: "/#services",
  dashboard: {
    title: "Finance Operations",
    balanceLabel: "Efficiency Index",
    balanceValue: "↑",
    incomeLabel: "Operating model",
    incomeValue: "People · Process · Tech",
    growthLabel: "Result",
    growthValue: "Capacity",
    growthHint: "More capacity. Lower overhead.",
    pillars: [
      { label: "People", value: "Experienced accounting talent", icon: "people" as const },
      { label: "Process", value: "Standardized + optimized workflows", icon: "process" as const },
      { label: "Technology", value: "Automation + AI-assisted tools", icon: "technology" as const },
    ],
  },
} as const;

export const valueProposition = {
  eyebrow: "Value proposition",
  title: "Built for a More Efficient",
  titleAccent: "Accounting Operation",
  description:
    "Better efficiency creates better value. Atlas combines accounting expertise with technology, automation, AI-assisted workflows, optimized processes, and global resources to reduce unnecessary manual work and increase productivity.",
  flow: [
    {
      title: "People",
      description: "Experienced accounting professionals",
      icon: "people" as const,
    },
    {
      title: "Process",
      description: "Standardized + optimized workflows",
      icon: "process" as const,
    },
    {
      title: "Technology",
      description: "Automation + AI-assisted tools",
      icon: "technology" as const,
    },
    {
      title: "Efficiency",
      description: "Higher productivity + capacity",
      icon: "efficiency" as const,
    },
    {
      title: "Client Savings",
      description: "Lower operating cost",
      icon: "savings" as const,
    },
  ],
} as const;

export const coreServices = coreServicesSection;

export const whyChooseUs = {
  eyebrow: "Why Atlas",
  title: "Why Companies Choose",
  titleAccent: "Atlas",
  subtitle:
    "Accounting Experience. Technology Driven. Built for Efficiency.",
  intro: [
    "Atlas Global Finance was founded by experienced accounting professionals who understand the financial and operational challenges businesses face firsthand. Our leadership brings hands-on experience across HOA and property management, restaurant operations, and business accounting.",
  ],
  emphasis: "But experience alone is not enough.",
  efficiencyLead:
    "At Atlas, efficiency is at the core of how we operate. We embrace technology, automation, and AI to streamline accounting processes, reduce repetitive manual work, improve consistency, and help our team accomplish more with fewer resources.",
  items: [
    {
      index: "01",
      title: "Technology & AI-Driven Efficiency",
      description:
        "We continuously look for opportunities to use modern technology, automation, and AI-assisted workflows to make accounting processes faster, smarter, and more efficient — while maintaining appropriate human oversight and financial controls.",
    },
    {
      index: "02",
      title: "Efficiency That Creates Client Savings",
      description:
        "Our goal is simple: operate more efficiently so our clients can save more. By combining skilled accounting professionals, optimized workflows, global resources, and technology, Atlas helps clients expand their accounting capacity without proportionally increasing their overhead.",
    },
    {
      index: "03",
      title: "Experienced Accounting Leadership",
      description:
        "Atlas is led by professionals with real-world accounting and operational experience. We understand reconciliations, accounts payable, general ledger accounting, financial reporting, budgeting, month-end close, and the day-to-day demands placed on accounting departments.",
    },
    {
      index: "04",
      title: "Smarter, Scalable Accounting Support",
      description:
        "As our clients grow, Atlas can scale with them. Our technology-enabled operating model is designed to handle increasing workloads efficiently while maintaining consistency, accountability, and quality.",
    },
    {
      index: "05",
      title: "An Extension of Your Accounting Team",
      description:
        "We don't want to operate like a disconnected outsourcing provider. Atlas is designed to become an extension of your accounting department — working within your systems, processes, controls, and expectations.",
    },
  ],
  mission: {
    title: "Our Mission",
    description:
      "To combine accounting expertise, global talent, technology, automation, and AI to create more efficient financial operations — helping our clients reduce costs, strengthen their accounting functions, and focus more resources on growing their businesses.",
  },
} as const;

export const technologySection = {
  eyebrow: "Technology + AI + Control",
  title: "Accounting Built for the",
  titleAccent: "Modern Business",
  brandPillar:
    "Technology should be a central Atlas brand pillar.",
  description:
    "Atlas continuously evaluates technology, automation, AI-assisted tools, and workflow improvements that help accounting professionals work more efficiently while maintaining appropriate controls, security, and human oversight.",
  preferredLanguageLabel: "Preferred language",
  preferredLanguage: [
    "Technology-enabled accounting",
    "AI-assisted workflows",
    "Intelligent automation",
    "Automation-supported processes",
    "Technology-driven efficiency",
  ],
  control: {
    eyebrow: "Technology without sacrificing control",
    headline: "Efficiency should never come at the expense of financial control.",
    description:
      "Design workflows around defined responsibilities, appropriate review, secure technology, documented processes, accountability, and professional oversight.",
    pillars: ["Security", "Controls", "Accountability", "Human Oversight"],
  },
  guardrails: {
    title: "AI Positioning Guardrails",
    use: [
      "AI-assisted workflows",
      "Technology-driven efficiency",
      "Automation-supported processes",
      "Human oversight + professional judgment",
    ],
    avoid: [
      "Fully AI-powered accounting",
      "Autonomous accounting",
      "AI replaces accountants",
      "Unverifiable technology claims",
    ],
  },
} as const;

/** @deprecated merged into technologySection — kept for anchor compatibility */
export const securitySection = {
  eyebrow: technologySection.eyebrow,
  title: "Technology Without",
  titleAccent: "Sacrificing Control",
  description: technologySection.control.description,
  pillars: technologySection.control.pillars,
} as const;

export const industriesServed = {
  eyebrow: "Industries",
  title: "Industries Atlas",
  titleAccent: "Actually Knows",
  description:
    "We lead with the industries supported by real founder and team experience — then scale accounting capacity where those workflows demand it.",
  items: [
    {
      index: "01",
      slug: "hoa-property-management",
      title: "HOA & Property Management",
      description:
        "Community association and management-company accounting workflows — assessments, reserves, vendor payables, and board-ready reporting.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=640&q=60",
    },
    {
      index: "02",
      slug: "restaurant-business",
      title: "Restaurants & Hospitality",
      description:
        "Practical restaurant accounting and operational experience for food cost, daily closes, labor, and multi-unit reporting.",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=640&q=60",
    },
    {
      index: "03",
      slug: "cpa-firms",
      title: "Professional & Business Services",
      description:
        "Scalable accounting support for growing service organizations that need capacity without rebuilding the back office.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=640&q=60",
    },
  ],
  moreLabel: "Additional industries we support",
  moreItems: industries
    .filter(
      (item) =>
        !["hoa-property-management", "restaurant-business", "cpa-firms"].includes(
          item.slug,
        ),
    )
    .map(({ slug, title }) => ({ slug, title })),
} as const;

export const howItWorks = {
  eyebrow: "How Atlas works",
  title: "From Understanding to",
  titleAccent: "Scale",
  description:
    "A simple operating model that fits your systems first — then improves efficiency over time.",
  steps: [
    {
      index: "01",
      title: "Understand",
      description:
        "Learn systems, workflows, responsibilities, deadlines and expectations.",
    },
    {
      index: "02",
      title: "Integrate",
      description:
        "Fit Atlas professionals into defined client processes and controls.",
    },
    {
      index: "03",
      title: "Optimize",
      description:
        "Improve standardization, workflow design, technology and automation.",
    },
    {
      index: "04",
      title: "Scale",
      description:
        "Expand accounting capacity efficiently as workload and client needs grow.",
    },
  ],
} as const;

export const contactForm = {
  eyebrow: "Contact us",
  title: "Schedule a",
  titleAccent: "Consultation",
  lead: "Tell us about your accounting operation and we will follow up with a customized, no-obligation conversation.",
  industries: [
    "HOA / Property Management",
    "Restaurants & Hospitality",
    "Professional & Business Services",
    "Construction",
    "Logistics",
    "Retail",
    "CPA Firms",
    "Other",
  ],
  inquiryTypes: [
    "Accounts Payable",
    "Bank Reconciliation",
    "General Ledger & Close",
    "HOA / Property Accounting",
    "Restaurant Accounting",
    "Back-Office Support",
    "Other",
  ],
  companySizes: [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1001-5000",
    "5001-10000",
    "10001+",
  ],
} as const;

export const finalCta = {
  title: "Build a More Efficient Accounting Operation",
  description:
    "We operate more efficiently so our clients can save more — with accounting expertise, global talent, technology, automation, and AI-assisted workflows.",
  buttonLabel: "Inquire Now",
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
    cta: siteCta.label,
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
    cta: siteCta.label,
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
    cta: siteCta.label,
  },
] as const;

export const pricingPerks = [
  "Technology-enabled accounting",
  "FTE or hourly models",
  "No long-term contracts",
] as const;

export const paymentMethods = [
  { name: "Credit & debit cards", detail: "Visa, Mastercard, Amex" },
  { name: "ACH bank transfer", detail: "US business checking" },
  { name: "Wire transfer", detail: "For annual engagements" },
  { name: "Invoicing", detail: "Net-15 for approved accounts" },
] as const;
