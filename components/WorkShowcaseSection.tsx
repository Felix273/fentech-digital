"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, ExternalLink, ShieldCheck, Zap, TrendingUp, 
  Layers, CheckCircle2, Globe, Sparkles, Server, Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function WorkShowcaseSection({
  content,
  caseStudies,
}: {
  content: HomepageContent;
  caseStudies: PublicCmsContent["caseStudies"];
}) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Systems" },
    { id: "portals", label: "Enterprise Portals & CMS" },
    { id: "fintech", label: "Fintech & Payments" },
    { id: "cloud", label: "Cloud Platforms" },
  ];

  // Primary flagship case study (JemSA Media Tech or first item)
  const flagship = caseStudies[0];
  const secondaryProjects = caseStudies.slice(1);

  const filteredSecondary = secondaryProjects.filter((p) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "portals") return p.category.toLowerCase().includes("agency") || p.category.toLowerCase().includes("portal");
    if (selectedFilter === "fintech") return p.category.toLowerCase().includes("fintech") || p.industry.toLowerCase().includes("finance");
    return true;
  });

  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E2E5EA]">
      <div className="shell">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF2FF] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{content.workLabel || "Verified Engineering Case Studies"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12]">
              {content.workTitle}
            </h2>
          </div>

          <Link 
            href="/work" 
            className="button-secondary text-sm !py-3 !px-6 self-start md:self-auto"
          >
            <span>View all engineering projects</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === cat.id
                  ? "bg-[#0A0B0D] text-white shadow-xs"
                  : "bg-[#F5F6F8] text-[#5B616E] hover:text-[#0A0B0D] hover:bg-[#EAEBED] border border-[#E2E5EA]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FLAGSHIP CASE STUDY: JemSA Media Tech */}
        {flagship && (
          <div className="bg-[#F8FAFC] rounded-3xl p-6 sm:p-10 border border-[#E2E5EA] shadow-sm mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Story & Hard Metrics */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white border border-[#E2E5EA] text-xs font-semibold text-[#0052FF]">
                      {flagship.category}
                    </span>
                    <span className="text-xs font-medium text-[#5B616E]">
                      · {flagship.industry}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-4">
                    {flagship.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#5B616E] leading-relaxed mb-6 font-normal">
                    {flagship.about}
                  </p>

                  {/* Impact Statistics */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white p-4 rounded-2xl border border-[#E2E5EA]">
                      <div className="text-2xl font-bold text-[#0A0B0D] flex items-center gap-1.5">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        <span>3x</span>
                      </div>
                      <div className="text-xs text-[#5B616E] font-medium mt-1">
                        Client Consultation Rate
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#E2E5EA]">
                      <div className="text-2xl font-bold text-[#0A0B0D] flex items-center gap-1.5">
                        <Zap className="w-5 h-5 text-[#0052FF]" />
                        <span>&lt; 350ms</span>
                      </div>
                      <div className="text-xs text-[#5B616E] font-medium mt-1">
                        Edge Page Load Velocity
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-[#E2E5EA] col-span-2 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-[#0A0B0D]">Dynamic Headless CMS</div>
                        <div className="text-[11px] text-[#5B616E]">Instant admin updates without code redeployment</div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        100% Dynamic
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["Next.js 16", "Supabase", "TypeScript", "Tailwind CSS", "Vercel Edge"].map((tech) => (
                      <span key={tech} className="text-xs px-3 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0A0B0D] font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#E2E5EA]">
                  <Link 
                    href={`/work/${flagship.id}`}
                    className="button-primary text-sm !py-2.5 !px-6"
                  >
                    <span>Read architecture review</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>

                  {flagship.liveUrl && (
                    <a
                      href={flagship.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button-secondary text-sm !py-2.5 !px-5"
                    >
                      <span>Visit live site</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: High-Resolution Browser Window Mockup */}
              <div className="lg:col-span-7">
                <div className="bg-[#0A0B0D] rounded-2xl shadow-xl overflow-hidden border border-neutral-800">
                  
                  {/* Browser Window Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-neutral-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                    </div>

                    {/* URL Bar */}
                    <div className="flex items-center gap-2 bg-[#0D1117] px-4 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-300 font-mono w-full max-w-sm justify-between mx-2">
                      <span className="truncate">https://jemsamediatech-x57h.vercel.app</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                    </div>

                    <a
                      href={flagship.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Browser Content Frame */}
                  <div className="aspect-[16/10] w-full bg-[#0D1117] relative p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                    {/* Background subtle glow */}
                    <div className="absolute top-0 right-0 w-72 h-72 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Live Badge in Mockup */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-mono border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>VERIFIED PRODUCTION SYSTEM</span>
                      </div>
                      <span className="text-xs text-neutral-400 font-mono">Kenya CDN Node</span>
                    </div>

                    {/* Mockup Center Visual */}
                    <div className="my-auto py-6 relative z-10">
                      <div className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider mb-2">
                        JemSA Media Tech Agency Hub
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-medium text-white tracking-tight leading-tight mb-3">
                        Digital Agency Web Application & Client CMS
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-400 max-w-md line-clamp-2">
                        Bespoke dark-mode web application with an integrated administrative control room for inquiries, team portfolio, and live agency metrics.
                      </p>
                    </div>

                    {/* Mockup Bottom Strip */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 relative z-10 font-mono">
                      <span>Serverless Edge Runtime</span>
                      <span className="text-emerald-400">99.98% SLA</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECONDARY PROJECTS GRID */}
        {filteredSecondary.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredSecondary.map((project) => (
              <div
                key={project.id}
                className="bg-[#F8FAFC] rounded-3xl p-7 border border-[#E2E5EA] flex flex-col justify-between hover:border-[#0052FF] transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0052FF]">
                      {project.category}
                    </span>
                    <span className="text-xs text-[#5B616E]">
                      {project.industry}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#0A0B0D] tracking-tight mb-3">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#5B616E] leading-relaxed mb-6">
                    {project.about}
                  </p>

                  {project.stats && (
                    <div className="grid grid-cols-2 gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-[#E2E5EA]">
                      {project.stats.slice(0, 2).map((s, idx) => (
                        <div key={idx}>
                          <div className="text-base font-bold text-[#0A0B0D]">{s.val}</div>
                          <div className="text-[11px] text-[#5B616E]">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-[#E2E5EA] flex items-center justify-between text-sm">
                  <Link 
                    href={`/work/${project.id}`}
                    className="font-semibold text-[#0052FF] flex items-center gap-1 hover:translate-x-1 transition-transform"
                  >
                    <span>Inspect architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#5B616E] hover:text-[#0A0B0D] flex items-center gap-1 font-medium"
                    >
                      <span>Live system</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
