import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, ExternalLink, ShieldCheck, Zap, 
  TrendingUp, Sparkles, CheckCircle2 
} from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: pageMetadata.caseStudies.title,
  description: pageMetadata.caseStudies.description,
};

export default async function WorkPage() {
  const cms = await getPublicCmsContent();
  const flagship = cms.caseStudies[0];
  const otherProjects = cms.caseStudies.slice(1);

  return (
    <main className="bg-white">
      
      {/* Portfolio Archive Hero */}
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
              <span>{cms.workPage.heroLabel || "PROVEN PRODUCTION SYSTEMS"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-medium tracking-tight text-[#0A0B0D] leading-[1.08] mb-6">
              {cms.workPage.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-[#5B616E] font-normal leading-relaxed mb-8">
              {cms.workPage.heroLead}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact" className="button-primary text-base !py-3.5 !px-8">
                <span>Start a conversation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <Link href="/services" className="button-secondary text-base !py-3.5 !px-8">
                Explore engineering services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Feature & Case Studies Grid */}
      <section className="py-20 md:py-28 bg-[#F5F6F8] border-b border-[#E2E5EA]">
        <div className="shell">
          
          {/* Flagship Browser Window Card */}
          {flagship && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E5EA] shadow-sm mb-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0052FF]">
                        {flagship.category}
                      </span>
                      <span className="text-xs font-medium text-[#5B616E]">
                        · {flagship.industry}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-4">
                      {flagship.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#5B616E] leading-relaxed mb-6 font-normal">
                      {flagship.about}
                    </p>

                    {/* Stats */}
                    {flagship.stats && (
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-[#F5F6F8] p-4 rounded-2xl border border-[#E2E5EA]">
                          <div className="text-2xl font-bold text-[#0A0B0D] flex items-center gap-1.5">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                            <span>3x</span>
                          </div>
                          <div className="text-xs text-[#5B616E] font-medium mt-1">
                            Client Inquiries
                          </div>
                        </div>

                        <div className="bg-[#F5F6F8] p-4 rounded-2xl border border-[#E2E5EA]">
                          <div className="text-2xl font-bold text-[#0A0B0D] flex items-center gap-1.5">
                            <Zap className="w-5 h-5 text-[#0052FF]" />
                            <span>&lt; 350ms</span>
                          </div>
                          <div className="text-xs text-[#5B616E] font-medium mt-1">
                            Sub-second Edge Speed
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-8">
                      {flagship.techStack.map((tech) => (
                        <span key={tech} className="text-xs px-3 py-1 rounded-full bg-[#F5F6F8] border border-[#E2E5EA] text-[#0A0B0D] font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#E2E5EA]">
                    <Link 
                      href={`/work/${flagship.id}`}
                      className="button-primary text-sm !py-2.5 !px-6"
                    >
                      <span>Read full case study</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>

                    {flagship.liveUrl && (
                      <a
                        href={flagship.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button-secondary text-sm !py-2.5 !px-5"
                      >
                        <span>Visit live site</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: High-Res Browser Frame */}
                <div className="lg:col-span-7">
                  <div className="bg-[#0A0B0D] rounded-2xl shadow-xl overflow-hidden border border-neutral-800">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#0D1117] px-4 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-300 font-mono w-full max-w-sm justify-between mx-2">
                        <span className="truncate">https://jemsamediatech-x57h.vercel.app</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-neutral-400" />
                    </div>

                    <div className="aspect-[16/10] w-full bg-[#0D1117] p-8 flex flex-col justify-between relative overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-mono">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          LIVE PRODUCTION PLATFORM
                        </span>
                        <span className="text-xs text-neutral-500 font-mono">Serverless Edge Node</span>
                      </div>

                      <div className="my-auto py-4">
                        <div className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider mb-2">
                          JemSA Media Tech Agency Hub
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-2">
                          Digital Agency Web Application & Client CMS
                        </h3>
                        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
                          Bespoke web application with dynamic administrative control for client inquiries, team portfolios, and lead stages.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400 font-mono">
                        <span>100% Dynamic CMS</span>
                        <span className="text-emerald-400">Next.js 16 + Supabase</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Additional Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl p-8 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-md"
              >
                <div>
                  <div className="aspect-[16/10] w-full bg-[#F5F6F8] rounded-2xl overflow-hidden relative border border-[#E2E5EA] mb-6">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full p-6 flex flex-col justify-between">
                        <span className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider">
                          {project.industry}
                        </span>
                        <div>
                          <strong className="block text-xl font-semibold text-[#0A0B0D] mb-1">
                            {project.title}
                          </strong>
                          {project.results?.[0] && (
                            <span className="text-xs text-[#5B616E]">
                              {project.results[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0052FF]">
                      {project.category}
                    </span>
                    <span className="text-xs text-[#5B616E]">
                      · {project.industry}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-[#0A0B0D] tracking-tight mb-3">
                    {project.title}
                  </h3>

                  <p className="text-sm text-[#5B616E] leading-relaxed mb-6">
                    {project.about}
                  </p>
                </div>

                <div className="pt-5 border-t border-[#E2E5EA] flex items-center justify-between text-sm">
                  <Link 
                    href={`/work/${project.id}`}
                    className="font-semibold text-[#0052FF] flex items-center gap-1 hover:translate-x-1 transition-transform"
                  >
                    <span>Read case study</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#5B616E] hover:text-[#0A0B0D] flex items-center gap-1 font-medium"
                    >
                      <span>Live URL</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
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
                Have a platform you want clients to see next?
              </h2>
              <p className="text-lg text-blue-100 max-w-xl">
                Let’s engineer your workflow, M-Pesa gateway, or business platform with the same discipline, speed, and architectural security.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0052FF] font-semibold text-base hover:bg-slate-100 transition-all shadow-md"
              >
                <span>Start a project</span>
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
