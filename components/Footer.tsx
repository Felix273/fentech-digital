"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Footer() {
  const [footerData, setFooterData] = useState({
    company_description: "Engineering the next generation of digital infrastructure with precision and transparency.",
    phone: "+1 (800) 356-8933",
    email: "hello@fentech.digital",
    address: "London, UK EC1",
    facebook_url: "#",
    twitter_url: "#",
    linkedin_url: "#",
    instagram_url: "#"
  });

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    const { data, error } = await supabase
      .from('footer_settings')
      .select('*')
      .eq('id', 'default')
      .single();

    if (data) {
      setFooterData(data);
    }
  };

  return (
    <div className="w-full bg-white pt-24 pb-12 flex justify-center">
      <footer className="w-[80%] rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.2)] bg-gradient-to-br from-[#0a0c10] via-[#0f172a] to-[#020617]">
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none uppercase">
            Fentech
          </span>
        </div>

        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />

        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            
            {/* COLUMN 1: BRANDING */}
            <div className="lg:col-span-5 space-y-8">
              <div className="text-4xl font-black tracking-tighter text-white">
                FEN<span className="text-blue-600">TECH</span>
              </div>
              <p className="text-slate-400 text-xl font-light leading-relaxed max-w-sm">
                {footerData.company_description}
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Facebook, url: footerData.facebook_url },
                  { Icon: Twitter, url: footerData.twitter_url },
                  { Icon: Linkedin, url: footerData.linkedin_url },
                  { Icon: Instagram, url: footerData.instagram_url }
                ].map(({ Icon, url }, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 border border-white/5 hover:border-blue-500">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* COLUMN 2: SERVICES */}
            <div className="lg:col-span-3 space-y-8">
              <h4 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px]">Expertise</h4>
              <ul className="space-y-4 text-slate-300 text-lg font-light">
                {["Managed IT", "Cyber Security", "Cloud Solutions", "Web & Mobile"].map((link) => (
                  <li key={link} className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-3 group">
                    <div className="w-0 h-[1px] bg-blue-500 group-hover:w-4 transition-all" />
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: CONTACT */}
            <div className="lg:col-span-4 space-y-8">
              <h4 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px]">Get in Touch</h4>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Phone size={18} className="text-blue-500" />
                  </div>
                  <span className="text-lg font-medium tracking-tight">{footerData.phone}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Mail size={18} className="text-blue-500" />
                  </div>
                  <span className="text-lg font-medium tracking-tight">{footerData.email}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <MapPin size={18} className="text-blue-500" />
                  </div>
                  <span className="text-lg font-medium tracking-tight">{footerData.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="pt-10 border-t border-white/5 flex justify-center">
            <div className="flex gap-12 text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">
              <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Legal Audit</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
