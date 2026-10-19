import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, Check, CheckCircle2, ShieldCheck, 
  Zap, Clock, Sparkles, Building2, MapPin 
} from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
};

export default async function AboutPage() {
  const cms = await getPublicCmsContent();

  return (
    <main className="bg-white">
      
      {/* About Hero Header */}
      <section className="relative pt-[calc(var(--header)+48px)] pb-20 md:pb-24 bg-white border-b border-[#E2E5EA] overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#0A0B0D 1px, transparent 1px), linear-gradient(to right, #0A0B0D 1px, transparent 1px)",
            backgroundSize: "44px 44px"
          }}
        />

        <div className="shell relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2FF] border border-[#D0DEFF] text-[#0052FF] text-xs font-semibold tracking-wide mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{cms.about.heroLabel || "ENGINEERING ETHOS & PRINCIPLES"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-medium tracking-tight text-[#0A0B0D] leading-[1.08] mb-6">
              {cms.about.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-[#5B616E] font-normal leading-relaxed mb-8">
              {cms.about.heroLead}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="button-primary text-base !py-3.5 !px-8">
                <span>Start a conversation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link href="/work" className="button-secondary text-base !py-3.5 !px-8">
                Explore verified case studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The FenTech Engineering Story */}
      <section className="py-20 md:py-28 bg-[#F5F6F8] border-b border-[#E2E5EA]">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left: Media / Visual Frame */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-[#E2E5EA] shadow-md bg-white">
                {cms.about.storyImage ? (
                  <Image
                    src={cms.about.storyImage}
                    alt={cms.about.storyImageAlt || "FenTech Engineering Team Nairobi"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#0A0B0D] p-8 flex flex-col justify-between text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>NAIROBI ENGINEERING NODE</span>
                    </div>

                    <div>
                      <div className="text-2xl font-semibold mb-2">Systems Engineered for Africa</div>
                      <p className="text-xs text-neutral-400">
                        Bridging commercial local market realities with international enterprise discipline.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 text-[11px] text-neutral-400 font-mono">
                      Direct Senior Engineering
                    </div>
                  </div>
                )}

                {/* Floating Nairobi Badge */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E2E5EA] shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#0A0B0D]">Headquartered in Nairobi</div>
                      <div className="text-[11px] text-[#5B616E]">East Africa Standard Time (EAT)</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0052FF]">24/7 SLA</span>
                </div>
              </div>
            </div>

            {/* Right: Narrative Story */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
                <span>{cms.about.storyLabel || "THE FENTECH STANDARD"}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12] mb-6">
                {cms.about.storyTitle}
              </h2>

              <p className="text-lg text-[#0A0B0D] font-medium leading-relaxed mb-4">
                {cms.about.storyLead}
              </p>

              <p className="text-sm sm:text-base text-[#5B616E] leading-relaxed mb-8">
                {cms.about.storyBody}
              </p>

              {/* Verified Principles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-[#E2E5EA]">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0A0B0D]">
                  <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
                  <span>No Outsourcing Layers</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0A0B0D]">
                  <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
                  <span>Kenya Data Protection (ODPC)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0A0B0D]">
                  <Zap className="w-4 h-4 text-[#0052FF]" />
                  <span>M-Pesa Native Integrations</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0A0B0D]">
                  <Clock className="w-4 h-4 text-[#0052FF]" />
                  <span>Sub-second Page Load Speed</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Engineering Disciplines & Differentiators (Coinbase Dark Canvas) */}
      <section className="py-20 md:py-28 bg-[#0A0B0D] text-white border-b border-[#1E2025]">
        <div className="shell">
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF]" />
              <span>HOW WE OPERATE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.12] mb-6">
              Strategy, software engineering, and operational ownership in one team.
            </h2>

            <p className="text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl">
              We do not separate high-level advice from technical execution. We clarify what should be engineered, then build, launch, and support it with discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {cms.differentiators.map((item, index) => (
              <div 
                key={item.title} 
                className="bg-white/[0.04] border border-white/10 rounded-3xl p-8 hover:border-[#0052FF]/60 hover:bg-white/[0.06] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0052FF]/20 text-[#0052FF] font-mono font-bold text-sm flex items-center justify-center border border-[#0052FF]/30 mb-5">
                    0{index + 1}
                  </div>

                  <h3 className="text-xl font-semibold text-white tracking-tight mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Market Metrics Strip */}
      <section className="py-16 md:py-20 bg-white border-b border-[#E2E5EA]">
        <div className="shell">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {cms.metrics.map((metric) => (
              <div 
                key={metric.label} 
                className="bg-[#F5F6F8] rounded-3xl p-6 sm:p-8 border border-[#E2E5EA] shadow-2xs"
              >
                <div className="text-3xl sm:text-4xl font-bold text-[#0A0B0D] tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider mt-2">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Stage Delivery Pipeline */}
      <section className="py-20 md:py-28 bg-[#F5F6F8] border-b border-[#E2E5EA]">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider block mb-2">
                Execution Rhythm
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0A0B0D] leading-[1.12]">
                From commercial ambition to production launch.
              </h2>
            </div>

            <Link href="/contact" className="button-secondary text-sm !py-3 !px-6 self-start md:self-auto">
              <span>Schedule project discovery</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cms.processSteps.map((step) => (
              <div 
                key={step.number}
                className="bg-white rounded-3xl p-7 border border-[#E2E5EA] hover:border-[#0052FF] transition-all flex flex-col justify-between hover:shadow-sm"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#0052FF] font-mono font-bold text-sm flex items-center justify-center mb-5">
                    {step.number}
                  </div>

                  <h3 className="text-lg font-semibold text-[#0A0B0D] tracking-tight mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5B616E] font-normal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Electric Blue CTA Banner */}
      <section className="py-20 md:py-24 bg-[#0052FF] text-white">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.12] mb-4">
                Ready to engineer your next digital platform?
              </h2>
              <p className="text-lg text-blue-100 max-w-xl">
                Book a direct consultation with our systems architects. We analyze your requirements and deliver a clear technical delivery plan.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0052FF] font-semibold text-base hover:bg-slate-100 transition-all shadow-md"
              >
                <span>Book discovery call</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
