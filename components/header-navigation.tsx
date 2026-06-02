"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function HeaderNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Campus Network", href: "#campuses" },
    { name: "Alumni", href: "#alumni" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3 dark:bg-slate-900/90"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo elements switch text colors dynamically on scroll */}
        <div className="flex items-center gap-2">
          <span
            className={`text-2xl font-bold tracking-wider transition-colors duration-300 ${
              isScrolled ? "text-primary-navy" : "text-white"
            }`}
          >
            CAPS
          </span>
          <div className="w-[2px] h-6 bg-accent-gold"></div>
          <span
            className={`text-[10px] uppercase tracking-widest max-w-[120px] leading-tight transition-colors duration-300 ${
              isScrolled ? "text-slate-600 dark:text-slate-300" : "text-slate-200"
            }`}
          >
            Centre for Academic Support
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:text-accent-gold ${
                isScrolled
                  ? "text-slate-700 dark:text-slate-200 hover:text-accent-gold"
                  : "text-white hover:text-accent-gold"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled ? "text-slate-800 dark:text-white" : "text-white"
              }`}
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-secondary-dark-slate border-none text-white p-10 flex flex-col justify-start"
            >
              <div className="flex items-center gap-2 mb-8">
                <span className="text-2xl font-bold tracking-wider text-white">CAPS</span>
                <div className="w-[2px] h-6 bg-accent-gold"></div>
                <span className="text-[10px] uppercase tracking-widest max-w-[120px] leading-tight text-slate-200">
                  Centre for Academic Support
                </span>
              </div>
              <nav className="flex flex-col gap-6 mt-6">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.name}
                    render={
                      <a
                        href={link.href}
                        className="text-lg font-medium text-slate-200 hover:text-accent-gold transition-colors py-2 border-b border-white/10"
                      />
                    }
                  >
                    {link.name}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
