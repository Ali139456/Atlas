import { NextResponse } from "next/server";
import { persistSectionItemDraft, publishSectionItem } from "@/lib/admin/save-section-item";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    const formData = await request.formData();
    const intent = String(formData.get("_intent") ?? "save");

    if (intent === "publish") {
      await publishSectionItem(formData, session.adminId);
      return NextResponse.json({ ok: true, published: true });
    }

    await persistSectionItemDraft(formData, session.adminId);
    return NextResponse.json({ ok: true, published: false });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
