"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState({ phone: false, whatsapp: false });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneNumber = "+254114295869";
  const whatsappNumber = "+254114295869";
  const whatsappMessage = "Hello Fentech Digital! I'm interested in your IT services.";

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 flex flex-col gap-4"
        >
          <motion.div
            className="relative"
            onMouseEnter={() => setShowTooltip({ ...showTooltip, whatsapp: true })}
            onMouseLeave={() => setShowTooltip({ ...showTooltip, whatsapp: false })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handleWhatsAppClick}
              className="w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group relative overflow-hidden"
              aria-label="Contact us on WhatsApp"
            >
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
              <MessageCircle size={28} className="relative z-10" />
            </button>

            {showTooltip.whatsapp && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-xl"
              >
                Chat on WhatsApp
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-l-8 border-l-slate-900 border-y-4 border-y-transparent"></div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className="relative"
            onMouseEnter={() => setShowTooltip({ ...showTooltip, phone: true })}
            onMouseLeave={() => setShowTooltip({ ...showTooltip, phone: false })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={handlePhoneClick}
              className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group relative overflow-hidden"
              aria-label="Call us now"
            >
              <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20"></span>
              <Phone size={28} className="relative z-10" />
            </button>

            {showTooltip.phone && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap shadow-xl"
              >
                Call Us Now
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-l-8 border-l-slate-900 border-y-4 border-y-transparent"></div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
