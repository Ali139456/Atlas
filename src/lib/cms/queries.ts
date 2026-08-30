import { unstable_cache } from "next/cache";
import { CMS_CACHE_TAG } from "@/lib/admin/config";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { publishedSectionItems } from "@/lib/cms/revalidate";

function getClient() {
  return createServiceRoleClient();
}

export const getPublishedSiteSettings = unstable_cache(
  async () => {
    const client = getClient();
    if (!client) return null;
    const { data } = await client.from("site_settings").select("key, value");
    if (!data?.length) return null;
    return Object.fromEntries(data.map((row) => [row.key, row.value]));
  },
  ["cms-site-settings"],
  { tags: [CMS_CACHE_TAG, "cms-site-settings"], revalidate: 60 },
);

export const getPublishedNavigation = unstable_cache(
  async () => {
    const client = getClient();
    if (!client) return null;
    const { data } = await client
      .from("navigation_items")
      .select("*")
      .eq("status", "published")
      .eq("visible", true)
      .order("sort_order", { ascending: true });
    return data?.length ? data : null;
  },
  ["cms-navigation"],
  { tags: [CMS_CACHE_TAG, "cms-navigation"], revalidate: 60 },
);

export const getPublishedServices = unstable_cache(
  async () => {
    const client = getClient();
    if (!client) return null;
    const { data: services } = await client
      .from("services")
      .select("*")
      .eq("status", "published")
      .eq("visible", true)
      .order("sort_order", { ascending: true });
    if (!services?.length) return null;

    const ids = services.map((s) => s.id);
    const [{ data: capabilities }, { data: outcomes }] = await Promise.all([
      client
        .from("service_capabilities")
        .select("*")
        .in("service_id", ids)
        .eq("status", "published")
        .eq("visible", true)
        .order("sort_order", { ascending: true }),
      client
        .from("service_outcomes")
        .select("*")
        .in("service_id", ids)
        .eq("status", "published")
        .eq("visible", true)
        .order("sort_order", { ascending: true }),
    ]);

    return services.map((service) => ({
      ...service,
      capabilities: (capabilities ?? []).filter((c) => c.service_id === service.id),
      outcomes: (outcomes ?? []).filter((o) => o.service_id === service.id),
    }));
  },
  ["cms-services"],
  { tags: [CMS_CACHE_TAG, "cms-services"], revalidate: 60 },
);

export const getPublishedIndustries = unstable_cache(
  async () => {
    const client = getClient();
    if (!client) return null;
    const { data: industries } = await client
      .from("industries")
      .select("*")
      .eq("status", "published")
      .eq("visible", true)
      .order("sort_order", { ascending: true });
    if (!industries?.length) return null;

    const ids = industries.map((i) => i.id);
    const [{ data: highlights }, { data: challenges }, { data: solutions }] =
      await Promise.all([
        client
          .from("industry_highlights")
          .select("*")
          .in("industry_id", ids)
          .eq("visible", true)
          .order("sort_order", { ascending: true }),
        client
          .from("industry_challenges")
          .select("*")
          .in("industry_id", ids)
          .eq("visible", true)
          .order("sort_order", { ascending: true }),
        client
          .from("industry_solutions")
          .select("*")
          .in("industry_id", ids)
          .eq("visible", true)
          .order("sort_order", { ascending: true }),
      ]);

    return industries.map((industry) => ({
      ...industry,
      highlights: (highlights ?? []).filter((h) => h.industry_id === industry.id),
      challenges: (challenges ?? []).filter((c) => c.industry_id === industry.id),
      solutions: (solutions ?? []).filter((s) => s.industry_id === industry.id),
    }));
  },
  ["cms-industries"],
  { tags: [CMS_CACHE_TAG, "cms-industries"], revalidate: 60 },
);

