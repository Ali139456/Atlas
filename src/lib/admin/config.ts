/** Configurable private admin path — set ADMIN_PATH in env (no leading slash). */
export function getAdminPath() {
  const raw = process.env.ADMIN_PATH?.trim().replace(/^\/+|\/+$/g, "");
  return raw && raw.length > 0 ? raw : "atlas-control";
}

export function adminUrl(path = "") {
  const base = getAdminPath();
  const suffix = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${base}${suffix}`;
}

export const ADMIN_SESSION_COOKIE = "atlas_admin_session";

export const CMS_CACHE_TAG = "cms-content";
