"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
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
            <h2 className="display-lg contact-sec__title text-heading">
              {contactForm.title}{" "}
              <span className="text-gradient-neon">{contactForm.titleAccent}</span>
            </h2>
            <p className="contact-sec__lead">{contactForm.lead}</p>

            <div className="contact-sec__tiles">
              <a href={`mailto:${site.email}`} className="contact-sec__tile">
                <span className="contact-sec__tile-icon" aria-hidden>
                  <Mail className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="contact-sec__tile-copy">
                  <strong>Email us</strong>
                  <em>{site.email}</em>
                </span>
                <span className="contact-sec__tile-go" aria-hidden>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
                </span>
              </a>

              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="contact-sec__tile">
                <span className="contact-sec__tile-icon" aria-hidden>
                  <Phone className="h-5 w-5" strokeWidth={1.7} />
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
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
                </span>
              </a>

              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-sec__tile"
              >
                <span className="contact-sec__tile-icon" aria-hidden>
                  <MapPin className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="contact-sec__tile-copy">
                  <strong>Our location</strong>
                  <em>{site.addressLine1}</em>
                </span>
                <span className="contact-sec__tile-go" aria-hidden>
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
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
