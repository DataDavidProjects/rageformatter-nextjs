import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { StripeDonation } from "../components/StripeDonation";

const TutorialPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col justify-between">
      <main className="flex-1 p-5 text-sm text-gray-600 flex flex-col items-center space-y-6">
        <div className="max-w-3xl bg-white px-5 py-10 rounded-xl shadow-2xl w-full text-gray-600">
          <h2 className="text-gray-600 text-xl font-semibold tracking-tighter text-center sm:text-2xl flex items-center justify-center">
            <BsFillBriefcaseFill className="mr-2" />
            <span>Guidelines</span>
          </h2>
          <p className="text-xs m-3">
            Have you ever wanted to vent out your rage in a message but feared
            the repercussions at work? Well, say Ciao Ciao to your problems,
            because RageFormatter is here! We help transforming your passionate
            messages into polite and professional prose.
          </p>
          <p className="text-xs text-gray-600">
            These simple steps will turn your rage into a promotion in no time.
          </p>
          <div className="bg-red-50 p-8 rounded-lg border border-red-200 mb-10">
            <ul className="list-decimal pl-5 space-y-6">
              <li className="mb-2 font-semibold text-xs">
                Write your frustrated message in the card form provided. (Try be
                precise with the subject and context)
                <div className="relative w-70% h-70% mx-auto mt-4 rounded-md overflow-hidden shadow-md border border-gray-200 sm:w-80 h-90">
                  <Image
                    src="/rageformatterexample_input.png"
                    alt="Input screenshot for RageFormatter"
                    layout="responsive"
                    objectFit="cover"
                    width={100}
                    height={101.6}
                  />
                </div>
              </li>
              <li className="font-semibold text-xs">
                Click on the Format button.
              </li>
              <li className="font-semibold text-xs">
                A new card will appear below with a clean, polite version of
                your message.
                <div className="relative w-70% h-70% mx-auto mt-4 rounded-md overflow-hidden shadow-md border border-gray-200 sm:w-80 h-90">
                  <Image
                    src="/rageformatterexample_output.png"
                    alt="Output screenshot from RageFormatter"
                    layout="responsive"
                    width={100}
                    height={101.6}
                    objectFit="cover"
                  />
                </div>
              </li>
            </ul>
            <Link href="/">
              <p className="text-xs sm:text-sm font-medium sm:text-center mt-8">
                🚀 Now, send your message with confidence!
              </p>
            </Link>
          </div>
          <p className="text-gray-600 hover:text-red-700 underline transition ease-in-out duration-150 sm:text-center text-xs py-2">
            ⚠️ Note: Always double-check the answer, we are trying to optimize
            the model.
          </p>
          <div className="flex justify-center">
            <StripeDonation />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorialPage;
