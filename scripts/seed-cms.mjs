#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import {
  contactForm,
  coreServicesData,
  coreServicesSection,
  finalCta,
  footerBarLinks,
  footerLinkGroups,
  footerSocialLinks,
  hero,
  homeAnchors,
  howItWorks,
  industries,
  industriesServedFeatured,
  industriesServedMeta,
  paymentMethods,
  pricingPerks,
  pricingPlans,
  site,
  siteCta,
  technologySection,
  valueProposition,
  whyChooseUs,
} from "./cms-seed-data.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(root, ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const FEATURED_INDUSTRY_SLUGS = ["hoa-property-management", "restaurant-business", "cpa-firms"];

function linkFields(href) {
  if (href === "/") {
    return { link_type: "url", url: "/", page_slug: null, anchor: null };
  }
  if (href.startsWith("/#")) {
    return { link_type: "anchor", url: href, anchor: href, page_slug: null };
  }
  if (href.startsWith("/")) {
    return { link_type: "url", url: href, page_slug: null, anchor: null };
  }
  return { link_type: "url", url: href, page_slug: null, anchor: null };
}

async function isBootstrapped() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "cms_bootstrapped")
    .maybeSingle();

  if (error) throw error;
  return Boolean(data?.value?.bootstrapped);
}

async function deleteAll(table) {
  const filter =
    table === "site_settings"
      ? supabase.from(table).delete().neq("key", "__none__")
      : supabase.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
  const { error } = await filter;
  if (error && !error.message.includes("Could not find")) throw error;
}

async function clearTables() {
  const tables = [
    "section_items",
    "page_sections",
    "pages",
    "service_capabilities",
    "service_outcomes",
    "services",
    "industry_highlights",
    "industry_challenges",
    "industry_solutions",
    "industries",
    "footer_links",
    "footer_columns",
    "social_links",
    "form_field_options",
    "cta_blocks",
    "navigation_items",
    "site_settings",
  ];

  for (const table of tables) {
    await deleteAll(table);
    console.log(`  cleared ${table}`);
  }
}

async function seedSiteSettings() {
  const rows = [
    { key: "site", value: site },
    { key: "home_anchors", value: homeAnchors },
    { key: "site_cta", value: siteCta },
  ];

  const { error } = await supabase.from("site_settings").insert(rows);
  if (error) throw error;
}

async function markBootstrapped() {
  const { error } = await supabase.from("site_settings").insert({
    key: "cms_bootstrapped",
    value: { bootstrapped: true, seeded_at: new Date().toISOString() },
  });
  if (error) throw error;
}

async function seedNavigation() {
  const navRoots = [
    { label: "Home", href: "/", sort: 0 },
    { label: "Value", href: homeAnchors.value, sort: 1 },
    { label: "Services", href: null, sort: 2, dropdown: true, mega: true },
    { label: "Industry", href: null, sort: 3, dropdown: true, mega: false },
    { label: "Why Atlas", href: homeAnchors.whyUs, sort: 4 },
    { label: "Technology", href: homeAnchors.technology, sort: 5 },
    { label: "How It Works", href: homeAnchors.howItWorks, sort: 6 },
    { label: "Contact Us", href: homeAnchors.contact, sort: 7 },
  ];

  for (const item of navRoots) {
    const fields = item.dropdown
      ? { link_type: "dropdown", url: null, page_slug: null, anchor: null }
      : linkFields(item.href);

    const { data: parent, error } = await supabase
      .from("navigation_items")
      .insert({
        label: item.label,
        ...fields,
        sort_order: item.sort,
        visible: true,
        mega_menu: item.mega ?? false,
        status: "published",
      })
      .select("id")
      .single();

    if (error) throw error;

    if (item.label === "Services") {
      const children = coreServicesData.map((service, index) => ({
        parent_id: parent.id,
        label: service.shortTitle,
        ...linkFields(`/services/${service.slug}`),
        sort_order: index,
        visible: true,
        mega_menu: false,
        status: "published",
      }));
      const { error: childError } = await supabase.from("navigation_items").insert(children);
      if (childError) throw childError;
    }

    if (item.label === "Industry") {
      const children = industries.map((industry, index) => ({
        parent_id: parent.id,
        label: industry.shortTitle,
        ...linkFields(`/industries/${industry.slug}`),
        sort_order: index,
        visible: true,
        mega_menu: false,
        status: "published",
      }));
      const { error: childError } = await supabase.from("navigation_items").insert(children);
      if (childError) throw childError;
    }
  }
}

