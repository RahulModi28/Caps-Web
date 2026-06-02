"use client";

import React from "react";
import { ArrowRight, Users, HeartHandshake, ShieldCheck, Star, Award, MapPin } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function HeroSection() {
  return (
    <section 
      id="home" 
      className="min-h-screen pt-32 pb-20 flex items-center bg-gradient-to-br from-primary-navy via-primary-navy to-[#161b33] text-white relative overflow-hidden"
    >
      {/* Visual spotlights and shapes */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Left Column: Hero Text */}
        <div className="lg:col-span-7 space-y-6 text-left animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-accent-gold tracking-wide">
            <span className="flex h-2 w-2 rounded-full bg-accent-gold animate-pulse" />
            Empowering Academic & Professional Excellence
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            Where Peer Mentoring Meets <span className="text-accent-gold">Future Leadership</span>
          </h1>
          
          <p className="text-slate-350 text-base sm:text-lg max-w-xl leading-relaxed">
            The Centre for Academic and Professional Support (CAPS) at Christ University offers structured peer-to-peer mentoring, professional training, and psychometric tools to accelerate your growth.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="#services"
              className="px-8 py-3.5 bg-accent-gold hover:bg-accent-gold/90 text-secondary-dark-slate font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-accent-gold/10"
            >
              Explore Our Services
              <ArrowRight className="h-4 w-4" />
            </a>
            
            <a 
              href="#contact"
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-sm rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Get In Touch
            </a>
          </div>

          {/* Drawer Callouts (Team Structure & Volunteers) */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
            {/* Drawer 1: Team Structure */}
            <Sheet>
              <SheetTrigger 
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-accent-gold transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg cursor-pointer"
                aria-label="Open team structure details drawer"
              >
                <Users className="h-3.5 w-3.5 text-accent-gold" />
                Team Organizational Structure
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:max-w-md bg-secondary-dark-slate text-white border-l border-white/10 p-6 overflow-y-auto"
              >
                <SheetHeader className="p-0 mb-6">
                  <SheetTitle className="text-xl font-black text-accent-gold flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Organizational Structure
                  </SheetTitle>
                  <SheetDescription className="text-xs text-slate-400 mt-1">
                    The leadership hierarchy and wing distribution within CAPS Central Team.
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 text-sm">
                  {/* Governance Wing */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                      <Award className="h-3.5 w-3.5 text-accent-gold" />
                      Executive Leadership
                    </h3>
                    <div className="space-y-2 bg-white/5 p-4 rounded-xl">
                      <div>
                        <span className="text-slate-400 text-xs block">Director / Advisor</span>
                        <span className="font-extrabold text-white">CAPS Faculty Coordinator</span>
                      </div>
                      <div className="h-[1px] bg-white/15 my-2" />
                      <div>
                        <span className="text-slate-400 text-xs block">Student Leadership</span>
                        <span className="font-extrabold text-white">CAPS Core Committee</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Wings */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-accent-gold" />
                      Core Committees (Wings)
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="font-bold text-white text-xs">One-on-One Consultations</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Peer counseling and personalized academic planning.</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="font-bold text-white text-xs">Group Peer Training (GPT)</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Workshops, training sessions, and developmental bootcamps.</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="font-bold text-white text-xs">Psychometric Assessment</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Interest mapping, skills profiling, and career guidance tests.</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="font-bold text-white text-xs">CEWS & Industry Connect</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Corporate connections, resume audits, and interview preparation.</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <h4 className="font-bold text-white text-xs">Operations Committee</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Event logistics, scheduling, campus coordination, and outreach.</p>
                      </div>
                    </div>
                  </div>

                  {/* Campus distribution */}
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                      <MapPin className="h-3.5 w-3.5 text-accent-gold" />
                      Campus Presence
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Each campus maintains local Student Coordinators reporting to the central executive board, ensuring program standardization across all 6 locations.
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Drawer 2: Volunteer Body */}
            <Sheet>
              <SheetTrigger 
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-accent-gold transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg cursor-pointer"
                aria-label="Open volunteer body program details drawer"
              >
                <HeartHandshake className="h-3.5 w-3.5 text-accent-gold" />
                Volunteer Body (CAPS Pillars)
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:max-w-md bg-secondary-dark-slate text-white border-l border-white/10 p-6 overflow-y-auto"
              >
                <SheetHeader className="p-0 mb-6">
                  <SheetTitle className="text-xl font-black text-accent-gold flex items-center gap-2">
                    <HeartHandshake className="h-5 w-5" />
                    Volunteer Program (Pillars)
                  </SheetTitle>
                  <SheetDescription className="text-xs text-slate-400 mt-1">
                    How CAPS trains and nurtures student volunteers to lead peer support services.
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 text-sm">
                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl text-center">
                      <span className="block text-2xl font-black text-accent-gold">150+</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Active Volunteers</span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl text-center">
                      <span className="block text-2xl font-black text-accent-gold">30+</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Peer Trainers</span>
                    </div>
                  </div>

                  {/* Recruitment Roadmap */}
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                      <Star className="h-3.5 w-3.5 text-accent-gold" />
                      Volunteer Journey & Stages
                    </h3>
                    
                    <div className="space-y-4 relative pl-4 border-l border-white/10 ml-2">
                      {/* Step 1 */}
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-accent-gold rounded-full" />
                        <h4 className="font-bold text-white text-xs">Stage 1: Selection & Orientation</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Rigorous screening based on academic merit, communication skills, and empathy. Selected candidates undergo intensive orientation.
                        </p>
                      </div>

                      {/* Step 2 */}
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-accent-gold rounded-full" />
                        <h4 className="font-bold text-white text-xs">Stage 2: Level 1 Training</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Acquire competencies in session facilitation, active listening, research drafting, and assessment guidelines under coordinator supervision.
                        </p>
                      </div>

                      {/* Step 3 */}
                      <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-accent-gold rounded-full" />
                        <h4 className="font-bold text-white text-xs">Stage 3: Level 2 Facilitator (Pillars)</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Conduct group workshops (GPT), evaluate research formatting, represent CAPS, and lead specialized consultation divisions.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 bg-white/5 p-4 rounded-xl">
                    <h4 className="font-bold text-white text-xs">Why Volunteer with CAPS?</h4>
                    <ul className="space-y-1.5 text-[11px] text-slate-300 mt-2 list-disc list-inside">
                      <li>Earn official co-curricular credits.</li>
                      <li>Develop speaking, leadership, and organization skills.</li>
                      <li>Access professional mentoring from experts.</li>
                      <li>Network with campus wings and corporate partners.</li>
                    </ul>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Right Column: Hero Graphic card preview */}
        <div className="lg:col-span-5 relative w-full h-[320px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xs select-none">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">CAPS Mission Portal</span>
              <h3 className="text-xl font-bold text-white">Peer Network</h3>
            </div>
            <span className="text-[10px] font-semibold text-accent-gold bg-accent-gold/10 px-2 py-0.5 rounded-full">
              Live Tracker
            </span>
          </div>

          {/* Graphical Mock Statistics Grid inside hero card */}
          <div className="grid grid-cols-2 gap-4 my-auto">
            <div className="p-4 bg-slate-950/40 rounded-2xl border border-white/5 text-left">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Total Sessions</span>
              <span className="text-2xl sm:text-3xl font-black text-white block mt-1">12,400+</span>
              <span className="text-[10px] text-emerald-400 font-medium mt-1 inline-block">↑ 24% this semester</span>
            </div>
            <div className="p-4 bg-slate-950/40 rounded-2xl border border-white/5 text-left">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block">Student Outreach</span>
              <span className="text-2xl sm:text-3xl font-black text-white block mt-1">28,500+</span>
              <span className="text-[10px] text-emerald-400 font-medium mt-1 inline-block">↑ Across all campuses</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-white/5 text-xs text-slate-400">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-slate-700 border border-secondary-dark-slate flex items-center justify-center font-bold text-[8px] text-white">A</div>
              <div className="w-6 h-6 rounded-full bg-slate-600 border border-secondary-dark-slate flex items-center justify-center font-bold text-[8px] text-white">B</div>
              <div className="w-6 h-6 rounded-full bg-slate-500 border border-secondary-dark-slate flex items-center justify-center font-bold text-[8px] text-white">C</div>
            </div>
            <span>Join 1,200+ students mentored this month</span>
          </div>
        </div>
      </div>
    </section>
  );
}
