"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Loader2, Mail, MapPin, Phone, 
  ShieldCheck, Clock, CheckCircle2, MessageSquare, 
  Building2, Sparkles, Send, Check
} from "lucide-react";
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
  // Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Interactive Scope, Budget & Timeline Pills
  const [selectedScope, setSelectedScope] = useState("Custom Software & ERP");
  const [selectedBudget, setSelectedBudget] = useState("KES 300K – 1M");
  const [selectedTimeline, setSelectedTimeline] = useState("1 – 3 Months");

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const scopeOptions = [
    "Custom Software & ERP",
    "Fintech & M-Pesa Gateway",
    "Mobile App (iOS/Android)",
    "Corporate Web Platform",
    "Cloud Architecture & DevOps",
  ];

  const budgetOptions = [
    { label: "< KES 300K", desc: "MVP / Sprint" },
    { label: "KES 300K – 1M", desc: "Growth System" },
    { label: "KES 1M – 5M", desc: "Enterprise Scale" },
    { label: "> KES 5M", desc: "Custom Infrastructure" },
  ];

  const timelineOptions = [
    "Immediate (< 1 Month)",
    "1 – 3 Months",
    "Roadmap / Flexible",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    // Structured message combining budget, scope and user notes
    const formattedMessage = `[Scope: ${selectedScope}]\n[Estimated Budget: ${selectedBudget}]\n[Target Timeline: ${selectedTimeline}]\n\nClient Project Brief:\n${notes}`;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          company,
          serviceRequired: selectedScope,
          message: formattedMessage,
          website: honeypot, // Honeypot field
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to submit enquiry. Please check your details.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[calc(var(--header)+40px)] pb-24 bg-[#FAFAFC] min-h-screen">
      <div className="shell">
        
        {/* Breadcrumb / Kicker */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#D0DEFF] text-[#0052FF] text-xs font-semibold tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ENTERPRISE DISCOVERY & ENGAGEMENT</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#0A0B0D] leading-[1.08] max-w-3xl">
            Let&apos;s engineer your digital platform.
          </h1>
          <p className="text-lg text-[#5B616E] mt-4 max-w-2xl leading-relaxed">
            Direct consultation with our engineering leads in Nairobi. We analyze your operational workflows, payment gateway needs, and technical roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: Coinbase-Style Institutional Trust Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Guaranteed SLA Card */}
            <div className="bg-white rounded-3xl p-7 border border-[#E2E5EA] shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#0A0B0D]">&lt; 3-Hour Response Guarantee</h2>
                  <p className="text-xs text-[#5B616E]">East Africa Time (EAT) · Monday – Friday</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#5B616E] leading-relaxed">
                Your brief is routed directly to a senior systems architect, not a generic ticketing queue. We provide an initial technical feasibility overview within 3 hours.
              </p>
            </div>

            {/* Privacy & Compliance Assurance */}
            <div className="bg-white rounded-3xl p-7 border border-[#E2E5EA] shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#0A0B0D]">Kenya ODPC 2019 Compliant</h2>
                  <p className="text-xs text-[#5B616E]">Standard Mutual Non-Disclosure</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#5B616E] leading-relaxed">
                All platform architectures, proprietary algorithms, and enterprise inquiries are strictly safeguarded under standard Kenyan data protection laws.
              </p>
            </div>

            {/* Direct Connect Badges */}
            <div className="bg-[#0A0B0D] text-white rounded-3xl p-7 border border-neutral-800">
              <h2 className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-5">
                Direct Engineering Channels
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <a 
                  href={`mailto:${siteSettings.email}`}
                  className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#0052FF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>{siteSettings.email}</span>
                </a>

                <a 
                  href={`tel:${siteSettings.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>{siteSettings.phone} (Direct & WhatsApp)</span>
                </a>

                <div className="flex items-center gap-3 text-neutral-400">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>{siteSettings.location}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Conversion Intake Flow */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E5EA] shadow-xl shadow-black/[0.03]">
              
              {status === "success" ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-200">
                    <Check className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-3">
                    Project Brief Received
                  </h3>

                  <p className="text-sm sm:text-base text-[#5B616E] max-w-md leading-relaxed mb-8">
                    Thank you. Our senior technical lead in Nairobi is reviewing your requirements and will reach out to <strong>{email}</strong> within our 3-hour SLA window.
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-[#F5F6F8] text-[#0A0B0D] border border-[#E2E5EA]">
                    <span>Expected Response: Within 3 Hours</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <input 
                      type="text" 
                      value={honeypot} 
                      onChange={(e) => setHoneypot(e.target.value)} 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />
                  </div>

                  {/* Step 1: Project Scope Selection */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#5B616E] tracking-wider mb-3">
                      1. What are you looking to engineer?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {scopeOptions.map((scope) => (
                        <button
                          key={scope}
                          type="button"
                          onClick={() => setSelectedScope(scope)}
                          className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            selectedScope === scope
                              ? "bg-[#0052FF] text-white shadow-xs"
                              : "bg-[#F5F6F8] text-[#5B616E] hover:text-[#0A0B0D] hover:bg-[#EAEBED] border border-[#E2E5EA]"
                          }`}
                        >
                          {scope}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Estimated Budget Range (KES) */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#5B616E] tracking-wider mb-3">
                      2. Estimated Project Investment
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {budgetOptions.map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setSelectedBudget(item.label)}
                          className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                            selectedBudget === item.label
                              ? "bg-[#EEF2FF] border-[#0052FF] text-[#0052FF]"
                              : "bg-[#F5F6F8] border-[#E2E5EA] text-[#0A0B0D] hover:border-[#cfd5dc]"
                          }`}
                        >
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className="text-[10px] text-[#5B616E] mt-0.5">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Target Timeline */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-[#5B616E] tracking-wider mb-3">
                      3. Target Deployment Window
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {timelineOptions.map((timeline) => (
                        <button
                          key={timeline}
                          type="button"
                          onClick={() => setSelectedTimeline(timeline)}
                          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            selectedTimeline === timeline
                              ? "bg-[#0A0B0D] text-white shadow-xs"
                              : "bg-[#F5F6F8] text-[#5B616E] hover:text-[#0A0B0D] hover:bg-[#EAEBED] border border-[#E2E5EA]"
                          }`}
                        >
                          {timeline}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Contact Details Grid */}
                  <div className="pt-2 border-t border-[#E2E5EA]">
                    <label className="block text-xs uppercase font-semibold text-[#5B616E] tracking-wider mb-4">
                      4. Your Contact Details
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="block text-[11px] font-semibold text-[#0A0B0D] mb-1">First Name *</span>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="e.g. Jane"
                          className="w-full bg-[#F5F6F8] border border-[#E2E5EA] rounded-xl px-4 py-3 text-sm text-[#0A0B0D] outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <span className="block text-[11px] font-semibold text-[#0A0B0D] mb-1">Last Name *</span>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Mwangi"
                          className="w-full bg-[#F5F6F8] border border-[#E2E5EA] rounded-xl px-4 py-3 text-sm text-[#0A0B0D] outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <span className="block text-[11px] font-semibold text-[#0A0B0D] mb-1">Work Email *</span>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@company.co.ke"
                          className="w-full bg-[#F5F6F8] border border-[#E2E5EA] rounded-xl px-4 py-3 text-sm text-[#0A0B0D] outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <span className="block text-[11px] font-semibold text-[#0A0B0D] mb-1">Phone / WhatsApp *</span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+254 7..."
                          className="w-full bg-[#F5F6F8] border border-[#E2E5EA] rounded-xl px-4 py-3 text-sm text-[#0A0B0D] outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <span className="block text-[11px] font-semibold text-[#0A0B0D] mb-1">Company / Organization</span>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Apex Logistics Ltd"
                          className="w-full bg-[#F5F6F8] border border-[#E2E5EA] rounded-xl px-4 py-3 text-sm text-[#0A0B0D] outline-none focus:border-[#0052FF] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 5: Brief description */}
                  <div>
                    <span className="block text-[11px] font-semibold text-[#0A0B0D] mb-1">
                      Project Goals & Technical Requirements *
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe your current system, integration requirements (e.g. M-Pesa, core database), and business objectives..."
                      className="w-full bg-[#F5F6F8] border border-[#E2E5EA] rounded-xl px-4 py-3 text-sm text-[#0A0B0D] outline-none focus:border-[#0052FF] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-4 rounded-xl">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full button-primary text-base !py-4 rounded-full flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 shadow-sm hover:shadow-md"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting to Technical Lead...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#5B616E]">
                    Protected under the Kenya Data Protection Act 2019. Zero spam.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
