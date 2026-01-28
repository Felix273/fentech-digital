"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Phone, ArrowRight, Calendar, Search, FileText, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
  const [footerData, setFooterData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    serviceRequired: "Managed Services",
    message: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    const { data } = await supabase
      .from('footer_settings')
      .select('*')
      .eq('id', 'default')
      .single();

    if (data) setFooterData(data);
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address (e.g., name@example.com)";
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous status
    setSubmitStatus(null);

    // Validate form
    if (!validateForm()) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please fix the errors below before submitting' 
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.' 
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          serviceRequired: "Managed Services",
          message: ""
        });
        setErrors({});
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: data.error || 'Something went wrong. Please try again.' 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#0f172a] via-[#0a0c10] to-[#020617] relative overflow-hidden">
      
      {/* Dynamic Glow Accents */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LEFT COLUMN: BRANDING & BENEFITS */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-blue-500"></span>
                <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Contact us</span>
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight mb-6 tracking-tight">
                Partner with Us for <br /> Comprehensive IT
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                We're happy to answer any questions you may have and help you determine 
                which of our services best fit your needs.
              </p>
            </div>

            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm shadow-2xl">
              <p className="text-blue-500 uppercase tracking-widest text-[10px] font-black mb-2">Call us at:</p>
              <a href={`tel:${footerData?.phone?.replace(/[^0-9]/g, '')}`} className="text-3xl font-bold text-white hover:text-blue-400 transition-colors tracking-tighter">
                {footerData?.phone || "1-800-356-8933"}
              </a>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs opacity-70">Your benefits:</h4>
              <div className="grid grid-cols-2 gap-y-5 gap-x-2">
                {["Client-oriented", "Independent", "Competent", "Results-driven", "Problem-solving", "Transparent"].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <Check size={12} className="text-blue-500 group-hover:text-white" strokeWidth={4} />
                    </div>
                    <span className="text-slate-300 font-medium text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: THE PROCESS */}
          <div className="lg:col-span-3 space-y-8 lg:border-l lg:border-white/10 lg:pl-12">
            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-xs opacity-70">What happens next?</h4>
            
            <div className="space-y-12 relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-white/10 -z-0" />
              
              {[
                { step: "1", title: "Schedule a call", desc: "At your convenience", icon: <Calendar size={18}/> },
                { step: "2", title: "Discovery", desc: "Consulting meeting", icon: <Search size={18}/> },
                { step: "3", title: "Proposal", desc: "We prepare a quote", icon: <FileText size={18}/> },
              ].map((item) => (
                <div key={item.step} className="relative z-10 flex gap-6 group">
                  <div className="w-10 h-10 rounded-full bg-[#0a0c10] border border-white/10 text-blue-500 flex items-center justify-center font-bold group-hover:border-blue-500 group-hover:text-white transition-all shadow-xl">
                    {item.step}
                  </div>
                  <div>
                    <h5 className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.title}</h5>
                    <p className="text-sm text-slate-500 font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <button className="text-blue-500 font-bold flex items-center gap-2 hover:gap-4 transition-all group">
                Schedule a Free Consultation 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: THE FORM */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full bg-slate-50 border ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'} p-4 rounded-xl outline-none transition-all disabled:opacity-50`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <div className="flex items-center gap-1 text-red-500 text-xs ml-1 mt-1">
                        <AlertCircle size={12} />
                        <span>{errors.firstName}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className={`w-full bg-slate-50 border ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'} p-4 rounded-xl outline-none transition-all disabled:opacity-50`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <div className="flex items-center gap-1 text-red-500 text-xs ml-1 mt-1">
                        <AlertCircle size={12} />
                        <span>{errors.lastName}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Company Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full bg-slate-50 border ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'} p-4 rounded-xl outline-none transition-all disabled:opacity-50`}
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 text-red-500 text-xs ml-1 mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Service Required</label>
                  <select 
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:border-blue-600 outline-none transition-all cursor-pointer disabled:opacity-50"
                  >
                    <option>Managed Services</option>
                    <option>IT Consulting & Advisory</option>
                    <option>Cyber Security</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>Cloud Services</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Message *</label>
                  <textarea 
                    rows={3} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full bg-slate-50 border ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-blue-600'} p-4 rounded-xl outline-none transition-all resize-none disabled:opacity-50`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1 text-red-500 text-xs ml-1 mt-1">
                      <AlertCircle size={12} />
                      <span>{errors.message}</span>
                    </div>
                  )}
                </div>

                {submitStatus && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-start gap-3 ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{submitStatus.message}</span>
                  </motion.div>
                )}
                
                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                  className="w-full bg-blue-600 text-white font-bold py-5 rounded-xl hover:bg-[#0a0c10] transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </motion.button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
