"use client";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/services`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "IT Services" },
    { href: "/about", label: "About Us" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-4" : "bg-white/95 backdrop-blur-sm py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 z-50">
            FEN<span className="text-blue-600">TECH</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={isActive(link.href) ? "text-blue-600" : "hover:text-blue-600 transition-colors"}>
                {link.label}
              </Link>
            ))}
            <button onClick={() => setIsSearchOpen(true)} className="text-slate-400 hover:text-blue-600 transition-colors">
              <Search size={18} />
            </button>
          </nav>

          <div className="hidden md:block">
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all inline-block">
              Get a Quote
            </Link>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-slate-900 z-50 relative" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full pt-24 px-6">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`px-4 py-4 rounded-lg text-base font-semibold transition-all ${isActive(link.href) ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <button onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }} className="mt-4 px-4 py-4 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-3 transition-all">
            <Search size={20} />
            Search
          </button>

          <div className="mt-auto pb-8">
            <Link href="/contact" className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all text-center">
              Get a Quote
            </Link>
          </div>

          <div className="pb-8 pt-6 border-t border-slate-100 space-y-3">
            <a href="tel:+254114295869" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Call: +254 114 295 869</a>
            <a href="mailto:fentechgroup@gmail.com" className="block text-sm text-slate-600 hover:text-blue-600 transition-colors">Email Us</a>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-32 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Search</h3>
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="text-slate-400 hover:text-slate-900 transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search services..." className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-600 outline-none text-lg" autoFocus />
              </div>
              <div className="mt-6 flex gap-3">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Search</button>
                <button type="button" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} className="px-6 bg-slate-100 text-slate-600 py-3 rounded-lg font-bold hover:bg-slate-200">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
