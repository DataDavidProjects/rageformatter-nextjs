import React from "react";
import MessageForm from "./components/MessageForm";
import Link from "next/link";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Rage Formatter - Home",
  description:
    "Rage Formatter è la webapp che transforma la tua rabbia da ufficio in un messaggio formale e costruttivo.",
};

export default function Home() {
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col justify-between">
      <main className="flex-1 p-5 text-sm text-gray-600 flex flex-col items-center space-y-6">
        <p className="text-justify max-w-2xl mx-auto">
          RageFormatter transforms your office rage into an opportunity for a
          promotion. Write your angry message inside the card and let the AI
          convert it into a polite and positive version to send. Completely for
          Free.
        </p>
        <Link href="/tutorial">
          <p className="underline">Find out how it works!</p>
        </Link>
        <MessageForm />
        <Link href="/info">
          <p className="underline">
            Visit the Q&A section to know more about RageFormatter!
          </p>
        </Link>
      </main>
    </div>
  );
}
