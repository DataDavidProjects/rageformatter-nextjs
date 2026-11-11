import React from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="bg-ballpoint text-white">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-end justify-between gap-x-6 gap-y-3 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <Link href="/" className="block" aria-label="RageFormatter, home">
          <span className="block font-display text-2xl font-bold tracking-tight">
            <span className="text-white/70 line-through decoration-white decoration-[3px]">
              Rage
            </span>
            Formatter
          </span>
          <span className="block text-xs text-white/80">
            Because they do not pay you enough to be also polite!
          </span>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
};

export default Header;
