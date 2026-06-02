"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ObjectivesSection() {
  const objectives = [
    "To promote the spirit of volunteering through peer training and service initiatives.",
    "To create awareness on the importance of academic and professional skills for excellence in academia and workspaces.",
    "To provide support which empowers students in academic writing, research formatting, placements preparation, and presentations.",
    "To complement the existing curriculum and provide required help for the holistic growth of individuals.",
    "To provide effective channels of interaction using existing resources and sharing competencies.",
    "To transform traditional classroom learning into an interactive, personalized, 24/7 system."
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  } as const;

  return (
    <section className="py-20 bg-secondary-dark-slate text-white px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-accent-gold uppercase bg-accent-gold/10 rounded-full">
            Our Goals
          </div>
          <h2 className="text-3xl font-extrabold text-accent-gold sm:text-4xl">
            Core Objectives
          </h2>
          <div className="w-12 h-1 bg-accent-gold mx-auto rounded"></div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {objectives.map((obj, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              whileHover={{ scale: 1.02, borderColor: "#bb8d2f" }}
              className="flex gap-4 items-start bg-slate-900/50 p-6 rounded-xl border border-slate-800 transition-colors duration-300"
            >
              <CheckCircle className="h-6 w-6 text-accent-gold shrink-0 mt-1" />
              <p className="text-slate-300 leading-relaxed text-sm">{obj}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
