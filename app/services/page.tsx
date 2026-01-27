"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Contact from "@/components/Contact";
import { 
  ChevronRight, 
  Cpu, 
  ShieldCheck, 
  Cloud, 
  Code2, 
  Smartphone, 
  Lightbulb,
  Check, 
  Phone, 
  ArrowRight, 
  Calendar, 
  Search, 
  FileText,
  CheckCircle2,
  BarChart3,
  Zap,
  Headphones,
  Users,
  CheckCircle
} from "lucide-react";

// --- SHARED COMPONENTS ---
import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer"; 

export default function AllServicesPage() {
  const allServices = [
    { 
      title: "Managed Services", 
      desc: "Comprehensive IT infrastructure management tailored for the region, from server maintenance to endpoint security.",
      icon: <Cpu size={32} strokeWidth={1.5} />,
      slug: "managed-services",
      tag: "Infrastructure"
    },
    { 
      title: "Cyber Security", 
      desc: "Advanced threat detection and zero-trust protocols to protect your enterprise data assets in a competitive landscape.",
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      slug: "cyber-security",
      tag: "Security"
    },
    { 
      title: "Cloud Services", 
      desc: "Strategic cloud migration and architecture design for AWS, Azure, and Google Cloud environments.",
      icon: <Cloud size={32} strokeWidth={1.5} />,
      slug: "cloud-services",
      tag: "Cloud"
    },
    { 
      title: "Web Development", 
      desc: "Bespoke web applications built with modern frameworks for high-speed performance and global scale.",
      icon: <Code2 size={32} strokeWidth={1.5} />,
      slug: "web-development",
      tag: "Software"
    },
    { 
      title: "Mobile Development", 
      desc: "Native and cross-platform mobile solutions designed to deliver seamless user experiences on iOS and Android.",
      icon: <Smartphone size={32} strokeWidth={1.5} />,
      slug: "mobile-development",
      tag: "Mobile"
    },
    { 
      title: "IT Consulting", 
      desc: "Strategic IT roadmapping and digital transformation consulting to align your technology with business goals.",
      icon: <Lightbulb size={32} strokeWidth={1.5} />,
      slug: "it-consulting",
      tag: "Strategy"
    }
  ];

  const pricingPlans = [
    {
      name: "Standard",
      price: "45,000",
      desc: "Ideal for growing businesses needing reliable core IT oversight in Kenya.",
      features: ["Business Hours Support", "Remote Monitoring", "Basic Security Suite", "Cloud Backup (500GB)", "Monthly Reporting"],
      isFeatured: false
    },
    {
      name: "Enterprise",
      price: "125,000",
      desc: "Our most popular plan for full-scale digital resilience for local firms.",
      features: ["24/7/365 Support", "On-site Assistance", "Zero-Trust Security", "Disaster Recovery", "Dedicated Lead Engineer", "Strategic IT Roadmap"],
      isFeatured: true
    },
    {
      name: "Bespoke",
      price: "Custom",
      desc: "Designed for large-scale infrastructure and high-compliance corporate needs.",
      features: ["Unlimited Scaling", "Advanced SOC Monitoring", "Custom Software Dev", "Global Compliance Audit", "White-glove Service"],
      isFeatured: false
    }
  ];

  return (
    <main className="bg-[#F4F7FA] min-h-screen font-sans flex flex-col items-center overflow-x-hidden text-slate-900">
      <div className="w-full">
        <ServiceHero title="Our Services" />
      </div>

      {/* --- BENEFITS SECTION --- */}
      <section className="w-[80%] py-32">
        <div className="flex flex-col lg:flex-row gap-24 mb-32">
          <div className="lg:w-7/12">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-12 bg-blue-600"></span>
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[10px]">Why Choose Fentech</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-10 tracking-tight leading-tight">
              Benefits of managed IT services <br /> provided by Fentech
            </h2>
            <p className="text-slate-600 text-xl font-light leading-relaxed mb-12 max-w-2xl">
              Are you busy putting out IT fires instead of focusing on your core business? If your technology is draining resources, Fentech can get you back on track.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                "Grow your business while our experts handle your technology.",
                "Get more done with IT that increases productivity.",
                "Eliminate budgeting surprises with a flat monthly rate.",
                "Protect your business and data from unwanted intruders."
              ].map((text, idx) => (
                <li key={idx} className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <CheckCircle2 className="text-blue-600 shrink-0" size={24} />
                  <span className="text-slate-700 font-medium text-base leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:w-5/12 flex items-stretch">
            <div className="bg-white p-12 md:p-16 w-full rounded-[3rem] border border-slate-100 shadow-xl flex flex-col justify-center relative overflow-hidden group">
              <h3 className="text-3xl font-bold text-slate-900 mb-8 italic underline decoration-blue-600 underline-offset-[12px]">IT Service for You</h3>
              <p className="text-slate-500 font-light leading-loose text-xl mb-10">
                We know that every businesses’ needs are completely different from the next, so we offer packages for any business size or budget.
              </p>
              <div className="pt-10 border-t border-slate-100">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <Users size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Fentech Hub</p>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">Expert Support 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="w-[80%] py-32 border-t border-slate-200">
        <div className="mb-20">
           <h2 className="text-5xl font-bold text-slate-900 tracking-tight mb-4">Technical Specializations</h2>
           <p className="text-slate-500 font-light text-xl">World-class solutions engineered for precision and scale.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {allServices.map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -12 }}
              className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col min-h-[460px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  {service.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 border border-slate-100 px-4 py-1.5 rounded-full">
                  {service.tag}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed font-light mb-12 flex-grow">
                {service.desc}
              </p>
              <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-4 text-xs font-bold text-slate-900 uppercase tracking-widest group-hover:gap-6 transition-all">
                Learn More <ChevronRight size={16} className="text-blue-600" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- UPDATED PRICING SECTION (KSH) --- */}
      <section className="w-full bg-slate-900 py-32 flex justify-center text-white">
        <div className="w-[80%]">
          <div className="mb-20 text-center">
            <h2 className="text-5xl font-bold mb-4 tracking-tight">Flexible Service Plans</h2>
            <p className="text-slate-400 text-xl font-light">Transparent local pricing for premium digital infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-[3rem] flex flex-col transition-all duration-500 border ${
                  plan.isFeatured 
                  ? "bg-blue-600 border-blue-500 shadow-2xl shadow-blue-500/20 scale-105 z-10" 
                  : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  {plan.price !== "Custom" && <span className="text-sm font-medium opacity-70 mr-1">Ksh</span>}
                  <span className="text-4xl font-bold leading-none">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-sm opacity-60">/mo</span>}
                </div>
                <p className={`text-sm mb-10 leading-relaxed min-h-[40px] ${plan.isFeatured ? "text-blue-50" : "text-slate-400"}`}>
                  {plan.desc}
                </p>
                
                <ul className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle size={18} className={plan.isFeatured ? "text-white" : "text-blue-500"} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  plan.isFeatured 
                  ? "bg-white text-blue-600 hover:bg-slate-900 hover:text-white" 
                  : "bg-blue-600 text-white hover:bg-white hover:text-blue-600"
                }`}>
                  {plan.price === "Custom" ? "Contact Us" : `Select ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <div className="w-full">
        <Contact />
      </div>
      <Footer />
      <div className="w-full py-12 flex justify-center border-t border-slate-100 bg-slate-50">
        <p className="text-slate-400 font-medium text-xs uppercase tracking-[0.5em]">© 2026 FenTech Digital. All rights reserved.</p>
      </div>
    </main>
  );
}
