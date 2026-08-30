import {
  contactForm,
  finalCta,
  hero,
  homeAnchors,
  howItWorks,
  industriesServed,
  paymentMethods as staticPaymentMethods,
  pricingPerks as staticPricingPerks,
  pricingPlans as staticPricingPlans,
  site,
  siteCta,
  technologySection,
  valueProposition,
  whyChooseUs,
} from "@/lib/site-content";
import { coreServicesData, coreServicesSection, type CoreService } from "@/lib/core-services";
import { industries as staticIndustries, type Industry } from "@/lib/industries";
import {
  footerBarLinks,
  footerLinkGroups,
  footerSocialLinks,
  navCta,
  navIndustryLinks,
  navPrimaryLinks,
  navServicesLinks,
  type NavLink,
} from "@/lib/nav-menu";
import type { SocialIconName } from "@/components/social-icon";
import {
  getCmsBootstrapStatus,
  getDisplayHomeSections,
  getPublishedFooter,
  getPublishedFormOptions,
  getPublishedHomeSections,
  getPublishedIndustries,
  getPublishedNavigation,
  getPublishedPricingSection,
  getPublishedServices,
  getPublishedSiteSettings,
} from "@/lib/cms/queries";
import { isCmsPreviewMode } from "@/lib/cms/preview";

function navTarget(item: {
  link_type: string;
  url: string | null;
  page_slug: string | null;
  anchor: string | null;
}): string {
  if (item.link_type === "url" && item.url) return item.url;
  if (item.link_type === "anchor" && item.anchor) return item.anchor;
  if (item.page_slug === "home") return "/";
  if (item.page_slug) return `/${item.page_slug}`;
  return item.url ?? "/";
}

export async function getPublicNavigation() {
  const bootstrapped = await getCmsBootstrapStatus();
  if (!bootstrapped) {
    return {
      primaryLinks: [...navPrimaryLinks],
      servicesLinks: [...navServicesLinks],
      industryLinks: [...navIndustryLinks],
    };
  }

  const items = await getPublishedNavigation();
  if (!items) {
    return {
      primaryLinks: [...navPrimaryLinks],
      servicesLinks: [...navServicesLinks],
      industryLinks: [...navIndustryLinks],
    };
  }

  const roots = items.filter((i) => !i.parent_id);
  const children = items.filter((i) => i.parent_id);

  const servicesRoot = roots.find((i) => i.label === "Services");
  const industryRoot = roots.find((i) => i.label === "Industry");

  const primaryLinks: NavLink[] = roots
    .filter((i) => i.label !== "Services" && i.label !== "Industry")
    .map((i) => ({
      label: i.label,
      href: navTarget(i),
      external: i.open_in_new_tab,
    }));

  const servicesLinks: NavLink[] = children
    .filter((i) => i.parent_id === servicesRoot?.id)
    .map((i) => ({ label: i.label, href: navTarget(i), external: i.open_in_new_tab }));

  const industryLinks: NavLink[] = children
    .filter((i) => i.parent_id === industryRoot?.id)
    .map((i) => ({ label: i.label, href: navTarget(i), external: i.open_in_new_tab }));

  return { primaryLinks, servicesLinks, industryLinks };
}

export async function getPublicSiteSettings() {
  const bootstrapped = await getCmsBootstrapStatus();
  if (!bootstrapped) return { site, homeAnchors, siteCta };

  const settings = await getPublishedSiteSettings();
  if (!settings) return { site, homeAnchors, siteCta };

  return {
    site: { ...site, ...(settings.site as typeof site) },
    homeAnchors: { ...homeAnchors, ...(settings.home_anchors as typeof homeAnchors) },
    siteCta: { ...siteCta, ...(settings.site_cta as typeof siteCta) },
  };
}

