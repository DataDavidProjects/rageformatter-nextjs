"use client";
import React from "react";
import { motion } from "motion/react";
import { enter } from "@/lib/motion";

// Fades a block in once as it scrolls into view.
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0, transition: { ...enter, delay } }}
    viewport={{ once: true, margin: "-60px" }}
  >
    {children}
  </motion.div>
);

export default Reveal;
