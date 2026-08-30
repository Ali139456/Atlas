const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "ul",
  "ol",
  "li",
  "a",
  "h2",
  "h3",
  "h4",
  "blockquote",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "target", "rel"]),
};

export function sanitizeRichHtml(input: string): string {
  if (!input.trim()) return "";

  return input
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<(\/?)([\w-]+)([^>]*)>/g, (match, slash, tagName, attrs) => {
      const tag = tagName.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return "";

      if (slash) return `</${tag}>`;

      if (tag === "a") {
        const hrefMatch = /href="([^"]*)"/i.exec(attrs);
        const href = hrefMatch?.[1] ?? "";
        if (!href || /^javascript:/i.test(href)) return "";
        return `<a href="${href.replace(/"/g, "&quot;")}" target="_blank" rel="noopener noreferrer">`;
      }

      return `<${tag}>`;
    });
}

export function stripHtml(input: string): string {
  return input.replace(/<[^>]+>/g, "").trim();
}
