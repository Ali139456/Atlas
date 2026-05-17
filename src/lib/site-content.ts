export const site = {
  brand: "Atlas Global Finance",
  email: "hello@atlasglobalfinance.com",
  tagline: "Virtual Bookkeeping & Financial Reporting",
  phone: "+1 (555) 000-0000",
  address: "Remote-first · Serving US businesses nationwide",
} as const;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#mission", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export const images = {
  hero: "/images/hero-banner.png",
  mission: "/images/mission-team.png",
  services: "/images/services-visual.png",
  trust: "/images/trust-team.png",
  contact: "/images/feature-focus.png",
} as const;

export const hero = {
  eyebrow: "Business Goals",
  title: "Reach the next",
  titleAccent: "level of clarity.",
  description:
    "Precision virtual bookkeeping and GAAP-ready reporting — built for founders who refuse to fly blind on their numbers.",
  primaryCta: "Get started now",
  secondaryCta: "Explore services",
  trustLine: "Trusted by growth-minded businesses across the US",
  image: images.hero,
  imageAlt: "Finance team reviewing dashboards in a modern office",
} as const;

export const marqueeItems = [
  "Strategic Reporting",
  "Cash Flow Visibility",
  "GAAP Compliance",
  "Virtual Bookkeeping",
  "CFO Advisory",
  "Tax-Ready Books",
  "QuickBooks & Xero",
  "Monthly Close",
] as const;

export const stats = [
  { value: "100", suffix: "%", label: "Virtual & remote delivery" },
  { value: "48", suffix: "h", label: "Average report turnaround" },
  { value: "6", suffix: "+", label: "Core service pillars" },
  { value: "99", suffix: "%", label: "Client retention focus" },
] as const;

export const mission = {
  eyebrow: "Our Mission",
  lead: "Our experienced team provides tailored",
  highlight1: "bookkeeping support",
  mid: "and",
  highlight2: "smart reporting",
  end: "to help businesses operate with total financial confidence.",
  image: images.mission,
  imageAlt: "Professional finance team collaborating",
} as const;

export const features = {
  eyebrow: "Our Features",
  title: "Creating",
  titleAccent: "Financial Futures",
  items: [
    {
      title: "Expert Skills",
      description:
        "Dedicated specialists — not bots — who understand your industry, chart of accounts, and growth stage.",
      icon: "expert",
      image: "/images/feature-expert.png",
    },
    {
      title: "Our Process",
      description:
        "Structured onboarding, secure portal access, and a repeatable monthly close you can count on.",
      icon: "process",
      image: "/images/feature-process.png",
    },
    {
      title: "Main Focus",
      description:
        "Clean books, reconciled accounts, and reports that tell the real story behind your business.",
      icon: "focus",
      image: "/images/feature-focus.png",
    },
    {
      title: "Our Network",
      description:
        "QuickBooks Online, Xero, and secure cloud workflows that keep your data protected and accessible.",
      icon: "network",
      image: "/images/feature-network.png",
    },
  ],
} as const;

export const services = {
  eyebrow: "Professional Guidance",
  title: "Precision",
  titleAccent: "Tailored Services",
  description:
    "From monthly books to CFO-level insight — every engagement is scoped to how you actually run your business.",
  image: images.services,
  imageAlt: "Virtual bookkeeping workstation with financial dashboards",
  items: [
    {
      title: "Virtual Bookkeeping",
      description:
        "Full-service monthly bookkeeping including categorization, reconciliation, AP/AR, and payroll support.",
      icon: "book",
    },
    {
      title: "Financial Reporting",
      description:
        "P&L, balance sheets, and cash flow statements — GAAP-aligned and delivered on schedule.",
      icon: "chart",
    },
    {
      title: "Management Dashboards",
      description:
        "Real-time KPIs, cash position, and trend visibility so leadership can decide with confidence.",
      icon: "dashboard",
    },
    {
      title: "Catch-Up Bookkeeping",
      description:
        "Months or years behind? We restore order fast with documented, audit-ready records.",
      icon: "folder",
    },
    {
      title: "Tax-Ready Financials",
      description:
        "Organized, reconciled books your CPA will love — less stress, fewer surprises at filing time.",
      icon: "tax",
    },
    {
      title: "CFO Advisory",
      description:
        "Forecasting, budgeting, and strategic guidance without the full-time executive price tag.",
      icon: "advisory",
    },
  ],
} as const;

