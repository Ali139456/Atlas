export function AdminBadge({
  value,
  type = "yesno",
}: {
  value: boolean | string;
  type?: "yesno" | "status";
}) {
  if (type === "status") {
    const status = String(value);
    const published = status === "published";
    return (
      <span className={`admin-badge${published ? " admin-badge--published" : " admin-badge--draft"}`}>
        {status}
      </span>
    );
  }

  const yes = value === true || value === "Yes" || value === "yes";
  return (
    <span className={`admin-badge${yes ? " admin-badge--yes" : " admin-badge--no"}`}>
      {yes ? "Yes" : "No"}
    </span>
  );
}
