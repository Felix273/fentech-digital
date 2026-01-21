"use client";

import React from "react";
// All icons imported to prevent ReferenceErrors
import { 
  Star, 
  Phone, 
  Mail, 
  HelpCircle, 
  Search, 
  Menu, 
  ChevronDown,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      
      {/* --- HEADER --- */}
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-center pt-6">
        <div className="w-[90%] max-w-7xl h-20 bg-white/70 backdrop-blur-xl border border-white/20 rounded-[2rem] px-8 flex items-center justify-between shadow-sm">
          <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
            FEN<span className="text-blue-600">TECH</span>
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            {["Services", "Solutions", "Case Studies", "Company"].map((item) => (
              <Link key={item} href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-blue-600 transition-colors font-sans">
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <Search size={18} className="text-slate-900 cursor-pointer" />
            <Link href="/contact" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px]">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* --- TOP INTRO SECTION --- */}
      <section className="pt-48 pb-16 flex flex-col items-center text-center px-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6 border border-slate-200 px-3 py-1 rounded">
          Client Support
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-[#0f172a] mb-6 tracking-tight">
          How can we help you?
        </h1>
        <p className="text-slate-500 max-w-2xl leading-relaxed mb-12">
          We strive to make support as easy and well organized as possible for you. Please use the following contact information for technical support requests only.
        </p>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-left">
          <div className="border-l border-slate-200 pl-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Call us at:</p>
            <p className="font-bold text-slate-900 text-sm">1-800-356-8933</p>
          </div>
          <div className="border-l border-slate-200 pl-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email us:</p>
            <p className="font-bold text-slate-900 text-sm">support@tecnologia.com</p>
          </div>
          <div className="border-l border-slate-200 pl-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">For more question:</p>
            <Link href="#" className="font-bold text-slate-900 text-sm hover:text-blue-600 underline decoration-slate-200">Check our FAQ page</Link>
          </div>
        </div>
      </section>

      {/* --- PURPLE SUPPORT ISLAND (MATCHED TO UPLOADED IMAGE) --- */}
      <section className="w-full flex justify-center pb-24">
        <div className="w-[90%] max-w-7xl bg-[#E8E8FF] p-12 md:p-20 flex flex-col lg:flex-row gap-0 items-stretch relative overflow-hidden">
          
          {/* LEFT: FORM CARD */}
          <div className="w-full lg:w-[65%] bg-white p-10 shadow-sm relative z-10">
            <h3 className="text-xl font-bold text-slate-900 mb-10">Submit a Support Request</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="First Name" className="w-full p-4 bg-white border border-slate-200 rounded-sm text-sm outline-none" />
                <input placeholder="Last Name" className="w-full p-4 bg-white border border-slate-200 rounded-sm text-sm outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Company" className="w-full p-4 bg-white border border-slate-200 rounded-sm text-sm outline-none" />
                <input placeholder="Email" className="w-full p-4 bg-white border border-slate-200 rounded-sm text-sm outline-none" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Phone" className="w-full p-4 bg-white border border-slate-200 rounded-sm text-sm outline-none" />
                <div className="relative">
                  <select className="w-full p-4 bg-white border border-slate-200 rounded-sm text-sm outline-none appearance-none text-slate-400 pr-10">
                    <option>Priority</option>
                    <option>Normal</option>
                    <option>Urgent</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <textarea placeholder="Description" rows={5} className="w-full p-4 bg-white border border-slate-200 rounded-sm text-sm outline-none resize-none" />
              
              <div className="flex items-center gap-3 py-4">
                <input type="checkbox" className="w-4 h-4 border-slate-300 rounded-sm" />
                <span className="text-[11px] text-slate-500 font-medium leading-tight">
                  I am informed about processing of my personal data and the right to withdraw my consent*
                </span>
              </div>
              
              <button className="bg-[#4100D1] text-white px-10 py-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-colors">
                Submit
              </button>
            </form>
          </div>

          {/* RIGHT: TRUST METRICS (STRETCHED VERTICALLY) */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center px-12 lg:px-20 space-y-12 relative z-10">
            <div>
              <p className="text-[10px] font-bold text-[#FF3B3B] uppercase tracking-[0.2em] mb-1">Reviewed on</p>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#0f172a] tracking-tighter uppercase italic">Clutch</span>
                <div className="flex text-[#FF3B3B] gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">31 Reviews</p>
            </div>

            <div className="space-y-10">
              {[
                { val: "20", sub: "Years", label: "Proven Track Record" },
                { val: "98", sub: "%", label: "Customer Satisfaction" },
                { val: "3", sub: "Mins", label: "Average Answer Time" }
              ].map((m, i) => (
                <div key={i} className={`${i !== 2 ? "border-b border-slate-200/50" : ""} pb-6`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{m.val}</span>
                    <span className="text-lg font-bold text-slate-900">{m.sub}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mt-1 leading-tight">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER ISLAND --- */}
      <div className="w-full bg-white pb-12 flex justify-center">
        <footer className="w-[80%] rounded-[3rem] p-12 md:p-20 relative overflow-hidden bg-gradient-to-br from-[#0a0c10] via-[#0f172a] to-[#020617] shadow-2xl">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="text-[20vw] font-black uppercase tracking-tighter">Fentech</span>
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-8">
              <div className="text-4xl font-black text-white tracking-tighter">FEN<span className="text-blue-600">TECH</span></div>
              <p className="text-slate-400 text-xl font-light max-w-sm">Engineering the next generation of digital infrastructure with precision and transparency.</p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white border border-white/5 transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <h4 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Expertise</h4>
              <ul className="space-y-4 text-slate-300 text-lg font-light">
                {["Managed IT", "Cyber Security", "Cloud Solutions", "Web & Mobile"].map(item => (
                  <li key={item} className="hover:text-blue-400 transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4">
              <h4 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Get in Touch</h4>
              <div className="space-y-6 text-slate-300 text-lg font-medium">
                <p>+1 (800) 356-8933</p>
                <p>hello@fentech.digital</p>
                <p>London, UK EC1</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}