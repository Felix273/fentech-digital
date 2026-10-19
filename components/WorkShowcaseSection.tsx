"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
              <span>{content.workLabel || "Selected Work"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12]">
              {content.workTitle}
            </h2>
          </div>

          <Link 
            href="/work" 
            className="button-secondary text-sm !py-3 !px-6 self-start md:self-auto"
          >
            <span>View all work</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Coinbase Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {caseStudies.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.id}`}
              className="group bg-[#F5F6F8] rounded-3xl p-6 sm:p-8 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-sm"
            >
              <div>
                {/* Media Container */}
                <div className="aspect-[16/10] w-full bg-white rounded-2xl overflow-hidden relative border border-[#E2E5EA] mb-6">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full p-8 flex flex-col justify-between bg-gradient-to-br from-white to-[#F5F6F8]">
                      <span className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider">
                        {project.industry}
                      </span>
                      <div>
                        <strong className="block text-2xl font-medium text-[#0A0B0D] tracking-tight mb-2">
                          {project.title}
                        </strong>
                        {project.results?.[0] && (
                          <span className="inline-block text-xs font-medium text-[#5B616E] bg-white px-3 py-1.5 rounded-full border border-[#E2E5EA]">
                            {project.results[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {project.liveUrl && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#0A0B0D] flex items-center gap-1 shadow-2xs border border-[#E2E5EA]">
                      <span>Live</span>
                      <ExternalLink className="w-3 h-3 text-[#0052FF]" />
                    </div>
                  )}
                </div>

                {/* Tags and Title */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#5B616E]">
                    {project.category}
                  </span>
                  <span className="text-xs text-[#5B616E]">
                    · {project.industry}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mb-3 group-hover:text-[#0052FF] transition-colors">
                  {project.title}
                </h3>

                {project.results?.[0] && (
                  <p className="text-sm text-[#5B616E] font-normal leading-relaxed line-clamp-2">
                    {project.results[0]}
                  </p>
                )}
              </div>

              {/* Card Footer Link */}
              <div className="pt-6 mt-6 border-t border-[#E2E5EA] flex items-center gap-2 text-sm font-semibold text-[#0052FF]">
                <span>Read case study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
