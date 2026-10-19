"use client";

import { Layers } from "lucide-react";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function IndustriesSection({
  content,
  industries,
}: {
  content: HomepageContent;
  industries: PublicCmsContent["industries"];
}) {
  const allMarkets = [...industries, ...industries];

  return (
    <section className="py-20 md:py-24 bg-white border-b border-[#E2E5EA]">
      <div className="shell">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
            <Layers className="w-3.5 h-3.5" />
            <span>{content.industriesLabel || "Markets & Sectors"}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12]">
            {content.industriesTitle}
          </h2>
        </div>

        {/* Marquee Track */}
        <div className="industry-marquee py-3">
          <div className="industry-track gap-4">
            {allMarkets.map((market, index) => (
              <div 
                key={`${market.name}-${index}`} 
                className="bg-[#F5F6F8] rounded-2xl px-6 py-4 border border-[#E2E5EA] text-sm font-semibold text-[#0A0B0D] whitespace-nowrap shadow-2xs hover:border-[#0052FF] transition-colors flex items-center gap-3 shrink-0"
                title={market.description}
              >
                <span className="w-2 h-2 rounded-full bg-[#0052FF]"></span>
                <span>{market.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