async function seedPages() {
  const pageRows = [
    {
      slug: "home",
      title: "Home",
      description: site.tagline,
      show_in_nav: false,
      is_system: true,
      status: "published",
      seo_title: `${site.brand} — ${site.tagline}`,
      seo_description: hero.subtitle,
      published_at: new Date().toISOString(),
    },
    {
      slug: "pricing",
      title: "Pricing",
      description:
        "Flexible monthly outsourcing plans for bookkeeping, AP/AR, payroll, and controller support.",
      show_in_nav: false,
      is_system: true,
      status: "published",
      seo_title: `Pricing — ${site.brand}`,
      seo_description:
        "Flexible monthly outsourcing plans for bookkeeping, AP/AR, payroll, and controller support. Transparent flat-rate pricing.",
      published_at: new Date().toISOString(),
    },
  ];

  const { data, error } = await supabase.from("pages").insert(pageRows).select("id, slug");
  if (error) throw error;
  return Object.fromEntries(data.map((p) => [p.slug, p.id]));
}

async function insertSectionItems(sectionId, items, keyFn = (_, i) => String(i + 1).padStart(2, "0")) {
  if (!items.length) return;
  const rows = items.map((content, index) => ({
    section_id: sectionId,
    item_key: keyFn(content, index),
    sort_order: index,
    visible: true,
    content,
    status: "published",
  }));
  const { error } = await supabase.from("section_items").insert(rows);
  if (error) throw error;
}

