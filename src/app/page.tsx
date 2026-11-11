import React from "react";
import MessageForm from "./components/MessageForm";
import Hero from "./components/Hero";
import HeroFace from "./components/HeroFace";
import Faq from "./components/Faq";
import Changelog from "./components/Changelog";
import Reveal from "./components/Reveal";
import { DonateButton } from "./components/DonateProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rage Formatter - Home",
  description:
    "Rage Formatter è la webapp che transforma la tua rabbia da ufficio in un messaggio formale e costruttivo.",
};

const sectionHeading =
  "font-display text-2xl font-bold tracking-tight text-toner";
const sectionGrid =
  "mt-20 grid gap-8 border-t border-redline pt-10 md:grid-cols-[1fr_2fr] md:gap-16";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1120px] px-5 pb-20 pt-10 md:pt-16">
      <div className="relative">
        <HeroFace />
        <Hero />
      </div>
      <MessageForm />

      <Reveal className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-redline pt-8">
        <p className="max-w-[48ch] text-sm text-carbon">
          RageFormatter is free. A donation covers the OpenAI bill.
        </p>
        <DonateButton variant="solid">Donate</DonateButton>
      </Reveal>

      <Reveal className={sectionGrid}>
        <h2 className={sectionHeading}>Questions</h2>
        <Faq />
      </Reveal>

      <Reveal className={sectionGrid}>
        <h2 className={sectionHeading}>Change log</h2>
        <Changelog />
      </Reveal>
    </main>
  );
}
