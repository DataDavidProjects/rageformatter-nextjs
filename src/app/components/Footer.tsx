import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-red-700 to-red-900 text-white py-6 mt-auto">
      <div className="container mx-auto text-center font-semibold">
        <p>© {new Date().getFullYear()} RageFormatter 🍝</p>
        <span>
          <Link
            href={"https://github.com/DataDavidProjects/rageformatter-nextjs"}
            className=" text-xs  text-white"
          >
            Davide Lupis
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