async function seedHomeSections(homePageId) {
  const { dashboard, ...heroContentBase } = hero;
  const { pillars, ...dashboardBase } = dashboard;

  const sections = [
    {
      section_key: "hero",
      section_type: "hero",
      sort_order: 0,
      content: {
        ...heroContentBase,
        dashboard: dashboardBase,
      },
      items: pillars.map((p) => ({ ...p, item_type: "dashboard_pillar" })),
    },
    {
      section_key: "value_prop",
      section_type: "value_prop",
      sort_order: 1,
      content: {
        eyebrow: valueProposition.eyebrow,
        title: valueProposition.title,
        titleAccent: valueProposition.titleAccent,
        description: valueProposition.description,
      },
      items: valueProposition.flow.map((item) => ({ ...item, item_type: "flow_step" })),
    },
    {
      section_key: "services_grid",
      section_type: "services_grid",
      sort_order: 2,
      content: coreServicesSection,
      items: coreServicesData.map((service) => ({
        index: service.index,
        title: service.title,
        description: service.description,
        href: `/services/${service.slug}`,
        slug: service.slug,
        item_type: "service_card",
      })),
    },
    {
      section_key: "why_atlas",
      section_type: "why_atlas",
      sort_order: 3,
      content: {
        eyebrow: whyChooseUs.eyebrow,
        title: whyChooseUs.title,
        titleAccent: whyChooseUs.titleAccent,
        subtitle: whyChooseUs.subtitle,
        intro: whyChooseUs.intro,
        emphasis: whyChooseUs.emphasis,
        efficiencyLead: whyChooseUs.efficiencyLead,
        mission: whyChooseUs.mission,
      },
      items: whyChooseUs.items.map((item) => ({ ...item, item_type: "reason" })),
    },
    {
      section_key: "technology",
      section_type: "technology",
      sort_order: 4,
      content: {
        eyebrow: technologySection.eyebrow,
        title: technologySection.title,
        titleAccent: technologySection.titleAccent,
        brandPillar: technologySection.brandPillar,
        description: technologySection.description,
        preferredLanguageLabel: technologySection.preferredLanguageLabel,
        control: technologySection.control,
        guardrails: {
          title: technologySection.guardrails.title,
        },
      },
      items: [
        ...technologySection.preferredLanguage.map((text) => ({
          item_type: "preferred_language",
          text,
        })),
        ...technologySection.control.pillars.map((text) => ({
          item_type: "control_pillar",
          text,
        })),
        ...technologySection.guardrails.use.map((text) => ({
          item_type: "guardrail_use",
          text,
        })),
        ...technologySection.guardrails.avoid.map((text) => ({
          item_type: "guardrail_avoid",
          text,
        })),
      ],
    },
    {
      section_key: "industries_served",
      section_type: "industries_served",
      sort_order: 5,
      content: industriesServedMeta,
      items: [
        ...industriesServedFeatured.map((item) => ({ ...item, item_type: "featured_industry" })),
        ...industries
          .filter((item) => !FEATURED_INDUSTRY_SLUGS.includes(item.slug))
          .map(({ slug, title }) => ({ slug, title, item_type: "more_industry" })),
      ],
    },
    {
      section_key: "how_it_works",
      section_type: "how_it_works",
      sort_order: 6,
      content: {
        eyebrow: howItWorks.eyebrow,
        title: howItWorks.title,
        titleAccent: howItWorks.titleAccent,
        description: howItWorks.description,
      },
      items: howItWorks.steps.map((step) => ({ ...step, item_type: "step" })),
    },
    {
      section_key: "contact",
      section_type: "contact",
      sort_order: 7,
      content: {
        eyebrow: contactForm.eyebrow,
        title: contactForm.title,
        titleAccent: contactForm.titleAccent,
        lead: contactForm.lead,
        companySizes: contactForm.companySizes,
      },
      items: [],
    },
    {
      section_key: "final_cta",
      section_type: "final_cta",
      sort_order: 8,
      content: {
        ...finalCta,
        buttonUrl: siteCta.href,
      },
      items: [],
    },
  ];

  for (const section of sections) {
    const { items, ...sectionRow } = section;
    const { data, error } = await supabase
      .from("page_sections")
      .insert({
        page_id: homePageId,
        ...sectionRow,
        visible: true,
        status: "published",
        published_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) throw error;
    await insertSectionItems(
      data.id,
      items,
      (item) => item.index ?? item.slug ?? item.item_type,
    );
  }
}

async function seedPricingSections(pricingPageId) {
  const { data, error } = await supabase
    .from("page_sections")
    .insert({
      page_id: pricingPageId,
      section_key: "pricing",
      section_type: "pricing",
      sort_order: 0,
      visible: true,
      status: "published",
      published_at: new Date().toISOString(),
      content: {
        perks: pricingPerks,
        paymentMethods,
      },
    })
    .select("id")
    .single();

  if (error) throw error;
  await insertSectionItems(
    data.id,
    pricingPlans.map((plan) => ({ ...plan, item_type: "pricing_plan" })),
    (item) => item.name,
  );
}

async function seedServices() {
  for (const [index, service] of coreServicesData.entries()) {
    const { capabilities, outcomes, ...serviceRow } = service;
    const { data, error } = await supabase
      .from("services")
      .insert({
        slug: serviceRow.slug,
        index_label: serviceRow.index,
        short_title: serviceRow.shortTitle,
        title: serviceRow.title,
        icon: serviceRow.icon,
        description: serviceRow.description,
        summary: serviceRow.summary,
        overview: serviceRow.overview,
        sort_order: index,
        featured: index < 3,
        visible: true,
        status: "published",
        cta_label: siteCta.label,
        cta_url: siteCta.href,
        published_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) throw error;

    if (capabilities.length) {
      const { error: capError } = await supabase.from("service_capabilities").insert(
        capabilities.map((cap, capIndex) => ({
          service_id: data.id,
          title: cap.title,
          description: cap.description,
          sort_order: capIndex,
          visible: true,
          status: "published",
        })),
      );
      if (capError) throw capError;
    }

    if (outcomes.length) {
      const { error: outError } = await supabase.from("service_outcomes").insert(
        outcomes.map((text, outIndex) => ({
          service_id: data.id,
          text,
          sort_order: outIndex,
          visible: true,
          status: "published",
        })),
      );
      if (outError) throw outError;
    }
  }
}

async function seedIndustries() {
  for (const [index, industry] of industries.entries()) {
    const { highlights, challenges, solutions, ...industryRow } = industry;
    const { data, error } = await supabase
      .from("industries")
      .insert({
        slug: industryRow.slug,
        short_title: industryRow.shortTitle,
        title: industryRow.title,
        description: industryRow.description,
        summary: industryRow.summary,
        card_image: industryRow.cardImage,
        hero_image: industryRow.heroImage,
        dashboard_image: industryRow.dashboardImage,
        sort_order: index,
        featured: FEATURED_INDUSTRY_SLUGS.includes(industryRow.slug),
        visible: true,
        status: "published",
        cta_label: siteCta.label,
        cta_url: siteCta.href,
        published_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) throw error;

    if (highlights.length) {
      const { error: hlError } = await supabase.from("industry_highlights").insert(
        highlights.map((text, i) => ({
          industry_id: data.id,
          text,
          sort_order: i,
          visible: true,
        })),
      );
      if (hlError) throw hlError;
    }

    if (challenges.length) {
      const { error: chError } = await supabase.from("industry_challenges").insert(
        challenges.map((item, i) => ({
          industry_id: data.id,
          title: item.title,
          description: item.description,
          sort_order: i,
          visible: true,
        })),
      );
      if (chError) throw chError;
    }

    if (solutions.length) {
      const { error: solError } = await supabase.from("industry_solutions").insert(
        solutions.map((item, i) => ({
          industry_id: data.id,
          title: item.title,
          description: item.description,
          sort_order: i,
          visible: true,
        })),
      );
      if (solError) throw solError;
    }
  }
}

async function seedFooter() {
  for (const [colIndex, group] of footerLinkGroups.entries()) {
    const { data: column, error } = await supabase
      .from("footer_columns")
      .insert({
        title: group.title,
        sort_order: colIndex,
        visible: true,
        status: "published",
      })
      .select("id")
      .single();

    if (error) throw error;

    const { error: linkError } = await supabase.from("footer_links").insert(
      group.links.map((link, linkIndex) => ({
        column_id: column.id,
        label: link.label,
        href: link.href,
        external: Boolean(link.external),
        sort_order: linkIndex,
        visible: true,
        status: "published",
      })),
    );
    if (linkError) throw linkError;
  }

  const { error: socialError } = await supabase.from("social_links").insert(
    footerSocialLinks.map((link, index) => ({
      label: link.label,
      href: link.href,
      icon: link.icon,
      sort_order: index,
      visible: true,
      status: "published",
    })),
  );
  if (socialError) throw socialError;

  // Footer bar links stored as a third column for CMS completeness
  const { data: legalCol, error: legalColError } = await supabase
    .from("footer_columns")
    .insert({
      title: "Legal",
      sort_order: footerLinkGroups.length,
      visible: true,
      status: "published",
    })
    .select("id")
    .single();
  if (legalColError) throw legalColError;

  const { error: barError } = await supabase.from("footer_links").insert(
    footerBarLinks.map((link, index) => ({
      column_id: legalCol.id,
      label: link.label,
      href: link.href,
      external: Boolean(link.external),
      sort_order: index,
      visible: true,
      status: "published",
    })),
  );
  if (barError) throw barError;
}

async function seedFormOptions() {
  const rows = [
    ...contactForm.industries.map((label, index) => ({
      field_key: "industry",
      label,
      sort_order: index,
      visible: true,
      status: "published",
    })),
    ...contactForm.inquiryTypes.map((label, index) => ({
      field_key: "inquiry_type",
      label,
      sort_order: index,
      visible: true,
      status: "published",
    })),
    ...contactForm.companySizes.map((label, index) => ({
      field_key: "company_size",
      label,
      sort_order: index,
      visible: true,
      status: "published",
    })),
  ];

  const { error } = await supabase.from("form_field_options").insert(rows);
  if (error) throw error;
}

async function seedCtaBlocks() {
  const rows = [
    {
      block_key: "site_cta",
      button_label: siteCta.label,
      button_url: siteCta.href,
      visible: true,
      status: "published",
      content: siteCta,
    },
    {
      block_key: "final_cta",
      title: finalCta.title,
      description: finalCta.description,
      button_label: finalCta.buttonLabel,
      button_url: siteCta.href,
      visible: true,
      status: "published",
      content: { ...finalCta, buttonUrl: siteCta.href },
    },
  ];

  const { error } = await supabase.from("cta_blocks").insert(rows);
  if (error) throw error;
}

async function main() {
  console.log("Atlas CMS seed\n");

  if (await isBootstrapped()) {
    console.log("cms_bootstrapped is already set — skipping seed (no tables cleared).");
    console.log("To re-seed, delete the cms_bootstrapped row from site_settings first.");
    return;
  }

  console.log("Clearing CMS tables…");
  await clearTables();

  console.log("Seeding site settings…");
  await seedSiteSettings();

  console.log("Seeding navigation…");
  await seedNavigation();

  console.log("Seeding pages & sections…");
  const pageIds = await seedPages();
  await seedHomeSections(pageIds.home);
  await seedPricingSections(pageIds.pricing);

  console.log("Seeding services…");
  await seedServices();

  console.log("Seeding industries…");
  await seedIndustries();

  console.log("Seeding footer…");
  await seedFooter();

  console.log("Seeding form options…");
  await seedFormOptions();

  console.log("Seeding CTA blocks…");
  await seedCtaBlocks();

  console.log("Marking CMS as bootstrapped…");
  await markBootstrapped();

  console.log("\nCMS seed complete.");
  console.log(`  Navigation roots: 8 (+ ${coreServicesData.length} services + ${industries.length} industries)`);
  console.log(`  Pages: 2 (home, pricing)`);
  console.log(`  Home sections: 9`);
  console.log(`  Services: ${coreServicesData.length}`);
  console.log(`  Industries: ${industries.length}`);
}

main().catch((err) => {
  console.error("\nSeed failed:", err.message ?? err);
  process.exit(1);
});
