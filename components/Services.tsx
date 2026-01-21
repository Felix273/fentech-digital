"use client";
import { motion } from "framer-motion";
import { Code, Database, Shield } from "lucide-react";

const services = [
  { title: "Software Development", desc: "Custom-built applications designed to scale.", icon: <Code size={32} /> },
  { title: "IT Infrastructure", desc: "Robust hardware solutions for 99.9% uptime.", icon: <Database size={32} /> },
  { title: "Cyber Security", desc: "Enterprise-grade protection for your data.", icon: <Shield size={32} /> }
];

export default function Services() {
  return (
    <section className="py-24 bg-slate-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">What We Do</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">Comprehensive IT Solutions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-10 rounded-xl shadow-sm border border-slate-100 hover:shadow-xl group transition-all">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">{s.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{s.title}</h3>
              <p className="text-slate-500 mb-6">{s.desc}</p>
              <button className="text-blue-600 font-bold text-sm uppercase tracking-wider">Details +</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