export const getPublishedHomeSections = unstable_cache(
  async () => {
    const client = getClient();
    if (!client) return null;
    const { data: page } = await client
      .from("pages")
      .select("id")
      .eq("slug", "home")
      .eq("status", "published")
      .maybeSingle();
    if (!page) return null;

    const { data: sections } = await client
      .from("page_sections")
      .select("*, section_items(*)")
      .eq("page_id", page.id)
      .eq("status", "published")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    if (!sections?.length) return null;

    return sections.map((section) => ({
      ...section,
      section_items: publishedSectionItems(section.section_items ?? []),
    }));
  },
  ["cms-home-sections"],
  { tags: [CMS_CACHE_TAG, "cms-home-sections"], revalidate: 60 },
);

export const getPublishedPricingSection = unstable_cache(
  async () => {
    const client = getClient();
    if (!client) return null;

    const { data: page } = await client
      .from("pages")
      .select("id")
      .eq("slug", "pricing")
      .eq("status", "published")
      .maybeSingle();

    if (!page) return null;

    const { data: section } = await client
      .from("page_sections")
      .select("*, section_items(*)")
      .eq("page_id", page.id)
      .eq("section_key", "pricing")
      .eq("status", "published")
      .eq("visible", true)
      .maybeSingle();

    if (!section) return null;

    return {
      ...section,
      section_items: publishedSectionItems(section.section_items ?? []),
    };
  },
  ["cms-pricing"],
  { tags: [CMS_CACHE_TAG, "cms-pricing"], revalidate: 60 },
);

export const getPublishedFormOptions = unstable_cache(
  async () => {
    const client = getClient();
    if (!client) return null;
    const { data } = await client
      .from("form_field_options")
      .select("*")
      .eq("status", "published")
      .eq("visible", true)
      .order("sort_order", { ascending: true });
    return data?.length ? data : null;
  },
  ["cms-form-options"],
  { tags: [CMS_CACHE_TAG, "cms-form-options"], revalidate: 60 },
);

export const getPublishedFooter = unstable_cache(
  async () => {
    const client = getClient();
    if (!client) return null;
    const { data: columns } = await client
      .from("footer_columns")
      .select("*")
      .eq("status", "published")
      .eq("visible", true)
      .order("sort_order", { ascending: true });
    if (!columns?.length) return null;

    const columnIds = columns.map((c) => c.id);
    const { data: links } = await client
      .from("footer_links")
      .select("*")
      .in("column_id", columnIds)
      .eq("status", "published")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    const { data: social } = await client
      .from("social_links")
      .select("*")
      .eq("status", "published")
      .eq("visible", true)
      .order("sort_order", { ascending: true });

    return {
      columns: columns.map((col) => ({
        ...col,
        links: (links ?? []).filter((l) => l.column_id === col.id),
      })),
      social: social ?? [],
    };
  },
  ["cms-footer"],
  { tags: [CMS_CACHE_TAG, "cms-footer"], revalidate: 60 },
);

export const getCmsBootstrapStatus = unstable_cache(
  async () => {
    const client = getClient();
    if (!client) return false;
    const { count } = await client
      .from("site_settings")
      .select("*", { count: "exact", head: true })
      .eq("key", "cms_bootstrapped");
    return (count ?? 0) > 0;
  },
  ["cms-bootstrap-status"],
  { tags: [CMS_CACHE_TAG], revalidate: 30 },
);

export async function getDisplayHomeSections(preview = false) {
  const client = getClient();
  if (!client) return null;

  let pageQuery = client.from("pages").select("id").eq("slug", "home");
  if (!preview) pageQuery = pageQuery.eq("status", "published");
  const { data: page } = await pageQuery.maybeSingle();
  if (!page) return null;

  let sectionsQuery = client
    .from("page_sections")
    .select("*, section_items(*)")
    .eq("page_id", page.id)
    .order("sort_order", { ascending: true });

  if (!preview) {
    sectionsQuery = sectionsQuery.eq("status", "published").eq("visible", true);
  }

  const { data: sections } = await sectionsQuery;
  if (!sections?.length) return null;

  return sections.map((section) => ({
    ...section,
    section_items: (section.section_items ?? []).filter((item: { visible: boolean; status: string }) =>
      preview ? true : item.visible && item.status === "published",
    ),
  }));
}
