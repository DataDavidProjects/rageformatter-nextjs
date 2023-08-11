import React from "react";
import Link from "next/link";
import Image from "next/image";

const TutorialPage = () => {
  return (
    <div className="relative flex min-h-screen m-6 text-sm items-center justify-center py-12 px-4">
      <div className="max-w-3xl bg-white p-10 rounded-lg shadow-xl w-full text-gray-900">
        <h2 className="text-gray-900 text-4xl mb-10 font-semibold tracking-tighter text-center">
          Corporate Guidelines 🧑‍💼
        </h2>

        <div className="bg-red-50 p-8 rounded-lg border border-red-200 mb-10">
          <ul className="list-decimal pl-5 space-y-6">
            <li>
              <span className="mb-2 font-semibold block">
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
            <li className="font-semibold">
              Click on the &quot;Format&quot; button.
            </li>

            <li className="font-semibold">
              A new card will appear below with a clean, polite version of your
              message.
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
          <p className="text-lg font-medium text-center mt-8">
            🚀 Now, send your message with confidence!
          </p>
          <p className=" text-gray-600 hover:text-red-700 underline transition ease-in-out duration-150 text-center">
            ⚠️ Note: Always double check the answer, we are trying to optimize
            the model.
          </p>
        </div>

        <div className="text-center">
          <Link href="/">
            <span className="cursor-pointer text-red-600 hover:text-red-700 underline transition ease-in-out duration-150">
              Go back to the homepage
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