export const standards = {
  eyebrow: "Why Atlas",
  title: "The Standard",
  titleAccent: "Others Aspire To",
  items: [
    {
      num: "01",
      title: "Dedicated Financial Professionals",
      body: "Real bookkeepers who know your business — not offshore ticket queues or generic automation.",
    },
    {
      num: "02",
      title: "Secure Cloud Infrastructure",
      body: "Bank-level encryption, role-based access, and industry-leading platforms for every engagement.",
    },
    {
      num: "03",
      title: "Transparent Flat-Rate Pricing",
      body: "Clear tiers, no surprise invoices — you always know what you pay and what you get.",
    },
    {
      num: "04",
      title: "Responsive Communication",
      body: "Questions answered within 24 hours with monthly reviews and proactive updates.",
    },
  ],
} as const;

export const process = {
  eyebrow: "How it works",
  title: "Your growth journey",
  titleAccent: "starts here",
  description:
    "Simple onboarding, secure handoff, and reliable monthly execution — so you stay focused on running the business.",
  steps: [
    {
      num: "01",
      title: "Free Consultation",
      body: "We map your books, tools, and goals in a no-obligation discovery call.",
    },
    {
      num: "02",
      title: "Secure Onboarding",
      body: "Portal setup, access controls, and a clean starting baseline for your accounts.",
    },
    {
      num: "03",
      title: "Ongoing Execution",
      body: "Monthly close, reporting, and advisory touchpoints — delivered on rhythm.",
    },
  ],
} as const;

export const pricingPlans = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    billing: "Monthly billing",
    description: "For solopreneurs and early-stage businesses.",
    features: [
      "Monthly bookkeeping",
      "Bank reconciliation",
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
    billing: "Monthly billing",
    description: "For growing teams that need deeper reporting.",
    features: [
      "Everything in Starter",
      "Cash flow statements",
      "Management dashboard",
      "48h report turnaround",
      "Dedicated bookkeeper",
      "Priority support",
    ],
    highlighted: true,
    cta: "Get started now",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    billing: "Tailored engagement",
    description: "Multi-entity, catch-up, and CFO advisory.",
    features: [
      "Catch-up bookkeeping",
      "Tax-ready financials",
      "CFO advisory hours",
      "Custom integrations",
      "Multi-entity support",
      "Dedicated account lead",
    ],
    highlighted: false,
    cta: "Contact sales",
  },
] as const;

export const pricingPerks = [
  "No hidden fees",
  "Cancel anytime",
  "Free consultation call",
] as const;

export const paymentMethods = [
  { name: "Credit & debit cards", detail: "Visa, Mastercard, Amex" },
  { name: "ACH bank transfer", detail: "US business checking" },
  { name: "Wire transfer", detail: "For annual plans" },
  { name: "Invoicing", detail: "Net-15 for approved accounts" },
] as const;

export const faqs = [
  {
    q: "What services do your financial consultants provide?",
    a: "We deliver virtual bookkeeping, GAAP-aligned financial reporting, management dashboards, catch-up work, tax-ready financials, and CFO advisory — all scoped to your business size and tools.",
  },
  {
    q: "Do you offer custom financial planning?",
    a: "Yes. Growth and Enterprise plans include forecasting, budget models, and strategic reviews tailored to your revenue model and operating cadence.",
  },
  {
    q: "Which accounting platforms do you support?",
    a: "We primarily work in QuickBooks Online and Xero, with secure portal access and documented workflows for your team and CPA.",
  },
  {
    q: "How quickly can you deliver monthly reports?",
    a: "Most Growth clients receive reports within 48 hours of month-end close. Timelines are confirmed during onboarding.",
  },
  {
    q: "Can you help if my books are behind?",
    a: "Absolutely. Catch-up engagements are a core specialty — we restore order with reconciled, documented records.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation via the form below. We'll review your stack, timeline, and recommend the right plan.",
  },
] as const;
