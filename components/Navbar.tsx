"use client";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can customize this - for now it goes to services page
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-4" : "bg-white/95 backdrop-blur-sm py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900">
            FEN<span className="text-blue-600">TECH</span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link 
              href="/" 
              className={isActive("/") && pathname === "/" ? "text-blue-600" : "hover:text-blue-600 transition-colors"}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className={isActive("/services") ? "text-blue-600" : "hover:text-blue-600 transition-colors"}
            >
              IT Services
            </Link>
            <Link 
              href="/about" 
              className={isActive("/about") ? "text-blue-600" : "hover:text-blue-600 transition-colors"}
            >
              About Us
            </Link>
            <Link 
              href="/case-studies" 
              className={isActive("/case-studies") ? "text-blue-600" : "hover:text-blue-600 transition-colors"}
            >
              Case Studies
            </Link>
            <Link 
              href="/contact" 
              className={isActive("/contact") ? "text-blue-600" : "hover:text-blue-600 transition-colors"}
            >
              Contact
            </Link>
            
            {/* SEARCH ICON */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              <Search size={18} />
            </button>
          </nav>

          {/* CALL TO ACTION BUTTON */}
          <div className="hidden md:block">
            <Link 
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider transition-all inline-block"
            >
              Get a Quote
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button className="md:hidden text-slate-900">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-32 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Search</h3>
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services, case studies..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-xl focus:border-blue-600 outline-none text-lg transition-all"
                  autoFocus
                />
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="px-6 bg-slate-100 text-slate-600 py-3 rounded-lg font-bold hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-3 font-semibold">Quick Links:</p>
              <div className="flex flex-wrap gap-2">
                {["Cloud Services", "Cyber Security", "IT Consulting", "Case Studies"].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      handleSearch(new Event('submit') as any);
                    }}
                    className="px-4 py-2 bg-slate-50 text-slate-600 rounded-lg text-sm hover:bg-blue-50 hover:text-blue-600 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
