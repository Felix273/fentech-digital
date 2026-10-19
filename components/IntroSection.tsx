"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { HomepageContent, PublicCmsContent } from "@/lib/cms-content";

export default function IntroSection({
  content,
  metrics,
}: {
  content: HomepageContent;
  metrics: PublicCmsContent["metrics"];
}) {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E2E5EA]">
      <div className="shell">
        
        {/* Top Header Block */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.introLabel || "About FenTech"}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12] mb-6">
            {content.introTitle}
          </h2>
          
          <p className="text-lg sm:text-xl text-[#5B616E] font-normal leading-relaxed mb-8 max-w-2xl">
            {content.introLead}
          </p>

          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0052FF] hover:text-[#003ECC] transition-colors group"
          >
            <span>Discover the FenTech engineering standard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Integrated Coinbase Metrics Grid */}
        <div className="bg-[#F5F6F8] rounded-3xl p-8 sm:p-12 border border-[#E2E5EA]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-[#E2E5EA]">
            {metrics.map((metric, index) => (
              <div 
                key={metric.label} 
                className={`${index > 0 ? "pt-6 lg:pt-0 lg:pl-10" : ""}`}
              >
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#0A0B0D]">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#5B616E] mt-3">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
