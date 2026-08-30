export type AdminField =
  | {
      key: string;
      label: string;
      type: "text" | "url" | "textarea" | "rich" | "checkbox";
      fullWidth?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "select";
      options: string[];
      fullWidth?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "lines";
      hint?: string;
      fullWidth?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "pairs";
      hint?: string;
      fullWidth?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "title_lines";
      hint?: string;
      fullWidth?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "group";
      fields: AdminField[];
      fullWidth?: boolean;
    };

export const sectionFieldSchemas: Record<string, AdminField[]> = {
  hero: [
    { key: "badge", label: "Eyebrow / badge", type: "text" },
    { key: "title", label: "Heading", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "textarea", fullWidth: true },
    { key: "positioning", label: "Supporting text", type: "textarea", fullWidth: true },
    { key: "primaryCta", label: "Primary CTA label", type: "text" },
    { key: "primaryCtaHref", label: "Primary CTA URL", type: "url" },
    { key: "secondaryCta", label: "Secondary CTA label", type: "text" },
    { key: "secondaryCtaHref", label: "Secondary CTA URL", type: "url" },
    {
      key: "titleLines",
      label: "Animated title lines",
      type: "title_lines",
      hint: "One row per line. Separate phrases with |. Prefix a phrase with * for accent color.",
      fullWidth: true,
    },
    {
      key: "dashboard",
      label: "Dashboard panel",
      type: "group",
      fullWidth: true,
      fields: [
        { key: "title", label: "Panel title", type: "text" },
        { key: "balanceLabel", label: "Balance label", type: "text" },
        { key: "balanceValue", label: "Balance value", type: "text" },
        { key: "incomeLabel", label: "Income label", type: "text" },
        { key: "incomeValue", label: "Income value", type: "text" },
        { key: "growthLabel", label: "Growth label", type: "text" },
        { key: "growthValue", label: "Growth value", type: "text" },
        { key: "growthHint", label: "Growth hint", type: "text" },
      ],
    },
  ],
  value_prop: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "titleAccent", label: "Title accent", type: "text" },
    { key: "description", label: "Description", type: "rich", fullWidth: true },
  ],
  services_grid: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "titleAccent", label: "Title accent", type: "text" },
    { key: "description", label: "Description", type: "rich", fullWidth: true },
  ],
  why_atlas: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "titleAccent", label: "Title accent", type: "text" },
    { key: "subtitle", label: "Subtitle", type: "text" },
    { key: "emphasis", label: "Emphasis line", type: "text" },
    { key: "efficiencyLead", label: "Efficiency lead", type: "rich", fullWidth: true },
    {
      key: "intro",
      label: "Intro paragraphs",
      type: "lines",
      hint: "One paragraph per line",
      fullWidth: true,
    },
    {
      key: "mission",
      label: "Mission block",
      type: "group",
      fullWidth: true,
      fields: [
        { key: "title", label: "Mission title", type: "text" },
        { key: "description", label: "Mission description", type: "textarea", fullWidth: true },
      ],
    },
  ],
  technology: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "titleAccent", label: "Title accent", type: "text" },
    { key: "brandPillar", label: "Brand pillar", type: "text" },
    { key: "description", label: "Description", type: "rich", fullWidth: true },
    { key: "preferredLanguageLabel", label: "Language label", type: "text" },
    {
      key: "control",
      label: "Control block",
      type: "group",
      fullWidth: true,
      fields: [
        { key: "eyebrow", label: "Eyebrow", type: "text" },
        { key: "headline", label: "Headline", type: "text" },
        { key: "description", label: "Description", type: "textarea", fullWidth: true },
      ],
    },
    {
      key: "guardrails",
      label: "Guardrails header",
      type: "group",
      fields: [{ key: "title", label: "Title", type: "text" }],
    },
  ],
  industries_served: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "titleAccent", label: "Title accent", type: "text" },
    { key: "description", label: "Description", type: "rich", fullWidth: true },
    { key: "moreLabel", label: "More industries label", type: "text" },
  ],
  how_it_works: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "titleAccent", label: "Title accent", type: "text" },
    { key: "description", label: "Description", type: "rich", fullWidth: true },
  ],
  contact: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "titleAccent", label: "Title accent", type: "text" },
    { key: "lead", label: "Lead", type: "rich", fullWidth: true },
    { key: "submitLabel", label: "Submit button label", type: "text" },
    {
      key: "companySizes",
      label: "Company size options",
      type: "lines",
      hint: "One option per line",
      fullWidth: true,
    },
  ],
  final_cta: [
    { key: "title", label: "Heading", type: "text" },
    { key: "description", label: "Description", type: "rich", fullWidth: true },
    { key: "buttonLabel", label: "Button label", type: "text" },
    { key: "buttonUrl", label: "Button URL", type: "url" },
  ],
  pricing: [
    {
      key: "perks",
      label: "Plan perks",
      type: "lines",
      hint: "One perk per line",
      fullWidth: true,
    },
    {
      key: "paymentMethods",
      label: "Payment methods",
      type: "pairs",
      hint: "One method per line: Name | Detail",
      fullWidth: true,
    },
  ],
};

