import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, ArrowRight, Check, CheckCircle2, 
  ShieldCheck, Clock, Zap, ExternalLink, Sparkles 
} from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cms = await getPublicCmsContent();
  const service = cms.services.find((item) => item.slug === slug);

  if (!service) return { title: "Service not found" };

  return {
    title: `${service.heroTitle} | FenTech Digital`,
    description: service.heroDescription,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const cms = await getPublicCmsContent();
  const service = cms.services.find((item) => item.slug === slug);

  if (!service) notFound();

  const related = cms.services.filter((item) => item.id !== service.id).slice(0, 3);
  const showcase = cms.caseStudies.slice(0, 2);

  return (
    <main className="bg-white">
      
      {/* Detail Hero Section */}
      <section className="relative pt-[calc(var(--header)+40px)] pb-16 md:pb-24 bg-white border-b border-[#E2E5EA]">
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#0A0B0D 1px, transparent 1px), linear-gradient(to right, #0A0B0D 1px, transparent 1px)",
            backgroundSize: "44px 44px"
          }}
        />

        <div className="shell relative z-10">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B616E] hover:text-[#0052FF] mb-8 bg-[#F5F6F8] px-3.5 py-1.5 rounded-full border border-[#E2E5EA] transition-colors"
          >
            <ArrowLeft size={14} /> Back to all capabilities
          </Link>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0052FF] text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.eyebrow}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-[#0A0B0D] leading-[1.08] mb-6">
              {service.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-[#5B616E] font-normal leading-relaxed mb-8">
              {service.heroDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="button-primary text-base !py-3.5 !px-8">
                <span>Discuss this architecture</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Technical Architecture Deep-Dive */}
      <section className="py-20 md:py-28 bg-[#FAFAFC] border-b border-[#E2E5EA]">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Sticky Architecture Navigator & SLA */}
            <aside className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header)+24px)] space-y-6">
              
              <div className="bg-white rounded-3xl p-7 border border-[#E2E5EA] shadow-xs">
                <span className="text-xs uppercase font-semibold text-[#5B616E] tracking-wider block mb-2">
                  The Enterprise Objective
                </span>
                <h3 className="text-xl font-semibold text-[#0A0B0D] tracking-tight mb-4">
                  {service.title}
                </h3>
                <p className="text-sm text-[#5B616E] leading-relaxed mb-6">
                  {service.description}
                </p>

                <Link href="/contact" className="button-primary w-full text-center justify-center !py-3.5">
                  <span>Schedule technical review</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Verified SLA Box */}
              <div className="bg-[#0A0B0D] text-white rounded-3xl p-6 border border-neutral-800 space-y-3.5 text-xs">
                <div className="text-[11px] uppercase font-semibold text-neutral-400 tracking-wider">
                  Verified Engineering SLA
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
                  <span>Kenya Data Protection (ODPC) Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>&lt; 3-Hour Inquiry Response Window</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Zap className="w-4 h-4 text-[#0052FF]" />
                  <span>99.98% High-Availability Cloud Uptime</span>
                </div>
              </div>

            </aside>

            {/* Right Column: Deep Chapters */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Chapter 1: Core Feature Stack */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E5EA] shadow-xs">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-4">
                  What we engineer
                </h2>
                <p className="text-base text-[#5B616E] leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {service.features.map((feature) => (
                    <div 
                      key={feature} 
                      className="flex items-center gap-3 bg-[#F5F6F8] p-4 rounded-2xl border border-[#E2E5EA] text-sm font-semibold text-[#0A0B0D]"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#EEF2FF] text-[#0052FF] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chapter 2: Measurable Business Outcomes */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E5EA] shadow-xs">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-6">
                  Measurable Business Outcomes
                </h2>

                <div className="space-y-4">
                  {service.outcomes.map((outcome, index) => (
                    <div 
                      key={outcome} 
                      className="p-5 rounded-2xl bg-[#F5F6F8] border border-[#E2E5EA] flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#0052FF] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        0{index + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#0A0B0D] mb-1">
                          {outcome}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5B616E] leading-relaxed">
                          Practical, battle-tested improvements engineered to make your system resilient, scalable, and cost-effective inside the African business environment.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chapter 3: Connected Capabilities */}
              <div className="bg-white rounded-3xl p-8 border border-[#E2E5EA] shadow-xs">
                <h2 className="text-xl font-semibold text-[#0A0B0D] tracking-tight mb-4">
                  Connected Capabilities
                </h2>
                <div className="flex flex-wrap gap-2.5">
                  {related.map((item) => (
                    <Link 
                      key={item.id} 
                      href={`/services/${item.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#F5F6F8] border border-[#E2E5EA] text-xs font-semibold text-[#0A0B0D] hover:border-[#0052FF] hover:text-[#0052FF] transition-all"
                    >
                      <span>{item.name}</span>
                      <ArrowRight size={13} />
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Relevant Case Studies Preview */}
      {showcase.length > 0 && (
        <section className="py-20 md:py-24 bg-white border-b border-[#E2E5EA]">
          <div className="shell">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider block mb-2">
                  Verified In Production
                </span>
                <h2 className="text-3xl font-semibold text-[#0A0B0D] tracking-tight">
                  Relevant client architectures
                </h2>
              </div>
              <Link href="/work" className="button-secondary text-sm !py-2.5 !px-5">
                <span>View all projects</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {showcase.map((project) => (
                <Link
                  key={project.id}
                  href={`/work/${project.id}`}
                  className="group bg-[#F5F6F8] rounded-3xl p-7 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0052FF]">
                        {project.category}
                      </span>
                      <span className="text-xs text-[#5B616E]">
                        {project.industry}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#0A0B0D] tracking-tight mb-3 group-hover:text-[#0052FF] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-sm text-[#5B616E] line-clamp-2 leading-relaxed">
                      {project.about}
                    </p>
                  </div>

                  <div className="pt-5 mt-6 border-t border-[#E2E5EA] flex items-center justify-between text-sm font-semibold text-[#0052FF]">
                    <span>Inspect architecture</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer siteSettings={cms.siteSettings} services={cms.services} />
    </main>
  );
}
