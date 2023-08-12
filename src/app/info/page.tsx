import React from "react";
import Link from "next/link";

const InfoPage = () => {
  return (
    <div className="flex flex-col items-center text-xs text-gray-600 space-y-2 mx-5 ">
      <h1 className="text-4xl mb-2 font-semibold pt-3">RageFormatter Q&A</h1>
      <p>Last Update: 12th August 2023</p>
      <ul className="list-disc list-inside w-96 md:text-justify px-2 space-y-4 p-5">
        <li>
          <strong>What is RageFormatter?</strong>
          <p>
            RageFormatter is an ironic webapp designed to convert your angry
            messages into polite ones, suitable for sending to bosses or
            coworkers.
          </p>
        </li>
        <li>
          <strong>Who developed RageFormatter?</strong>
          <p>
            RageFormatter is a sideproject created by{" "}
            <Link
              href={"https://www.linkedin.com/in/davide-lupis-448578153/"}
              className="underline transition ease-in-out duration-150"
            >
              Davide Lupis
            </Link>{" "}
            and is powered by the OpenAI LLM model.
          </p>
        </li>
        <li>
          <strong>How optimized is the model?</strong>
          <p>
            While the model is functional, it{`'`}s still being optimized. If it
            doesn{`'`}t provide the desired output, feel free to try again!
          </p>
        </li>
        <li>
          <strong>Why isn{`'`}t it working sometimes?</strong>
          <p>
            There{`'`}s a set limit for the number of requests to ensure smooth
            operation. If it{`'`}s not working, you might have reached that
            limit. Just try again later or consider helping us with a donation
            to keep the app running.
          </p>
        </li>
        <li>
          <strong>Any guidelines for using RageFormatter?</strong>
          <p>
            For best results, provide a clear context. The model needs a working
            situation to analyze, not just random words. Define subjects and
            situations adequately.
          </p>
        </li>
      </ul>
      <Link href={"/"} className="p-5 text-sm font-semibold">
        <p> 🚀 Now have fun with RageFormatter!</p>
      </Link>
    </div>
  );
};

export default InfoPage;
