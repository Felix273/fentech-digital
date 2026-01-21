"use client";

import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* LEFT: The "Hero" Testimonial (Takes up 40%) */}
          <div className="lg:w-5/12">
            <div className="sticky top-24">
              <div className="flex items-center gap-3 mb-8">
                <span className="h-[1px] w-12 bg-blue-600"></span>
                <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">Testimonials</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-8 tracking-tighter">
                Trusted by the <br /> 
                <span className="text-blue-600">Architects</span> of Innovation.
              </h2>
              
              <p className="text-slate-500 text-xl font-light leading-relaxed mb-10">
                We don't just provide services; we integrate into your team to build the future of your industry.
              </p>

              <div className="flex items-center gap-8 opacity-40 grayscale contrast-125">
                 {/* Placeholder for Client Logos */}
                 <div className="font-black text-2xl tracking-tighter">LOGITECH</div>
                 <div className="font-black text-2xl tracking-tighter">SAMSUNG</div>
              </div>
            </div>
          </div>

          {/* RIGHT: The "Dynamic Stack" (Takes up 60%) */}
          <div className="lg:w-7/12 space-y-8">
            
            {/* Featured Large Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-[#0a0c10] rounded-3xl p-10 md:p-14 text-white relative shadow-2xl"
            >
              <Quote className="absolute top-10 right-10 text-white/5" size={120} />
              <div className="flex gap-1 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-blue-500 text-blue-500" />)}
              </div>
              <blockquote className="text-2xl md:text-3xl font-medium leading-snug mb-10 relative z-10">
                "FenTech Digital didn't just migrate our data; they re-engineered our entire workflow. The **$750k monthly savings** was just the beginning of the value they added."
              </blockquote>
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-1">
                    <img src="https://i.pravatar.cc/150?u=jon" className="rounded-full border-2 border-[#0a0c10]" alt="CTO" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Jonathan Rivera</h4>
                  <p className="text-blue-400 font-medium">CTO, Global Logistics Group</p>
                </div>
              </div>
            </motion.div>

            {/* Smaller Secondary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "Ops Director, MedTech",
                  text: "Their healthcare security protocols are world-class. A true partner in digital safety.",
                  img: "https://i.pravatar.cc/150?u=sarah"
                },
                {
                  name: "Marcus Thorne",
                  role: "Founder, Peak Fintech",
                  text: "Reliable, innovative, and fast. Delivered our AI app ahead of schedule.",
                  img: "https://i.pravatar.cc/150?u=marcus"
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-slate-50 border border-slate-100 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-500"
                >
                  <p className="text-slate-600 text-lg mb-8 italic">"{item.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={item.img} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt={item.name} />
                    <div>
                      <h5 className="font-bold text-slate-900">{item.name}</h5>
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}