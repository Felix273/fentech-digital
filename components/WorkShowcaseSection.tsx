"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function WorkShowcaseSection({
  content,
  caseStudies,
}: {
  content: HomepageContent;
  caseStudies: PublicCmsContent["caseStudies"];
}) {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E2E5EA]">
      <div className="shell">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
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
            <span>View all client work</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Featured Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {caseStudies.map((project) => (
            <div
              key={project.id}
              className="group bg-[#F5F6F8] rounded-3xl p-7 sm:p-9 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-md"
            >
              <div>
                {/* Visual / Media Area */}
                <div className="aspect-[16/10] w-full bg-white rounded-2xl overflow-hidden relative border border-[#E2E5EA] mb-7 shadow-xs">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full p-8 flex flex-col justify-between bg-gradient-to-br from-white to-[#F5F6F8]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider bg-[#EEF2FF] px-3 py-1 rounded-full">
                          {project.industry}
                        </span>
                        {project.rating && (
                          <span className="text-xs font-semibold text-[#0A0B0D] bg-white px-2.5 py-1 rounded-full border border-[#E2E5EA]">
                            ★ {project.rating} {project.reviewCount && `· ${project.reviewCount}`}
                          </span>
                        )}
                      </div>

                      <div>
                        <strong className="block text-2xl font-semibold text-[#0A0B0D] tracking-tight mb-3">
                          {project.title}
                        </strong>
                        <p className="text-xs text-[#5B616E] font-normal leading-relaxed line-clamp-2">
                          {project.about}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="absolute top-3.5 right-3.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-[#0A0B0D] flex items-center gap-1.5 shadow-sm border border-[#E2E5EA] hover:text-[#0052FF] transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Verified Live System</span>
                      <ExternalLink className="w-3 h-3 text-[#0052FF]" />
                    </a>
                  )}
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0A0B0D]">
                    {project.category}
                  </span>
                  <span className="text-xs text-[#5B616E]">
                    · {project.industry}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mb-4 group-hover:text-[#0052FF] transition-colors">
                  {project.title}
                </h3>

                {/* Real Verified Project Stats (from case-studies.ts) */}
                {project.stats && project.stats.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-6 bg-white rounded-2xl p-4 border border-[#E2E5EA]">
                    {project.stats.slice(0, 2).map((s, idx) => (
                      <div key={idx}>
                        <div className="text-xl font-bold text-[#0A0B0D] tracking-tight flex items-center gap-1">
                          {idx === 0 ? <Zap className="w-4 h-4 text-[#0052FF]" /> : <TrendingUp className="w-4 h-4 text-emerald-600" />}
                          {s.val}
                        </div>
                        <div className="text-[11px] text-[#5B616E] font-medium mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Links */}
              <div className="pt-6 border-t border-[#E2E5EA] flex items-center justify-between text-sm">
                <Link 
                  href={`/work/${project.id}`}
                  className="font-semibold text-[#0052FF] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                >
                  <span>Review full architecture</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#5B616E] hover:text-[#0A0B0D] flex items-center gap-1 font-medium"
                  >
                    <span>Inspect live URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
