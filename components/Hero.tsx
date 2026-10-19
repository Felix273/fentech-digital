"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Terminal, CreditCard, LayoutDashboard, Cloud, Check } from "lucide-react";
import type { HomepageContent } from "@/lib/cms-content";

export default function Hero({ content }: { content: HomepageContent }) {
  const [activeConsole, setActiveConsole] = useState<"mpesa" | "cms" | "cloud">("mpesa");

  return (
    <section className="relative pt-[calc(var(--header)+48px)] pb-20 md:pb-28 bg-white border-b border-[#E2E5EA] overflow-hidden">
      {/* Subtle Coinbase background grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#0A0B0D 1px, transparent 1px), linear-gradient(to right, #0A0B0D 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }}
      />

      <div className="shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Institutional Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Live Operational Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#D0DEFF] text-[#0052FF] text-xs font-semibold tracking-wide mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0052FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0052FF]"></span>
              </span>
              <span>ENTERPRISE DIGITAL ENGINEERING · NAIROBI</span>
            </div>

            {/* Dynamic Headline */}
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

            {/* Dual Pill Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link 
                href="/contact" 
                className="button-primary text-base !py-3.5 !px-8 w-full sm:w-auto shadow-sm hover:shadow-md"
              >
                <span>Start a project</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link 
                href="/work" 
                className="button-secondary text-base !py-3.5 !px-8 w-full sm:w-auto"
              >
                Explore verified work
              </Link>
            </div>

            {/* Institutional Compliance & Standards */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E2E5EA] text-xs text-[#5B616E] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
                M-Pesa Daraja 2.0 Native
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
                Kenya Data Protection (ODPC)
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#0052FF]" />
                Sub-Second Edge Speeds
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Engineering Console */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#F5F6F8] rounded-3xl p-6 sm:p-7 border border-[#E2E5EA] shadow-lg shadow-black/[0.03]">
              
              {/* Console Tabs */}
              <div className="flex items-center gap-2 p-1 bg-white rounded-2xl border border-[#E2E5EA] mb-5">
                <button
                  type="button"
                  onClick={() => setActiveConsole("mpesa")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                    activeConsole === "mpesa"
                      ? "bg-[#0052FF] text-white shadow-xs"
                      : "text-[#5B616E] hover:text-[#0A0B0D]"
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>M-Pesa API</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveConsole("cms")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                    activeConsole === "cms"
                      ? "bg-[#0052FF] text-white shadow-xs"
                      : "text-[#5B616E] hover:text-[#0A0B0D]"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Portals</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveConsole("cloud")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                    activeConsole === "cloud"
                      ? "bg-[#0052FF] text-white shadow-xs"
                      : "text-[#5B616E] hover:text-[#0A0B0D]"
                  }`}
                >
                  <Cloud className="w-3.5 h-3.5" />
                  <span>Cloud SLA</span>
                </button>
              </div>

              {/* Tab 1: M-Pesa Simulated Gateway */}
              {activeConsole === "mpesa" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 border border-[#E2E5EA]">
                    <div className="flex items-center justify-between pb-3 border-b border-[#F0F2F5] text-xs">
                      <span className="font-semibold text-[#0A0B0D] flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#0052FF]" />
                        M-Pesa Express (STK Push)
                      </span>
                      <span className="text-[11px] font-semibold text-[#027A48] bg-[#E6F9F0] px-2 py-0.5 rounded-full">
                        HTTP 200 OK
                      </span>
                    </div>
                    <div className="mt-3 font-mono text-[11px] text-[#5B616E] space-y-1">
                      <div className="text-[#0A0B0D]">{"{"}</div>
                      <div className="pl-3">&quot;MerchantRequestID&quot;: &quot;29115-99214-1&quot;,</div>
                      <div className="pl-3">&quot;ResponseCode&quot;: &quot;0&quot;,</div>
                      <div className="pl-3 text-[#0052FF]">&quot;CustomerMessage&quot;: &quot;Success. Request accepted&quot;</div>
                      <div className="text-[#0A0B0D]">{"}"}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-2xl p-4 border border-[#E2E5EA]">
                      <div className="text-[11px] text-[#5B616E] font-medium">Callback Latency</div>
                      <div className="text-2xl font-semibold text-[#0A0B0D] mt-1">42 ms</div>
                      <div className="text-[11px] text-[#027A48] font-semibold mt-0.5">● Sub-second Sync</div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-[#E2E5EA]">
                      <div className="text-[11px] text-[#5B616E] font-medium">Reconciliation</div>
                      <div className="text-2xl font-semibold text-[#0A0B0D] mt-1">100%</div>
                      <div className="text-[11px] text-[#0052FF] font-semibold mt-0.5">PostgreSQL Engine</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Custom Enterprise Portal & CMS */}
              {activeConsole === "cms" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 border border-[#E2E5EA]">
                    <div className="flex items-center justify-between text-xs mb-3 pb-2 border-b border-[#F0F2F5]">
                      <span className="font-semibold text-[#0A0B0D]">JemSA Media Tech Portal</span>
                      <span className="text-[11px] text-[#0052FF] bg-[#EEF2FF] px-2 py-0.5 rounded-full font-semibold">
                        Case Study Live
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[#5B616E]">
                        <span>Edge Deployment</span>
                        <span className="font-semibold text-[#0A0B0D]">Global CDN & Nairobi</span>
                      </div>
                      <div className="flex items-center justify-between text-[#5B616E]">
                        <span>Admin Updates</span>
                        <span className="font-semibold text-[#0A0B0D]">Instant Zero-Downtime</span>
                      </div>
                      <div className="flex items-center justify-between text-[#5B616E]">
                        <span>Conversion Velocity</span>
                        <span className="font-semibold text-[#027A48]">3x Verified Increase</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0A0B0D] text-white rounded-2xl p-4 text-xs font-mono flex items-center justify-between">
                    <div>
                      <div className="text-neutral-400 text-[10px]">PRODUCTION STATUS</div>
                      <div className="text-emerald-400 font-semibold mt-0.5 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" /> 100% Dynamic CMS Running
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-neutral-400">
                      Next.js 16 + Supabase
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Cloud SLA & Security */}
              {activeConsole === "cloud" && (
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 border border-[#E2E5EA]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[#0A0B0D]">Cloud Health & Resilience</span>
                      <span className="text-[11px] font-semibold text-[#027A48] bg-[#E6F9F0] px-2 py-0.5 rounded-full">
                        24/7 Monitored
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="w-full bg-[#F5F6F8] rounded-full h-2 overflow-hidden">
                        <div className="bg-[#0052FF] h-2 rounded-full w-[99.98%]"></div>
                      </div>
                      <div className="flex justify-between text-[11px] text-[#5B616E]">
                        <span>Uptime (Past 365 Days)</span>
                        <span className="font-semibold text-[#0A0B0D]">99.98% SLA</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white rounded-2xl p-3.5 border border-[#E2E5EA]">
                      <div className="text-[10px] text-[#5B616E] uppercase font-semibold">Encryption</div>
                      <div className="font-semibold text-[#0A0B0D] mt-1">TLS 1.3 / AES-256</div>
                    </div>
                    <div className="bg-white rounded-2xl p-3.5 border border-[#E2E5EA]">
                      <div className="text-[10px] text-[#5B616E] uppercase font-semibold">Compliance</div>
                      <div className="font-semibold text-[#0A0B0D] mt-1">Kenya ODPC 2019</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Console Footer */}
              <div className="pt-4 mt-5 border-t border-[#E2E5EA] flex items-center justify-between text-xs text-[#5B616E]">
                <span>Engineered for African Scale</span>
                <span className="font-medium text-[#0A0B0D]">ISO Standard Disciplines</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
