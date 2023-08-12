import React from "react";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-red-700 to-red-900 text-white py-6 mt-auto">
      <p className="flex justify-center">
        © {new Date().getFullYear()} RageFormatter 🍝
      </p>
      <span className="flex justify-center items-center space-x-2">
        <div className="flex mx-auto text-center font-semibold">
          <Link
            href={
              "https://github.com/DataDavidProjects/rageformatter-nextjs#-rageformatter"
            }
            className="flex items-center space-x-2"
          >
            <VscGithub size={24} className="text-white" />
            <span>Davide Lupis</span>
          </Link>
        </div>
      </span>
    </footer>
  );
};

export default Footer;
