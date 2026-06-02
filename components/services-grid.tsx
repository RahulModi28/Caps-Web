"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PenTool, Users, Network, MessageSquare, Brain, type LucideIcon } from "lucide-react";

interface Service {
  title: string;
  subtitle: string;
  desc: string;
  icon: LucideIcon;
}

export default function ServicesGrid() {
  const services: Service[] = [
    {
      title: "One-on-One",
      subtitle: "Writing Centre",
      desc: "Get personalized guidance for all your writing needs—academic or professional—from trained peer mentors and specialists.",
      icon: PenTool,
    },
    {
      title: "Group Sessions",
      subtitle: "Classroom Sessions",
      desc: "Participate in dynamic group sessions designed to boost academic skills, foster collaboration, and unlock professional potential.",
      icon: Users,
    },
    {
      title: "Industry Connect",
      subtitle: "Market Studies",
      desc: "Connect with the professional world through curated industry interactions, guest lectures, and practical market studies.",
      icon: Network,
    },
    {
      title: "Communication Lab",
      subtitle: "Online Learning",
      desc: "Learn at your own pace with access to flexible online modules, specialized micro-credential courses, and communication workshops.",
      icon: MessageSquare,
    },
    {
      title: "Psychometric Assessments",
      subtitle: "Self-Awareness",
      desc: "Explore your strengths and areas of growth with scientific psychometric assessments and expert guidance.",
      icon: Brain,
    },
  ];

  // Track hovered state for desktop and active state for mobile click toggle
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Prevent sticky mobile hover states by checking if browser supports hover
  const handleMouseEnter = (index: number) => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setHoveredIndex(index);
    }
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-background-light dark:bg-black px-6 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div 
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-accent-gold uppercase bg-accent-gold/10 rounded-full">
            Our Offerings
          </div>
          <h2 className="text-3xl font-extrabold text-primary-navy dark:text-slate-100 sm:text-4xl">
            Services We Provide
          </h2>
          <div className="w-12 h-1 bg-accent-gold mx-auto rounded"></div>
        </motion.div>

        {/* Flex layout that wraps and centers items beautifully on all screens */}
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            const isActive = activeIndex === index;
            const isExpanded = isHovered || isActive;

            return (
              <motion.div
                key={service.title}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-controls={`service-desc-${index}`}
                className="relative w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] min-h-[180px] rounded-2xl overflow-hidden cursor-pointer bg-primary-navy dark:bg-secondary-dark-slate text-white border border-white/10 dark:border-slate-800 flex flex-col justify-between p-6 shadow-md transition-shadow duration-300 hover:shadow-xl hover:shadow-accent-gold/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-gold focus-visible:outline-offset-2"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Background Gradient/Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-primary-navy/20 to-transparent z-0 pointer-events-none" />
                
                {/* Spotlight hover effect overlay */}
                <div 
                  className="absolute inset-0 opacity-0 pointer-events-none z-0 transition-opacity duration-500"
                  style={{
                    opacity: isExpanded ? 1 : 0,
                    background: "radial-gradient(circle at center, rgba(187, 141, 47, 0.15) 0%, transparent 70%)"
                  }}
                />

                {/* Left side Gold accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent-gold z-10" />

                {/* Top Section: Icon & Title */}
                <div className="relative z-10 flex justify-between items-start gap-4">
                  <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
                    {service.title}
                  </h3>
                  <div className="p-2.5 bg-white/10 dark:bg-slate-800/60 rounded-xl border border-white/5 shrink-0 text-accent-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Bottom Section: Subtitle & Description */}
                <div className="relative z-10 mt-6">
                  {/* Smooth height and opacity transitions */}
                  <motion.div
                    id={`service-desc-${index}`}
                    aria-hidden={!isExpanded}
                    animate={{
                      height: isExpanded ? "auto" : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    initial={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden space-y-2"
                  >
                    <span className="inline-block text-[11px] uppercase tracking-widest text-accent-gold font-semibold">
                      {service.subtitle}
                    </span>
                    <p className="text-slate-300 dark:text-slate-400 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </motion.div>

                  {/* Tap indicator helper for mobile/tablets */}
                  {!isExpanded && (
                    <div className="text-[10px] text-slate-400/80 uppercase tracking-wider flex items-center gap-1.5 lg:hidden mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                      Tap to reveal
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
