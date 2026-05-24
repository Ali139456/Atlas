export const site = {
  brand: "Atlas Global Finance",
  logo: "/atlas-logo.png",
  email: "hello@atlasglobalfinance.com",
  tagline: "Finance and Accounting Outsourcing",
  phone: "+1 (646) 367-8976",
  addressLine1: "244 Fifth Avenue, Suite P228, New York, NY 10001",
  addressLine2: "Remote delivery US, Canada, UK & Australia",
} as const;

/** Hash links that must include `/` so they work from any page. */
export const homeAnchors = {
  contact: "/#contact",
  services: "/#services",
  features: "/#features",
  whyUs: "/#why-us",
  industries: "/#industries",
  roles: "/#roles",
} as const;

export const hero = {
  title: "The Smart New Way to Grow!",
  titleLines: [
    [
      { text: "The " },
      { text: "Smart", accent: true },
      { text: " " },
      { text: "New", accent: true },
      { text: " Way" },
    ],
    [
      { text: "to " },
      { text: "Grow!", accent: true },
    ],
  ],
  subtitle: "Finance and Accounting Outsourcing",
  primaryCta: "Learn more",
  primaryCtaHref: "/#features",
} as const;

export const whyChooseUs = {
  eyebrow: "Why choose us",
  title: "Why",
  titleAccent: "Choose Us",
  sideImage: "/images/mission-team.png",
  sideImageAlt: "Professional team collaborating on finance and accounting strategy",
  items: [
    { title: "Savings between 40%–60%", icon: "expert" },
    { title: "Flexible staffing levels", icon: "network" },
    { title: "Better financial control", icon: "process" },
    { title: "Access to the latest technology", icon: "focus" },
    { title: "Focus more on critical business activities", icon: "focus" },
  ],
} as const;

export const features = {
  eyebrow: "Benefits",
  title: "Benefits of Outsourcing",
  titleAccent: "Accounting",
  sideImage: "/images/services-visual.png",
  sideImageAlt: "Finance analytics and accounting dashboards in a modern workspace",
  items: [
    {
      title: "High Cost Savings",
      description: "Realize cost reductions of 40%-60%.",
      icon: "expert",
    },
    {
      title: "Grow without Overheads",
      description: "Scale up and down based on your needs.",
      icon: "process",
    },
    {
      title: "Focus on Core Business",
      description: "Focus on running the business instead of managing books.",
      icon: "focus",
    },
    {
      title: "Flexible Staffing",
      description: "Use us as full-time, part-time or on an as-needed basis.",
      icon: "network",
    },
    {
      title: "Specialized Expertise",
      description: "Access to best practices derived from 300+ businesses.",
      icon: "expert",
    },
  ],
} as const;

export const industriesServed = {
  eyebrow: "Industries",
  title: "Other Industries",
  titleAccent: "Served",
  description:
    "Accounting and finance outsourcing for construction, logistics, retail, CPA firms, restaurants, amusement businesses, and more.",
  items: [
    {
      title: "Construction",
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    },
    {
      title: "Logistic & Transportation",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
    },
    {
      title: "Retail",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    },
    {
      title: "CPA Firms",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    },
    {
      title: "Restaurant Business",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    },
    {
      title: "Amusement Business",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    },
  ],
} as const;

export const popularRoles = {
  eyebrow: "Talent",
  title: "Popular",
  titleAccent: "Roles",
  description:
    "Dedicated finance professionals placed in your workflows, from AP/AR through property accounting and bookkeeping.",
  items: [
    {
      title: "Accounts Payable Specialist",
      description:
        "Accounts Payable Specialist can perform activities such as 2 Way/3 Way matching of invoices with POs and GRs/Packing Slips, entry of invoices and utilities, coding of expenses, entering checks for further approval, tracking payables, vendor reconciliations and other miscellaneous accounts payable activities.",
    },
    {
      title: "Accounts Receivable Specialist",
      description:
        "Accounts Receivable Specialist typically can perform activities such as invoicing, running rents (for real estate cos.), tenant/customer set-up and accounting, late fee processing, rent receipting/cash application services, tracking receivables, email and call based collection support, and miscellaneous accounts receivable tasks.",
    },
    {
      title: "Property Accountant",
      description:
        "Property Accountant can provide the following accounting services: general ledger accounting, payroll, bank reconciliations, inter-company accounting, monthly closing of books including finalization and simple monthly reporting with variance analysis.",
    },
    {
      title: "Sr. Property Accountant",
      description:
        "Sr. Property Accountant can provide the following accounting services: general ledger accounting, cash flow projections and management, inter-company accounting, prepare budgets, analyze expense variances, review balance sheets, prepare monthly financials including detailed monthly reporting and assist Controller in month/year end activities.",
    },
    {
      title: "Financial Analyst",
      description:
        "Financial Analyst is a specialist profile used for financial modeling, business plan formulation, business research and financial analysis assignments. They are responsible for preparation of project reports, financial modeling, management reporting, analysis of financial statements, simple valuations and other custom tasks.",
    },
    {
      title: "Bookkeeper",
      description:
        "Bookkeeper can perform day-to-day accounting activities such as recording transactions, categorizing expenses, processing invoices and receipts, bank and credit card reconciliations, maintaining general ledgers, and preparing basic financial reports to support monthly close and management review.",
    },
  ],
} as const;

export const contactForm = {
  eyebrow: "Contact us",
  title: "Get In",
  titleAccent: "Touch",
  lead: "Contact us for a customized no-obligation proposal for outsourcing your accounting activities.",
  industries: [
    "Fully Integrated Real Estate",
    "Real Estate Developer",
    "Property Management",
    "Real Estate Funds/REIT",
    "Real Estate Investor/Syndicate",
    "Real Estate Brokerage",
    "Other",
  ],
  inquiryTypes: [
    "Year-End Close & Audit Support",
    "Property Accounting",
    "Fund Accounting",
    "Portfolio Reporting",
    "Construction/Draws",
    "Back-Office Outsourcing",
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
  "40-60% savings vs in-house",
  "FTE or hourly models",
  "Free consultation call",
] as const;

export const paymentMethods = [
  { name: "Credit & debit cards", detail: "Visa, Mastercard, Amex" },
  { name: "ACH bank transfer", detail: "US business checking" },
  { name: "Wire transfer", detail: "For annual engagements" },
  { name: "Invoicing", detail: "Net-15 for approved accounts" },
] as const;
