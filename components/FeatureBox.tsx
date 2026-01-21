"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, BarChart, Rocket } from "lucide-react";

const features = [
  {
    title: "Accelerated Innovation",
    desc: "We leverage agile frameworks and rapid prototyping to bring your concepts to market faster.",
    icon: Rocket // Note: Just passing the component name, not the JSX
  },
  {
    title: "Cloud-First Solutions",
    desc: "Modernize your operations with scalable, secure cloud architecture for 24/7 accessibility.",
    icon: Zap
  },
  {
    title: "Proactive Defense",
    desc: "Protecting your digital footprint with enterprise-grade protocols and real-time monitoring.",
    icon: ShieldCheck
  },
  {
    title: "Data-Driven Growth",
    desc: "Transform raw information into actionable strategy with custom analytics tools.",
    icon: BarChart
  }
];

export default function FeatureBox() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-stretch">
        
        {/* LEFT SIDE: THE BLACK BOX */}
        <div className="lg:w-1/3 bg-[#0a0c10] rounded-xl p-10 md:p-14 flex flex-col justify-center shadow-xl border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-blue-500"></div>
            <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-xs">
              Our Core Strengths
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Innovation. <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-100 italic">
              Engineered.
            </span>
          </h2>
          
          <p className="text-slate-400 text-lg leading-relaxed font-light">
            We don't just solve problems; we build the digital infrastructure 
            that allows your business to transcend traditional limitations.
          </p>
        </div>

        {/* RIGHT SIDE: THE WHITE FEATURE BOXES */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, index) => {
            // This is the trick: assign the icon to a component variable
            const IconComponent = item.icon;
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
              >
                {/* ICON BOX */}
                <div className="mb-6 p-4 bg-blue-50 w-fit rounded-lg group-hover:bg-blue-600 transition-all duration-300">
                  <IconComponent 
                    size={28} 
                    className="text-blue-600 group-hover:text-white transition-colors duration-300" 
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}