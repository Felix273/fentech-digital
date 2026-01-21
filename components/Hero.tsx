"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    // OUTER CONTAINER: White background, handles the spacing from the top
    <section className="bg-white w-full pb-10 pt-28"> {/* pt-28 adds the space at the top */}
      
      {/* INNER BOX: The dark "image" area. 
          - w-[90%]: Covers roughly 80-90% of width
          - mx-auto: Centers it perfectly
          - h-[75vh]: Keeps the height tall but manageable
          - rounded-3xl: Adds those premium curved corners
      */}
      <div className="relative w-[90%] md:w-[94%] max-w-[1600px] mx-auto h-[75vh] min-h-[600px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* BACKGROUND IMAGE LAYER */}
        <div className="absolute inset-0 z-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
          
          {/* Image */}
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" 
            }} 
          />
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-20 h-full flex items-center px-8 md:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            {/* Accent Line */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-blue-500"></div>
              <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">
                IT Solutions & Services
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
  Leading the <br />
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
    Digital Evolution
  </span>
</h1>

            {/* Subtext */}
            <p className="text-slate-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl border-l-4 border-blue-600 pl-6 bg-slate-900/30 backdrop-blur-sm py-2 rounded-r-lg">
              FenTech Digital transforms businesses through innovative software 
              development and managed IT infrastructure.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-bold text-sm uppercase tracking-wide transition-all flex items-center gap-2 shadow-lg shadow-blue-900/50">
                Our Services <ArrowRight size={16} />
              </button>
              <button className="bg-transparent border-2 border-white/30 hover:bg-white hover:text-slate-900 text-white px-8 py-4 rounded-md font-bold text-sm uppercase tracking-wide transition-all">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}