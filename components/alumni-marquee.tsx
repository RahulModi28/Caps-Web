import React from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { alumniList } from "@/config/data";

export default function AlumniMarquee() {
  // Double the list to ensure a seamless infinite loop in the marquee track
  const marqueeItems = [...alumniList, ...alumniList];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/40 border-y border-slate-100 dark:border-slate-900/60 overflow-hidden relative">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-accent-gold/5 dark:bg-accent-gold/2 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-80 h-80 bg-primary-navy/5 dark:bg-primary-navy/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <span className="text-accent-gold font-bold text-xs uppercase tracking-widest bg-accent-gold/10 px-3 py-1.5 rounded-full dark:bg-accent-gold/5">
          Our Legacy
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary-navy dark:text-slate-100 mt-4 tracking-tight">
          Where Our Alumni Excel
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          CAPS volunteers transition into leading global institutions, research labs, and corporate enterprises, carrying forward our core values of support and guidance.
        </p>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full flex overflow-hidden z-10 py-4 select-none">
        {/* Left & Right Gradient Overlays for smooth fade-in/fade-out edge transition */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-950/40 z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-950/40 z-20 pointer-events-none" />

        {/* Looping Track */}
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {marqueeItems.map((alumnus, index) => (
            <div
              key={`${alumnus.name}-${index}`}
              className="w-[280px] sm:w-[320px] shrink-0 bg-white dark:bg-secondary-dark-slate rounded-2xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800/80 shadow-md shadow-slate-100/50 dark:shadow-none hover:border-accent-gold/40 dark:hover:border-accent-gold/30 hover:shadow-lg dark:hover:shadow-accent-gold/2 transition-all duration-300 group"
              tabIndex={0}
            >
              <div className="flex items-start gap-4">
                {/* Avatar Badge */}
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-700/50 text-accent-gold group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-snug group-hover:text-primary-navy dark:group-hover:text-accent-gold transition-colors">
                    {alumnus.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs mt-1">
                    <span className="font-medium bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded text-[10px]">
                      {alumnus.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                  <Briefcase className="h-3.5 w-3.5 text-accent-gold shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{alumnus.role}</span>
                    <span className="mx-1">at</span>
                    <span className="font-medium">{alumnus.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
