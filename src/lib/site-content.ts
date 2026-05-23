export const site = {
  brand: "Atlas Global Finance",
  logo: "/atlas-logo.png",
  email: "hello@atlasglobalfinance.com",
  salesEmail: "hello@atlasglobalfinance.com",
  tagline: "Finance and Accounting Outsourcing",
  phone: "+1 (646) 367-8976",
  phoneIndia: "+91-11-26475715",
  addressLine1: "244 Fifth Avenue, Suite P228, New York, NY 10001",
  addressLine2: "Remote delivery US, Canada, UK & Australia",
} as const;

export const navLinks = [
  { href: "/#features", label: "Benefits" },
  { href: "/#services", label: "Services" },
  { href: "/#why-us", label: "Why us" },
  { href: "/#roles", label: "Roles" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Hash links that must include `/` so they work from any page. */
export const homeAnchors = {
  contact: "/#contact",
  services: "/#services",
  features: "/#features",
  whyUs: "/#why-us",
  video: "/#video",
  industries: "/#industries",
  roles: "/#roles",
  clients: "/#clients",
  resources: "/#resources",
} as const;

export const images = {
  hero: "/images/hero-banner.png",
  mission: "/images/mission-team.png",
  services: "/images/services-visual.png",
  trust: "/images/trust-team.png",
  contact: "/images/feature-focus.png",
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
  certStrip: "/homepage-banner-strip.webp",
} as const;

export const marqueeItems = [
  "Accounts Payable",
  "Accounts Receivable",
  "Residential Property Accounting",
  "Commercial Property Accounting",
  "HOA / Condo Accounting",
  "Construction Accounting",
  "Lease Abstraction",
  "CAM Reconciliation",
  "Portfolio Accounting",
  "Financial Reporting",
  "Investment Analysis",
  "Year-End Close",
] as const;

export const stats = [
  {
    value: "19",
    suffix: "+",
    label: "Years as a specialized finance and accounting outsourcing company",
  },
  {
    value: "300",
    suffix: "+",
    label: "Clients served in the United States, Canada, United Kingdom and Australia",
  },
  {
    value: "500",
    suffix: "+",
    label: "Team including accounting graduates, CPAs and MBAs",
  },
  {
    value: "6",
    suffix: "+",
    label: "Years average outsourcing accounting experience per staff member",
  },
] as const;

export const whyChooseUs = {
  eyebrow: "Why choose us",
  title: "Why",
  titleAccent: "Choose Us",
} as const;

export const corporateVideo = {
  eyebrow: "Corporate profile",
  title: "Corporate Profile",
  titleAccent: "Video",
  description:
    "The video provides a brief overview of our services, real estate expertise, clients, work culture and most importantly our vision to be recognized as a leading outsourcing provider for the real estate segment.",
  youtubeId: "kHds9-LozZc",
  thumbnail: "https://i.ytimg.com/vi/kHds9-LozZc/hqdefault.jpg",
} as const;

export const industries = [
  "Construction",
  "Logistic & Transportation",
  "Retail",
  "CPA Firms",
] as const;

export const features = {
  eyebrow: "Benefits",
  title: "Benefits of Outsourcing",
  titleAccent: "Accounting",
  sideImage: "/images/benefits-side.webp",
  sideImageAlt: "Team collaboration and outsourced accounting support",
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
    "Accounting and finance outsourcing for construction, logistics, retail, CPA firms, and more.",
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
  ],
} as const;

export const popularRoles = {
  eyebrow: "Talent",
  title: "Popular",
  titleAccent: "Roles",
  description:
    "Dedicated finance professionals placed in your workflows, from AP/AR through property accounting and lease administration.",
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
      title: "Lease Administrator",
      description:
        "Lease Administrator have experience in lease abstraction, lease administration, real estate accounting (including CAM reconciliation) with exposure to residential and commercial leases. They are well-versed with CAM reconciliation and are familiar with various leasing terms and clauses.",
    },
  ],
} as const;

