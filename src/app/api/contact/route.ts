import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { buildContactInquiryEmail, normalizeContactMessage } from "@/lib/email/contact-inquiry-email";
import { createServiceRoleClient } from "@/lib/supabase/admin";

const bodySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  company: z.string().max(200).optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  industry: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  companySize: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10).max(5000),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { name, email, company, phone, industry, service, companySize, message } = parsed.data;
  const inquiryInput = {
    name,
    email,
    company,
    phone,
    industry,
    service,
    companySize,
    message,
  };
  const cleanedMessage = normalizeContactMessage(inquiryInput);

  let stored = false;
  const admin = createServiceRoleClient();
  if (admin) {
    const { error } = await admin.from("contact_inquiries").insert({
      name,
      email,
      company: company || null,
      phone: phone || null,
      industry: industry || null,
      inquiry_type: service || null,
      company_size: companySize || null,
      service: service || null,
      message: cleanedMessage,
      status: "new",
    });
    if (error) {
      console.error("Supabase insert error:", error.message);
    } else {
      stored = true;
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_NOTIFY_EMAIL;

  let emailed = false;
  if (apiKey && from && to) {
    const resend = new Resend(apiKey);
    const emailContent = buildContactInquiryEmail({ ...inquiryInput, message: cleanedMessage });
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send message. Please try again later." },
        { status: 502 },
      );
    }
    emailed = true;
  }

  if (!stored && !emailed) {
    return NextResponse.json(
      {
        error:
          "Contact is not configured. Add Resend (RESEND_API_KEY, RESEND_FROM_EMAIL, CONTACT_NOTIFY_EMAIL) and/or Supabase service role with contact_inquiries table.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
