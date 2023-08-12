import React from "react";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-red-700 to-red-900 text-white py-6 mt-auto flex flex-col items-center space-y-4 footer">
      <p>🇮🇹 © RageFormatter 🍝</p>
      <p className="text-sm">
        Supported Languages:
        <span> 🇮🇹 🇬🇧</span>
      </p>
      <Link
        href="https://github.com/DataDavidProjects/rageformatter-nextjs#-rageformatter"
        className="flex items-center space-x-2 text-white font-semibold"
      >
        <VscGithub size={24} />
        <span>Davide Lupis</span>
      </Link>
    </footer>
  );
};

export default Footer;