export async function getPublicServices(): Promise<CoreService[]> {
  const bootstrapped = await getCmsBootstrapStatus();
  if (!bootstrapped) return [...coreServicesData];

  const rows = await getPublishedServices();
  if (!rows) return [...coreServicesData];

  return rows.map((row) => ({
    slug: row.slug,
    index: row.index_label,
    shortTitle: row.short_title,
    title: row.title,
    icon: row.icon as CoreService["icon"],
    description: row.description,
    summary: row.summary,
    overview: row.overview,
    capabilities: row.capabilities.map((c: { title: string; description: string }) => ({
      title: c.title,
      description: c.description,
    })),
    outcomes: row.outcomes.map((o: { text: string }) => o.text),
  }));
}

export async function getPublicIndustries(): Promise<Industry[]> {
  const bootstrapped = await getCmsBootstrapStatus();
  if (!bootstrapped) return [...staticIndustries];

  const rows = await getPublishedIndustries();
  if (!rows) return [...staticIndustries];

  return rows.map((row) => ({
    slug: row.slug,
    shortTitle: row.short_title,
    title: row.title,
    description: row.description,
    summary: row.summary,
    cardImage: row.card_image,
    heroImage: row.hero_image,
    dashboardImage: row.dashboard_image,
    highlights: row.highlights.map((h: { text: string }) => h.text),
    challenges: row.challenges.map((c: { title: string; description: string }) => ({
      title: c.title,
      description: c.description,
    })),
    solutions: row.solutions.map((s: { title: string; description: string }) => ({
      title: s.title,
      description: s.description,
    })),
  }));
}

export async function getPublicHomeContent() {
  const bootstrapped = await getCmsBootstrapStatus();
  if (!bootstrapped) {
    return {
      hero,
      valueProposition,
      coreServicesSection,
      whyChooseUs,
      technologySection,
      industriesServed,
      howItWorks,
      contactForm,
      finalCta,
    };
  }

  const preview = await isCmsPreviewMode();
  const sections = preview ? await getDisplayHomeSections(true) : await getPublishedHomeSections();
  if (!sections) {
    return {
      hero,
      valueProposition,
      coreServicesSection,
      whyChooseUs,
      technologySection,
      industriesServed,
      howItWorks,
      contactForm,
      finalCta,
    };
  }

  const byKey = Object.fromEntries(sections.map((s) => [s.section_key, s]));
  const sectionContent = (key: string) => {
    const section = byKey[key];
    if (!section) return {};
    if (preview && section.draft_content) {
      return section.draft_content as Record<string, unknown>;
    }
    return (section.content as Record<string, unknown>) ?? {};
  };

  const itemsOfType = (
    sectionKey: string,
    itemType: string,
  ): Array<Record<string, unknown>> =>
    (byKey[sectionKey]?.section_items ?? [])
      .filter((item: { content: Record<string, unknown> }) => item.content?.item_type === itemType)
      .map((item: { content: Record<string, unknown> }) => item.content);

  const heroSectionContent = sectionContent("hero");
  const heroPillars = (byKey.hero?.section_items ?? [])
    .map((item: { content: Record<string, unknown> }) => item.content)
    .filter((item: Record<string, unknown>) => item.label && item.value)
    .map((item: Record<string, unknown>) => ({
      label: String(item.label),
      value: String(item.value),
      icon: item.icon as (typeof hero.dashboard.pillars)[number]["icon"],
    }));

  const techControlContent = sectionContent("technology").control as
    | Partial<typeof technologySection.control>
    | undefined;
  const techGuardrailsContent = sectionContent("technology").guardrails as
    | Partial<typeof technologySection.guardrails>
    | undefined;
  const preferredLanguage = itemsOfType("technology", "preferred_language").map((item) =>
    String(item.text ?? ""),
  );
  const controlPillars = itemsOfType("technology", "control_pillar").map((item) =>
    String(item.text ?? ""),
  );
  const guardrailUse = itemsOfType("technology", "guardrail_use").map((item) =>
    String(item.text ?? ""),
  );
  const guardrailAvoid = itemsOfType("technology", "guardrail_avoid").map((item) =>
    String(item.text ?? ""),
  );

  const featuredIndustries = itemsOfType("industries_served", "featured_industry");
  const moreIndustries = itemsOfType("industries_served", "more_industry");

  return {
    hero: {
      ...hero,
      ...heroSectionContent,
      dashboard: {
        ...hero.dashboard,
        ...((heroSectionContent.dashboard as Record<string, unknown> | undefined) ?? {}),
        pillars: heroPillars.length ? heroPillars : hero.dashboard.pillars,
      },
    },
    valueProposition: {
      ...valueProposition,
      ...sectionContent("value_prop"),
      flow: (byKey.value_prop?.section_items ?? [])
        .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
        .map((i: { content: (typeof valueProposition.flow)[number] }) => i.content),
    },
    coreServicesSection: { ...coreServicesSection, ...sectionContent("services_grid") },
    whyChooseUs: {
      ...whyChooseUs,
      ...sectionContent("why_atlas"),
      items: (byKey.why_atlas?.section_items ?? [])
        .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
        .map((i: { content: (typeof whyChooseUs.items)[number] }) => i.content),
    },
    technologySection: {
      ...technologySection,
      ...sectionContent("technology"),
      preferredLanguage: (preferredLanguage.length
        ? preferredLanguage
        : [...technologySection.preferredLanguage]) as unknown as typeof technologySection.preferredLanguage,
      control: {
        ...technologySection.control,
        ...(techControlContent ?? {}),
        pillars: (controlPillars.length
          ? controlPillars
          : [...technologySection.control.pillars]) as unknown as typeof technologySection.control.pillars,
      },
      guardrails: {
        ...technologySection.guardrails,
        ...(techGuardrailsContent ?? {}),
        use: (guardrailUse.length
          ? guardrailUse
          : [...technologySection.guardrails.use]) as unknown as typeof technologySection.guardrails.use,
        avoid: (guardrailAvoid.length
          ? guardrailAvoid
          : [...technologySection.guardrails.avoid]) as unknown as typeof technologySection.guardrails.avoid,
      },
    },
    industriesServed: {
      ...industriesServed,
      ...sectionContent("industries_served"),
      items: (featuredIndustries.length
        ? featuredIndustries
        : industriesServed.items) as unknown as typeof industriesServed.items,
      moreItems: moreIndustries.length
        ? moreIndustries.map((item) => ({
            slug: String(item.slug ?? ""),
            title: String(item.title ?? ""),
          }))
        : industriesServed.moreItems,
    },
    howItWorks: {
      ...howItWorks,
      ...sectionContent("how_it_works"),
      steps: (byKey.how_it_works?.section_items ?? [])
        .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
        .map((i: { content: (typeof howItWorks.steps)[number] }) => i.content),
    },
    contactForm: { ...contactForm, ...sectionContent("contact") },
    finalCta: { ...finalCta, ...sectionContent("final_cta") },
  };
}

