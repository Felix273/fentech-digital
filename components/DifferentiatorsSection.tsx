"use client";

import { Check, ShieldCheck } from "lucide-react";
import type { PublicCmsContent } from "@/lib/cms-content";

export default function DifferentiatorsSection({
  differentiators,
}: {
  differentiators: PublicCmsContent["differentiators"];
}) {
  return (
    <section className="py-20 md:py-28 bg-[#0A0B0D] text-white border-b border-[#1E2025]">
      <div className="shell">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF]" />
            <span>Why FenTech</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.12] mb-6">
            Built for how Kenya<br className="hidden sm:block" /> actually works.
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed max-w-2xl">
            We combine local African market knowledge with institutional-grade digital engineering to deliver platforms built for performance, scale, and uptime.
          </p>
        </div>

        {/* Coinbase Institutional Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {differentiators.map((diff, index) => (
            <div 
              key={index} 
              className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 hover:border-[#0052FF]/60 hover:bg-white/[0.06] transition-all duration-200 flex gap-5 items-start"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-[#0052FF]/20 text-[#0052FF] flex items-center justify-center border border-[#0052FF]/30">
                <Check className="w-5 h-5" strokeWidth={2.5} />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight mb-2.5">
                  {diff.title}
                </h3>
                <p className="text-sm text-neutral-400 font-normal leading-relaxed">
                  {diff.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
