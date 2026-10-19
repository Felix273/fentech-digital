"use client";

import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, Zap } from "lucide-react";
import type { HomepageContent } from "@/lib/cms-content";

export default function Hero({ content }: { content: HomepageContent }) {
  return (
    <section className="relative pt-[calc(var(--header)+48px)] pb-20 md:pb-28 bg-white border-b border-[#E2E5EA] overflow-hidden">
      {/* Subtle Coinbase background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#0A0B0D 1px, transparent 1px), linear-gradient(to right, #0A0B0D 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#D0DEFF] text-[#0052FF] text-xs font-semibold tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF]"></span>
              </span>
              <span>LIVE SYSTEMS · NAIROBI, KENYA</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-medium tracking-tight text-[#0A0B0D] leading-[1.08] mb-6">
              {content.heroTitle.split("\n").map((line, index, lines) => (
                <Fragment key={`${line}-${index}`}>
                  {index === lines.length - 1 ? (
                    <span className="text-[#0052FF]">{line}</span>
                  ) : (
                    line
                  )}
                  {index < lines.length - 1 ? <br /> : null}
                </Fragment>
              ))}
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-[#5B616E] font-normal leading-relaxed max-w-xl mb-8">
              {content.heroBody}
            </p>

            {/* Pill CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link 
                href="/contact" 
                className="button-primary text-base !py-3.5 !px-7 w-full sm:w-auto"
              >
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link 
                href="/work" 
                className="button-secondary text-base !py-3.5 !px-7 w-full sm:w-auto"
              >
                Explore our work
              </Link>
            </div>

            {/* Trust points */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E2E5EA] text-xs text-[#5B616E] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
                Kenyan-Built Engineering
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
                Bank-Grade Architecture
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#0052FF]" />
                Direct Local Support
              </span>
            </div>
          </div>

          {/* Right Column: Coinbase-Style Live System Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#F5F6F8] rounded-3xl p-6 sm:p-7 border border-[#E2E5EA] shadow-sm">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E2E5EA]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0052FF] flex items-center justify-center text-white">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0A0B0D] tracking-wide uppercase">Core Platform</div>
                    <div className="text-[11px] text-[#5B616E]">FenTech Production Telemetry</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E6F9F0] text-[#027A48] text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]"></span>
                  99.98% UP
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="py-6 space-y-4">
                <div className="bg-white rounded-2xl p-4 border border-[#E2E5EA] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#5B616E] font-medium">M-Pesa API & Core Latency</div>
                    <div className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mt-0.5">42 ms</div>
                  </div>
                  <span className="text-xs font-semibold text-[#027A48] bg-[#E6F9F0] px-2.5 py-1 rounded-full">
                    Optimal
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#E2E5EA] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#5B616E] font-medium">Enterprise Deployments</div>
                    <div className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mt-0.5">50+ Active</div>
                  </div>
                  <span className="text-xs font-semibold text-[#0052FF] bg-[#EEF2FF] px-2.5 py-1 rounded-full">
                    Nairobi & Global
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-[#E2E5EA] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#5B616E] font-medium">Automated Uptime SLA</div>
                    <div className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mt-0.5">24/7/365</div>
                  </div>
                  <span className="text-xs font-semibold text-[#5B616E] bg-[#F5F6F8] px-2.5 py-1 rounded-full">
                    Guaranteed
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#E2E5EA] flex items-center justify-between text-xs text-[#5B616E]">
                <span>Infrastructure: Cloud & Local</span>
                <span className="font-medium text-[#0A0B0D]">ISO / Kenya Compliant</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
