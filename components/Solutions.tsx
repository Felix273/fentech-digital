"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Lightbulb, 
  ShieldCheck, 
  Code2, 
  Smartphone, 
  Cloud, 
  ArrowRight,
  Plus
} from "lucide-react";

const solutions = [
  {
    title: "Managed Services",
    desc: "Free up your internal resources to focus on the business by letting us handle day to day support services, management, and monitoring of your IT.",
    icon: Users,
    color: "from-blue-600 to-blue-400"
  },
  {
    title: "IT Consulting & Advisory",
    desc: "The right technology, implemented properly, appropriately managed and monitored, can lead to significant gains in growth.",
    icon: Lightbulb,
    color: "from-indigo-600 to-blue-500"
  },
  {
    title: "Cyber Security",
    desc: "Our experts can identify vulnerabilities, assess risks, and implement robust security measures to safeguard your systems and data.",
    icon: ShieldCheck,
    color: "from-slate-900 to-slate-700"
  },
  {
    title: "Web Development",
    desc: "Our web development services can help you establish an impactful online presence and reach your target audience effectively.",
    icon: Code2,
    color: "from-blue-700 to-cyan-500"
  },
  {
    title: "Mobile Development",
    desc: "We can help you create a customized mobile app that aligns with your brand and goals, with expertise in various mobile platforms.",
    icon: Smartphone,
    color: "from-blue-800 to-indigo-600"
  },
  {
    title: "Cloud Services",
    desc: "With our expertise in cloud technologies, we can help you find the right cloud solutions that meet your business needs and goals.",
    icon: Cloud,
    color: "from-sky-600 to-blue-400"
  }
];

export default function Solutions() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER: Sharp & High-Contrast */}
        <div className="bg-[#0a0c10] rounded-xl p-10 md:p-16 mb-16 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[1px] w-12 bg-blue-500"></span>
                <span className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs">How We Do</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
                Solutions<span className="text-blue-600">.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-xl font-light leading-relaxed max-w-sm border-l border-white/10 pl-8">
              Precision engineering for the modern enterprise landscape.
            </p>
          </div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px]" />
        </div>

        {/* THE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {solutions.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white border border-slate-100 p-10 rounded-xl hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(0,118,255,0.08)] transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* UPGRADED ICON DESIGN */}
                <div className="relative mb-10">
                    {/* The "Ghost" Background Icon - adds depth */}
                    <IconComponent className="absolute -top-4 -left-4 text-blue-50/50 scale-[2] rotate-12 group-hover:rotate-0 transition-transform duration-700" size={60} />
                    
                    {/* The Primary Icon Container */}
                    <div className={`relative z-10 w-16 h-16 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        <IconComponent size={30} className="text-white" />
                        
                        {/* Little "plus" accent to make it look custom */}
                        <Plus className="absolute -top-1 -right-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
                    </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-lg leading-relaxed font-light mb-8 group-hover:text-slate-700 transition-colors">
                  {item.desc}
                </p>

                <div className="flex items-center gap-3 text-blue-600 font-bold uppercase tracking-widest text-xs opacity-60 group-hover:opacity-100 transition-all group-hover:gap-5">
                  <Link href="/services">
                    Explore Solution <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* BUTTON: Solid & Professional */}
        <div className="flex justify-center">
          <Link href="/services" className="px-12 py-6 bg-[#0a0c10] text-white rounded-lg font-bold text-lg tracking-widest uppercase hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-xl flex items-center gap-4 group">
            View All Solutions
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