export const clientProfiles = {
  eyebrow: "Case studies",
  title: "Client",
  titleAccent: "Profiles",
  description:
    "Organizations we support with outsourced accounting, reporting, and back-office finance across real estate, construction, transportation, IT, and professional services.",
  cardTagline: "Trusted finance outsourcing partner · US, Canada, UK & Australia",
  items: [
    {
      category: "Real Estate",
      description:
        "A vertically integrated, full service real estate company based out of Bellevue, WA. They specialize in commercial properties. The firm has developed and built in excess of 81 properties and have more than 10,000 units under management.",
    },
    {
      category: "Real Estate",
      description:
        "A midsized real estate property management firm based out of Beverly Hills, CA. The firm manages over 50 properties, across 9 states, encompassing over 1200 tenants and nearly 1.5 million square feet.",
    },
    {
      category: "Construction",
      description:
        "A well-known construction and development company in Canada specializing in construction and development of high rise concretes. It is a mid-sized firm and one of British Columbia's most experienced and respected developers.",
    },
    {
      category: "Construction",
      description:
        "A construction company in Aspen, Colorado providing general contracting, plumbing and property management services.",
    },
    {
      category: "Transportation",
      description:
        "A 100 year old moving and storage company headquartered in Colorado with multi-state operations. The firms' revenues are about 50-75 mn and has about 250 employees.",
    },
    {
      category: "Information Technology",
      description:
        "A mid-size data warehouse consulting and engineering firm based in OH. They build new data warehouse solutions, optimize existing environments, and offer an outsourced service for point of sale data analysis.",
    },
    {
      category: "Accounting",
      description:
        "A large accounting firm in the US (Northville, MI). The firm has clients from virtually every business sector from around the US.",
    },
    {
      category: "Accounting",
      description:
        "A mid-sized accounting company in USA (Chicago, IL). The company has a successful track record and is a leading national provider of tax resolution, tax preparation, bookkeeping and accounting services.",
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

export const usefulLinksSection = {
  title: "Useful Links",
  items: [
    {
      label: "Process Snapshots",
      image: "/images/useful-links/process-snapshots.png",
      href: "https://www.outsourcinghubindia.com/process-snapshots/",
    },
    {
      label: "Case Studies",
      image: "/images/useful-links/case-studies.png",
      href: "https://www.outsourcinghubindia.com/casestudy/",
    },
    {
      label: "Brochure",
      image: "/images/useful-links/brochure.png",
      href: "/downloads/accounting-outsourcing-brochure.pdf",
    },
    {
      label: "Outsourcing Guide",
      image: "/images/useful-links/outsourcing-guide.png",
      href: "/downloads/outsourcing-guide-fao.pdf",
    },
  ],
} as const;

/** @deprecated use usefulLinksSection */
export const usefulLinks = usefulLinksSection.items.map((item) => ({ label: item.label }));

export const certificatesSection = {
  title: "Certificates And Memberships",
  items: [
    {
      name: "SOC 2 Type II",
      image: "/images/certificates/soc2-type-ii.png",
    },
    {
      name: "ISO 27001",
      image: "/images/certificates/iso-27001.png",
    },
    {
      name: "NAHMA Member",
      image: "/images/certificates/nahma.png",
    },
    {
      name: "NASSCOM Member",
      image: "/images/certificates/nasscom.png",
    },
    {
      name: "GRESB",
      image: "/images/certificates/gresb.png",
    },
    {
      name: "IACC",
      image: "/images/certificates/iacc.png",
    },
    {
      name: "CFMA Member",
      image: "/images/certificates/cfma.png",
    },
    {
      name: "CAI Business Partner",
      image: "/images/certificates/cai-business-partner.png",
    },
    {
      name: "CII",
      image: "/images/certificates/cii.png",
    },
    {
      name: "NAA Member",
      image: "/images/certificates/naa.png",
    },
    {
      name: "Community Associations",
      image: "/images/certificates/cc-logo.png",
    },
    {
      name: "Quadel",
      image: "/images/certificates/quadel.png",
    },
  ],
} as const;

export const certificatesNote =
  "Certificates and memberships available on request." as const;

/** Legacy exports kept for pricing page */
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
