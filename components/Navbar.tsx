"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";

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
      setScrolled(window.scrollY > 18);
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
        <Link href="/" className="brand" aria-label="FenTech Digital home">
          <img src="/brand/fentech-logo.png" alt="FenTech Digital" width={112} height={30} />
        </Link>

        <span className="nav-signal"><i aria-hidden="true" /> Systems online</span>

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

        <button
          type="button"
          className="menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="site-menu-panel"
        >
          <span className={`menu-icon ${mobileOpen ? "is-open" : ""}`} aria-hidden="true">
            <i /><i /><i />
          </span>
          <span>{mobileOpen ? "Close" : "Menu"}</span>
        </button>
      </header>

      <div id="site-menu-panel" className={`menu-panel ${mobileOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="FenTech site menu" aria-hidden={!mobileOpen} inert={!mobileOpen}>
        <div className="menu-panel-inner">
          <div className="menu-top">
            <Link href="/" aria-label="FenTech Digital home" onClick={() => setMobileOpen(false)}>
              <img src="/brand/fentech-logo.png" alt="FenTech Digital" width={112} height={30} />
            </Link>
            <button type="button" className="menu-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={22} strokeWidth={1.5} />
              <span>Close</span>
            </button>
          </div>

          <div className="menu-heading">
            <span className="menu-eyebrow"><i aria-hidden="true" /> Explore FenTech</span>
            <p>Practical digital systems for ambitious Kenyan businesses.</p>
          </div>

          <div className="menu-content">
            <nav className="menu-links" aria-label="Site navigation">
              <span className="menu-group-label">Navigate</span>
              {navLinks.map((link, index) => (
                <Link key={link.href} href={link.href} className={isActive(link.href) ? "active" : ""} onClick={() => setMobileOpen(false)}>
                  <span className="menu-link-index">0{index + 1}</span>
                  <span>{link.label}</span>
                  <ArrowUpRight size={22} strokeWidth={1.5} />
                </Link>
              ))}
            </nav>

            <aside className="menu-aside">
              <div className="menu-aside-card">
                <span className="menu-group-label">Start here</span>
                <strong>Have a system<br />that needs to move?</strong>
                <Link href="/contact" className="menu-cta" onClick={() => setMobileOpen(false)}>
                  Talk to our team <ArrowUpRight size={18} />
                </Link>
              </div>
              <div className="menu-meta">
                <span><i aria-hidden="true" /> Systems online</span>
                <span>Nairobi · Kenya</span>
              </div>
            </aside>
          </div>

          <div className="menu-foot">
            <span>Software · Cloud · Cybersecurity · Automation</span>
            <span>© {new Date().getFullYear()} FenTech Digital</span>
          </div>
        </div>
      </div>
    </>
  );
}
