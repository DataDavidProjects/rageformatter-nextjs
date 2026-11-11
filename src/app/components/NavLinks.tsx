"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { duration, ease } from "@/lib/motion";
import { DonateButton } from "./DonateProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/tutorial", label: "How it works" },
];

const NavLinks: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Main"
      className="flex items-center gap-6 text-sm font-medium"
    >
      {links.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className="relative py-1 text-white/80 transition-colors hover:text-white aria-[current=page]:text-white"
          >
            {label}
            {active && (
              <motion.span
                layoutId="nav-underline"
                className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-white"
                transition={{ duration: duration.fast, ease: ease.smoothOut }}
              />
            )}
          </Link>
        );
      })}
      <DonateButton variant="nav">Donate</DonateButton>
    </nav>
  );
};

export default NavLinks;
