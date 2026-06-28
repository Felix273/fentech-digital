"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, Mail, MapPin, Phone } from "lucide-react";
import type { PageIntroContent, PublicCmsContent, SiteSettingsContent } from "@/lib/cms-content";

export default function ContactPageClient({
  content,
  siteSettings,
  services,
}: {
  content: PageIntroContent;
  siteSettings: SiteSettingsContent;
  services: PublicCmsContent["services"];
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const contactItems = [
    {
      label: "Email",
      value: siteSettings.email,
      href: `mailto:${siteSettings.email}`,
      icon: Mail,
    },
    {
      label: "Phone",
      value: siteSettings.phone,
      href: `tel:${siteSettings.phone.replace(/[^\d+]/g, "")}`,
      icon: Phone,
    },
    {
      label: "Location",
      value: siteSettings.location,
      href: null,
      icon: MapPin,
    },
  ];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          serviceRequired: data.get("service"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send message.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thank you. We received your message and will respond with a practical next step.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send message. Please email us directly.");
    }
  }

  return (
    <>
      <section className="contact-hero">
        <div className="shell">
          <div className="label">{content.heroLabel}</div>
          <h1 className="display">{content.heroTitle}</h1>
          <p className="lead">{content.heroLead}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell contact-grid">
          <div>
            <div className="label">Start here</div>
            <h2 className="headline">A useful first conversation starts with context.</h2>
            <p className="lead muted">
              Share the business goal, the workflow slowing you down, or the idea
              you want to launch. We will respond with thoughtful questions and a
              practical next step.
            </p>

            <div className="contact-list">
              {contactItems.map(({ label, value, href, icon: Icon }) => {
                const itemContent = (
                  <>
                    <span><Icon size={18} /> {label}</span>
                    <strong>{value}</strong>
                  </>
                );

                return href ? (
                  <a key={label} href={href}>{itemContent}</a>
                ) : (
                  <div key={label}>{itemContent}</div>
                );
              })}
            </div>
          </div>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />

            <label className="form-field">
              <span>First name *</span>
              <input name="firstName" required minLength={2} />
            </label>
            <label className="form-field">
              <span>Last name *</span>
              <input name="lastName" required minLength={2} />
            </label>
            <label className="form-field">
              <span>Email *</span>
              <input name="email" type="email" required />
            </label>
            <label className="form-field">
              <span>Phone</span>
              <input name="phone" />
            </label>
            <label className="form-field full">
              <span>Company / organization</span>
              <input name="company" />
            </label>
            <label className="form-field full">
              <span>What do you need?</span>
              <select name="service" defaultValue={services[0]?.name || "Software / web project"}>
                {services.map((service) => (
                  <option key={service.id}>{service.name}</option>
                ))}
                <option>Not sure yet</option>
              </select>
            </label>
            <label className="form-field full">
              <span>Project context *</span>
              <textarea name="message" required minLength={10} rows={6} />
            </label>

            {message ? (
              <p className={`form-status ${status === "error" ? "form-error" : ""}`}>{message}</p>
            ) : null}

            <button className="form-submit" type="submit" disabled={status === "loading"}>
              {status === "loading" ? <Loader2 className="animate-spin" size={16} /> : null}
              Send enquiry <ArrowRight size={16} />
            </button>

            <p className="form-note">
              Prefer email? Write to <Link href={`mailto:${siteSettings.email}`}>{siteSettings.email}</Link>.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
