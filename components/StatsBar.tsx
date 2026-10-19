"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

export default function StatsBar() {
  const stats = [
    { label: "Proven Track Record", value: "5+", sub: "Years Building Tech" },
    { label: "Customer Satisfaction", value: "98%", sub: "Enterprise & SME Trust" },
    { label: "Delivered Platforms", value: "50+", sub: "Completed & Maintained" },
    { label: "Response Window", value: "< 3m", sub: "Average First Response" },
  ];

  return (
    <section className="bg-[#F5F6F8] py-14 border-b border-[#E2E5EA]">
      <div className="shell">
        
        {/* Institutional Trust Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#E2E5EA] shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#0052FF]" />
            <span className="text-xs font-semibold text-[#0A0B0D] uppercase tracking-wider">
              Verified Technology Partner
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#5B616E]">
            <div className="flex gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[#0A0B0D] font-semibold">5.0 / 5.0</span>
            <span>· 30+ Kenyan & Regional Enterprises</span>
          </div>
        </div>

        {/* 4-Column Coinbase Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E5EA] flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0A0B0D]">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-[#0052FF] uppercase tracking-wider mt-2">
                  {stat.label}
                </div>
              </div>
              <p className="text-xs text-[#5B616E] font-normal mt-4">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
