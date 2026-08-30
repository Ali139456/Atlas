import { revalidateForPageSlug } from "@/lib/cms/revalidate";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export async function getPageSlugForSectionItem(itemId: string) {
  const client = createServiceRoleClient();
  if (!client) return null;

  const { data } = await client
    .from("section_items")
    .select("page_sections(pages(slug))")
    .eq("id", itemId)
    .maybeSingle();

  const section = data?.page_sections as
    | { pages: { slug: string } | { slug: string }[] | null }
    | { pages: { slug: string } | { slug: string }[] | null }[]
    | null;

  const sectionRow = Array.isArray(section) ? section[0] : section;
  const pages = sectionRow?.pages;
  const page = Array.isArray(pages) ? pages[0] : pages;
  return page?.slug ?? null;
}

export async function getPageSlugForSection(sectionId: string) {
  const client = createServiceRoleClient();
  if (!client) return null;

  const { data } = await client
    .from("page_sections")
    .select("pages(slug)")
    .eq("id", sectionId)
    .maybeSingle();

  const pages = data?.pages as { slug: string } | { slug: string }[] | null;
  const page = Array.isArray(pages) ? pages[0] : pages;
  return page?.slug ?? null;
}

export async function revalidateSectionItemPage(itemId: string) {
  const pageSlug = await getPageSlugForSectionItem(itemId);
  revalidateForPageSlug(pageSlug);
}

export async function revalidateSectionPage(sectionId: string) {
  const pageSlug = await getPageSlugForSection(sectionId);
  revalidateForPageSlug(pageSlug);
}
