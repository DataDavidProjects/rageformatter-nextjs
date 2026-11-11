"use client";
import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { enter } from "@/lib/motion";

type Props = {
  title: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
};

// Shared frame for content pages: title, optional intro, then sections.
const PageShell: React.FC<Props> = ({ title, intro, children }) => (
  <main className="mx-auto max-w-[1120px] px-5 pb-20 pt-10 md:pt-16">
    <Link
      href="/"
      className="mb-6 inline-block text-sm font-medium text-carbon underline-offset-4 hover:text-toner hover:underline"
    >
      ← Back to the formatter
    </Link>
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0, transition: enter }}
    >
      <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-toner [text-wrap:balance] md:text-6xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-5 max-w-[60ch] font-serif text-[19px] leading-relaxed text-carbon">
          {intro}
        </p>
      )}
      <div className="mt-12">{children}</div>
    </motion.div>
  </main>
);

export default PageShell;
