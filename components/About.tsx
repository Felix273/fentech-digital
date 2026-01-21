"use client";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  const points = ["Expert Technical Support", "Custom Strategic Planning", "Advanced Security Protocols", "Scalable Cloud Infrastructure"];
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600 -z-10 rounded-lg"></div>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Team" className="rounded-xl shadow-2xl relative z-10" />
        </div>
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">About FenTech Digital</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">We are your partners in <br /> <span className="text-blue-600">Digital Transformation.</span></h2>
          <p className="text-slate-600 text-lg mb-8">FenTech Digital empowers modern enterprises through precision engineering and strategic IT management.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {points.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="text-blue-600" size={20} />
                <span className="text-slate-700 font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
