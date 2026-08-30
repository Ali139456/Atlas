import { disablePreviewModeAction } from "@/app/admin/actions/preview";
import { isCmsPreviewMode } from "@/lib/cms/preview";

export async function PreviewBanner() {
  const preview = await isCmsPreviewMode();
  if (!preview) return null;

  return (
    <div className="preview-banner">
      <p>Preview mode — showing draft CMS content</p>
      <form action={disablePreviewModeAction}>
        <button type="submit" className="preview-banner__btn">
          Exit preview
        </button>
      </form>
    </div>
  );
}