export const sectionItemSchemas: Record<string, AdminField[]> = {
  pricing_plan: [
    { key: "name", label: "Plan name", type: "text" },
    { key: "price", label: "Price", type: "text" },
    { key: "period", label: "Period", type: "text" },
    { key: "billing", label: "Billing note", type: "text" },
    { key: "description", label: "Description", type: "textarea", fullWidth: true },
    {
      key: "features",
      label: "Features",
      type: "lines",
      hint: "One feature per line",
      fullWidth: true,
    },
    { key: "highlighted", label: "Highlighted plan", type: "checkbox" },
    { key: "cta", label: "Button label", type: "text" },
  ],
  dashboard_pillar: [
    { key: "label", label: "Label", type: "text" },
    { key: "value", label: "Value", type: "text" },
    {
      key: "icon",
      label: "Icon",
      type: "select",
      options: ["people", "process", "technology"],
    },
  ],
  flow_step: [
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea", fullWidth: true },
    {
      key: "icon",
      label: "Icon",
      type: "select",
      options: ["people", "process", "technology", "efficiency", "savings"],
    },
  ],
  service_card: [
    { key: "index", label: "Index", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea", fullWidth: true },
    { key: "href", label: "Link URL", type: "url" },
    { key: "slug", label: "Slug", type: "text" },
  ],
  reason: [
    { key: "index", label: "Index", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea", fullWidth: true },
  ],
  preferred_language: [{ key: "text", label: "Text", type: "text", fullWidth: true }],
  control_pillar: [{ key: "text", label: "Text", type: "text", fullWidth: true }],
  guardrail_use: [{ key: "text", label: "Text", type: "text", fullWidth: true }],
  guardrail_avoid: [{ key: "text", label: "Text", type: "text", fullWidth: true }],
  featured_industry: [
    { key: "index", label: "Index", type: "text" },
    { key: "slug", label: "Slug", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea", fullWidth: true },
    { key: "image", label: "Image URL", type: "url", fullWidth: true },
  ],
  more_industry: [
    { key: "slug", label: "Slug", type: "text" },
    { key: "title", label: "Title", type: "text" },
  ],
  step: [
    { key: "index", label: "Index", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea", fullWidth: true },
  ],
};

export const siteSettingFieldSchemas: Record<string, AdminField[]> = {
  home_anchors: [
    { key: "contact", label: "Contact anchor", type: "url" },
    { key: "services", label: "Services anchor", type: "url" },
    { key: "value", label: "Value anchor", type: "url" },
    { key: "whyUs", label: "Why us anchor", type: "url" },
    { key: "technology", label: "Technology anchor", type: "url" },
    { key: "industries", label: "Industries anchor", type: "url" },
    { key: "security", label: "Security anchor", type: "url" },
    { key: "howItWorks", label: "How it works anchor", type: "url" },
    { key: "features", label: "Features anchor (legacy)", type: "url" },
    { key: "roles", label: "Roles anchor (legacy)", type: "url" },
    { key: "reviews", label: "Reviews anchor (legacy)", type: "url" },
  ],
};

export function getSectionFields(sectionKey: string): AdminField[] {
  return sectionFieldSchemas[sectionKey] ?? [];
}

export function getSectionItemFields(
  itemType: string,
  content: Record<string, unknown>,
): AdminField[] {
  if (sectionItemSchemas[itemType]) return sectionItemSchemas[itemType];
  return inferFieldsFromContent(content);
}

function inferFieldsFromContent(content: Record<string, unknown>): AdminField[] {
  return Object.entries(content)
    .filter(([key]) => key !== "item_type")
    .map(([key, value]) => {
      if (typeof value === "boolean") {
        return { key, label: humanizeKey(key), type: "checkbox" as const };
      }
      if (Array.isArray(value)) {
        return {
          key,
          label: humanizeKey(key),
          type: "lines" as const,
          hint: "One item per line",
          fullWidth: true,
        };
      }
      if (typeof value === "string" && value.length > 120) {
        return { key, label: humanizeKey(key), type: "textarea" as const, fullWidth: true };
      }
      return { key, label: humanizeKey(key), type: "text" as const };
    });
}

function humanizeKey(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function fieldInputName(prefix: string, field: AdminField, parentKey = ""): string {
  const base = parentKey ? `${parentKey}_${field.key}` : field.key;
  return `${prefix}${base}`;
}

function linesToText(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value.map(String).join("\n");
}

function pairsToText(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((entry) => {
      if (entry && typeof entry === "object") {
        const row = entry as Record<string, string>;
        return `${row.name ?? ""} | ${row.detail ?? ""}`.trim();
      }
      return String(entry);
    })
    .join("\n");
}

function titleLinesToText(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value
    .map((row) => {
      if (!Array.isArray(row)) return "";
      return row
        .map((part) => {
          if (part && typeof part === "object") {
            const segment = part as { text?: string; accent?: boolean };
            const text = segment.text ?? "";
            return segment.accent ? `*${text}` : text;
          }
          return String(part);
        })
        .join(" | ");
    })
    .join("\n");
}

function parseLines(raw: string) {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parsePairs(raw: string) {
  return parseLines(raw).map((line) => {
    const [name, ...rest] = line.split("|");
    return { name: name.trim(), detail: rest.join("|").trim() };
  });
}

function parseTitleLines(raw: string) {
  return parseLines(raw).map((line) =>
    line
      .split("|")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        if (part.startsWith("*")) {
          return { text: part.slice(1).trim(), accent: true };
        }
        return { text: part };
      }),
  );
}

export function formatFieldValue(field: AdminField, value: unknown, prefix = ""): string | boolean {
  if (field.type === "checkbox") return value === true;
  if (field.type === "lines") return linesToText(value);
  if (field.type === "pairs") return pairsToText(value);
  if (field.type === "title_lines") return titleLinesToText(value);
  if (field.type === "group") {
    return "";
  }
  if (field.type === "rich" || field.type === "textarea" || field.type === "text" || field.type === "url") {
    return typeof value === "string" ? value : value == null ? "" : String(value);
  }
  if (field.type === "select") {
    return typeof value === "string" ? value : "";
  }
  return "";
}

export function readFieldValue(
  field: AdminField,
  formData: FormData,
  inputName: string,
): unknown {
  if (field.type === "checkbox") {
    return formData.get(inputName) === "on";
  }

  if (field.type === "lines") {
    return parseLines(String(formData.get(inputName) ?? ""));
  }

  if (field.type === "pairs") {
    return parsePairs(String(formData.get(inputName) ?? ""));
  }

  if (field.type === "title_lines") {
    return parseTitleLines(String(formData.get(inputName) ?? ""));
  }

  return String(formData.get(inputName) ?? "");
}

function buildGroupContent(
  fields: AdminField[],
  formData: FormData,
  existing: Record<string, unknown>,
  prefix: string,
  namePrefix: string,
): Record<string, unknown> {
  const next: Record<string, unknown> = { ...existing };

  for (const field of fields) {
    const inputName = namePrefix
      ? `${prefix}${namePrefix}_${field.key}`
      : `${prefix}${field.key}`;

    if (field.type === "group") {
      const nestedExisting = (existing[field.key] as Record<string, unknown>) ?? {};
      next[field.key] = buildGroupContent(
        field.fields,
        formData,
        nestedExisting,
        prefix,
        namePrefix ? `${namePrefix}_${field.key}` : field.key,
      );
      continue;
    }

    next[field.key] = readFieldValue(field, formData, inputName);
  }

  return next;
}

export function buildContentFromFields(
  fields: AdminField[],
  formData: FormData,
  existing: Record<string, unknown>,
  prefix: string,
): Record<string, unknown> {
  return buildGroupContent(fields, formData, existing, prefix, "");
}

export function getItemLabel(content: Record<string, unknown>) {
  const label =
    content.name ??
    content.title ??
    content.text ??
    content.label ??
    content.slug ??
    content.index;
  return label ? String(label) : "Section item";
}
