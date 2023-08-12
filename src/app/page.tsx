import React from "react";
import MessageForm from "./components/MessageForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" app-container bg-slate-100">
      <div className="flex flex-col text-center text-sm text-gray-600 space-y-2 m-5">
        <p>Because they do not pay you enough to be also polite!</p>
        <Link href={"/tutorial"}>
          <p className="underline">Find out how it works!</p>
        </Link>
      </div>
      <MessageForm />
    </main>
  );
}
