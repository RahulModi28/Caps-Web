import React from "react";
import HeaderNavigation from "@/components/header-navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ObjectivesSection from "@/components/objectives-section";
import ServicesGrid from "@/components/services-grid";
import CampusNetwork from "@/components/campus-network";
import AlumniMarquee from "@/components/alumni-marquee";
import TestimonialSlider from "@/components/testimonial-slider";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sticky Header Menu Navigation */}
      <HeaderNavigation />

      {/* Main Single Page Layout Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero Block & Details Drawers */}
        <HeroSection />

        {/* Section 2: About CAPS & Vision/Mission */}
        <AboutSection />

        {/* Section 3: Core Objectives Grid */}
        <ObjectivesSection />

        {/* Section 4: Services Grid (Interactive Toggles) */}
        <ServicesGrid />

        {/* Section 5: Campus Locations & Leaflet Map */}
        <CampusNetwork />

        {/* Section 6: Alumni Placement Marquee */}
        <AlumniMarquee />

        {/* Section 7: Voice of CAPS (Testimonials Slider) */}
        <TestimonialSlider />

        {/* Section 8: Connect & Contact Form */}
        <ContactForm />
      </main>

      {/* Footer Navigation, Social Portals, & Legal */}
      <Footer />
    </div>
  );
}
