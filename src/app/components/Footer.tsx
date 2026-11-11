import React from "react";
import Link from "next/link";
import { VscGithub } from "react-icons/vsc";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineLinkedin } from "react-icons/ai";

import { DonateButton } from "./DonateProvider";

const social =
  "text-white/80 transition-colors hover:text-white focus-visible:text-white";

const Footer = () => {
  const current_year = new Date().getFullYear();
  return (
    <footer className="bg-ballpoint text-white">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 text-sm text-white/85 sm:flex-row sm:items-center sm:justify-between">
        <p>
          RageFormatter © {current_year}. Any resemblance to your actual boss
          is purely coincidental.
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href="/privacy-policy" className="hover:text-white hover:underline">
            Privacy policy
          </Link>
          <DonateButton variant="link" className="text-white/85 hover:text-white">
            Donate
          </DonateButton>
          <span>Built by Davide Lupis</span>
          <Link
            href="https://github.com/DataDavidProjects/rageformatter-nextjs#-rageformatter"
            className={social}
            aria-label="GitHub"
          >
            <VscGithub size={20} />
          </Link>
          <Link
            href="https://www.instagram.com/david_zoolander/"
            className={social}
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </Link>
          <Link
            href="https://it.linkedin.com/in/davide-lupis-448578153"
            className={social}
            aria-label="LinkedIn"
          >
            <AiOutlineLinkedin size={22} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
