"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, MessageSquare } from "lucide-react";
import { testimonialsList } from "@/config/data";

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonialsList.length);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonialsList.length) % testimonialsList.length);
  }, [isAnimating]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 400); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Auto-play timer (pauses on user interaction / hover could be nice, but simple auto-play is fine)
  useEffect(() => {
    const autoPlayTimer = setInterval(handleNext, 8000);
    return () => clearInterval(autoPlayTimer);
  }, [handleNext]);

  const current = testimonialsList[activeIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden relative">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-primary-navy/5 dark:bg-primary-navy/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-gold/5 dark:bg-accent-gold/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-accent-gold font-bold text-xs uppercase tracking-widest bg-accent-gold/10 px-3 py-1.5 rounded-full dark:bg-accent-gold/5 inline-flex items-center gap-1.5">
            <MessageSquare className="h-3 w-3" />
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-navy dark:text-slate-100 mt-4 tracking-tight">
            Voices of CAPS
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-lg mx-auto text-sm sm:text-base">
            Read what our volunteers, peer trainers, and coordinators say about their journey and growth inside the CAPS community.
          </p>
        </div>

        {/* Testimonial Active Display Area */}
        <div 
          className="relative min-h-[320px] sm:min-h-[260px] bg-white dark:bg-secondary-dark-slate rounded-3xl p-8 sm:p-12 border border-slate-100 dark:border-slate-800/80 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between"
          aria-live="polite"
        >
          {/* Decorative quote mark */}
          <div className="absolute top-6 right-8 text-slate-100 dark:text-slate-800 pointer-events-none">
            <Quote className="h-20 w-20 fill-current opacity-60" />
          </div>

          {/* Testimonial Text */}
          <div className={`transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-350 italic leading-relaxed relative z-10 font-medium">
              &ldquo;{current.quote}&rdquo;
            </p>
          </div>

          {/* Testimonial Author Info */}
          <div className={`mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
            <div>
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base sm:text-lg">
                {current.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {current.role} • <span className="text-accent-gold">{current.wing}</span>
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="inline-block text-xs font-semibold text-primary-navy dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                {current.campus}
              </span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 uppercase font-bold tracking-wider">
                Batch {current.year}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-between mt-8 px-2">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-secondary-dark-slate hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-primary-navy dark:hover:text-accent-gold hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Index indicator dots */}
          <div className="flex gap-2.5" role="tablist" aria-label="Testimonial slider index">
            {testimonialsList.map((_, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => {
                  if (isAnimating || idx === activeIndex) return;
                  setIsAnimating(true);
                  setActiveIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-accent-gold ${
                  idx === activeIndex 
                    ? "w-8 bg-accent-gold" 
                    : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                }`}
              />
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="p-3 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-secondary-dark-slate hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-primary-navy dark:hover:text-accent-gold hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
