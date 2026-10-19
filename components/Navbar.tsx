"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  if (isAdminRoute) return null;

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="brand flex items-center" aria-label="FenTech Digital home">
          <img
            src="/brand/fentech-logo.png"
            alt="FenTech Digital"
            width={120}
            height={32}
            className="object-contain"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "active" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/contact" className="button-primary text-sm !py-2.5 !px-5">
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden flex items-center justify-center p-2 text-neutral-800 hover:text-black focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Coinbase-style drawer */}
      <div
        className={`fixed inset-0 z-[1200] bg-white text-[#0A0B0D] flex flex-col justify-between p-6 transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-3"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#E2E5EA] pb-5">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <img src="/brand/fentech-logo.png" alt="FenTech Digital" width={112} height={30} />
          </Link>
          <button
            type="button"
            className="p-2 text-neutral-600 hover:text-black"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-5 py-8" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-medium tracking-tight ${
                isActive(link.href) ? "text-[#0052FF]" : "text-[#0A0B0D]"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-t border-[#E2E5EA] pt-6">
          <Link
            href="/contact"
            className="button-primary w-full text-center justify-center py-3.5"
            onClick={() => setMobileOpen(false)}
          >
            <span>Start a project</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <p className="text-xs text-[#5B616E] text-center">
            Kenyan digital engineering & enterprise solutions
          </p>
        </div>
      </div>
    </>
  );
}
