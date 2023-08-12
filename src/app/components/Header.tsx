import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gradient-to-t from-red-700 to-red-900 text-white py-5 mb-auto">
      <div className="container mx-auto px-5 lg:px-0 text-center">
        <Link href={"/"}>
          <h1 className="text-2xl mb-3 font-bold tracking-tight">
            🤬 RageFormatter
          </h1>
        </Link>
        <div className="flex  justify-between gap-10 sm:mx-20 lg:mx-60 my-2 font-sans text-sm font-bold">
          <Link href={"/"}> 🏢 Home</Link>
          <Link href={"/tutorial"}>👨‍🏫 How it works</Link>
          <Link href={"/info"}>👨📝 Q&A</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
