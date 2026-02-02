"use client";

import React, { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Star, ArrowRight, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

export default function SingleCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  const router = useRouter();

  const [project, setProject] = useState<any>(null);
  const [relatedProjects, setRelatedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCaseStudy();
  }, [id]);

  const loadCaseStudy = async () => {
    try {
      const saved = localStorage.getItem('caseStudies');
      let caseStudiesData;
      
      if (saved) {
        caseStudiesData = JSON.parse(saved);
      } else {
        const module = await import('@/lib/data/case-studies');
        caseStudiesData = module.caseStudiesData;
        localStorage.setItem('caseStudies', JSON.stringify(caseStudiesData));
      }

      const currentProject = caseStudiesData.find((p: any) => p.id === id);
      
      if (!currentProject) {
        router.push('/case-studies');
        return;
      }

      setProject(currentProject);
      setRelatedProjects(caseStudiesData.filter((item: any) => item.id !== id).slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error('Error loading case study:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <main className="bg-white min-h-screen">
      {/* NAVIGATION BAR - Back button */}
      <div className="w-full flex justify-center pt-10 absolute">
        <div className="w-[85%] max-w-7xl">
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-colors">
                <ArrowLeft size={14} /> Back to all cases
            </Link>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="w-full pt-40 pb-20 bg-slate-50 flex justify-center border-b border-slate-100">
        <div className="w-[85%] max-w-7xl">
          <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-6 block">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 max-w-4xl tracking-tight leading-[1.1]">
            {project.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
            <p className="text-slate-500 font-medium">Industry: <span className="text-slate-900 font-bold">{project.industry}</span></p>
            <div className="flex items-center gap-4 border-l border-slate-200 pl-4 md:pl-12">
                <div className="flex text-orange-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{project.reviewCount}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="w-full flex justify-center py-24">
        <div className="w-[85%] max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-8">
          {project.stats.map((stat: any, i: number) => (
            <div key={i} className="border-t-2 border-blue-600 pt-6 group">
              <p className="text-4xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{stat.val}</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT & CHALLENGE SECTION */}
      <section className="w-full flex justify-center py-24 bg-white">
        <div className="w-[85%] max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h3 className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-6">About the Client</h3>
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-12">
                {project.about}
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mb-8">The Challenge</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">{project.challenge}</p>
            <ul className="space-y-4">
              {project.challengeDetails.map((detail: any, i: number) => (
                <li key={i} className="flex gap-4 items-start text-slate-600">
                  <span className="text-blue-600 font-bold">✔︎</span> 
                  <span className="text-sm font-medium">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100">
            <h3 className="text-3xl font-bold text-slate-900 mb-10">{project.solutionTitle}</h3>
            <div className="space-y-10">
              {project.solutionDetails.map((item, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-blue-600/20 hover:border-blue-600 transition-colors">
                  <p className="font-bold text-slate-900 text-lg mb-3">{item.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESULTS & TECHNOLOGY */}
      <section className="w-full flex justify-center py-24 border-t border-slate-100">
        <div className="w-[85%] max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-10">Tangible Results</h3>
                <div className="grid grid-cols-1 gap-6">
                    {project.results.map((res, i) => (
                        <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                <Check size={16} className="text-white" />
                            </div>
                            <span className="font-bold text-slate-800">{res}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-10">Technology Stack</h3>
                <div className="flex flex-wrap gap-3 mb-16">
                    {project.techStack.map((tech) => (
                        <span key={tech} className="px-10 py-3 bg-white border border-slate-500 rounded-xl text-slate-700 font-bold text-xs uppercase tracking-widest shadow-sm">
                            {tech}
                        </span>
                    ))}
                </div>
                
                <div className="bg-slate-900 p-12 rounded-[2.5rem] text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
                    <h4 className="text-3xl font-bold mb-6 relative z-10">Ready to replicate these results?</h4>
                    <p className="text-slate-400 mb-10 font-light relative z-10">Let's discuss how Fentech can optimize your infrastructure.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-blue-600 transition-all shadow-xl shadow-blue-800/40 relative z-10">
                        Schedule a Consultation <ArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* 5. RELATED PROJECTS */}
      <section className="w-full py-32 bg-slate-50 border-t border-slate-200 flex justify-center">
        <div className="w-[85%] max-w-7xl">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Keep Exploring</span>
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Recent Case Studies</h2>
            </div>
            <Link href="/case-studies" className="hidden md:block text-slate-900 font-bold text-xs uppercase tracking-widest border-b-2 border-slate-900 pb-2 hover:text-blue-600 hover:border-blue-600 transition-all">
              View Portfolio
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {relatedProjects.map((related) => (
              <Link 
                key={related.id} 
                href={`/case-studies/${related.id}`}
                className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              >
                <span className="text-blue-600 font-bold text-[9px] uppercase tracking-[0.3em] mb-4">
                  {related.category}
                </span>
                <h4 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  {related.title}
                </h4>
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 line-clamp-2">
                  {related.about}
                </p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">View Case</span>
                    <ArrowRight size={16} className="text-blue-600 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
