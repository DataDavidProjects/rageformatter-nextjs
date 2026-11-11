"use client";
import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { enter } from "@/lib/motion";

type Props = {
  n: number;
  title: string;
  body: string;
  photo: { src: string; alt: string };
  flip?: boolean;
  children: React.ReactNode; // the demo sheet that overlaps the photo
};

// One tutorial step: a red-duotone photo with parallax, a sheet overlapping it.
const TutorialScene: React.FC<Props> = ({
  n,
  title,
  body,
  photo,
  flip,
  children,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-36, 36]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0, transition: enter }}
      viewport={{ once: true, margin: "-80px" }}
      className="grid items-center gap-8 md:grid-cols-12"
    >
      {/* text */}
      <div
        className={`md:col-span-5 ${flip ? "md:order-2 md:pl-6" : "md:pr-6"}`}
      >
        <span
          aria-hidden="true"
          className="font-display text-8xl font-bold leading-none text-ballpoint md:text-9xl"
        >
          {n}
        </span>
        <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-toner [text-wrap:balance]">
          {title}
        </h2>
        <p className="mt-3 max-w-[44ch] font-serif text-[17px] leading-relaxed text-carbon">
          {body}
        </p>
      </div>

      {/* photo + overlapping sheet */}
      <div
        className={`relative md:col-span-7 ${flip ? "md:order-1" : ""}`}
      >
        <div className="group relative aspect-[16/10] overflow-hidden rounded-sm bg-toner shadow-sheet">
          <motion.div style={{ y }} className="absolute -inset-10">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover grayscale contrast-125 transition duration-500 group-hover:grayscale-0"
            />
          </motion.div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-ballpoint mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
          />
        </div>
        <div
          className={`relative z-10 -mt-16 w-[88%] md:absolute md:-bottom-8 md:mt-0 md:w-[62%] ${
            flip ? "ml-auto md:-right-6 md:ml-0" : "md:-left-6"
          }`}
        >
          {children}
        </div>
      </div>
    </motion.li>
  );
};

export default TutorialScene;
