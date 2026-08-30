import { AdminRichText } from "@/components/admin/admin-rich-text";
import {
  fieldInputName,
  formatFieldValue,
  type AdminField,
} from "@/lib/admin/field-schemas";

function renderField(
  field: AdminField,
  value: unknown,
  prefix: string,
  parentKey = "",
): React.ReactNode {
  const name = fieldInputName(prefix, field, parentKey);
  const className = field.fullWidth ? "admin-field admin-field--full" : "admin-field";

  if (field.type === "group") {
    return (
      <fieldset key={name} className="admin-field admin-field--full admin-field-group">
        <legend>{field.label}</legend>
        <div className="admin-form-grid">
          {field.fields.map((child) =>
            renderField(child, getNestedValue(value, child.key), prefix, field.key),
          )}
        </div>
      </fieldset>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label key={name} className="admin-check">
        <input type="checkbox" name={name} defaultChecked={formatFieldValue(field, value) === true} />
        {field.label}
      </label>
    );
  }

  if (field.type === "rich") {
    return (
      <AdminRichText
        key={name}
        name={name}
        label={field.label}
        defaultValue={String(formatFieldValue(field, value))}
      />
    );
  }

  if (field.type === "select") {
    const current = String(formatFieldValue(field, value));
    return (
      <label key={name} className={className}>
        {field.label}
        <select name={name} defaultValue={current}>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "lines" || field.type === "pairs" || field.type === "title_lines") {
    return (
      <label key={name} className={className}>
        {field.label}
        {field.hint ? <span className="admin-muted"> — {field.hint}</span> : null}
        <textarea name={name} rows={6} defaultValue={String(formatFieldValue(field, value))} />
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label key={name} className={className}>
        {field.label}
        <textarea name={name} rows={4} defaultValue={String(formatFieldValue(field, value))} />
      </label>
    );
  }

  return (
    <label key={name} className={className}>
      {field.label}
      <input type="text" name={name} defaultValue={String(formatFieldValue(field, value))} />
    </label>
  );
}

function getNestedValue(value: unknown, key: string) {
  if (value && typeof value === "object") {
    return (value as Record<string, unknown>)[key];
  }
  return undefined;
}

export function AdminFieldForm({
  fields,
  values,
  prefix = "field_",
}: {
  fields: AdminField[];
  values: Record<string, unknown>;
  prefix?: string;
}) {
  if (!fields.length) {
    return <p className="admin-muted">No editable fields configured for this record.</p>;
  }

  return <>{fields.map((field) => renderField(field, values[field.key], prefix))}</>;
}
