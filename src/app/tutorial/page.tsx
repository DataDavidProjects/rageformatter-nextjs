import React from "react";
import Link from "next/link";
import Image from "next/image";

const TutorialPage = () => {
  return (
    <div>
      <div className="text-xs text-gray-600 text-center mx-auto">
        <p>
          Have you ever wanted to vent out your rage in a message but feared the
          repercussions at work?
        </p>
        <p>
          Well, say {'"Ciao Ciao!"'} to your problems, because RageFormatter is
          here!
        </p>
      </div>

      <div className="relative flex  m-6 text-sm items-center justify-center  px-4">
        <div className="max-w-3xl bg-white px-10 pb-10 rounded-lg shadow-xl w-full text-gray-900">
          <h2 className="text-gray-900 text-xl mb-5 font-semibold tracking-tighter sm:text-center sm:text-2xl">
            Corporate Guidelines 🧑‍💼
          </h2>
          <p className="text-xs text-gray-600">
            These simple steps will turn your rage into a promotion in no time.
          </p>
          <div className="bg-red-50 p-8 rounded-lg border border-red-200 mb-10">
            <ul className="list-decimal pl-5 space-y-6">
              <li>
                <span className="mb-2 font-semibold block text-xs">
                  Write your frustrated message in the card form provided.
                </span>
                <div className="relative w-70% h-70%  mx-auto mt-4 rounded-md overflow-hidden shadow-md border border-gray-200 sm:w-80 h-90">
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
                    width={100}
                    height={101.6}
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
              </li>
            </ul>
            <p className="text-xs sm:text-sm font-medium sm:text-center mt-8">
              🚀 Now, send your message with confidence!
            </p>
          </div>
          <p className=" text-gray-600 hover:text-red-700 underline transition ease-in-out duration-150 sm:text-center text-xs py-2">
            ⚠️ Note: Always double check the answer, we are trying to optimize
            the model.
          </p>
          <div className="text-center">
            <Link href="/">
              <span className="cursor-pointer text-red-600 hover:text-red-700 underline transition ease-in-out duration-150">
                Go back to the homepage
              </span>
            </Link>
            <p className="text-sm text-white-600 p-5">Supported Languages:</p>
            <span>🇮🇹 🇬🇧</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
