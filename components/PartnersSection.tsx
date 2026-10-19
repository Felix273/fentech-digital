"use client";

import { ShieldCheck, Cpu } from "lucide-react";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function PartnersSection({
  content,
  industries,
  technologies,
}: {
  content: HomepageContent;
  industries: PublicCmsContent["industries"];
  technologies: PublicCmsContent["technologies"];
}) {
  const proofPoints = industries.slice(0, 8);

  return (
    <section className="py-20 md:py-28 bg-[#F5F6F8] border-b border-[#E2E5EA]">
      <div className="shell">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{content.partnersLabel || "Enterprise Readiness"}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12]">
            Practical systems for markets that move fast.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {proofPoints.map((item) => (
            <div 
              key={item.name} 
              className="bg-white rounded-3xl p-6 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-sm"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#0052FF] font-semibold text-xs flex items-center justify-center uppercase mb-4 tracking-wider">
                  {item.name.slice(0, 2)}
                </div>
                <h3 className="text-base font-semibold text-[#0A0B0D] tracking-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-[#5B616E] font-normal leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Strip */}
        <div className="bg-white rounded-3xl p-8 border border-[#E2E5EA]">
          <div className="flex items-center gap-2 mb-5">
            <Cpu className="w-4 h-4 text-[#0052FF]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0A0B0D]">
              Supported Tech Stack & Integrations
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {technologies.map((technology) => (
              <span 
                key={technology}
                className="inline-flex items-center px-4 py-2 rounded-full bg-[#F5F6F8] border border-[#E2E5EA] text-xs font-semibold text-[#0A0B0D] hover:border-[#0052FF] hover:text-[#0052FF] transition-colors"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
