"use client";
import React from "react";
import { motion } from "motion/react";
import { ease } from "@/lib/motion";

const sheet = "rounded-sm border border-redline shadow-sheet";

// Step 1: the raw message, typed in a hurry.
export const FaxDemo: React.FC = () => (
  <div
    className={`${sheet} border-l-[3px] border-l-ballpoint bg-fax p-4 font-mono text-[13px] leading-6 text-toner`}
  >
    Dear Marco, if you had read the previous email you would already know the
    file is attached. Again. Stop asking.
  </div>
);

// Step 2: the message gets redacted while the AI works.
export const RedactionDemo: React.FC = () => (
  <div className={`${sheet} space-y-3 bg-letterhead p-5`} aria-hidden="true">
    {["100%", "100%", "100%", "55%"].map((w, i) => (
      <motion.div
        key={i}
        className="h-3.5 origin-left bg-toner"
        style={{ width: w }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{
          duration: 0.8,
          ease: ease.smoothOut,
          delay: i * 0.14,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.4,
        }}
      />
    ))}
  </div>
);

// Step 3: the approved letter, stamped when it scrolls into view.
export const LetterDemo: React.FC = () => (
  <div className={`${sheet} relative bg-letterhead p-5 pb-14`}>
    <p className="font-serif text-[17px] leading-relaxed text-toner">
      Hi Marco, the file is attached to my previous email. Let me know if
      anything is unclear. Best regards.
    </p>
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: 1.8, rotate: -9 }}
      whileInView={{ opacity: 0.9, scale: 1, rotate: -9 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 520, damping: 24, delay: 0.5 }}
      className="absolute bottom-4 right-4 select-none rounded-sm border-[3px] border-ballpoint px-3 py-1 font-display text-sm font-bold uppercase tracking-wider text-ballpoint"
    >
      Approved by HR
    </motion.span>
  </div>
);
