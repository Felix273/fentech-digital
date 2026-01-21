"use client";

import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for sticky navbar transparency/shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-4" : "bg-white/95 backdrop-blur-sm py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <div className="text-2xl font-black tracking-tighter text-slate-900">
          FEN<span className="text-blue-600">TECH</span>
        </div>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
          <Link href="/" className="text-blue-600">Home</Link>
          <Link href="/services" className="hover:text-blue-600 transition-colors">IT Services</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
          <Link href="/case-studies" className="hover:text-blue-600 transition-colors">Case Studies</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
          
          {/* SEARCH ICON */}
          <button className="text-slate-400 hover:text-blue-600">
            <Search size={18} />
          </button>
        </nav>

        {/* CALL TO ACTION BUTTON */}
        <div className="hidden md:block">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all">
            Get a Quote
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="md:hidden text-slate-900">
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
}