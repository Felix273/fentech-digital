"use client";

import React, { useState, useEffect } from "react";

import Contact from "@/components/Contact";

import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ArrowRight, Filter, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<any>([]);
  const [filteredStudies, setFilteredStudies] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    try {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) {
        setCaseStudies(data);
        setFilteredStudies(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading case studies:', error);
      setLoading(false);
    }
  };

  const categories = ["All", ...new Set(caseStudies.map((c: any) => c.category))];

  const filterProjects = (category: string) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredStudies(caseStudies);
    } else {
      setFilteredStudies(caseStudies.filter(c => c.category === category));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA]">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="mt-4 text-gray-600">Loading case studies from database...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-[#F4F7FA] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full pt-48 pb-32 flex justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="w-[85%] max-w-7xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-blue-400"></span>
              <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.3em]">
                Our Work
              </span>
              <span className="h-[1px] w-12 bg-blue-400"></span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Case <span className="text-blue-400">Studies</span>
            </h1>
            
            <p className="text-slate-300 text-xl max-w-3xl mx-auto font-light leading-relaxed">
              Real results from real clients. Explore how we've helped businesses transform their digital infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="w-full flex justify-center py-12 bg-white border-b border-slate-100">
        <div className="w-[85%] max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            <Filter size={18} className="text-slate-400" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => filterProjects(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  activeFilter === cat
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="w-full flex justify-center py-20">
        <div className="w-[85%] max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredStudies.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/case-studies/${project.id}`}
                  className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
                >
                  <span className="text-blue-600 font-bold text-[9px] uppercase tracking-[0.3em] mb-4">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 flex-grow">
                    {project.about.substring(0, 120)}...
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-slate-500 ml-2">{project.rating}</span>
                    </div>
                    <ArrowRight size={18} className="text-blue-600 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}
