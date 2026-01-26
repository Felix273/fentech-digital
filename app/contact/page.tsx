"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, 
  ChevronDown,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [contactData, setContactData] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [contactRes, footerRes] = await Promise.all([
      supabase.from('contact_settings').select('*').eq('id', 'default').single(),
      supabase.from('footer_settings').select('*').eq('id', 'default').single()
    ]);

    if (contactRes.data) setContactData(contactRes.data);
    if (footerRes.data) setFooterData(footerRes.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <RefreshCw className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <main className="bg-white min-h-screen">

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
            <p className="font-bold text-slate-900 text-sm">{footerData?.phone}</p>
          </div>
          <div className="border-l border-slate-200 pl-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email us:</p>
            <p className="font-bold text-slate-900 text-sm">{footerData?.email}</p>
          </div>
          <div className="border-l border-slate-200 pl-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">For more question:</p>
            <Link href={contactData?.faq_link || "#"} className="font-bold text-slate-900 text-sm hover:text-blue-600 underline decoration-slate-200">Check our FAQ page</Link>
          </div>
        </div>
      </section>

      {/* --- PURPLE SUPPORT ISLAND --- */}
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

          {/* RIGHT: TRUST METRICS */}
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
                { val: contactData?.years_experience, sub: "Years", label: "Proven Track Record" },
                { val: contactData?.customer_satisfaction, sub: "%", label: "Customer Satisfaction" },
                { val: contactData?.answer_time, sub: contactData?.answer_time_unit, label: "Average Answer Time" }
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

      {/* --- GLOBAL FOOTER --- */}
      <Footer />
    </main>
  );
}
