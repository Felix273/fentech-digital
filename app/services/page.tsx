import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Zap, 
  Code2, Globe, Smartphone, Cloud, Cpu, Sparkles 
} from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: pageMetadata.services.title,
  description: pageMetadata.services.description,
};

const serviceIcons: Record<string, typeof Code2> = {
  "software-development": Code2,
  "web-development": Globe,
  "mobile-development": Smartphone,
  "cloud-solutions": Cloud,
  "cybersecurity": ShieldCheck,
  "ai-automation": Cpu,
};

export default async function ServicesPage() {
  const cms = await getPublicCmsContent();

  return (
    <main className="bg-white">
      
      {/* Services Catalogue Hero */}
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
              <span>{cms.servicesPage.heroLabel || "ENGINEERING DISCIPLINES"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-medium tracking-tight text-[#0A0B0D] leading-[1.08] mb-6">
              {cms.servicesPage.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-[#5B616E] font-normal leading-relaxed mb-8">
              {cms.servicesPage.heroLead}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="button-primary text-base !py-3.5 !px-8">
                <span>Request engineering discovery</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link href="/work" className="button-secondary text-base !py-3.5 !px-8">
                View verified client work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Modular Services Grid */}
      <section className="py-20 md:py-28 bg-[#F5F6F8] border-b border-[#E2E5EA]">
        <div className="shell">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cms.services.map((service, index) => {
              const Icon = serviceIcons[service.slug] || Code2;

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl p-8 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-md group"
                >
                  <div>
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center group-hover:bg-[#0052FF] group-hover:text-white transition-colors duration-200">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-[#5B616E] px-2.5 py-1 rounded-full bg-[#F5F6F8] border border-[#E2E5EA]">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider mb-2">
                      {service.eyebrow}
                    </div>

                    <h2 className="text-2xl font-semibold text-[#0A0B0D] tracking-tight mb-3 group-hover:text-[#0052FF] transition-colors">
                      {service.name}
                    </h2>

                    <p className="text-sm text-[#5B616E] leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-[#F0F2F5]">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#0A0B0D]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0052FF] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Outcomes Badges */}
                    {service.outcomes && service.outcomes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {service.outcomes.slice(0, 2).map((out, i) => (
                          <span key={i} className="text-[11px] font-medium bg-[#F5F6F8] text-[#5B616E] px-2.5 py-1 rounded-lg">
                            {out}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Link */}
                  <div className="pt-6 border-t border-[#E2E5EA]">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm font-semibold text-[#0052FF] flex items-center justify-between group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore full architecture & SLA</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4-Step Engineering Delivery Pipeline */}
      <section className="py-20 md:py-28 bg-[#0A0B0D] text-white border-b border-[#1E2025]">
        <div className="shell">
          
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0052FF]" />
              <span>THE ENGINEERING METHODOLOGY</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.12] mb-6">
              A clear path from operational challenge to working platform.
            </h2>

            <p className="text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl">
              We keep the process disciplined enough for enterprise security, and agile enough for commercial momentum in the Kenyan market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cms.processSteps.map((step) => (
              <div 
                key={step.number}
                className="bg-white/[0.04] border border-white/10 rounded-3xl p-7 hover:border-[#0052FF]/60 hover:bg-white/[0.06] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0052FF]/20 text-[#0052FF] font-mono font-bold text-sm flex items-center justify-center border border-[#0052FF]/30 mb-5">
                    {step.number}
                  </div>

                  <h3 className="text-lg font-semibold text-white tracking-tight mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
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
                Not sure which service fits your roadmap?
              </h2>
              <p className="text-lg text-blue-100 max-w-xl">
                Start with your operational goals. Our systems architects will map the exact combination of software, M-Pesa integration, and cloud infrastructure required.
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
