"use client";

import { useState } from "react";
import { FormSelect } from "@/components/form-select";
import { contactForm, site, siteCta } from "@/lib/site-content";
import "./contact-section.css";

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

  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(site.addressLine1)}`;

  return (
    <section id="contact" className="contact-sec relative section-pad overflow-hidden">
      <div className="contact-sec__bg-glow" aria-hidden />
      <p className="contact-sec__watermark" aria-hidden>
        CONTACT
      </p>

      <div className="site-container relative z-10">
        <div className="contact-sec__layout">
          <div className="contact-sec__info">
            <p className="eyebrow-pill">{contactForm.eyebrow}</p>
            <h2 className="display-lg contact-sec__title text-white">
              {contactForm.title}{" "}
              <span className="text-gradient-neon">{contactForm.titleAccent}</span>
            </h2>
            <p className="contact-sec__lead">{contactForm.lead}</p>

            <div className="contact-sec__tiles">
              <a href={`mailto:${site.email}`} className="contact-sec__tile">
                <span className="contact-sec__tile-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M4 6h16v12H4z" />
                    <path d="M4 7l8 6 8-6" />
                  </svg>
                </span>
                <span className="contact-sec__tile-copy">
                  <strong>Email us</strong>
                  <em>{site.email}</em>
                </span>
                <span className="contact-sec__tile-go" aria-hidden>
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 12L12 4M12 4H6.5M12 4V9.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>

              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="contact-sec__tile">
                <span className="contact-sec__tile-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A15.5 15.5 0 014.5 6.7 2 2 0 016.5 4.5z" />
                  </svg>
                </span>
                <span className="contact-sec__tile-copy">
                  <strong>Call us</strong>
                  <em>
                    {site.phone}
                    <br />
                    {site.phoneAlt}
                  </em>
                </span>
                <span className="contact-sec__tile-go" aria-hidden>
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 12L12 4M12 4H6.5M12 4V9.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>

              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-sec__tile"
              >
                <span className="contact-sec__tile-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M12 21s7-5.4 7-11a7 7 0 10-14 0c0 5.6 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </span>
                <span className="contact-sec__tile-copy">
                  <strong>Our location</strong>
                  <em>{site.addressLine1}</em>
                </span>
                <span className="contact-sec__tile-go" aria-hidden>
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 12L12 4M12 4H6.5M12 4V9.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <div className="contact-sec__panel">
            <form onSubmit={onSubmit} className="contact-sec__form">
              <div className="contact-sec__row">
                <label className="contact-sec__field">
                  <span className="sr-only">Full name</span>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="contact-sec__input"
                    placeholder="Name"
                    autoComplete="name"
                  />
                </label>
                <label className="contact-sec__field">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="contact-sec__input"
                    placeholder="Email"
                    autoComplete="email"
                  />
                </label>
              </div>

              <div className="contact-sec__row">
                <label className="contact-sec__field">
                  <span className="sr-only">Company</span>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => updateField("company", e.target.value)}
                    className="contact-sec__input"
                    placeholder="Company"
                    autoComplete="organization"
                  />
                </label>
                <label className="contact-sec__field">
                  <span className="sr-only">Phone number</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="contact-sec__input"
                    placeholder="Phone"
                    autoComplete="tel"
                  />
                </label>
              </div>

              <div className="contact-sec__row">
                <label className="contact-sec__field">
                  <span className="sr-only">Industry</span>
                  <FormSelect
                    value={form.industry}
                    onChange={(value) => updateField("industry", value)}
                    placeholder="Industry"
                    options={contactForm.industries}
                  />
                </label>
                <label className="contact-sec__field">
                  <span className="sr-only">Nature of inquiry</span>
                  <FormSelect
                    value={form.inquiryType}
                    onChange={(value) => updateField("inquiryType", value)}
                    placeholder="Nature of inquiry"
                    options={contactForm.inquiryTypes}
                  />
                </label>
              </div>

              <label className="contact-sec__field">
                <span className="sr-only">Message</span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="contact-sec__input contact-sec__textarea"
                  placeholder="Message"
                />
              </label>

              <button
                type="submit"
                disabled={status === "loading"}
                className="contact-sec__submit disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : siteCta.label}
              </button>

              {msg ? (
                <p className={`contact-sec__msg ${status === "ok" ? "is-ok" : "is-err"}`}>{msg}</p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
