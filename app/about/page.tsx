"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Eye, 
  Award, 
  Users2, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Rocket
} from "lucide-react";

import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer";

export default function AboutUsPage() {
  const values = [
    { title: "Precision", desc: "We believe in engineering solutions that are accurate to the last line of code.", icon: <Target size={28} /> },
    { title: "Transparency", desc: "No hidden costs or complex jargon. Just clear communication and honest work.", icon: <Eye size={28} /> },
    { title: "Innovation", desc: "Staying ahead of the curve so our clients never have to catch up.", icon: <Zap size={28} /> },
    { title: "Security", desc: "Protecting your digital assets is at the core of every design we build.", icon: <ShieldCheck size={28} /> }
  ];

  return (
    <main className="bg-[#F4F7FA] min-h-screen flex flex-col items-center overflow-x-hidden text-slate-900">
      {/* 1. HERO SECTION */}
      <div className="w-full">
        <ServiceHero 
          title="About Fentech" 
          subtitle="Engineering the future of digital infrastructure with integrity and precision." 
        />
      </div>

      {/* 2. OUR STORY (The 80% Layout) */}
      <section className="w-[80%] py-32">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-12 bg-blue-600"></span>
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px]">Our Identity</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
              We are architects of <br /> 
              <span className="text-blue-600">Digital Resilience.</span>
            </h2>
            <p className="text-slate-600 text-xl font-light leading-loose mb-8">
              Founded on the principle of technical excellence, Fentech was built to bridge the gap between complex enterprise needs and seamless digital execution. We don't just provide services; we build the foundations upon which businesses grow.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              <div>
                <h4 className="text-3xl font-bold text-slate-900">100+</h4>
                <p className="text-sm text-slate-500 uppercase tracking-widest mt-2">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-slate-900">24/7</h4>
                <p className="text-sm text-slate-500 uppercase tracking-widest mt-2">Expert Support</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative p-4">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-full h-full bg-blue-600 rounded-[4rem] rotate-3 -z-10 opacity-5" />
              <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
                <p className="text-slate-500 leading-relaxed text-lg font-light mb-10">
                  To empower African enterprises through high-performance IT infrastructure, robust cybersecurity, and bespoke software solutions that compete on a global scale.
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

      {/* 3. CORE VALUES MATRIX */}
      <section className="w-full bg-slate-900 py-32 flex justify-center text-white">
        <div className="w-[80%]">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Values that Drive Us</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-light">
              Our culture is built on a commitment to quality and a relentless pursuit of better solutions for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center"
              >
                <div className="text-blue-500 flex justify-center mb-6">{value.icon}</div>
                <h4 className="text-xl font-bold mb-4">{value.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-light">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEAM / CULTURE SECTION */}
      <section className="w-[80%] py-32">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
             <div className="grid grid-cols-2 gap-4">
                <div className="h-64 bg-slate-200 rounded-[2rem] overflow-hidden">
                   {/* Replace with actual team image */}
                   <div className="w-full h-full bg-gradient-to-br from-blue-100 to-slate-200" />
                </div>
                <div className="h-64 bg-slate-200 rounded-[2rem] mt-12 overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-slate-200 to-blue-50" />
                </div>
             </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold tracking-tight">Technical Minds, <br/> Client-First Hearts.</h2>
            <p className="text-slate-600 text-lg font-light leading-relaxed">
              At Fentech, we pride ourselves on a team that is as competent as it is approachable. We don't hide behind technical jargon; we work alongside you to solve your most pressing business challenges.
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

      {/* FOOTER & COPYRIGHT */}
      <Footer />
      <div className="w-full py-12 flex justify-center border-t border-slate-100 bg-slate-50">
        <p className="text-slate-400 font-medium text-xs uppercase tracking-[0.5em]">
          © 2026 FenTech Digital. All rights reserved.
        </p>
      </div>
    </main>
  );
}