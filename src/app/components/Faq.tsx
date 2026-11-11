"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { FaPlus } from "react-icons/fa";
import { duration, ease } from "@/lib/motion";

const link = "underline underline-offset-2 hover:text-toner";

const items: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is RageFormatter?",
    a: (
      <>
        RageFormatter is an ironic webapp that converts your angry messages
        into polite ones, ready to send to your boss or colleagues. Follow the{" "}
        <Link href="/tutorial" className={link}>
          tutorial
        </Link>{" "}
        if you want to learn how to use it.
      </>
    ),
  },
  {
    q: "Do you save my messages or data?",
    a: "No. RageFormatter does not store any data and is completely anonymous. Your messages might however be part of OpenAI or Google collections, but never connected directly to you.",
  },
  {
    q: "Who developed RageFormatter?",
    a: (
      <>
        A side project by{" "}
        <Link
          href="https://www.linkedin.com/in/davide-lupis-448578153/"
          className={link}
        >
          Davide Lupis
        </Link>
        , powered by an OpenAI model. It is open source: visit the{" "}
        <Link
          href="https://github.com/DataDavidProjects/rageformatter-nextjs#-rageformatter"
          className={link}
        >
          GitHub repository
        </Link>{" "}
        and contribute.
      </>
    ),
  },
  {
    q: "Why is the answer cut off?",
    a: "Answers have a token limit so the site keeps working for everyone. If the result isn’t what you wanted, try again.",
  },
  {
    q: "Why isn’t the conversion working?",
    a: "To prevent abuse there is a limit on the number of requests. If the app isn’t responding you may have reached it. Try again later, or help keep the app running with a donation.",
  },
  {
    q: "How do I get good answers?",
    a: "Give clear context. The model needs an ordinary work situation, not random words: the email you need to send, or a conversation you will have with your boss.",
  },
  {
    q: "Can I use RageFormatter on mobile?",
    a: "Yes. The site is responsive and works the same way on every device.",
  },
  {
    q: "Why do you need donations?",
    a: "Every conversion is a call to an OpenAI model, which costs a small amount. The project has to break even or it will stop.",
  },
];

const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-redline border-y border-redline">
      {items.map(({ q, a }, i) => {
        const isOpen = open === i;
        return (
          <div key={q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-semibold text-toner transition-colors hover:text-ballpoint"
              >
                {q}
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: duration.fast, ease: ease.smoothOut }}
                  className="shrink-0 text-ballpoint"
                >
                  <FaPlus size={12} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: { duration: duration.slow, ease: ease.smoothOut },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: duration.medium, ease: ease.smoothOut },
                  }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[65ch] pb-5 font-serif text-[17px] leading-relaxed text-carbon">
                    {a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Faq;
