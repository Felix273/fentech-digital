"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsBar() {
  const stats = [
    { label: "Years", value: "5", sub: "Proven Track Record" },
    { label: "%", value: "98", sub: "Customer Satisfaction" },
    { label: "", value: "50", sub: "Projects We Have Completed" },
    { label: "Mins", value: "3", sub: "Average Answer Time" },
  ];

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          <span className="text-slate-900 font-bold text-lg italic">Reviewed on</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#FFB800" color="#FFB800" />
            ))}
          </div>
          <span className="text-slate-900 font-bold text-lg italic">5/5</span>
          <div className="hidden md:block w-px h-6 bg-slate-200 mx-2"></div>
          <span className="text-slate-500 font-medium">31 Reviews</span>
        </div>

        <hr className="border-slate-100 mb-16" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-black text-slate-900">
                  {stat.value}
                </span>
                <span className="text-xl font-bold text-blue-600 uppercase tracking-tighter">
                  {stat.label}
                </span>
              </div>
              <p className="mt-4 text-slate-500 font-medium max-w-[150px] leading-tight">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
