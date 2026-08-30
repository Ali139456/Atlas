export type ContactInquiryEmailInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  industry?: string;
  service?: string;
  companySize?: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Remove lines from the message that repeat structured form fields. */
export function normalizeContactMessage(input: ContactInquiryEmailInput) {
  const lines = input.message.split(/\r?\n/);

  const filtered = lines.filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return true;

    const matchers: Array<[string, string | undefined]> = [
      ["phone", input.phone],
      ["industry", input.industry],
      ["company size", input.companySize],
      ["company", input.company],
      ["nature of inquiry", input.service],
      ["inquiry type", input.service],
      ["service", input.service],
    ];

    for (const [label, value] of matchers) {
      if (!value?.trim()) continue;
      const pattern = new RegExp(
        `^${escapeRegex(label)}\\s*[:\\-–—]?\\s*${escapeRegex(value.trim())}\\s*$`,
        "i",
      );
      if (pattern.test(trimmed)) return false;
    }

    return true;
  });

  return filtered.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

type EmailField = { label: string; value: string; href?: string };

function buildFields(input: ContactInquiryEmailInput): EmailField[] {
  const fields: EmailField[] = [
    { label: "Name", value: input.name },
    { label: "Email", value: input.email, href: `mailto:${input.email}` },
  ];

  if (input.company?.trim()) fields.push({ label: "Company", value: input.company.trim() });
  if (input.phone?.trim()) fields.push({ label: "Phone", value: input.phone.trim(), href: `tel:${input.phone.trim()}` });
  if (input.industry?.trim()) fields.push({ label: "Industry", value: input.industry.trim() });
  if (input.service?.trim()) fields.push({ label: "Nature of inquiry", value: input.service.trim() });
  if (input.companySize?.trim()) fields.push({ label: "Company size", value: input.companySize.trim() });

  return fields;
}

export function buildContactInquiryEmail(input: ContactInquiryEmailInput) {
  const message = normalizeContactMessage(input);
  const fields = buildFields(input);
  const subject = `New inquiry from ${input.name}`;

  const textFields = fields.map((field) => `${field.label}: ${field.value}`).join("\n");
  const text = [textFields, message ? `\nMessage:\n${message}` : null].filter(Boolean).join("\n");

  const fieldRows = fields
    .map((field) => {
      const valueHtml = field.href
        ? `<a href="${escapeHtml(field.href)}" style="color:#00e8f0;text-decoration:none;">${escapeHtml(field.value)}</a>`
        : escapeHtml(field.value);

      return `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.08);color:#9fb0c4;font-size:12px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;width:38%;vertical-align:top;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.08);color:#f4fafc;font-size:14px;line-height:1.5;vertical-align:top;">
            ${valueHtml}
          </td>
        </tr>`;
    })
    .join("");

  const messageBlock = message
    ? `
      <tr>
        <td colspan="2" style="padding:18px 14px 8px;color:#8ef9ff;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">
          Message
        </td>
      </tr>
      <tr>
        <td colspan="2" style="padding:0 14px 16px;color:#e8f0f6;font-size:14px;line-height:1.65;white-space:pre-wrap;">
          ${escapeHtml(message)}
        </td>
      </tr>`
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:24px;background:#03060c;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;margin:0 auto;">
      <tr>
        <td style="padding:0 0 16px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0;background:linear-gradient(180deg,#0a1220,#070c16);border:1px solid rgba(0,232,240,0.18);border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:22px 22px 18px;background:linear-gradient(90deg,rgba(0,232,240,0.12),rgba(0,232,240,0.03));border-bottom:1px solid rgba(0,232,240,0.14);">
                <p style="margin:0 0 6px;color:#8ef9ff;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">
                  Atlas Global Finance
                </p>
                <h1 style="margin:0;color:#f4fafc;font-size:22px;line-height:1.25;font-weight:700;">
                  New contact inquiry
                </h1>
                <p style="margin:8px 0 0;color:#9fb0c4;font-size:13px;line-height:1.5;">
                  A visitor submitted the website contact form.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:6px 8px 8px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
                  ${fieldRows}
                  ${messageBlock}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 22px 20px;border-top:1px solid rgba(255,255,255,0.06);">
                <p style="margin:0;color:#9fb0c4;font-size:12px;line-height:1.5;">
                  Reply directly to this email to respond to ${escapeHtml(input.name)}.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}