export async function getPublicFooter() {
  const bootstrapped = await getCmsBootstrapStatus();
  if (!bootstrapped) {
    return { footerBarLinks, footerLinkGroups, footerSocialLinks };
  }

  const footer = await getPublishedFooter();
  if (!footer) return { footerBarLinks, footerLinkGroups, footerSocialLinks };

  return {
    footerBarLinks,
    footerLinkGroups: footer.columns.map((col) => ({
      title: col.title,
      links: col.links.map((link: { label: string; href: string; external?: boolean }) => ({
        label: link.label,
        href: link.href,
        external: link.external,
      })),
    })),
    footerSocialLinks: footer.social.map((s) => ({
      label: s.label,
      href: s.href,
      icon: s.icon as SocialIconName,
    })),
  };
}

export async function getPublicCoreServicesSection() {
  const home = await getPublicHomeContent();
  const services = await getPublicServices();
  return {
    ...home.coreServicesSection,
    items: services.map((service) => ({
      index: service.index,
      title: service.title,
      description: service.description,
      href: `/services/${service.slug}`,
    })),
  };
}

export async function getPublicIndustriesSection() {
  const home = await getPublicHomeContent();
  const industries = await getPublicIndustries();
  const featuredSlugs = new Set(
    ([...(home.industriesServed.items as readonly { slug: string }[])]).map((item) => item.slug),
  );

  const featured =
    featuredSlugs.size > 0
      ? industries.filter((item) => featuredSlugs.has(item.slug))
      : industries.slice(0, 3);

  const more = industries.filter((item) => !featured.some((f) => f.slug === item.slug));

  return {
    ...home.industriesServed,
    items: featured.map((item, index) => ({
      index: String(index + 1).padStart(2, "0"),
      slug: item.slug,
      title: item.title,
      description: item.description,
      image: item.cardImage,
    })),
    moreItems: more.map((item) => ({
      slug: item.slug,
      title: item.title,
    })),
  };
}

