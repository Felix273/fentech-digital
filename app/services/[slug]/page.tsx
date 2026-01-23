"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Cloud, 
  ChevronRight,
  Mail,
  Check
} from "lucide-react";
import ServiceHero from "@/components/ServiceHero";
import { useParams, useRouter } from "next/navigation";

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
    
    // Listen for storage changes (when admin saves)
    const handleStorageChange = () => {
      loadServices();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [params.slug]);

  const loadServices = async () => {
    try {
      // Always check localStorage first
      const saved = localStorage.getItem('services');
      let servicesData;
      
      if (saved) {
        servicesData = JSON.parse(saved);
      } else {
        const module = await import('@/lib/data/services');
        servicesData = module.servicesData;
        // Save default data to localStorage
        localStorage.setItem('services', JSON.stringify(servicesData));
      }

      setAllServices(servicesData);
      
      const currentService = servicesData.find(s => s.slug === params.slug);
      
      if (!currentService) {
        router.push('/services');
        return;
      }
      
      setService(currentService);
      setLoading(false);
    } catch (error) {
      console.error('Error loading services:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading service...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  return (
    <main className="bg-[#F4F7FA] min-h-screen font-sans">
      <ServiceHero title={service.heroTitle || service.name} />

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
                  {allServices.map((svc, i) => (
                    <Link 
                      key={i}
                      href={`/services/${svc.slug}`}
                      className={`flex items-center justify-between px-8 py-5 border-b border-slate-50 last:border-0 transition-all font-semibold ${
                        svc.slug === service.slug ? "bg-blue-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                      }`}
                    >
                      <span className="text-[15px]">{svc.name}</span>
                      <ChevronRight size={18} />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-blue-600 rounded-xl p-8 text-white text-center relative overflow-hidden shadow-xl">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Cloud size={32} />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Need This Service?</h4>
                  <p className="text-blue-100 text-sm mb-6 font-light">Get a custom quote for your business.</p>
                  <Link href="/contact">
                    <button className="inline-flex items-center justify-center gap-2 font-bold bg-white text-blue-600 px-6 py-4 rounded-lg hover:bg-slate-900 hover:text-white transition-all text-sm w-full">
                      <Mail size={16} /> Request Quote
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT SIDE CONTENT */}
          <div className="lg:w-2/3 order-1 lg:order-2 space-y-12">
            <div className="bg-white p-10 md:p-16 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-10 tracking-tight">
                {service.title}
              </h2>
              
              <p className="text-slate-600 text-lg leading-loose mb-12 font-light">
                {service.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 py-10 border-t border-slate-50">
                {service.features && service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-base">{feature}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-12 rounded-2xl text-white text-center shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss how {service.name.toLowerCase()} can help your organization achieve its goals.
              </p>
              <Link href="/contact">
                <button className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                  Get Started Today
                  <ChevronRight size={20} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
