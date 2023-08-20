import React from "react";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  const current_year = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-b from-red-700 to-red-900 text-white text-sm py-6 mt-auto flex flex-col items-center space-y-4">
      <p>🇮🇹 RageFormatter © {current_year} - All right reserved🍝</p>
      <p className="text-xs">
        Supported Languages:
        <span className="ml-1"> 🇮🇹 🇬🇧</span>
      </p>
      <Link
        href={"/privacy-policy"}
        className="text-white font-semibold text-xs"
      >
        Privacy Policy
      </Link>
      <p className="text-xs text-center">Built by Davide Lupis:</p>
      <div className="flex items-center space-x-2">
        <Link
          href="https://github.com/DataDavidProjects/rageformatter-nextjs#-rageformatter"
          className="flex items-center space-x-2 text-white font-semibold"
        >
          <VscGithub size={22} />
        </Link>
        <Link
          href="https://www.instagram.com/david_zoolander/"
          className="flex items-center space-x-2 text-white font-semibold"
        >
          <FaInstagram size={22} />
        </Link>
        <Link
          href="https://it.linkedin.com/in/davide-lupis-448578153"
          className="flex items-center space-x-2 text-white font-semibold"
        >
          <AiOutlineLinkedin size={22} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
