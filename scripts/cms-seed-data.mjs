/**
 * CMS seed data migrated from src/lib/*.ts
 * Keep in sync when static content changes.
 */

export const site = {
  brand: "Atlas Global Finance",
  logo: "/atlas-logo.png",
  email: "Support@atlasglobalfinances.com",
  tagline: "Technology-Driven Accounting Operations",
  phone: "+1 (407) 968-5277",
  phoneAlt: "+1 (407) 535-9192",
  phones: ["+1 (407) 968-5277", "+1 (407) 535-9192"],
  addressLine1: "1683 N Hancock Rd, Suite 103, Minneola, FL 34715, USA",
};

export const homeAnchors = {
  contact: "/#contact",
  services: "/#services",
  value: "/#value",
  whyUs: "/#why-us",
  technology: "/#technology",
  industries: "/#industries",
  security: "/#security",
  howItWorks: "/#how-it-works",
  features: "/#value",
  roles: "/#why-us",
  reviews: "/#contact",
};

export const siteCta = {
  label: "Inquire Now",
  href: "/#contact",
};

export const hero = {
  title: "Smarter Accounting. Greater Efficiency. Lower Cost.",
  titleLines: [
    [{ text: "Smarter Accounting." }, { text: "Greater Efficiency." }],
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
      { label: "People", value: "Experienced accounting talent", icon: "people" },
      { label: "Process", value: "Standardized + optimized workflows", icon: "process" },
      { label: "Technology", value: "Automation + AI-assisted tools", icon: "technology" },
    ],
  },
};

export const valueProposition = {
  eyebrow: "Value proposition",
  title: "Built for a More Efficient",
  titleAccent: "Accounting Operation",
  description:
    "Better efficiency creates better value. Atlas combines accounting expertise with technology, automation, AI-assisted workflows, optimized processes, and global resources to reduce unnecessary manual work and increase productivity.",
  flow: [
    { title: "People", description: "Experienced accounting professionals", icon: "people" },
    { title: "Process", description: "Standardized + optimized workflows", icon: "process" },
    { title: "Technology", description: "Automation + AI-assisted tools", icon: "technology" },
    { title: "Efficiency", description: "Higher productivity + capacity", icon: "efficiency" },
    { title: "Client Savings", description: "Lower operating cost", icon: "savings" },
  ],
};