export async function getPublicServiceBySlug(slug: string): Promise<CoreService | null> {
  const services = await getPublicServices();
  return services.find((service) => service.slug === slug) ?? null;
}

export async function getPublicIndustryBySlug(slug: string): Promise<Industry | null> {
  const industries = await getPublicIndustries();
  return industries.find((industry) => industry.slug === slug) ?? null;
}

export async function getPublicFormOptions() {
  const bootstrapped = await getCmsBootstrapStatus();
  if (!bootstrapped) {
    return {
      industries: [...contactForm.industries],
      inquiryTypes: [...contactForm.inquiryTypes],
      companySizes: [...contactForm.companySizes],
    };
  }

  const options = await getPublishedFormOptions();
  if (!options) {
    return {
      industries: [...contactForm.industries],
      inquiryTypes: [...contactForm.inquiryTypes],
      companySizes: [...contactForm.companySizes],
    };
  }

  const grouped = (key: string) =>
    options.filter((o) => o.field_key === key).map((o) => o.label);

  return {
    industries: grouped("industry"),
    inquiryTypes: grouped("inquiry_type"),
    companySizes: grouped("company_size"),
  };
}

export type PublicPricingPlan = {
  name: string;
  price: string;
  period: string;
  billing: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
};

export type PublicPricingContent = {
  plans: PublicPricingPlan[];
  perks: string[];
  paymentMethods: { name: string; detail: string }[];
  contactHref: string;
};

function mapPricingPlan(content: Record<string, unknown>, fallbackCta: string): PublicPricingPlan {
  return {
    name: String(content.name ?? ""),
    price: String(content.price ?? ""),
    period: String(content.period ?? ""),
    billing: String(content.billing ?? ""),
    description: String(content.description ?? ""),
    features: Array.isArray(content.features) ? content.features.map(String) : [],
    highlighted: content.highlighted === true,
    cta: String(content.cta ?? fallbackCta),
  };
}

export async function getPublicPricingContent(): Promise<PublicPricingContent> {
  const settings = await getPublicSiteSettings();
  const fallback: PublicPricingContent = {
    plans: staticPricingPlans.map((plan) => ({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      billing: plan.billing,
      description: plan.description,
      features: [...plan.features],
      highlighted: plan.highlighted,
      cta: plan.cta,
    })),
    perks: [...staticPricingPerks],
    paymentMethods: staticPaymentMethods.map((method) => ({ ...method })),
    contactHref: settings.homeAnchors.contact,
  };

  const bootstrapped = await getCmsBootstrapStatus();
  if (!bootstrapped) return fallback;

  const section = await getPublishedPricingSection();
  if (!section) return fallback;

  const content = (section.content as Record<string, unknown>) ?? {};
  const plans = (section.section_items ?? [])
    .map((item: { content: Record<string, unknown> }) =>
      mapPricingPlan(item.content ?? {}, settings.siteCta.label),
    )
    .filter((plan: PublicPricingPlan) => plan.name);

  return {
    plans: plans.length ? plans : fallback.plans,
    perks: Array.isArray(content.perks) ? content.perks.map(String) : fallback.perks,
    paymentMethods: Array.isArray(content.paymentMethods)
      ? content.paymentMethods.map((entry) => {
          const row = entry as { name?: string; detail?: string };
          return { name: String(row.name ?? ""), detail: String(row.detail ?? "") };
        })
      : fallback.paymentMethods,
    contactHref: settings.homeAnchors.contact,
  };
}
