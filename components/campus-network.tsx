"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Globe, Compass } from "lucide-react";
import { campuses, type Campus } from "@/config/data";

// Dynamically import the Leaflet map component with SSR disabled
const CampusMap = dynamic(() => import("./campus-map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-slate-100 dark:bg-slate-900/50 flex flex-col items-center justify-center gap-3 text-slate-400">
      <Compass className="h-8 w-8 animate-spin text-accent-gold" />
      <span className="text-sm font-medium tracking-wide">Loading interactive map...</span>
    </div>
  ),
});

export default function CampusNetwork() {
  const [mounted, setMounted] = useState(false);
  const [activeCampus, setActiveCampus] = useState<Campus>(campuses[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="campuses" className="py-20 bg-slate-50 dark:bg-slate-950/40 px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-accent-gold uppercase bg-accent-gold/10 rounded-full">
            Where to Find Us
          </div>
          <h2 className="text-3xl font-extrabold text-primary-navy dark:text-slate-100 sm:text-4xl">
            Campus Network
          </h2>
          <div className="w-12 h-1 bg-accent-gold mx-auto rounded"></div>
        </div>

        {/* Desktop grid layout / Mobile flex layout */}
        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Left panel: Campus selector cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="space-y-1">
              {/* Desktop Label (rendered as span for accessibility correctness since it is not a form input on desktop) */}
              <span className="hidden lg:block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Select Campus
              </span>
              
              {/* Mobile Label */}
              <label 
                htmlFor="campus-select"
                className="block lg:hidden text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
              >
                Select Campus
              </label>
              
              {/* Mobile Dropdown Selector */}
              <div className="relative lg:hidden">
                <select
                  id="campus-select"
                  aria-label="Select campus location"
                  className="w-full p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold focus:outline-none text-sm font-medium appearance-none cursor-pointer"
                  value={activeCampus.name}
                  onChange={(e) => {
                    const selected = campuses.find((c) => c.name === e.target.value);
                    if (selected) setActiveCampus(selected);
                  }}
                >
                  {campuses.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.displayName} ({c.location})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Desktop Campus Cards list */}
            <div className="hidden lg:flex flex-col gap-3 overflow-y-auto max-h-[500px] pr-2">
              {campuses.map((campus) => {
                const isActive = activeCampus.name === campus.name;
                return (
                  <button
                    key={campus.name}
                    onClick={() => setActiveCampus(campus)}
                    aria-current={isActive ? "true" : "false"}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold ${
                      isActive
                        ? "bg-primary-navy dark:bg-secondary-dark-slate border-accent-gold text-white shadow-md shadow-accent-gold/5"
                        : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-900/80"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className={`font-bold text-sm leading-tight transition-colors ${isActive ? "text-accent-gold" : "text-primary-navy dark:text-slate-200 group-hover:text-primary-navy/80"}`}>
                        {campus.name}
                      </span>
                      <span className={`text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full shrink-0 ${
                        isActive 
                          ? "bg-white/15 text-white" 
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}>
                        {campus.location}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed transition-colors ${isActive ? "text-slate-300" : "text-slate-500 dark:text-slate-400"}`}>
                      {campus.officeAddress}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Details Display card */}
            <div className="p-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col gap-4 mt-auto">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary-navy dark:text-slate-200">
                  <MapPin className="h-4 w-4 text-accent-gold shrink-0" />
                  <h4 className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-200">
                    {activeCampus.name}
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed pl-6">
                  {activeCampus.officeAddress}
                </p>
              </div>

              <div className="flex gap-3 pl-6">
                <a
                  href={activeCampus.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-primary-navy dark:bg-secondary-dark-slate hover:bg-accent-gold hover:text-white dark:hover:bg-accent-gold text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                >
                  <Globe className="h-3.5 w-3.5" />
                  Campus Portal
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: Map Display */}
          <div className="lg:col-span-3 h-[350px] sm:h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 z-10 relative bg-slate-100 dark:bg-slate-900">
            {mounted ? (
              <CampusMap activeCampus={activeCampus} campuses={campuses} />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center gap-2 text-slate-400">
                <Compass className="h-8 w-8 animate-spin text-accent-gold" />
                <span className="text-sm font-medium tracking-wide">Initializing map component...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
