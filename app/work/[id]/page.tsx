import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ArrowLeft, ArrowRight, Check, CheckCircle2, 
  ExternalLink, ShieldCheck, Zap, TrendingUp, Sparkles, Clock 
} from "lucide-react";
import Footer from "@/components/Footer";
import { getPublicCmsContent } from "@/lib/cms-content";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cms = await getPublicCmsContent();
  const project = cms.caseStudies.find((item) => item.id === id);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.title} | FenTech Case Study`,
    description: project.challenge,
  };
}

export default async function SingleCaseStudyPage({ params }: Props) {
  const { id } = await params;
  const cms = await getPublicCmsContent();
  const project = cms.caseStudies.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const related = cms.caseStudies.filter((item) => item.id !== project.id).slice(0, 2);

  return (
    <main className="bg-white">
      
      {/* Case Study Hero */}
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
            href="/work" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B616E] hover:text-[#0052FF] mb-8 bg-[#F5F6F8] px-3.5 py-1.5 rounded-full border border-[#E2E5EA] transition-colors"
          >
            <ArrowLeft size={14} /> Back to all case studies
          </Link>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-[#EEF2FF] text-[#0052FF] text-xs font-semibold tracking-wider uppercase">
                {project.category}
              </span>
              <span className="text-xs text-[#5B616E] font-medium">
                · {project.industry}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-medium tracking-tight text-[#0A0B0D] leading-[1.08] mb-6">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#5B616E] font-normal leading-relaxed mb-8">
              {project.challenge}
            </p>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0B0D] text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Visit Live Production System</span>
                <ExternalLink size={13} className="ml-1 text-[#0052FF]" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 4-Column High-Impact Metrics Strip */}
      {project.stats && project.stats.length > 0 && (
        <section className="py-12 bg-[#F5F6F8] border-b border-[#E2E5EA]">
          <div className="shell">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {project.stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="bg-white rounded-2xl p-6 border border-[#E2E5EA] shadow-2xs"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#0A0B0D] tracking-tight">
                    {stat.val}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#0052FF] mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2-Column Architectural Breakdown */}
      <section className="py-20 md:py-28 bg-[#FAFAFC] border-b border-[#E2E5EA]">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Sticky Executive Brief & Tech Stack */}
            <aside className="lg:col-span-4 lg:sticky lg:top-[calc(var(--header)+24px)] space-y-6">
              <div className="bg-white rounded-3xl p-7 border border-[#E2E5EA] shadow-xs">
                <span className="text-xs uppercase font-semibold text-[#5B616E] tracking-wider block mb-2">
                  Project Context
                </span>
                <p className="text-sm text-[#5B616E] leading-relaxed mb-6">
                  {project.about}
                </p>

                <Link href="/contact" className="button-primary w-full text-center justify-center !py-3.5">
                  <span>Engineer a similar system</span>
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>

              {/* Technologies Cloud */}
              <div className="bg-white rounded-3xl p-7 border border-[#E2E5EA] shadow-xs">
                <span className="text-xs uppercase font-semibold text-[#5B616E] tracking-wider block mb-3">
                  Production Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs px-3 py-1.5 rounded-full bg-[#F5F6F8] border border-[#E2E5EA] text-[#0A0B0D] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified SLA Assurance */}
              <div className="bg-[#0A0B0D] text-white rounded-3xl p-6 border border-neutral-800 space-y-3.5 text-xs">
                <div className="text-[11px] uppercase font-semibold text-neutral-400 tracking-wider">
                  FenTech Engineering Assurance
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-[#0052FF]" />
                  <span>Kenya ODPC 2019 Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>&lt; 3-Hour Engineering Response Window</span>
                </div>
              </div>
            </aside>

            {/* Right Column: In-Depth Chapters */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Chapter 1: The Operational Challenge */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E5EA] shadow-xs">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-4">
                  The Operational Challenge
                </h2>
                <p className="text-base text-[#5B616E] leading-relaxed mb-8">
                  {project.challenge}
                </p>

                <div className="space-y-3">
                  {project.challengeDetails.map((detail) => (
                    <div 
                      key={detail} 
                      className="flex items-start gap-3 bg-[#F5F6F8] p-4 rounded-2xl border border-[#E2E5EA] text-sm text-[#0A0B0D]"
                    >
                      <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={14} strokeWidth={2.5} />
                      </div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chapter 2: The Engineering Solution */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E5EA] shadow-xs">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-6">
                  {project.solutionTitle}
                </h2>

                <div className="space-y-4">
                  {project.solutionDetails.map((item, index) => (
                    <div 
                      key={item.title} 
                      className="p-6 rounded-2xl bg-[#F5F6F8] border border-[#E2E5EA] flex items-start gap-4"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#0052FF] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        0{index + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#0A0B0D] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5B616E] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chapter 3: Verified Business Outcomes */}
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E5EA] shadow-xs">
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0B0D] tracking-tight mb-6">
                  Verified Business Impact
                </h2>

                <div className="space-y-3">
                  {project.results.map((result) => (
                    <div 
                      key={result} 
                      className="flex items-center gap-3 bg-emerald-50/60 border border-emerald-200/80 p-4 rounded-2xl text-sm font-semibold text-[#0A0B0D]"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                        <Check size={14} strokeWidth={2.5} />
                      </div>
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Relevant Architectures Strip */}
      {related.length > 0 && (
        <section className="py-20 md:py-24 bg-white border-b border-[#E2E5EA]">
          <div className="shell">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider block mb-2">
                  Continue Exploring
                </span>
                <h2 className="text-3xl font-semibold text-[#0A0B0D] tracking-tight">
                  More platforms engineered for Africa
                </h2>
              </div>
              <Link href="/work" className="button-secondary text-sm !py-2.5 !px-5">
                <span>All case studies</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/work/${item.id}`}
                  className="group bg-[#F5F6F8] rounded-3xl p-7 border border-[#E2E5EA] hover:border-[#0052FF] transition-all duration-200 flex flex-col justify-between hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#E2E5EA] text-[#0052FF]">
                        {item.category}
                      </span>
                      <span className="text-xs text-[#5B616E]">
                        {item.industry}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#0A0B0D] tracking-tight mb-3 group-hover:text-[#0052FF] transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#5B616E] line-clamp-2 leading-relaxed">
                      {item.about}
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
