import { MediaUploadForm } from "@/components/admin/media-upload-form";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export default async function AdminMediaPage() {
  const client = createServiceRoleClient();
  const { data: media } = client
    ? await client
        .from("media")
        .select("id, filename, public_url, alt_text, mime_type, created_at")
        .order("created_at", { ascending: false })
        .limit(100)
    : { data: [] };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>Media Library</h1>
          <p>
            Upload images to Supabase Storage bucket <code>cms-media</code> (create as public bucket in
            Supabase dashboard if missing).
          </p>
        </div>
      </div>

      <MediaUploadForm />

      <div className="admin-table-wrap">
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Filename</th>
                <th>Preview</th>
                <th>URL</th>
                <th>Alt text</th>
                <th>Type</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {(media ?? []).map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.filename}</strong>
                  </td>
                  <td>
                    {item.mime_type?.startsWith("image/") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.public_url} alt={item.alt_text ?? ""} className="admin-media-thumb" />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <a href={item.public_url} target="_blank" rel="noopener noreferrer">
                      {item.public_url}
                    </a>
                  </td>
                  <td>{item.alt_text ?? "—"}</td>
                  <td>{item.mime_type ?? "—"}</td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!media?.length ? <p className="admin-muted">No media uploaded yet.</p> : null}
    </div>
  );
}
