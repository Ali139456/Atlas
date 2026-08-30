import { NextResponse } from "next/server";
import { writeAuditLog } from "@/lib/admin/audit";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createServiceRoleClient } from "@/lib/supabase/admin";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    const client = createServiceRoleClient();
    if (!client) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const altText = String(formData.get("alt_text") ?? "").trim() || null;
    const title = String(formData.get("title") ?? "").trim() || null;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 422 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 422 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
    const storagePath = `media/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await client.storage
      .from("cms-media")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        {
          error:
            uploadError.message.includes("Bucket not found")
              ? "Create a public Supabase Storage bucket named cms-media first."
              : uploadError.message,
        },
        { status: 502 },
      );
    }

    const { data: publicData } = client.storage.from("cms-media").getPublicUrl(storagePath);

    const { data: row, error: insertError } = await client
      .from("media")
      .insert({
        filename: file.name,
        storage_path: storagePath,
        public_url: publicData.publicUrl,
        mime_type: file.type,
        size_bytes: file.size,
        alt_text: altText,
        title,
        created_by: session.adminId,
      })
      .select("id, public_url")
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    await writeAuditLog({
      adminId: session.adminId,
      action: "media_uploaded",
      entityType: "media",
      entityId: row.id,
      entityName: file.name,
    });

    return NextResponse.json({ ok: true, id: row.id, url: row.public_url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await requireAdmin();
    const client = createServiceRoleClient();
    if (!client) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing media id" }, { status: 400 });

    const { data: row } = await client
      .from("media")
      .select("id, storage_path, filename")
      .eq("id", id)
      .maybeSingle();

    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await client.storage.from("cms-media").remove([row.storage_path]);
    await client.from("media").delete().eq("id", id);

    await writeAuditLog({
      adminId: session.adminId,
      action: "media_deleted",
      entityType: "media",
      entityId: id,
      entityName: row.filename,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed";
    const status = message === "Unauthorized" ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
