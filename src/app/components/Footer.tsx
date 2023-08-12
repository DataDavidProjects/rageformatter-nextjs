import React from "react";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";

const Footer = () => {
  const current_year = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-b from-red-700 to-red-900 text-white py-6 mt-auto flex flex-col items-center space-y-4 ">
      <p>🇮🇹 RageFormatter © {current_year} - All right reserved🍝</p>
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
      <Link href={"/privacy-policy"}> Privacy Policy</Link>
    </footer>
  );
};

export default Footer;
