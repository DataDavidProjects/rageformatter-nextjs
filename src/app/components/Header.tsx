import React from "react";
import Link from "next/link";
import { BsHouseDoor, BsFillBookFill } from "react-icons/bs";

const Header = () => {
  return (
    <header className="bg-gradient-to-t from-red-700 to-red-900 text-white py-3 mb-auto">
      <div className="container mx-auto px-5 lg:px-0 text-center text-xs">
        <Link href={"/"} className="mb-3">
          <h1 className="text-4xl font-bold tracking-tight">
            <span role="img" aria-label="Rage Emoji">
              🤬
            </span>{" "}
            RageFormatter
          </h1>
          <p>Because they do not pay you enough to be also polite!</p>
        </Link>
        <div className="flex justify-between gap-10 sm:mx-20 lg:mx-60 my-4 font-sans text-sm font-bold">
          <Link href={"/"}>
            <span className="flex items-center space-x-1">
              <BsHouseDoor size={20} />
              <span>Home</span>
            </span>
          </Link>
          <Link href={"/tutorial"}>
            <span className="flex items-center space-x-1">
              <BsFillBookFill size={20} />
              <span>How it works</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
