"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, TrendingUp, Cpu, Smartphone } from "lucide-react";

const stories = [
  {
    category: "Cloud Hosting",
    title: "Major Insurance Provider Saves $750k per Month With Big Data Migration",
    desc: "The company needed to complete a complex migration on a tight deadline to avoid millions of dollars in post-contract fees and fines.",
    icon: TrendingUp,
    tags: ["Modern infrastructure", "Consulting services"],
    color: "bg-blue-600"
  },
  {
    category: "IT Consulting",
    title: "Maximizing Efficiency with Proper Technology Implementation – Coffee Success Story",
    desc: "The company needed to complete a complex migration on a tight deadline to avoid millions of dollars in post-contract fees and fines.",
    icon: Cpu,
    tags: ["Modern infrastructure", "Consulting services"],
    color: "bg-slate-900"
  },
  {
    category: "Mobile development",
    title: "Strategic Move to an AI-supported application for Public Safety Travel App in London",
    desc: "Travel confidently around London with maps and live travel updates. Our reliable journey planner will map a safe route.",
    icon: Smartphone,
    tags: ["Modern infrastructure", "Consulting services"],
    color: "bg-blue-500"
  }
];

export default function SuccessStories() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">Where We Do</span>
            <div className="h-[1px] w-12 bg-blue-600"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            Success Stories
          </h2>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => {
            const Icon = story.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                {/* Visual Header of the card */}
                <div className={`h-2 ${story.color}`} />
                
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-blue-600 font-bold uppercase text-xs tracking-widest">
                      {story.category}
                    </span>
                    <div className="p-3 bg-white rounded-lg shadow-sm text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-snug group-hover:text-blue-600 transition-colors">
                    {story.title}
                  </h3>
                  
                  <p className="text-slate-600 text-lg font-light leading-relaxed mb-8 flex-grow">
                    {story.desc}
                  </p>

                  <div className="space-y-3 mb-10">
                    {story.tags.map((tag, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <Check size={12} className="text-blue-600" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 font-medium text-sm">{tag}</span>
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center gap-3 text-slate-900 font-bold uppercase tracking-widest text-xs group-hover:text-blue-600 transition-all">
                    Learn More 
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}