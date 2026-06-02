import React from "react";
import { Globe, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-navy dark:bg-slate-950 text-slate-350 py-16 border-t border-slate-800/80 relative overflow-hidden">
      {/* Decorative Gradient Background overlay */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-gold/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800/60">
          
          {/* Logo & Tagline Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-accent-gold flex items-center justify-center text-primary-navy font-black text-lg">
                C
              </div>
              <div className="leading-tight">
                <span className="block text-white font-extrabold text-lg tracking-tight">CAPS</span>
                <span className="block text-[10px] text-accent-gold uppercase font-bold tracking-widest">
                  Christ University
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mt-4">
              The Centre for Academic and Professional Support (CAPS) facilitates academic empowerment, professional readiness, and peer-to-peer mentoring across all campuses of CHRIST (Deemed to be University).
            </p>
            <div className="pt-2 flex gap-4">
              <a
                href="https://www.linkedin.com/company/capschristuniversity/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-accent-gold/40 hover:text-accent-gold flex items-center justify-center transition-colors group"
                aria-label="CAPS LinkedIn Profile"
              >
                <span className="text-xs font-bold group-hover:scale-105 transition-transform">in</span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
              <a
                href="https://www.instagram.com/caps_christ/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 hover:border-accent-gold/40 hover:text-accent-gold flex items-center justify-center transition-colors group"
                aria-label="CAPS Instagram Profile"
              >
                <span className="text-xs font-bold group-hover:scale-105 transition-transform">ig</span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-white hover:underline transition-colors">
                  Home / Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white hover:underline transition-colors">
                  About & Vision
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white hover:underline transition-colors">
                  Core Services
                </a>
              </li>
              <li>
                <a href="#campuses" className="hover:text-white hover:underline transition-colors">
                  Campus Locations
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white hover:underline transition-colors">
                  Connect / Queries
                </a>
              </li>
            </ul>
          </div>

          {/* Resources & Portals Column */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">Portals & Links</h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href="https://caps.christuniversity.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Globe className="h-4 w-4 text-accent-gold group-hover:scale-110 transition-transform" />
                  <span>
                    Official CAPS Portal
                    <span className="sr-only">(opens in new tab)</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://christuniversity.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors group"
                >
                  <Globe className="h-4 w-4 text-accent-gold group-hover:scale-110 transition-transform" />
                  <span>
                    CHRIST University Website
                    <span className="sr-only">(opens in new tab)</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:caps@christuniversity.in"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-accent-gold" />
                  <span>caps@christuniversity.in</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918040129100"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent-gold" />
                  <span>+91 80 4012 9100</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Centre for Academic and Professional Support (CAPS), CHRIST (Deemed to be University). All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline hover:text-slate-400">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
