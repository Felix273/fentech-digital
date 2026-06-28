"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { servicesData } from "@/lib/data/services";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  serviceRequired: string;
  message: string;
  website: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  serviceRequired: "Software Development",
  message: "",
  website: "",
};

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const update = (name: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Unable to send your message.");

      setForm(initialState);
      setStatus({ type: "success", message: "Thanks—your message is with our team. We’ll respond shortly." });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Unable to send your message." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className={`glass-panel ${compact ? "p-6 md:p-8" : "p-7 md:p-10"}`}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" required>
          <input required minLength={2} className="form-field" value={form.firstName} onChange={(event) => update("firstName", event.target.value)} placeholder="Jane" />
        </Field>
        <Field label="Last name" required>
          <input required minLength={2} className="form-field" value={form.lastName} onChange={(event) => update("lastName", event.target.value)} placeholder="Doe" />
        </Field>
        <Field label="Work email" required>
          <input required type="email" className="form-field" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="jane@company.com" />
        </Field>
        <Field label="Company">
          <input className="form-field" value={form.company} onChange={(event) => update("company", event.target.value)} placeholder="Your company" />
        </Field>
        {!compact ? (
          <Field label="Phone">
            <input className="form-field" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+254..." />
          </Field>
        ) : null}
        <Field label="How can we help?">
          <select className="form-field" value={form.serviceRequired} onChange={(event) => update("serviceRequired", event.target.value)}>
            {servicesData.map((service) => <option key={service.id}>{service.name}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Tell us about your goals" required className="mt-5">
        <textarea required minLength={10} rows={compact ? 4 : 5} className="form-field resize-none" value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="What are you trying to build, improve, or solve?" />
      </Field>

      {status ? (
        <div className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm ${status.type === "success" ? "border-emerald-400/20 bg-emerald-400/8 text-emerald-200" : "border-red-400/20 bg-red-400/8 text-red-200"}`}>
          <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
          {status.message}
        </div>
      ) : null}

      <button type="submit" disabled={submitting} className="button-primary mt-6 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? <><Loader2 size={18} className="animate-spin" /> Sending</> : <>Send enquiry <ArrowRight size={18} /></>}
      </button>
      <p className="mt-4 text-center text-xs leading-5 text-secondary-300">By submitting this form, you agree to be contacted about your enquiry.</p>
    </form>
  );
}

function Field({ label, required, className = "", children }: { label: string; required?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}{required ? <span className="text-blue-600"> *</span> : null}
      </span>
      {children}
    </label>
  );
}
