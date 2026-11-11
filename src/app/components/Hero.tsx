"use client";
import React from "react";
import { motion, type Variants } from "motion/react";
import { duration, ease } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.verySlow, ease: ease.smoothOut },
  },
};

// The one orchestrated moment on page load: the first sentence gets crossed out.
const Hero: React.FC = () => (
  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="mb-10 max-w-2xl md:mb-14 md:max-w-[56%] lg:max-w-[60%] xl:max-w-2xl"
  >
    <motion.h1
      variants={item}
      className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-toner [text-wrap:balance] md:text-5xl xl:text-6xl"
    >
      {/* The strike is a background line drawn on every wrapped line fragment
          (box-decoration-break: clone), so it stays correct at any width. */}
      <motion.span
        className="[box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
        style={{
          backgroundImage: "linear-gradient(#A4262C, #A4262C)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 58%",
          backgroundSize: "0% 0.09em",
        }}
        variants={{
          hidden: { backgroundSize: "0% 0.09em" },
          show: {
            backgroundSize: "100% 0.09em",
            transition: { delay: 0.7, duration: 0.5, ease: ease.smoothOut },
          },
        }}
      >
        Write what you think.
      </motion.span>{" "}
      <span className="text-ballpoint">Send what you should.</span>
    </motion.h1>
    <motion.p
      variants={item}
      className="mt-5 max-w-[60ch] text-base leading-relaxed text-carbon"
    >
      Type the email you actually want to send. We turn it into the one that
      keeps your job. Free, in Italian or English, with no judgment and no eye
      contact.
    </motion.p>
  </motion.div>
);

export default Hero;
