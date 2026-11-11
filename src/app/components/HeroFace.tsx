"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { enter } from "@/lib/motion";

// three.js is loaded on demand, client-side only, so it never blocks first paint.
// The canvas is larger than the face so the explosion has room to fly.
const RageFace = dynamic(() => import("./RageFace"), { ssr: false });

// Mobile: its own block above the headline, full width so scraps can spread.
// md and up: floats on the right of the hero, behind the text column.
const HeroFace: React.FC = () => (
  <motion.div
    aria-hidden="true"
    initial={{ opacity: 0, scale: 0.92 }}
    animate={{ opacity: 1, scale: 1, transition: { ...enter, delay: 0.5 } }}
    className="pointer-events-none relative -mb-4 h-[260px] w-full sm:h-[300px] md:absolute md:-right-4 md:-top-10 md:mb-0 md:h-[340px] md:w-[340px] lg:-right-6 lg:-top-16 lg:h-[440px] lg:w-[440px] xl:-right-8 xl:-top-24 xl:h-[520px] xl:w-[520px]"
  >
    <RageFace />
  </motion.div>
);

export default HeroFace;