export const coreServicesData = [
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
      { title: "General ledger maintenance", description: "Keep your chart of accounts, balances, and supporting schedules organized and current." },
      { title: "Journal entries & adjustments", description: "Prepare and post recurring and ad hoc entries with appropriate documentation and review support." },
      { title: "Account reconciliations", description: "Support balance sheet and subledger reconciliations aligned to your close standards." },
      { title: "Month-end close support", description: "Execute assigned close tasks, follow checklists, and help your team finish on schedule." },
      { title: "Financial record organization", description: "Maintain clean transaction history, supporting files, and audit-ready documentation." },
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
    description: "Invoice processing, billing support, payment readiness, and reconciliations within your workflows.",
    summary: "Atlas supports your AP and AR workflows — from invoice processing and coding to payment readiness, billing support, and account reconciliation.",
    overview: "Our specialists work within your existing approval processes and accounting systems to keep transactions moving accurately and efficiently. We help reduce manual workload while maintaining documentation, consistency, and appropriate client controls.",
    capabilities: [
      { title: "Invoice processing & coding", description: "Review, code, and route vendor invoices according to your chart of accounts and policies." },
      { title: "Payment readiness support", description: "Prepare payables for approval and payment while tracking open balances and aging." },
      { title: "Billing & receivables support", description: "Assist with customer invoicing, cash application, and receivable account maintenance." },
      { title: "AP & AR reconciliations", description: "Reconcile subledgers to the general ledger and resolve outstanding items." },
      { title: "Documentation & controls", description: "Maintain consistent supporting records aligned with your approval and audit requirements." },
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
    description: "Timely financial statements, management reports, and month-end reporting packages.",
    summary: "Atlas helps turn accurate accounting data into timely, organized financial reporting that supports better business decisions.",
    overview: "We assist with financial statement preparation, management reports, budget-to-actual analysis, reconciliations, and month-end reporting packages. Your organization retains oversight and approval while Atlas provides the back-office support needed to keep reporting on schedule.",
    capabilities: [
      { title: "Financial statement preparation", description: "Support balance sheet, income statement, and cash flow schedules tied to the general ledger." },
      { title: "Management reporting", description: "Prepare recurring packs, KPI summaries, and leadership-ready reporting formats." },
      { title: "Budget-to-actual analysis", description: "Compare actual results to budget and document meaningful variances." },
      { title: "Month-end reporting packages", description: "Assemble reporting binders, schedules, and supporting workpapers for review." },
      { title: "Reconciliation support", description: "Help ensure reporting outputs tie cleanly to reconciled account balances." },
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
    description: "Flexible accounting support tailored to your industry, systems, and reporting requirements.",
    summary: "Atlas provides flexible accounting support tailored to the systems, workflows, and reporting requirements of your organization and industry.",
    overview: "Whether supporting property management organizations, associations, hospitality businesses, or other industries, our teams adapt to your established processes. Atlas operates as an extension of your accounting department—not as a replacement for your management or client relationships.",
    capabilities: [
      { title: "Industry-specific workflows", description: "Support accounting processes shaped by property management, HOA, hospitality, and other sectors." },
      { title: "System-aligned execution", description: "Work inside your existing software, templates, and reporting structures." },
      { title: "Process adaptation", description: "Follow your established procedures rather than forcing a one-size-fits-all model." },
      { title: "Reporting customization", description: "Help produce the schedules, owner reports, and operational packages your organization requires." },
      { title: "Extension-of-team support", description: "Augment your department while your leadership retains client and management relationships." },
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
    description: "Administrative support for payroll, employee records, tax forms, and recurring financial tasks.",
    summary: "Atlas supports the administrative work behind payroll and financial operations — helping your internal team stay organized, accurate, and focused on higher-value responsibilities.",
    overview: "Services can include payroll processing support, employee data administration, financial recordkeeping, 1099/W-2 support, documentation, reconciliations, and other recurring financial administrative functions based on your organization's needs.",
    capabilities: [
      { title: "Payroll processing support", description: "Assist with payroll inputs, review, documentation, and post-payroll accounting tasks." },
      { title: "Employee data administration", description: "Maintain employee records, changes, and supporting payroll documentation." },
      { title: "1099 & W-2 support", description: "Help prepare year-end tax form workflows, reconciliations, and filing support materials." },
      { title: "Financial recordkeeping", description: "Keep payroll-related transactions, schedules, and supporting files organized." },
      { title: "Recurring admin functions", description: "Handle repeatable financial administration based on your operating calendar." },
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
    description: "Phone, email, chat, and ticket support aligned with your brand, processes, and standards.",
    summary: "Atlas extends your customer service capabilities with trained support professionals who operate under your company's processes, standards, and brand.",
    overview: "Our teams can assist with phone, email, chat, ticket management, routine inquiries, scheduling, follow-up, and administrative requests. Your organization maintains ownership of customer relationships while Atlas provides scalable support behind the scenes.",
    capabilities: [
      { title: "Phone, email & chat support", description: "Handle routine customer inquiries through the channels your organization uses." },
      { title: "Ticket & queue management", description: "Track, prioritize, and follow up on customer requests within your systems." },
      { title: "Scheduling & follow-up", description: "Support appointment coordination, reminders, and status updates." },
      { title: "Administrative request handling", description: "Assist with forms, documentation, and recurring customer-facing tasks." },
      { title: "Brand-aligned execution", description: "Follow your scripts, tone, and service standards while you retain relationship ownership." },
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
    description: "Help desk, Microsoft 365, onboarding, troubleshooting, and cloud support for your workforce.",
    summary: "Atlas provides responsive IT support designed to keep your workforce connected, productive, and supported across today's cloud-based business environment.",
    overview: "Our services can include help desk support, Microsoft 365 administration, user onboarding and offboarding, account management, software troubleshooting, cloud and virtual-desktop support, and day-to-day technical assistance—all aligned with your organization's technology policies.",
    capabilities: [
      { title: "Help desk support", description: "Respond to user issues, requests, and incident triage through your support channels." },
      { title: "Microsoft 365 administration", description: "Support licensing, mailboxes, permissions, and routine tenant administration tasks." },
      { title: "User onboarding & offboarding", description: "Provision and deprovision accounts according to your security and HR procedures." },
      { title: "Software troubleshooting", description: "Resolve common application, access, and connectivity issues for end users." },
      { title: "Cloud & virtual-desktop support", description: "Assist with remote access, cloud tools, and day-to-day technical operations." },
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
    description: "Practical security support for identity, access, endpoints, monitoring, and email protection.",
    summary: "Atlas helps organizations strengthen their security posture through practical cybersecurity support focused on protecting users, systems, access, and business data.",
    overview: "We support identity and access management, multi-factor authentication, endpoint protection, security monitoring, email security, secure remote access, user provisioning, and cybersecurity administration based on the client's established security framework and requirements.",
    capabilities: [
      { title: "Identity & access management", description: "Support user provisioning, permissions, and access reviews within your framework." },
      { title: "Multi-factor authentication", description: "Assist with MFA rollout, enrollment, and ongoing user support." },
      { title: "Endpoint & email security", description: "Help maintain protection tools, policies, and monitoring for devices and mail." },
      { title: "Security monitoring support", description: "Track alerts, document incidents, and support routine security operations tasks." },
      { title: "Secure remote access", description: "Support VPN, remote work, and access controls aligned to your policies." },
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
    description: "Scalable back-office support for data entry, documents, workflows, and recurring processes.",
    summary: "Atlas provides scalable back-office support that helps organizations reduce repetitive workloads while maintaining control over their core operations and client relationships.",
    overview: "Our teams can support data entry, document management, administrative processing, workflow coordination, reporting, record maintenance, and other recurring business processes. We build our services around your procedures rather than forcing your organization into ours.",
    capabilities: [
      { title: "Data entry & record maintenance", description: "Handle structured data capture and ongoing record updates with consistency." },
      { title: "Document management", description: "Organize, index, and process documents according to your filing standards." },
      { title: "Administrative processing", description: "Support recurring back-office tasks that consume internal team time." },
      { title: "Workflow coordination", description: "Move tasks through your defined steps, handoffs, and approval paths." },
      { title: "Reporting & process support", description: "Assist with status tracking, operational reports, and routine process follow-through." },
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
    description: "Automation, AI-assisted processing, integrations, and digital workflows to reduce manual work.",
    summary: "Atlas combines technology, automation, and AI to help organizations reduce manual work, improve consistency, and operate more efficiently.",
    overview: "We identify repetitive workflows that can be streamlined through automation, AI-assisted processing, system integrations, reporting tools, and digital workflows. Our objective is practical: help your existing team accomplish more while maintaining appropriate human review and organizational controls.",
    capabilities: [
      { title: "Workflow automation", description: "Streamline repetitive tasks with rules-based and digital process improvements." },
      { title: "AI-assisted processing", description: "Apply practical AI support to document handling, classification, and review tasks." },
      { title: "System integrations", description: "Connect tools and data flows so information moves with fewer manual steps." },
      { title: "Reporting & digital workflows", description: "Improve recurring reporting and operational workflows with better tooling." },
      { title: "Human-in-the-loop controls", description: "Keep appropriate review, approval, and oversight in place as automation expands." },
    ],
    outcomes: [
      "Less manual work across repetitive workflows",
      "More consistent processing and reporting",
      "Greater output from your existing team",
      "Automation with controls that fit your organization",
    ],
  },
];

export const coreServicesSection = {
  eyebrow: "Services",
  title: "Support",
  titleAccent: "Atlas Provides",
  description:
    "From accounting and reporting to IT, cybersecurity, customer service, and automation — scalable back-office support built around your processes.",
};

export const whyChooseUs = {
  eyebrow: "Why Atlas",
  title: "Why Companies Choose",
  titleAccent: "Atlas",
  subtitle: "Accounting Experience. Technology Driven. Built for Efficiency.",
  intro: [
    "Atlas Global Finance was founded by experienced accounting professionals who understand the financial and operational challenges businesses face firsthand. Our leadership brings hands-on experience across HOA and property management, restaurant operations, and business accounting.",
  ],
  emphasis: "But experience alone is not enough.",
  efficiencyLead:
    "At Atlas, efficiency is at the core of how we operate. We embrace technology, automation, and AI to streamline accounting processes, reduce repetitive manual work, improve consistency, and help our team accomplish more with fewer resources.",
  items: [
    { index: "01", title: "Technology & AI-Driven Efficiency", description: "We continuously look for opportunities to use modern technology, automation, and AI-assisted workflows to make accounting processes faster, smarter, and more efficient — while maintaining appropriate human oversight and financial controls." },
    { index: "02", title: "Efficiency That Creates Client Savings", description: "Our goal is simple: operate more efficiently so our clients can save more. By combining skilled accounting professionals, optimized workflows, global resources, and technology, Atlas helps clients expand their accounting capacity without proportionally increasing their overhead." },
    { index: "03", title: "Experienced Accounting Leadership", description: "Atlas is led by professionals with real-world accounting and operational experience. We understand reconciliations, accounts payable, general ledger accounting, financial reporting, budgeting, month-end close, and the day-to-day demands placed on accounting departments." },
    { index: "04", title: "Smarter, Scalable Accounting Support", description: "As our clients grow, Atlas can scale with them. Our technology-enabled operating model is designed to handle increasing workloads efficiently while maintaining consistency, accountability, and quality." },
    { index: "05", title: "An Extension of Your Accounting Team", description: "We don't want to operate like a disconnected outsourcing provider. Atlas is designed to become an extension of your accounting department — working within your systems, processes, controls, and expectations." },
  ],
  mission: {
    title: "Our Mission",
    description:
      "To combine accounting expertise, global talent, technology, automation, and AI to create more efficient financial operations — helping our clients reduce costs, strengthen their accounting functions, and focus more resources on growing their businesses.",
  },
};

export const technologySection = {
  eyebrow: "Technology + AI + Control",
  title: "Accounting Built for the",
  titleAccent: "Modern Business",
  brandPillar: "Technology should be a central Atlas brand pillar.",
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
};

export const industriesServedFeatured = [
  {
    index: "01",
    slug: "hoa-property-management",
    title: "HOA & Property Management",
    description:
      "Community association and management-company accounting workflows — assessments, reserves, vendor payables, and board-ready reporting.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=640&q=60",
  },
  {
    index: "02",
    slug: "restaurant-business",
    title: "Restaurants & Hospitality",
    description:
      "Practical restaurant accounting and operational experience for food cost, daily closes, labor, and multi-unit reporting.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=640&q=60",
  },
  {
    index: "03",
    slug: "cpa-firms",
    title: "Professional & Business Services",
    description:
      "Scalable accounting support for growing service organizations that need capacity without rebuilding the back office.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=640&q=60",
  },
];

export const industriesServedMeta = {
  eyebrow: "Industries",
  title: "Industries Atlas",
  titleAccent: "Actually Knows",
  description:
    "We lead with the industries supported by real founder and team experience — then scale accounting capacity where those workflows demand it.",
  moreLabel: "Additional industries we support",
};

export const howItWorks = {
  eyebrow: "How Atlas works",
  title: "From Understanding to",
  titleAccent: "Scale",
  description:
    "A simple operating model that fits your systems first — then improves efficiency over time.",
  steps: [
    { index: "01", title: "Understand", description: "Learn systems, workflows, responsibilities, deadlines and expectations." },
    { index: "02", title: "Integrate", description: "Fit Atlas professionals into defined client processes and controls." },
    { index: "03", title: "Optimize", description: "Improve standardization, workflow design, technology and automation." },
    { index: "04", title: "Scale", description: "Expand accounting capacity efficiently as workload and client needs grow." },
  ],
};

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
    "Accounting & Bookkeeping",
    "Accounts Payable & Receivable",
    "Financial Reporting",
    "Specialized Accounting",
    "Payroll & Financial Administration",
    "Customer Service",
    "IT Support",
    "Cybersecurity",
    "Business Process Outsourcing (BPO)",
    "AI & Business Automation",
    "Other",
  ],
  companySizes: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001-5000", "5001-10000", "10001+"],
};

export const finalCta = {
  title: "Build a More Efficient Accounting Operation",
  description:
    "We operate more efficiently so our clients can save more — with accounting expertise, global talent, technology, automation, and AI-assisted workflows.",
  buttonLabel: "Inquire Now",
};

export const pricingPlans = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    billing: "Monthly · part-time support",
    description: "Bookkeeping & reconciliations for smaller volumes.",
    features: ["Bookkeeping & categorization", "Bank reconciliations", "P&L & balance sheet", "Email support", "Secure client portal"],
    highlighted: false,
    cta: siteCta.label,
  },
  {
    name: "Growth",
    price: "$899",
    period: "/month",
    billing: "Monthly · dedicated bookkeeper",
    description: "AP/AR, payroll support, and management reporting.",
    features: ["Everything in Starter", "Accounts payable & receivable", "Payroll processing support", "Cash flow & dashboards", "48h report turnaround", "Priority support"],
    highlighted: true,
    cta: siteCta.label,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    billing: "FTE / multi-entity engagements",
    description: "Controller services, catch-up, and multi-entity teams.",
    features: ["Catch-up & year-end close", "Financial modeling & budgeting", "CFO / controller hours", "NetSuite · SAP · multi-entity", "Inventory & fixed assets", "Dedicated account lead"],
    highlighted: false,
    cta: siteCta.label,
  },
];

export const pricingPerks = ["Technology-enabled accounting", "FTE or hourly models", "No long-term contracts"];

export const paymentMethods = [
  { name: "Credit & debit cards", detail: "Visa, Mastercard, Amex" },
  { name: "ACH bank transfer", detail: "US business checking" },
  { name: "Wire transfer", detail: "For annual engagements" },
  { name: "Invoicing", detail: "Net-15 for approved accounts" },
];

export const industries = [
  {
    slug: "hoa-property-management",
    title: "HOA & Property Management",
    shortTitle: "HOA / Property",
    cardImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=640&q=60",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-construction.png",
    description: "Community association and management-company accounting for assessments, reserves, vendor payables, and board-ready reporting.",
    summary: "We support HOA boards and property managers with disciplined assessment billing, reserve tracking, payables, and reporting that keeps communities and owners informed.",
    highlights: ["Assessment billing", "Reserve tracking", "Vendor payables", "Board packages"],
    challenges: [
      { title: "Board and owner transparency", description: "Directors and owners expect clear packages while day-to-day transactions keep moving across vendors and bank accounts." },
      { title: "Assessment and delinquency follow-up", description: "Late fees, payment plans, and collections require consistent coding and timely statements." },
      { title: "Reserve and operating fund clarity", description: "Mixing reserve and operating activity creates confusion at audit time and weakens financial control." },
    ],
    solutions: [
      { title: "Assessment & AR support", description: "Process assessments, apply receipts, and maintain aging with clear delinquency notes for managers." },
      { title: "Vendor AP & approvals", description: "Code invoices to the right GL and community, track approvals, and keep payables audit-ready." },
      { title: "Bank reconciliations", description: "Reconcile operating and reserve accounts on a disciplined cadence ahead of board meetings." },
      { title: "Board financial packages", description: "Prepare month-end statements, variance notes, and supporting schedules directors can review quickly." },
      { title: "Reserve fund tracking", description: "Separate reserve activity, contributions, and expenditures with documentation for planning discussions." },
      { title: "Management company workflows", description: "Fit into your existing systems, deadlines, and portfolio cadence as an extension of your team." },
    ],
  },
  {
    slug: "construction",
    title: "Construction",
    shortTitle: "Construction",
    cardImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=640&q=60",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-construction.png",
    description: "Job costing, WIP reporting, and project-level closes for contractors, developers, and construction managers.",
    summary: "We support construction finance teams with draw packages, cost-to-complete schedules, and month-end reporting that keeps lenders and owners aligned.",
    highlights: ["Job costing & WIP", "Draw reporting", "Subcontractor AP", "Project P&L"],
    challenges: [
      { title: "Fragmented job costing", description: "Costs spread across spreadsheets, PM tools, and the GL make it hard to see true margin by job before month-end." },
      { title: "Draw and lender deadlines", description: "Incomplete WIP or missing backup slows funding and creates rework for project controllers under tight timelines." },
      { title: "Seasonal staffing gaps", description: "Peak build seasons overload in-house staff while slower quarters leave expensive bench capacity on payroll." },
    ],
    solutions: [
      { title: "Job cost reconciliation", description: "Align committed costs, change orders, and actuals to your chart of accounts with clear job-level variance notes." },
      { title: "WIP & percent-complete schedules", description: "Prepare over/under billing analysis and earned revenue schedules ready for lender and surety review." },
      { title: "Draw package support", description: "Compile AP aging, lien waivers, and cost backup for construction draw submissions on your timeline." },
      { title: "Subcontractor AP & retainage", description: "Process subcontractor invoices, track retainage releases, and maintain vendor compliance documentation." },
      { title: "Equipment & fleet coding", description: "Allocate equipment charges to jobs with consistent coding rules and audit-ready support schedules." },
      { title: "Project closeout reporting", description: "Deliver final job P&L, punch-list cost tracking, and warranty reserve entries when projects reach completion." },
    ],
  },
  {
    slug: "logistics-transportation",
    title: "Logistic & Transportation",
    shortTitle: "Logistics",
    cardImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=640&q=60",
    heroImage: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-logistics-light.png",
    description: "Fleet accounting, freight billing, and fuel cost controls for carriers, brokers, and logistics operators.",
    summary: "From lane-level profitability to driver settlements, we help logistics finance teams close faster without adding headcount.",
    highlights: ["Fleet & fuel tracking", "Freight billing", "Driver settlements", "Lane profitability"],
    challenges: [
      { title: "High transaction volume", description: "Thousands of loads, fuel receipts, and accessorial charges create AP backlogs and reconciliation bottlenecks." },
      { title: "Complex revenue recognition", description: "Brokerage, asset-based, and hybrid models need consistent rules for accruals, adjustments, and customer billing." },
      { title: "Distributed operations", description: "Terminal and depot teams need timely reporting while headquarters expects consolidated financials on schedule." },
    ],
    solutions: [
      { title: "Load-level revenue posting", description: "Match freight bills to completed loads with clear exception queues for rate disputes and accessorial adjustments." },
      { title: "Fuel & maintenance allocation", description: "Code fuel cards, repairs, and tolls to tractors, trailers, or lanes based on your operating model." },
      { title: "Driver settlement runs", description: "Calculate owner-operator and company driver pay with deductions, advances, and settlement summaries." },
      { title: "Customer AR & collections", description: "Invoice shippers and brokers, track aging by customer, and support collections workflows your team defines." },
      { title: "Lane & asset profitability", description: "Produce monthly margin views by lane, customer, or equipment type to support pricing decisions." },
      { title: "Compliance & audit support", description: "Maintain documentation for IFTA-related schedules, insurance certificates, and carrier compliance filings." },
    ],
  },
  {
    slug: "retail",
    title: "Retail",
    shortTitle: "Retail",
    cardImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=640&q=60",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-retail.png",
    description: "Store-level reporting, inventory accounting, and multi-location closes for retail and e-commerce brands.",
    summary: "We connect POS, inventory, and GL data so finance teams see performance by store, channel, and SKU category.",
    highlights: ["Store P&L", "Inventory controls", "POS reconciliation", "Multi-location close"],
    challenges: [
      { title: "POS-to-GL mismatches", description: "Daily sales, tenders, and discounts from multiple stores rarely tie to the ledger without manual intervention." },
      { title: "Inventory shrink and counts", description: "Cycle counts, markdowns, and shrink adjustments need disciplined timing to keep margins trustworthy." },
      { title: "Peak season volume", description: "Holiday and promotional periods spike transaction volume when internal teams are already stretched thin." },
    ],
    solutions: [
      { title: "Daily sales reconciliation", description: "Reconcile cash, card, and gift card tenders to bank deposits and GL sales accounts by store or channel." },
      { title: "Inventory & COGS support", description: "Assist with cycle count entries, shrink analysis, and category-level margin reporting." },
      { title: "Store-level P&L packs", description: "Deliver monthly store performance summaries with KPI commentary for regional and HQ finance teams." },
      { title: "Vendor AP & markdown tracking", description: "Process vendor invoices, co-op accruals, and promotional markdown schedules with clear audit trails." },
      { title: "E-commerce channel splits", description: "Separate marketplace, DTC, and wholesale revenue with aligned fee and fulfillment cost allocations." },
      { title: "Rolling forecast inputs", description: "Provide clean actuals and trend data to support merchandise and operations planning cycles." },
    ],
  },
  {
    slug: "cpa-firms",
    title: "CPA Firms",
    shortTitle: "CPA Firms",
    cardImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=640&q=60",
    heroImage: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-cpa.png",
    description: "Overflow bookkeeping, write-up, and client accounting support for CPA and advisory practices.",
    summary: "Scale client delivery during tax season and year-end without hiring full-time staff or turning away new engagements.",
    highlights: ["Write-up & bookkeeping", "Tax season overflow", "Client-ready workpapers", "White-label delivery"],
    challenges: [
      { title: "Seasonal capacity crunch", description: "January through April demand spikes while recruiting and training staff takes months you do not have." },
      { title: "Inconsistent client books", description: "Messy client files slow review, increase write-downs, and frustrate partners trying to protect margins." },
      { title: "Quality control at scale", description: "Adding offshore or temporary help without documented processes risks rework and client satisfaction issues." },
    ],
    solutions: [
      { title: "Monthly write-up & reconciliation", description: "Complete bank recs, categorization, and adjusting entries to your firm's standards and review checklist." },
      { title: "Year-end close assistance", description: "Support accruals, depreciation schedules, and trial balance cleanup before partner review." },
      { title: "Workpaper preparation", description: "Organize supporting schedules and tie-outs so your team moves faster through review and sign-off." },
      { title: "Payroll & sales tax support", description: "Handle recurring compliance tasks that consume staff hours during peak filing periods." },
      { title: "Client onboarding playbooks", description: "Follow your chart-of-accounts mapping and documentation templates for consistent handoffs." },
      { title: "White-label reporting", description: "Deliver client-facing financials under your firm branding with professional formatting and commentary." },
    ],
  },
  {
    slug: "restaurant-business",
    title: "Restaurant Business",
    shortTitle: "Restaurants",
    cardImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=640&q=60",
    heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-restaurant.png",
    description: "Food cost tracking, daily sales closes, and multi-unit reporting for restaurants and hospitality groups.",
    summary: "We help operators see prime cost, labor, and cash flow by location so leaders can act on numbers—not guesswork.",
    highlights: ["Prime cost tracking", "Daily sales close", "Tip reporting", "Multi-unit dashboards"],
    challenges: [
      { title: "Thin margins under pressure", description: "Food, labor, and delivery platform fees shift weekly; delayed reporting hides problems until cash is tight." },
      { title: "Tip and payroll complexity", description: "Tip pools, service charges, and multi-rate payroll rules create reconciliation work after every service period." },
      { title: "Franchise reporting requirements", description: "Franchisors and lenders expect standardized packs while each location runs slightly different operations." },
    ],
    solutions: [
      { title: "Daily sales & cash reconciliation", description: "Close POS batches, delivery app payouts, and cash drawers with exception logs for managers." },
      { title: "Food & beverage cost analysis", description: "Track theoretical vs actual usage, waste, and vendor price changes with category-level commentary." },
      { title: "Labor cost reporting", description: "Align timeclock data to payroll and GL with overtime and holiday premium visibility by shift." },
      { title: "Tip allocation support", description: "Assist with tip pool calculations and payroll integration following your policy and local rules." },
      { title: "Vendor AP & invoice coding", description: "Process food, beverage, and supply invoices with consistent GL coding by location and category." },
      { title: "Unit-level flash reporting", description: "Deliver weekly KPI snapshots—sales, guest counts, prime cost, and cash—to owners and area managers." },
    ],
  },
  {
    slug: "amusement-business",
    title: "Amusement Business",
    shortTitle: "Amusement",
    cardImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=640&q=60",
    heroImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-amusement.png",
    description: "Seasonal revenue tracking, event accounting, and membership billing for venues and entertainment operators.",
    summary: "From ticket sales to concession revenue, we help amusement and entertainment finance teams close cleanly across peak and off-seasons.",
    highlights: ["Seasonal cash flow", "Ticket & POS sales", "Membership billing", "Event P&L"],
    challenges: [
      { title: "Highly seasonal revenue", description: "Cash surges in peak months while fixed costs continue year-round, making forecasting and staffing difficult." },
      { title: "Multiple revenue streams", description: "Tickets, memberships, concessions, parties, and retail each need distinct recognition and reconciliation rules." },
      { title: "Pop-up and event complexity", description: "Temporary installations and special events add short-lived cost centers that must close quickly after wrap-up." },
    ],
    solutions: [
      { title: "Ticket & membership revenue", description: "Reconcile POS, online sales, and prepaid packages with deferred revenue schedules you approve." },
      { title: "Concession & retail accounting", description: "Track inventory, vendor costs, and daily sales for food, merchandise, and arcade operations." },
      { title: "Event & party profitability", description: "Build job-level P&L for private events, school groups, and corporate bookings with deposit tracking." },
      { title: "Seasonal cash planning", description: "Provide rolling cash and revenue views that separate peak-season inflows from year-round overhead." },
      { title: "Payroll for hourly staff", description: "Support high-volume hourly payroll coding, tips where applicable, and location-based labor reporting." },
      { title: "Insurance & safety accruals", description: "Maintain schedules for claims reserves, maintenance contracts, and inspection-related costs." },
    ],
  },
];

export const navPrimaryLinks = [
  { label: "Home", href: "/" },
  { label: "Value", href: homeAnchors.value },
  { label: "Why Atlas", href: homeAnchors.whyUs },
  { label: "Technology", href: homeAnchors.technology },
  { label: "How It Works", href: homeAnchors.howItWorks },
  { label: "Contact Us", href: homeAnchors.contact },
];

export const footerBarLinks = [
  { label: "Privacy Policy", href: homeAnchors.contact },
  { label: "Terms of Use", href: homeAnchors.contact },
];

export const footerLinkGroups = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Contact us", href: homeAnchors.contact },
      { label: "Why Atlas", href: homeAnchors.whyUs },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Value", href: homeAnchors.value },
      { label: "Services", href: homeAnchors.services },
      { label: "Technology", href: homeAnchors.technology },
      { label: "Industries", href: homeAnchors.industries },
      { label: "How It Works", href: homeAnchors.howItWorks },
    ],
  },
];

export const footerSocialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: "linkedin" },
  { label: "X", href: "https://x.com", icon: "x" },
  { label: "Facebook", href: "https://www.facebook.com", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com", icon: "instagram" },
];
