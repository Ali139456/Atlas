export const site = {
  brand: "Atlas Global Finance",
  logo: "/atlas-logo.png",
  email: "Support@atlasglobalfinances.com",
  tagline: "Finance and Accounting Outsourcing",
  phone: "+1 (407) 968-5277",
  phoneAlt: "+1 (407) 535-9192",
  phones: ["+1 (407) 968-5277", "+1 (407) 535-9192"] as const,
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
  reviews: "/#reviews",
} as const;

/** Shared conversion CTA across the site */
export const siteCta = {
  label: "Get a Proposal",
  href: "/#contact",
} as const;

export const hero = {
  title: "Your Trusted Partner for Outsourced Accounting Solutions.",
  titleLines: [
    [
      { text: "Your " },
      { text: "Trusted" },
      { text: " " },
      { text: "Partner" },
      { text: " " },
      { text: "for" },
    ],
    [
      { text: "Outsourced", accent: true },
      { text: " " },
      { text: "Accounting", accent: true },
      { text: " " },
      { text: "Solutions." },
    ],
  ],
  subtitle:
    "Helping businesses streamline their finances with a team you can trust",
  primaryCta: siteCta.label,
  primaryCtaHref: siteCta.href,
  /** Ambient office loop — desktop only, lazy-loaded after idle */
  videoSrc: "https://videos.pexels.com/video-files/7578552/7578552-sd_640_360_30fps.mp4",
  dashboard: {
    title: "Finance Snapshot",
    balanceLabel: "Working capital",
    balanceValue: "$248,920",
    incomeLabel: "Monthly close",
    incomeValue: "Day 4",
    growthLabel: "Cost savings",
    growthValue: "48%",
    growthHint: "vs in-house staffing",
    chart: [42, 55, 48, 68, 72, 81, 94],
    chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
} as const;

export const proofStrip = {
  eyebrow: "The numbers behind our delivery",
  items: [
    { value: "19+", label: "Years specializing in finance & accounting outsourcing" },
    { value: "300+", label: "Clients across US, Canada, UK & Australia" },
    { value: "500+", label: "Accounting graduates, CPAs and MBAs on the team" },
    { value: "40–60%", label: "Typical cost savings vs building in-house" },
  ],
} as const;

export const trustMarquee = [
  "Accounts Payable",
  "Accounts Receivable",
  "Property Accounting",
  "Bookkeeping",
  "Financial Reporting",
  "Lease Abstraction",
  "CAM Reconciliation",
  "Portfolio Accounting",
  "Year-End Close",
  "Payroll Support",
] as const;

export const whyChooseUs = {
  eyebrow: "Why choose us",
  title: "Why Companies",
  titleAccent: "Choose Atlas",
  description:
    "Outsourced accounting that cuts cost, adds control, and scales with your backlog — without building a larger in-house team.",
  items: [
    {
      title: "High Cost Savings",
      description:
        "Realize typical reductions of 40%–60% versus hiring and carrying a full in-house finance bench.",
    },
    {
      title: "Flexible Staffing",
      description:
        "Scale coverage up or down with full-time, part-time, or as-needed support matched to your volume.",
    },
    {
      title: "Better Financial Control",
      description:
        "Stay close to the numbers with disciplined closes, clear reporting, and controls you can trust.",
    },
    {
      title: "Latest Technology",
      description:
        "Work across modern ledgers and tools so your books, dashboards, and handoffs stay accurate.",
    },
    {
      title: "Focus on What Matters",
      description:
        "Hand off routine accounting so your team can concentrate on strategy, owners, and growth.",
    },
  ],
} as const;

export const features = {
  eyebrow: "Benefits",
  title: "Benefits of Outsourcing",
  titleAccent: "Accounting",
  sideImage:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=65",
  sideImageAlt:
    "Accounting desk with calculator, financial ledgers, and report documents",
  items: [
    {
      title: "High Cost Savings",
      description: "Realize cost reductions of 40%-60%.",
      metric: "40–60%",
      metricLabel: "typical savings vs in-house",
      icon: "savings" as const,
      featured: true,
    },
    {
      title: "Grow without Overheads",
      description: "Scale up and down based on your needs.",
      icon: "process" as const,
      featured: false,
    },
    {
      title: "Focus on Core Business",
      description: "Focus on running the business instead of managing books.",
      icon: "focus" as const,
      featured: false,
    },
    {
      title: "Flexible Staffing",
      description: "Use us as full-time, part-time or on an as-needed basis.",
      icon: "network" as const,
      featured: false,
    },
    {
      title: "Specialized Expertise",
      description: "Access to best practices derived from 300+ businesses.",
      metric: "300+",
      metricLabel: "businesses served",
      icon: "expert" as const,
      featured: false,
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
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=640&q=60",
    },
    {
      title: "Logistic & Transportation",
      image:
        "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=640&q=60",
    },
    {
      title: "Retail",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=640&q=60",
    },
    {
      title: "CPA Firms",
      image:
        "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=640&q=60",
    },
    {
      title: "Restaurant Business",
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=640&q=60",
    },
    {
      title: "Amusement Business",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=640&q=60",
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

export const testimonials = {
  eyebrow: "Reviews",
  title: "Trusted by finance",
  titleAccent: "leaders",
  description:
    "What operators and controllers say after switching to Atlas for outsourced accounting support.",
  items: [
    {
      quote:
        "Atlas cut our month-end scramble in half. We kept control of the numbers without hiring three more accountants.",
      name: "Daniel Reyes",
      role: "Controller",
      company: "Northline Properties",
      rating: 5,
      featured: true,
    },
    {
      quote:
        "Flexible staffing finally matched our seasonal leasing spikes. Reporting quality stayed consistent every month.",
      name: "Priya Shah",
      role: "CFO",
      company: "Harbor Asset Group",
      rating: 5,
      featured: false,
    },
    {
      quote:
        "Our AP backlog cleared in weeks. The team plugs into our systems like an in-house extension.",
      name: "Marcus Chen",
      role: "VP Finance",
      company: "Cedar Peak Developments",
      rating: 5,
      featured: false,
    },
    {
      quote:
        "Owner packages are clearer, faster, and audit-ready. I spend time on strategy instead of chasing reconciliations.",
      name: "Elena Brooks",
      role: "Managing Partner",
      company: "Brooks & Co. Investors",
      rating: 5,
      featured: false,
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

export const finalCta = {
  title: "Ready to Streamline Your Accounting with Atlas",
  description:
    "Unlock clearer closes, flexible staffing, and 40–60% cost savings. Tell us about your portfolio and get a customized proposal.",
  buttonLabel: "Get a Proposal",
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
  "40-60% savings vs in-house",
  "FTE or hourly models",
  "No long-term contracts",
] as const;

export const paymentMethods = [
  { name: "Credit & debit cards", detail: "Visa, Mastercard, Amex" },
  { name: "ACH bank transfer", detail: "US business checking" },
  { name: "Wire transfer", detail: "For annual engagements" },
  { name: "Invoicing", detail: "Net-15 for approved accounts" },
] as const;
