"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, TrendingUp, Cpu, Smartphone, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

const iconMap = {
  "Cloud Hosting": TrendingUp,
  "IT Consulting": Cpu,
  "Mobile Development": Smartphone,
  "App Development": Smartphone,
  "Web Development": Cpu,
  "Cyber Security": TrendingUp,
  "default": TrendingUp
};

const colorMap = {
  "Cloud Hosting": "bg-blue-600",
  "IT Consulting": "bg-slate-900",
  "Mobile Development": "bg-blue-500",
  "App Development": "bg-purple-600",
  "Web Development": "bg-green-600",
  "Cyber Security": "bg-red-600",
  "default": "bg-blue-600"
};

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (data) {
      setStories(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section className="py-24 px-6 bg-white flex items-center justify-center">
        <RefreshCw className="animate-spin text-blue-600" size={48} />
      </section>
    );
  }

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
            const Icon = iconMap[story.category] || iconMap.default;
            const color = colorMap[story.category] || colorMap.default;
            const tags = story.results ? story.results.slice(0, 2) : [];

            return (
              <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                {/* Visual Header of the card */}
                <div className={`h-2 ${color}`} />
                
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
                    {story.challenge || story.about.substring(0, 150)}
                  </p>

                  <div className="space-y-3 mb-10">
                    {tags.map((tag, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                          <Check size={12} className="text-blue-600" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 font-medium text-sm">{tag}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={`/case-studies/${story.id}`}
                    className="flex items-center gap-3 text-slate-900 font-bold uppercase tracking-widest text-xs group-hover:text-blue-600 transition-all"
                  >
                    Learn More 
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
