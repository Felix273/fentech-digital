"use client";

import React, { useState, useEffect } from "react";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Award,
  Users2,
  ShieldCheck,
  Globe,
  Zap,
  Rocket,
  RefreshCw
} from "lucide-react";

import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const iconMap: { [key: string]: any } = {
  Target: Target,
  Eye: Eye,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  Award: Award,
  Globe: Globe,
  Users2: Users2,
  Rocket: Rocket
};

export default function AboutUsPage() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [values, setValues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAboutData();
  }, []);

  const loadAboutData = async () => {
    const [settingsRes, valuesRes] = await Promise.all([
      supabase.from('about_settings').select('*').eq('id', 'default').single(),
      supabase.from('about_values').select('*').order('display_order')
    ]);

    if (settingsRes.data) setAboutData(settingsRes.data);
    if (valuesRes.data) setValues(valuesRes.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] flex items-center justify-center">
        <RefreshCw className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <main className="bg-[#F4F7FA] min-h-screen flex flex-col items-center overflow-x-hidden text-slate-900">
      <div className="w-full">
        <ServiceHero title="About Fentech" />
      </div>

      <section className="w-[80%] py-32">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-12 bg-blue-600"></span>
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px]">Our Identity</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
              {aboutData?.story_headline} <br />
              <span className="text-blue-600">{aboutData?.story_highlight}</span>
            </h2>
            <p className="text-slate-600 text-xl font-light leading-loose mb-8">
              {aboutData?.story_description}
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              <div>
                <h4 className="text-3xl font-bold text-slate-900">{aboutData?.stat1_number}</h4>
                <p className="text-sm text-slate-500 uppercase tracking-widest mt-2">{aboutData?.stat1_label}</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-slate-900">{aboutData?.stat2_number}</h4>
                <p className="text-sm text-slate-500 uppercase tracking-widest mt-2">{aboutData?.stat2_label}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative p-4">
              <div className="absolute top-0 right-0 w-full h-full bg-blue-600 rounded-[4rem] rotate-3 -z-10 opacity-5" />
              <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold mb-6">{aboutData?.mission_title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg font-light mb-10">
                  {aboutData?.mission_description}
                </p>
                <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                    <Rocket size={24} />
                  </div>
                  <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">Accelerating Digital Transformation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-[80%] py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-[4rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        
        <div className="relative z-10 px-12 py-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-blue-400"></span>
            <span className="text-blue-400 font-black uppercase tracking-[0.4em] text-[10px]">Core Values</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-20">
            What We <span className="text-blue-400">Stand For</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value: any, i: number) => {
              const Icon = iconMap[value.icon_name] || Target;
              return (
                <motion.div
                  key={value.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-500"
                >
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-slate-300 font-light leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-[80%] py-32">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 bg-slate-200 rounded-[2rem] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-slate-200" />
              </div>
              <div className="h-64 bg-slate-200 rounded-[2rem] mt-12 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-blue-50" />
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">{aboutData?.team_headline}</h2>
            <p className="text-slate-600 text-lg font-light leading-relaxed">
              {aboutData?.team_description}
            </p>
            <div className="flex flex-col gap-6">
              {[
                { t: "Expert Engineers", i: <Users2 size={20} className="text-blue-600" /> },
                { t: "Strategic Consulting", i: <Globe size={20} className="text-blue-600" /> },
                { t: "Award-Winning Support", i: <Award size={20} className="text-blue-600" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white">
                  {item.i}
                  <span className="font-bold text-slate-800 uppercase tracking-widest text-xs">{item.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full">
        <Contact />
      </div>

      <Footer />
      
      <div className="w-full py-12 flex justify-center border-t border-slate-100 bg-slate-50">
        <p className="text-slate-400 font-medium text-xs tracking-[0.5em]">
          © 2026 FenTech Digital. All rights reserved.
        </p>
      </div>
    </main>
  );
}
