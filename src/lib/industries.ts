export type Industry = {
  slug: string;
  title: string;
  shortTitle: string;
  cardImage: string;
  heroImage: string;
  dashboardImage: string;
  description: string;
  summary: string;
  highlights: readonly string[];
  challenges: readonly { title: string; description: string }[];
  solutions: readonly { title: string; description: string }[];
};

export const industries = [
  {
    slug: "construction",
    title: "Construction",
    shortTitle: "Construction",
    cardImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=640&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-construction.png",
    description:
      "Job costing, WIP reporting, and project-level closes for contractors, developers, and construction managers.",
    summary:
      "We support construction finance teams with draw packages, cost-to-complete schedules, and month-end reporting that keeps lenders and owners aligned.",
    highlights: ["Job costing & WIP", "Draw reporting", "Subcontractor AP", "Project P&L"],
    challenges: [
      {
        title: "Fragmented job costing",
        description:
          "Costs spread across spreadsheets, PM tools, and the GL make it hard to see true margin by job before month-end.",
      },
      {
        title: "Draw and lender deadlines",
        description:
          "Incomplete WIP or missing backup slows funding and creates rework for project controllers under tight timelines.",
      },
      {
        title: "Seasonal staffing gaps",
        description:
          "Peak build seasons overload in-house staff while slower quarters leave expensive bench capacity on payroll.",
      },
    ],
    solutions: [
      {
        title: "Job cost reconciliation",
        description:
          "Align committed costs, change orders, and actuals to your chart of accounts with clear job-level variance notes.",
      },
      {
        title: "WIP & percent-complete schedules",
        description:
          "Prepare over/under billing analysis and earned revenue schedules ready for lender and surety review.",
      },
      {
        title: "Draw package support",
        description:
          "Compile AP aging, lien waivers, and cost backup for construction draw submissions on your timeline.",
      },
      {
        title: "Subcontractor AP & retainage",
        description:
          "Process subcontractor invoices, track retainage releases, and maintain vendor compliance documentation.",
      },
      {
        title: "Equipment & fleet coding",
        description:
          "Allocate equipment charges to jobs with consistent coding rules and audit-ready support schedules.",
      },
      {
        title: "Project closeout reporting",
        description:
          "Deliver final job P&L, punch-list cost tracking, and warranty reserve entries when projects reach completion.",
      },
    ],
  },
  {
    slug: "logistics-transportation",
    title: "Logistic & Transportation",
    shortTitle: "Logistics",
    cardImage:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=640&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-logistics-light.png",
    description:
      "Fleet accounting, freight billing, and fuel cost controls for carriers, brokers, and logistics operators.",
    summary:
      "From lane-level profitability to driver settlements, we help logistics finance teams close faster without adding headcount.",
    highlights: ["Fleet & fuel tracking", "Freight billing", "Driver settlements", "Lane profitability"],
    challenges: [
      {
        title: "High transaction volume",
        description:
          "Thousands of loads, fuel receipts, and accessorial charges create AP backlogs and reconciliation bottlenecks.",
      },
      {
        title: "Complex revenue recognition",
        description:
          "Brokerage, asset-based, and hybrid models need consistent rules for accruals, adjustments, and customer billing.",
      },
      {
        title: "Distributed operations",
        description:
          "Terminal and depot teams need timely reporting while headquarters expects consolidated financials on schedule.",
      },
    ],
    solutions: [
      {
        title: "Load-level revenue posting",
        description:
          "Match freight bills to completed loads with clear exception queues for rate disputes and accessorial adjustments.",
      },
      {
        title: "Fuel & maintenance allocation",
        description:
          "Code fuel cards, repairs, and tolls to tractors, trailers, or lanes based on your operating model.",
      },
      {
        title: "Driver settlement runs",
        description:
          "Calculate owner-operator and company driver pay with deductions, advances, and settlement summaries.",
      },
      {
        title: "Customer AR & collections",
        description:
          "Invoice shippers and brokers, track aging by customer, and support collections workflows your team defines.",
      },
      {
        title: "Lane & asset profitability",
        description:
          "Produce monthly margin views by lane, customer, or equipment type to support pricing decisions.",
      },
      {
        title: "Compliance & audit support",
        description:
          "Maintain documentation for IFTA-related schedules, insurance certificates, and carrier compliance filings.",
      },
    ],
  },
  {
    slug: "retail",
    title: "Retail",
    shortTitle: "Retail",
    cardImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=640&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-retail.png",
    description:
      "Store-level reporting, inventory accounting, and multi-location closes for retail and e-commerce brands.",
    summary:
      "We connect POS, inventory, and GL data so finance teams see performance by store, channel, and SKU category.",
    highlights: ["Store P&L", "Inventory controls", "POS reconciliation", "Multi-location close"],
    challenges: [
      {
        title: "POS-to-GL mismatches",
        description:
          "Daily sales, tenders, and discounts from multiple stores rarely tie to the ledger without manual intervention.",
      },
      {
        title: "Inventory shrink and counts",
        description:
          "Cycle counts, markdowns, and shrink adjustments need disciplined timing to keep margins trustworthy.",
      },
      {
        title: "Peak season volume",
        description:
          "Holiday and promotional periods spike transaction volume when internal teams are already stretched thin.",
      },
    ],
    solutions: [
      {
        title: "Daily sales reconciliation",
        description:
          "Reconcile cash, card, and gift card tenders to bank deposits and GL sales accounts by store or channel.",
      },
      {
        title: "Inventory & COGS support",
        description:
          "Assist with cycle count entries, shrink analysis, and category-level margin reporting.",
      },
      {
        title: "Store-level P&L packs",
        description:
          "Deliver monthly store performance summaries with KPI commentary for regional and HQ finance teams.",
      },
      {
        title: "Vendor AP & markdown tracking",
        description:
          "Process vendor invoices, co-op accruals, and promotional markdown schedules with clear audit trails.",
      },
      {
        title: "E-commerce channel splits",
        description:
          "Separate marketplace, DTC, and wholesale revenue with aligned fee and fulfillment cost allocations.",
      },
      {
        title: "Rolling forecast inputs",
        description:
          "Provide clean actuals and trend data to support merchandise and operations planning cycles.",
      },
    ],
  },
  {
    slug: "cpa-firms",
    title: "CPA Firms",
    shortTitle: "CPA Firms",
    cardImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=640&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-cpa.png",
    description:
      "Overflow bookkeeping, write-up, and client accounting support for CPA and advisory practices.",
    summary:
      "Scale client delivery during tax season and year-end without hiring full-time staff or turning away new engagements.",
    highlights: ["Write-up & bookkeeping", "Tax season overflow", "Client-ready workpapers", "White-label delivery"],
    challenges: [
      {
        title: "Seasonal capacity crunch",
        description:
          "January through April demand spikes while recruiting and training staff takes months you do not have.",
      },
      {
        title: "Inconsistent client books",
        description:
          "Messy client files slow review, increase write-downs, and frustrate partners trying to protect margins.",
      },
      {
        title: "Quality control at scale",
        description:
          "Adding offshore or temporary help without documented processes risks rework and client satisfaction issues.",
      },
    ],
    solutions: [
      {
        title: "Monthly write-up & reconciliation",
        description:
          "Complete bank recs, categorization, and adjusting entries to your firm’s standards and review checklist.",
      },
      {
        title: "Year-end close assistance",
        description:
          "Support accruals, depreciation schedules, and trial balance cleanup before partner review.",
      },
      {
        title: "Workpaper preparation",
        description:
          "Organize supporting schedules and tie-outs so your team moves faster through review and sign-off.",
      },
      {
        title: "Payroll & sales tax support",
        description:
          "Handle recurring compliance tasks that consume staff hours during peak filing periods.",
      },
      {
        title: "Client onboarding playbooks",
        description:
          "Follow your chart-of-accounts mapping and documentation templates for consistent handoffs.",
      },
      {
        title: "White-label reporting",
        description:
          "Deliver client-facing financials under your firm branding with professional formatting and commentary.",
      },
    ],
  },
  {
    slug: "restaurant-business",
    title: "Restaurant Business",
    shortTitle: "Restaurants",
    cardImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=640&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-restaurant.png",
    description:
      "Food cost tracking, daily sales closes, and multi-unit reporting for restaurants and hospitality groups.",
    summary:
      "We help operators see prime cost, labor, and cash flow by location so leaders can act on numbers—not guesswork.",
    highlights: ["Prime cost tracking", "Daily sales close", "Tip reporting", "Multi-unit dashboards"],
    challenges: [
      {
        title: "Thin margins under pressure",
        description:
          "Food, labor, and delivery platform fees shift weekly; delayed reporting hides problems until cash is tight.",
      },
      {
        title: "Tip and payroll complexity",
        description:
          "Tip pools, service charges, and multi-rate payroll rules create reconciliation work after every service period.",
      },
      {
        title: "Franchise reporting requirements",
        description:
          "Franchisors and lenders expect standardized packs while each location runs slightly different operations.",
      },
    ],
    solutions: [
      {
        title: "Daily sales & cash reconciliation",
        description:
          "Close POS batches, delivery app payouts, and cash drawers with exception logs for managers.",
      },
      {
        title: "Food & beverage cost analysis",
        description:
          "Track theoretical vs actual usage, waste, and vendor price changes with category-level commentary.",
      },
      {
        title: "Labor cost reporting",
        description:
          "Align timeclock data to payroll and GL with overtime and holiday premium visibility by shift.",
      },
      {
        title: "Tip allocation support",
        description:
          "Assist with tip pool calculations and payroll integration following your policy and local rules.",
      },
      {
        title: "Vendor AP & invoice coding",
        description:
          "Process food, beverage, and supply invoices with consistent GL coding by location and category.",
      },
      {
        title: "Unit-level flash reporting",
        description:
          "Deliver weekly KPI snapshots—sales, guest counts, prime cost, and cash—to owners and area managers.",
      },
    ],
  },
  {
    slug: "amusement-business",
    title: "Amusement Business",
    shortTitle: "Amusement",
    cardImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=640&q=60",
    heroImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=75",
    dashboardImage: "/images/industry-finance-amusement.png",
    description:
      "Seasonal revenue tracking, event accounting, and membership billing for venues and entertainment operators.",
    summary:
      "From ticket sales to concession revenue, we help amusement and entertainment finance teams close cleanly across peak and off-seasons.",
    highlights: ["Seasonal cash flow", "Ticket & POS sales", "Membership billing", "Event P&L"],
    challenges: [
      {
        title: "Highly seasonal revenue",
        description:
          "Cash surges in peak months while fixed costs continue year-round, making forecasting and staffing difficult.",
      },
      {
        title: "Multiple revenue streams",
        description:
          "Tickets, memberships, concessions, parties, and retail each need distinct recognition and reconciliation rules.",
      },
      {
        title: "Pop-up and event complexity",
        description:
          "Temporary installations and special events add short-lived cost centers that must close quickly after wrap-up.",
      },
    ],
    solutions: [
      {
        title: "Ticket & membership revenue",
        description:
          "Reconcile POS, online sales, and prepaid packages with deferred revenue schedules you approve.",
      },
      {
        title: "Concession & retail accounting",
        description:
          "Track inventory, vendor costs, and daily sales for food, merchandise, and arcade operations.",
      },
      {
        title: "Event & party profitability",
        description:
          "Build job-level P&L for private events, school groups, and corporate bookings with deposit tracking.",
      },
      {
        title: "Seasonal cash planning",
        description:
          "Provide rolling cash and revenue views that separate peak-season inflows from year-round overhead.",
      },
      {
        title: "Payroll for hourly staff",
        description:
          "Support high-volume hourly payroll coding, tips where applicable, and location-based labor reporting.",
      },
      {
        title: "Insurance & safety accruals",
        description:
          "Maintain schedules for claims reserves, maintenance contracts, and inspection-related costs.",
      },
    ],
  },
] as const satisfies readonly Industry[];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map((industry) => industry.slug);
}
