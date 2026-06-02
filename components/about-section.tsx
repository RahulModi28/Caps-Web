"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-accent-gold uppercase bg-accent-gold/10 rounded-full">
            Who We Are
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-navy dark:text-slate-100 sm:text-4xl">
            About CAPS
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
            The Centre for Academic and Professional Support (CAPS) at Christ University fosters students’ holistic growth by offering training, mentoring, peer support and co-curricular activities. It equips learners with academic, professional and life skills in a collaborative setting. As a hub for idea exchange and networking, CAPS drives research, job readiness, and leadership development.
          </p>
        </motion.div>
        
        <div className="space-y-6">
          <motion.div 
            className="p-6 bg-white dark:bg-secondary-dark-slate rounded-2xl border-l-4 border-accent-gold shadow-sm dark:shadow-none hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-800 border-l-accent-gold dark:border-l-accent-gold"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <h3 className="text-xl font-bold text-primary-navy dark:text-slate-100 mb-2">Vision</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Our vision is to be a benchmark in global academic circles in providing professional and academic-based solutions to in-house as well as external patrons.
            </p>
          </motion.div>

          <motion.div 
            className="p-6 bg-white dark:bg-secondary-dark-slate rounded-2xl border-l-4 border-accent-gold shadow-sm dark:shadow-none hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-800 border-l-accent-gold dark:border-l-accent-gold"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -4 }}
          >
            <h3 className="text-xl font-bold text-primary-navy dark:text-slate-100 mb-2">Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Our mission is to provide a shared platform for the entire university to exchange knowledge and experience, in order to harness expertise in the academic as well as professional spheres.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
