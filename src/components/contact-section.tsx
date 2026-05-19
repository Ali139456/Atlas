"use client";

import { useState } from "react";
import { site } from "@/lib/site-content";

const contactMeta = [
  { label: "Company", value: site.address },
  { label: "Talk to us", value: site.phone },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Hours", value: "Mon–Sat 9am–7pm EST" },
] as const;

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Website inquiry",
          email: email.trim(),
          message: `Consultation request from ${email.trim()}`,
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
      setEmail("");
    } catch {
      setStatus("err");
      setMsg("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative bg-mesh bg-grid section-pad overflow-hidden">
      <div className="blob w-[420px] h-[320px] left-1/2 -translate-x-1/2 top-0 bg-cyan-500/10" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro contact-intro">
          <p className="eyebrow-pill">Let&apos;s start talking</p>
          <h2 className="display-lg section-title text-white">
            Send us your <span className="text-gradient-neon">query</span>
          </h2>
        </div>

        <div className="contact-card">
          <ul className="contact-meta">
            {contactMeta.map((item) => (
              <li key={item.label} className="contact-meta-item">
                <span className="contact-meta-label">{item.label}</span>
                {"href" in item && item.href ? (
                  <a href={item.href} className="contact-meta-value">
                    {item.value}
                  </a>
                ) : (
                  <span className="contact-meta-value">{item.value}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="contact-form-block">
            <div className="contact-form-layout">
              <div
                className="contact-form-copy"
              >
                <h3 className="contact-form-title">Book your free consultation</h3>
                <p className="contact-form-sub">
                  Enter your email. We&apos;ll reach out within one business day.
                </p>
              </div>
              <div className="contact-form-actions">
                <form onSubmit={onSubmit} className="contact-form-grid">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input-neon input-neon--compact"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-neon btn-neon--compact shrink-0 disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending…" : "Schedule call"}
                  </button>
                </form>
                {msg ? (
                  <p
                    className={`contact-form-msg ${status === "ok" ? "is-ok" : "is-err"}`}
                  >
                    {msg}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
