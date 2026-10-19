"use client";

import Link from "next/link";
import { 
  ArrowRight, Code2, Globe, Smartphone, Cloud, 
  CheckCircle2, Search, Filter, ShieldCheck, Terminal, 
  CreditCard, Sparkles 
} from "lucide-react";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function ServicesSection({
  content,
  services,
}: {
  content: HomepageContent;
  services: PublicCmsContent["services"];
}) {
  const customSoftware = services.find((s) => s.slug === "software-development") || services[0];
  const webDev = services.find((s) => s.slug === "web-development") || services[1];
  const mobileDev = services.find((s) => s.slug === "mobile-development") || services[2];

  return (
    <section className="py-20 md:py-28 bg-[#F5F6F8] border-b border-[#E2E5EA]">
      <div className="shell">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.servicesLabel || "Core Digital Engineering Capabilities"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12]">
              {content.servicesTitle}
            </h2>
          </div>

          <Link 
            href="/services" 
            className="button-secondary text-sm !py-3 !px-6 self-start md:self-auto"
          >
            <span>View all engineering solutions</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Asymmetric International Bento Grid with Real Product Mockups */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card 1: Custom Software & ERP Systems with Realistic Mockup Table (Spans 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E5EA] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5F6F8] text-[#0052FF] border border-[#E2E5EA]">
                  Custom ERP & Portals
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-3">
                {customSoftware.name}
              </h3>

              <p className="text-sm text-[#5B616E] leading-relaxed mb-6">
                {customSoftware.description}
              </p>

              {/* REAL PRODUCT MOCKUP: Live Operations Table UI */}
              <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E5EA] p-4 mb-6 shadow-2xs">
                {/* Mockup Toolbar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E5EA] text-xs">
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#E2E5EA] text-[#5B616E] w-48">
                    <Search className="w-3.5 h-3.5" />
                    <span>Search members...</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0052FF] bg-[#EEF2FF] px-2.5 py-1 rounded-lg">
                    <Filter className="w-3 h-3" /> All Nairobi Branches
                  </div>
                </div>

                {/* Mockup Rows */}
                <div className="space-y-2 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-[#E2E5EA] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#0A0B0D]">Harambee SACCO Member #4092</div>
                      <div className="text-[10px] text-[#5B616E]">Loan Disbursement · Automatic M-Pesa B2C</div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Approved KES 85,000
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-[#E2E5EA] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#0A0B0D]">Apex Logistics Fleet Unit #12</div>
                      <div className="text-[10px] text-[#5B616E]">Mombasa-Nairobi Route · Real-time Telematics</div>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      In Transit (On Schedule)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E5EA] flex items-center justify-between">
              <span className="text-xs text-[#5B616E]">Designed for complex Kenyan workflow scale</span>
              <Link href={`/services/${customSoftware.slug}`} className="text-sm font-semibold text-[#0052FF] flex items-center gap-1 hover:translate-x-1 transition-transform">
                <span>View architecture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: Mobile Products with Phone UI Bezel (Spans 5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#E2E5EA] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5F6F8] text-[#0A0B0D] border border-[#E2E5EA]">
                  Flutter · iOS · Android
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mb-3">
                {mobileDev.name}
              </h3>

              <p className="text-sm text-[#5B616E] leading-relaxed mb-6">
                {mobileDev.description}
              </p>

              {/* REAL PRODUCT MOCKUP: Mobile Phone Bezel Interface */}
              <div className="bg-[#0A0B0D] rounded-2xl p-4 text-white border border-neutral-800 shadow-sm max-w-[280px] mx-auto mb-4">
                <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3"></div>
                <div className="text-[11px] text-neutral-400">Total Savings & Shares</div>
                <div className="text-lg font-bold text-white mt-0.5">KES 142,500.00</div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[10px]">
                  <div className="bg-white/10 p-2 rounded-lg text-emerald-400 font-semibold">
                    Deposit via M-Pesa
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg text-blue-400 font-semibold">
                    Instant Loan
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E5EA] flex items-center justify-between">
              <span className="text-xs text-[#5B616E]">Offline-first mobile design</span>
              <Link href={`/services/${mobileDev.slug}`} className="text-sm font-semibold text-[#0052FF] flex items-center gap-1 hover:translate-x-1 transition-transform">
                <span>Explore apps</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Web Platforms & Conversion (Spans 5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#E2E5EA] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5F6F8] text-[#0A0B0D] border border-[#E2E5EA]">
                  Next.js 16 · High Conversion
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mb-3">
                {webDev.name}
              </h3>

              <p className="text-sm text-[#5B616E] leading-relaxed mb-6">
                {webDev.description}
              </p>

              {/* REAL PRODUCT MOCKUP: Checkout / Conversion UI */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E5EA] mb-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#0A0B0D] mb-2">
                  <span>Seamless Checkout Modal</span>
                  <span className="text-emerald-600">Sub-second Load</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#E2E5EA] text-xs">
                  <CreditCard className="w-4 h-4 text-[#0052FF]" />
                  <span className="font-semibold text-[#0A0B0D]">M-Pesa Express / Visa / Mastercard</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E5EA] flex items-center justify-between">
              <span className="text-xs text-[#5B616E]">Built for Kenyan buyer trust</span>
              <Link href={`/services/${webDev.slug}`} className="text-sm font-semibold text-[#0052FF] flex items-center gap-1 hover:translate-x-1 transition-transform">
                <span>View web stack</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 4: Cloud & DevOps Infrastructure (Spans 7 cols) */}
          <div className="lg:col-span-7 bg-[#0A0B0D] text-white rounded-3xl p-8 sm:p-10 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#0052FF] flex items-center justify-center">
                  <Cloud className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white border border-white/15">
                  AWS · Supabase · Docker
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
                Cloud Systems & Secure Integrations
              </h3>

              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                We engineer bulletproof cloud backends, microservices, and database pipelines with automated backups, 99.98% uptime, and M-Pesa transaction guarantees.
              </p>

              {/* REAL PRODUCT MOCKUP: Active Terminal Console */}
              <div className="bg-[#161B22] rounded-xl p-3 font-mono text-[11px] text-neutral-300 border border-white/10 mb-4 space-y-1">
                <div className="flex items-center justify-between text-neutral-500 pb-1 border-b border-white/5">
                  <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> cluster-nairobi-01</span>
                  <span className="text-emerald-400">STATUS: HEALTHY</span>
                </div>
                <div className="text-neutral-400">$ kubectl get pods -n fentech-core</div>
                <div className="text-emerald-400">mpesa-worker-7d9f   Running  (100% up · 42ms)</div>
                <div className="text-neutral-400">postgres-primary-0  Running  (PostgreSQL 16)</div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Kenya ODPC Compliant</span>
              <Link href="/contact" className="text-sm font-semibold text-white hover:text-[#0052FF] transition-colors flex items-center gap-1">
                <span>Request cloud audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
