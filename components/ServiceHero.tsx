"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function ServiceHero({ title }: { title: string }) {
  return (
    <section className="bg-gradient-to-br from-[#0a0c10] via-[#0f172a] to-[#020617] pt-40 pb-24 px-6 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
        <span className="text-[15vw] font-black uppercase tracking-tighter text-white">Service</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 text-blue-500 font-bold uppercase tracking-widest text-xs mb-6">
          <span>Home</span>
          <ChevronRight size={14} />
          <span className="text-white/50">Services</span>
          <ChevronRight size={14} />
          <span className="text-white">{title}</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 leading-none">
          {title}<span className="text-blue-600">.</span>
        </h1>
        <p className="text-slate-400 text-xl font-light max-w-2xl leading-relaxed">
          Innovative IT solutions tailored to scale your enterprise and secure your digital assets in a competitive landscape.
        </p>
      </div>
    </section>
  );
}