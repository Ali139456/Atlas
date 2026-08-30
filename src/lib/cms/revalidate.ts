import { revalidatePath, revalidateTag } from "next/cache";
import { CMS_CACHE_TAG } from "@/lib/admin/config";

/** Invalidate published CMS caches. Tag revalidation is enough for unstable_cache reads. */
export function revalidateCmsContent(extraTags: string[] = [], paths: string[] = []) {
  revalidateTag(CMS_CACHE_TAG, "max");
  for (const tag of extraTags) {
    revalidateTag(tag, "max");
  }
  for (const path of paths) {
    revalidatePath(path);
  }
}

function publishedSectionItems(items: Array<{ visible: boolean; status: string; sort_order: number }>) {
  return items
    .filter((item) => item.visible && item.status === "published")
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function revalidateForPageSlug(pageSlug: string | null | undefined) {
  if (pageSlug === "pricing") {
    revalidateCmsContent(["cms-pricing"], ["/pricing"]);
    return;
  }

  if (pageSlug === "home") {
    revalidateCmsContent(["cms-home-sections"], ["/"]);
    return;
  }

  revalidateCmsContent(["cms-home-sections", "cms-pricing"], ["/", "/pricing"]);
}

export { publishedSectionItems };
