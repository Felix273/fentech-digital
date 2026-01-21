"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  ChevronRight,
  Headphones,
  Mail,
  Lock,
  Eye,
  Calendar,
  Check,
  Phone,
  Search,
  FileText,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ShieldCheck,
  AlertTriangle
} from "lucide-react";
import ServiceHero from "@/components/ServiceHero";

export default function CyberSecurityPage() {
  const otherServices = [
    { name: "Managed Services", active: false, slug: "managed-services" },
    { name: "Cyber Security", active: true, slug: "cyber-security" },
    { name: "IT Consulting", active: false, slug: "it-consulting" },
    { name: "Web Development", active: false, slug: "web-development" },
    { name: "Mobile Development", active: false, slug: "mobile-development" },
    { name: "Cloud Services", active: false, slug: "cloud-services" },
  ];

  return (
    <main className="bg-[#F4F7FA] min-h-screen font-sans">
      <ServiceHero title="Cyber Security" />

      {/* --- SECTION 1: TOP CONTENT --- */}
      <div className="w-full flex justify-center py-20">
        <div className="w-[90%] flex flex-col lg:flex-row gap-12">
          
          {/* SIDEBAR */}
          <aside className="lg:w-1/3 order-2 lg:order-1">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/50">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Service Menu</h4>
                </div>
                <div className="flex flex-col">
                  {otherServices.map((service, i) => (
                    <Link 
                      key={i}
                      href={`/services/${service.slug}`}
                      className={`flex items-center justify-between px-8 py-5 border-b border-slate-50 last:border-0 transition-all font-semibold ${
                        service.active ? "bg-blue-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                      }`}
                    >
                      <span className="text-[15px]">{service.name}</span>
                      <ChevronRight size={18} />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-blue-600 rounded-xl p-8 text-white text-center relative overflow-hidden shadow-xl">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert size={32} />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Emergency Response?</h4>
                  <p className="text-blue-100 text-sm mb-6 font-light">Immediate incident support for Kenyan firms.</p>
                  <button className="inline-flex items-center justify-center gap-2 font-bold bg-white text-blue-600 px-6 py-4 rounded-lg hover:bg-slate-900 hover:text-white transition-all text-sm w-full">
                    <Mail size={16} /> Get Urgent Help
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE CONTENT */}
          <div className="lg:w-2/3 order-1 lg:order-2 space-y-12">
            <div className="bg-white p-10 md:p-16 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-10 tracking-tight">Zero-Trust Security for the Digital Enterprise</h2>
              
              <p className="text-slate-600 text-lg leading-loose mb-12 font-light">
                In an era of sophisticated threats, basic firewalls are no longer enough. FenTech provides a multi-layered defense strategy designed to protect your data, your reputation, and your bottom line from evolving global cyber threats.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 py-10 border-t border-slate-50">
                {[
                  "End-to-End Data Encryption", 
                  "Penetration Testing & Audits", 
                  "Identity & Access Management", 
                  "Ransomware Protection", 
                  "Incident Response Planning", 
                  "Security Awareness Training"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <ShieldCheck size={24} className="text-blue-600 shrink-0" />
                    <span className="text-slate-700 font-bold text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <Eye className="text-blue-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 Monitoring</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  Our Security Operations Center (SOC) monitors your network around the clock 
                  to identify and neutralize threats in real-time.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <Lock className="text-blue-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Data Sovereignty</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  We help you navigate the complexities of data residency to ensure your 
                  client information remains secure and compliant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: CONTACT SECTION --- */}
      <div className="w-full bg-white flex justify-center pb-24">
        <section className="w-[90%] py-24 px-12 rounded-[3rem] bg-gradient-to-br from-[#0f172a] via-[#0a0c10] to-[#020617] relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-[1px] w-8 bg-blue-500"></span>
                    <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Secure your business</span>
                  </div>
                  <h2 className="text-4xl font-bold text-white leading-tight mb-6 tracking-tight">Request a Security <br /> Risk Assessment</h2>
                  <p className="text-slate-400 text-lg font-light leading-relaxed">Don't wait for a breach to happen. Let our experts audit your current infrastructure.</p>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm shadow-2xl">
                  <p className="text-blue-500 uppercase tracking-widest text-[10px] font-black mb-2">Call our Security Desk:</p>
                  <a href="tel:18003568933" className="text-3xl font-bold text-white hover:text-blue-400 transition-colors tracking-tighter">1-800-356-8933</a>
                </div>
              </div>

              <div className="lg:col-span-3 space-y-8 lg:border-l lg:border-white/10 lg:pl-12">
                <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-xs opacity-70">Our Audit Process</h4>
                <div className="space-y-12 relative">
                  <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-white/10 -z-0" />
                  {[
                    { step: "1", title: "Scanning", desc: "Vulnerability detection", icon: <Search size={18}/> },
                    { step: "2", title: "Analysis", desc: "Risk prioritization", icon: <AlertTriangle size={18}/> },
                    { step: "3", title: "Reporting", desc: "Detailed fix roadmap", icon: <FileText size={18}/> },
                  ].map((item) => (
                    <div key={item.step} className="relative z-10 flex gap-6 group">
                      <div className="w-10 h-10 rounded-full bg-[#0a0c10] border border-white/10 text-blue-500 flex items-center justify-center font-bold group-hover:border-blue-500 group-hover:text-white transition-all shadow-xl">{item.step}</div>
                      <div>
                        <h5 className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h5>
                        <p className="text-sm text-slate-500 font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <form className="space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">First Name</label><input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-600 transition-all text-slate-900" /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Last Name</label><input type="text" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-600 transition-all text-slate-900" /></div>
                    </div>
                    <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Work Email</label><input type="email" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-600 transition-all text-slate-900" /></div>
                    <textarea rows={3} className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl outline-none focus:border-blue-600 transition-all text-slate-900" placeholder="Describe your security concerns"></textarea>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="w-full bg-blue-600 text-white font-bold py-5 rounded-xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20">Request Audit</motion.button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- SECTION 3: FOOTER ISLAND --- */}
      <div className="w-full bg-white pb-12 flex justify-center mt-24">
        <footer className="w-[90%] rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.2)] bg-gradient-to-br from-[#0a0c10] via-[#0f172a] to-[#020617]">
          
          {/* LOGO BACKGROUND WATERMARK */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none uppercase">Fentech</span>
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
              <div className="lg:col-span-5 space-y-8">
                <div className="text-4xl font-black tracking-tighter text-white">FEN<span className="text-blue-600">TECH</span></div>
                <p className="text-slate-400 text-xl font-light leading-relaxed max-w-sm">Engineering the next generation of digital infrastructure with precision and transparency.</p>
                <div className="flex gap-4">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all border border-white/5"><Icon size={20} /></a>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3 space-y-8">
                <h4 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px]">Expertise</h4>
                <ul className="space-y-4 text-slate-300 text-lg font-light">
                  {["Managed IT", "Cyber Security", "Cloud Solutions", "Web & Mobile"].map((link) => (
                    <li key={link} className="hover:text-blue-400 transition-colors cursor-pointer">{link}</li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-4 space-y-8">
                <h4 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px]">Get in Touch</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-300"><Phone size={18} className="text-blue-500" /><span className="text-lg font-medium">+1 (800) 356-8933</span></div>
                  <div className="flex items-center gap-4 text-slate-300"><Mail size={18} className="text-blue-500" /><span className="text-lg font-medium">hello@fentech.digital</span></div>
                  <div className="flex items-center gap-4 text-slate-300"><MapPin size={18} className="text-blue-500" /><span className="text-lg font-medium">Nairobi, KE</span></div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-12 text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
              <div className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} FENTECH DIGITAL SOLUTIONS. ALL RIGHTS RESERVED.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}