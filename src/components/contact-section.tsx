"use client";

import Image from "next/image";
import { useState } from "react";
import { images, site } from "@/lib/site-content";

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
      setMsg("Thanks — we'll be in touch shortly.");
      setEmail("");
    } catch {
      setStatus("err");
      setMsg("Network error. Please try again.");
    }
  }

  return (
    <section id="contact" className="relative bg-mesh bg-grid section-pad overflow-hidden">
      <div className="blob w-[500px] h-[400px] left-1/2 -translate-x-1/2 top-0 bg-cyan-500/12" aria-hidden />
      <div className="site-container relative z-10">
        <div className="section-intro-center mb-6 sm:mb-8">
          <p className="eyebrow-pill mx-auto">Let&apos;s start talking</p>
          <h2 className="display-lg section-title text-white">
            Send us your <span className="text-gradient-neon">query</span>
          </h2>
        </div>

        <div className="glass-strong contact-split">
          <div className="contact-photo-col">
            <Image
              src={images.contact}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 35vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 lg:bg-gradient-to-r lg:from-black/30 lg:to-black/85" />
          </div>

          <div className="contact-split-inner">
            <div className="space-y-8">
              <div className="contact-info-block">
                <h4>Company</h4>
                <p>{site.address}</p>
              </div>
              <div className="contact-info-block">
                <h4>Talk to us</h4>
                <p>{site.phone}</p>
              </div>
              <div className="contact-info-block">
                <h4>Email us</h4>
                <a href={`mailto:${site.email}`} className="hover:text-[var(--neon)]">
                  {site.email}
                </a>
              </div>
              <div className="contact-info-block">
                <h4>Office hours</h4>
                <p>Mon – Sat: 9:00am – 7:00pm EST</p>
                <p className="text-[var(--muted)]">Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white">Book your free consultation</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Enter your email — we&apos;ll reach out within one business day.
              </p>
              <form onSubmit={onSubmit} className="contact-form-grid mt-6">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-neon"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-neon shrink-0 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Schedule call"}
                </button>
              </form>
              {msg ? (
                <p
                  className={`mt-4 text-sm ${status === "ok" ? "text-[var(--neon)]" : "text-red-400"}`}
                >
                  {msg}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
