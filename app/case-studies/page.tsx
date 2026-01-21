"use client";

import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";
import ServiceHero from "@/components/ServiceHero";
import Footer from "@/components/Footer";
// Import the central data source
import { caseStudiesData } from "./data"; 

export default function CaseStudiesPage() {
  return (
    <main className="bg-white min-h-screen selection:bg-blue-600 selection:text-white">
      <ServiceHero 
        title="Case Studies" 
        subtitle="Featured case studies" 
      />

      {/* --- CASE STUDIES GRID --- */}
      <section className="w-full flex justify-center py-24 bg-slate-50">
        <div className="w-[85%] max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {caseStudiesData.map((study) => (
              <div key={study.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={study.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={study.title} 
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-3">
                    {study.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  
                  {/* Using 'about' or 'challenge' as a fallback for the description */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {study.about}
                  </p>
                  
                  <div className="space-y-2 mb-8">
                    {/* Mapping through results or generic tags */}
                    {study.results.slice(0, 2).map((result, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                        <span className="text-blue-600">✔︎</span> {result}
                      </div>
                    ))}
                  </div>
                  
                  {/* ACTIVATED DYNAMIC LINK */}
                  <Link 
                    href={`/case-studies/${study.id}`} 
                    className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-4 transition-all"
                  >
                    Learn more <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & WORKFLOW SECTION --- */}
      <section className="w-full flex justify-center py-24 border-t border-slate-100">
        <div className="w-[85%] max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Info */}
          <div>
            <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Contact us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">Partner with Us for Comprehensive IT</h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
              We’re happy to answer any questions you may have and help you determine which of our services best fit your needs.
            </p>
            
            <div className="mb-12">
              <p className="text-slate-400 text-sm uppercase font-bold tracking-widest mb-1">Call us at:</p>
              <p className="text-2xl font-bold text-blue-600">1-800-356-8933</p>
            </div>

            <div className="grid grid-cols-2 gap-y-4 mb-16">
              <div className="space-y-4">
                <p className="font-bold text-slate-900 flex flex-col">Your benefits:</p>
                {["Client-oriented", "Independent", "Competent"].map(b => (
                  <div key={b} className="flex items-center gap-2 text-slate-600 text-sm">
                    <Check size={16} className="text-blue-600" /> {b}
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6">
                {["Results-driven", "Problem-solving", "Transparent"].map(b => (
                  <div key={b} className="flex items-center gap-2 text-slate-600 text-sm">
                    <Check size={16} className="text-blue-600" /> {b}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100">
              <p className="font-bold text-slate-900 mb-8 uppercase tracking-widest text-xs">What happens next?</p>
              <div className="space-y-8">
                {[
                  { n: "1", t: "We Schedule a call at your convenience" },
                  { n: "2", t: "We do a discovery and consulting meeting" },
                  { n: "3", t: "We prepare a proposal" }
                ].map(step => (
                  <div key={step.n} className="flex gap-6">
                    <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">{step.n}</span>
                    <p className="text-slate-700 font-medium pt-2">{step.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50">
            <h3 className="text-2xl font-bold mb-8 text-slate-900">Schedule a Free Consultation</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First name" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors" />
                <input type="text" placeholder="Last name" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors" />
              </div>
              <input type="text" placeholder="Company / Organization" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors" />
              <input type="email" placeholder="Company email" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors" />
              <input type="tel" placeholder="Phone" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors" />
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">How Can We Help You?</label>
                <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors appearance-none">
                  <option>Select Option</option>
                  <option>Managed Services</option>
                  <option>IT Consulting & Advisory</option>
                  <option>Cyber Security</option>
                  <option>Web Development</option>
                  <option>Mobile Development</option>
                  <option>Cloud Services</option>
                  <option>Other</option>
                </select>
              </div>

              <textarea placeholder="Message" rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors" />
              
              <button className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-slate-900 transition-all shadow-lg shadow-blue-200">
                Submit
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}