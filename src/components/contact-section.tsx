"use client";

import { useState } from "react";
import { FormSelect } from "@/components/form-select";
import { contactForm } from "@/lib/site-content";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    inquiryType: "",
    companySize: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  function updateField(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          phone: form.phone.trim(),
          industry: form.industry,
          service: form.inquiryType,
          companySize: form.companySize,
          message: [
            form.message.trim(),
            form.phone ? `\nPhone: ${form.phone.trim()}` : "",
            form.industry ? `\nIndustry: ${form.industry}` : "",
            form.inquiryType ? `\nNature of inquiry: ${form.inquiryType}` : "",
            form.companySize ? `\nCompany size: ${form.companySize}` : "",
          ]
            .filter(Boolean)
            .join(""),
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("err");
        setMsg(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("ok");
      setMsg("Thanks! We'll be in touch shortly.");
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        industry: "",
        inquiryType: "",
        companySize: "",
        message: "",
      });
    } catch {
      setStatus("err");
      setMsg("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative section-pad overflow-hidden">
      <div className="blob w-[420px] h-[320px] left-1/2 -translate-x-1/2 top-0 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro contact-intro">
          <p className="eyebrow-pill">{contactForm.eyebrow}</p>
          <h2 className="display-lg section-title text-white">
            {contactForm.title}{" "}
            <span className="text-gradient-neon">{contactForm.titleAccent}</span>
          </h2>
          <p className="contact-lead mt-4 text-[var(--muted)]">{contactForm.lead}</p>
        </div>

        <div className="contact-card">
          <div className="contact-form-block contact-form-block--solo">
            <form onSubmit={onSubmit} className="contact-full-form">
              <div className="contact-form-row">
                <label className="contact-field">
                  <span>Full name *</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="input-neon"
                  />
                </label>
                <label className="contact-field">
                  <span>Company</span>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    className="input-neon"
                  />
                </label>
              </div>

              <div className="contact-form-row">
                <label className="contact-field">
                  <span>Email address *</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="input-neon"
                  />
                </label>
                <label className="contact-field">
                  <span>Phone number</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="input-neon"
                  />
                </label>
              </div>

              <div className="contact-form-row">
                <label className="contact-field">
                  <span>Industry</span>
                  <FormSelect
                    value={form.industry}
                    onChange={(value) => updateField("industry", value)}
                    placeholder="Select industry"
                    options={contactForm.industries}
                  />
                </label>
                <label className="contact-field">
                  <span>Nature of inquiry</span>
                  <FormSelect
                    value={form.inquiryType}
                    onChange={(value) => updateField("inquiryType", value)}
                    placeholder="Select inquiry type"
                    options={contactForm.inquiryTypes}
                  />
                </label>
              </div>

              <label className="contact-field">
                <span>Company size (optional)</span>
                <FormSelect
                  value={form.companySize}
                  onChange={(value) => updateField("companySize", value)}
                  placeholder="Select company size"
                  options={contactForm.companySizes}
                />
              </label>

              <label className="contact-field">
                <span>Message *</span>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="input-neon contact-textarea"
                />
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-neon w-full sm:w-auto disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Submit inquiry"}
              </button>

              {msg ? (
                <p className={`contact-form-msg ${status === "ok" ? "is-ok" : "is-err"}`}>{msg}</p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
