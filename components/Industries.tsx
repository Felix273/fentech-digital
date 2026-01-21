"use client";

import { motion } from "framer-motion";
import { 
  Factory, Truck, Stethoscope, 
  Building2, Briefcase, HeartHandshake, ArrowRight 
} from "lucide-react";

const sectors = [
  { name: "Industry & Manufacturing", icon: Factory },
  { name: "Transportation & Logistics", icon: Truck },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Banks & Insurance", icon: Building2 },
  { name: "Consulting Providers", icon: Briefcase },
  { name: "Non-Profit", icon: HeartHandshake },
];

export default function Industries() {
  return (
    <section className="w-full bg-[#0a0c10] py-24 px-6 relative overflow-hidden">
      {/* Animated Background Pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-blue-500"></span>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Expertise</span>
            </div>
            {/* Reduced size to text-4xl/5xl for better balance */}
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Solving IT challenges in <span className="text-blue-600">every</span> industry.
            </h2>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 text-white border border-white/10 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all font-medium text-sm group"
          >
            View All Industries
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* INTERACTIVE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] transition-all cursor-pointer overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(37,99,235,0)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    <Icon size={24} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {sector.name}
                    </h3>
                    <div className="w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}