"use client";

import Link from "next/link";
import { ArrowRight, Code2, Globe, Smartphone, Cloud, Layers, CheckCircle2 } from "lucide-react";
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
  const otherServices = services.filter(
    (s) => s.id !== customSoftware?.id && s.id !== webDev?.id && s.id !== mobileDev?.id
  ).slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#F5F6F8] border-b border-[#E2E5EA]">
      <div className="shell">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
              <span>{content.servicesLabel || "Core Engineering Capabilities"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12]">
              {content.servicesTitle}
            </h2>
          </div>

          <Link 
            href="/services" 
            className="button-secondary text-sm !py-3 !px-6 self-start md:self-auto"
          >
            <span>View all capabilities</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Asymmetric International Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Card 1: Flagship Software Engineering (Spans 8 cols) */}
          <Link
            href={`/services/${customSoftware.slug}`}
            className="lg:col-span-8 group bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center group-hover:bg-[#0052FF] group-hover:text-white transition-colors duration-200">
                  <Code2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5F6F8] text-[#0052FF] border border-[#E2E5EA]">
                  Flagship Capability
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-4 group-hover:text-[#0052FF] transition-colors">
                {customSoftware.name}
              </h3>

              <p className="text-base text-[#5B616E] font-normal leading-relaxed max-w-2xl mb-8">
                {customSoftware.description}
              </p>

              {/* Feature Highlights Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {customSoftware.features.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#0A0B0D] bg-[#F5F6F8] px-3.5 py-2.5 rounded-xl border border-[#E2E5EA]">
                    <CheckCircle2 className="w-4 h-4 text-[#0052FF] shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E2E5EA] flex items-center gap-2 text-sm font-semibold text-[#0052FF]">
              <span>Explore full software architecture</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </Link>

          {/* Card 2: Mobile Products (Spans 4 cols) */}
          <Link
            href={`/services/${mobileDev.slug}`}
            className="lg:col-span-4 group bg-white rounded-3xl p-8 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center group-hover:bg-[#0052FF] group-hover:text-white transition-colors duration-200 mb-6">
                <Smartphone className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mb-3 group-hover:text-[#0052FF] transition-colors">
                {mobileDev.name}
              </h3>

              <p className="text-sm text-[#5B616E] font-normal leading-relaxed mb-6">
                {mobileDev.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E2E5EA] flex items-center gap-2 text-sm font-semibold text-[#0052FF]">
              <span>Android, iOS & Flutter</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </Link>

          {/* Card 3: Web Development & Portals (Spans 4 cols) */}
          <Link
            href={`/services/${webDev.slug}`}
            className="lg:col-span-4 group bg-white rounded-3xl p-8 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-sm"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center group-hover:bg-[#0052FF] group-hover:text-white transition-colors duration-200 mb-6">
                <Globe className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mb-3 group-hover:text-[#0052FF] transition-colors">
                {webDev.name}
              </h3>

              <p className="text-sm text-[#5B616E] font-normal leading-relaxed mb-6">
                {webDev.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#E2E5EA] flex items-center gap-2 text-sm font-semibold text-[#0052FF]">
              <span>Corporate platforms & portals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </Link>

          {/* Card 4: Cloud & Modern Infrastructure (Spans 8 cols) */}
          <div className="lg:col-span-8 bg-[#0A0B0D] text-white rounded-3xl p-8 sm:p-10 border border-[#1E2025] flex flex-col justify-between">
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

              <p className="text-base text-neutral-400 font-normal leading-relaxed max-w-2xl mb-8">
                We engineer bulletproof cloud backends, microservices, and database pipelines with automated backups, 99.98% uptime, and M-Pesa transaction guarantees.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {["PostgreSQL", "Supabase", "AWS", "Terraform", "Next.js 16", "M-Pesa API", "ODPC Kenya"].map((tag) => (
                  <span key={tag} className="text-xs px-3.5 py-1.5 rounded-full bg-white/[0.08] text-neutral-300 border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Guaranteed Kenyan Data Protection Compliance</span>
              <Link href="/contact" className="text-sm font-semibold text-white hover:text-[#0052FF] transition-colors flex items-center gap-1.5">
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
