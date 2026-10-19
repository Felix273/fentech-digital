"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import type { HomepageContent } from "@/lib/cms-content";

export default function CTASection({ content }: { content: HomepageContent }) {
  return (
    <section className="py-20 md:py-28 bg-[#0052FF] text-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 80% 20%, #ffffff 0%, transparent 60%)"
        }}
      />

      <div className="shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-xs">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Engagement</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.12] mb-6">
              {content.ctaTitle}
            </h2>

            <p className="text-lg text-blue-100 font-normal leading-relaxed max-w-xl">
              {content.ctaBody}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#0052FF] font-semibold text-base hover:bg-slate-100 transition-all hover:shadow-lg w-full sm:w-auto"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link 
              href="/work" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#003ECC] text-white font-medium text-base hover:bg-[#0035B0] transition-colors border border-blue-400/20 w-full sm:w-auto"
            >
              <span>Explore client work</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
