import React from "react";
import Link from "next/link";

const InfoPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col justify-between">
      <main className="flex-1 p-5 text-sm text-gray-600 flex flex-col items-center space-y-6">
        <h1 className="text-2xl mb-2 font-semibold pt-3">RageFormatter Q&A</h1>
        <p>Last Update: 21th August 2023</p>
        <ul className="list-disc list-inside w-96 px-2 py-5 md:text-justify ">
          <li className="mb-4">
            {" "}
            <strong>What is RageFormatter?</strong>
            <p>
              RageFormatter is an ironic webapp designed to convert your angry
              messages into polite ones. Suitable for your workplace and ready
              to send to your boss or colleagues. Follow the {}
              <Link
                href={"/tutorial"}
                className="underline transition ease-in-out duration-150"
              >
                tutorial here
              </Link>
              {} if you want to learn how to use it.
            </p>
          </li>
          <li className="mb-4">
            <strong>Do you save my messages or data?</strong>
            <p>
              Absolutely No! RageFormatter does not store any data and is
              completely anonymous. Your messages however might be part of
              OpenAI collections but never connected directly to you.
              Rageformatter is safe and built with no commercial intensions.
            </p>
          </li>
          <li className="mb-4">
            <strong>Who developed RageFormatter?</strong>
            <p>
              RageFormatter is a side-project created by{" "}
              <Link
                href={"https://www.linkedin.com/in/davide-lupis-448578153/"}
                className="underline transition ease-in-out duration-150"
              >
                Davide Lupis
              </Link>{" "}
              and is powered by the OpenAI LLM model. The project is completely
              OpenSource and if you want you can visit the{" "}
              <Link
                href="https://github.com/DataDavidProjects/rageformatter-nextjs#-rageformatter"
                className="text-sm underline"
              >
                GitHub repository
              </Link>
              {} and contribute.
            </p>
          </li>
          <li className="mb-4">
            <strong>How optimized is the model?</strong>
            <p>
              The model is functioning, but {"it's"} still being optimized. If
              it
              {"doesn't"} provide the desired output, feel free to try again! If
              the answer is truncated is because you have reached a pre defined
              token limit for your answer. These limits ensure the website to
              work properly for all users.
            </p>
          </li>
          <li className="mb-4">
            <strong>Why the conversion {"isn't"} it working?</strong>
            <p>
              In order to provide a decent response to all users and prevent
              abuses,
              {" There's"} a limit for the number of requests. If the webapp{" "}
              {"it's"} not working, you might have reached that limit. Just try
              again later or consider helping us with a donation to keep the app
              running. More about donations is explained below.
            </p>
          </li>
          <li className="mb-4">
            <strong>How do i get good answers ?</strong>
            <p>
              For best results, is suggested to provide a clear context. The
              model needs an ordinary work situation to analyze, not just random
              words. Define the subject and situation adequately. For example,
              think about the email you need to send or a future conversation
              with your boss.
            </p>
          </li>
          <li className="mb-4">
            <strong>Can i use RageFormatter on mobile?</strong>
            <p>
              Absolutely! The website is responsive and you can use it in all
              type of devices. You might encounter small differences but the
              tool will work in the same way.
            </p>
          </li>
          <li className="mb-4">
            <strong>Why do you need donations ?</strong>
            <p>
              Each time the model transforms your message there is an
              interaction with the OpenAI LLM, which means that we encounter a
              small cost. Even if the cost of a single call is small, the whole
              project needs to make a breakeven with revenues or it will stop.
            </p>
          </li>
        </ul>
        <div className="">
          <h1 className="text-2xl mb-2 font-semibold text-center">
            Change Log
          </h1>
          <ul className="list-disc list-inside w-96 px-2 py-5 md:text-justify">
            <li className="my-2">1st August 2023</li>
            <p>English Language integration</p>
            <li className="my-2">1st October 2023</li>
            <p>Russian and Hungarian Language integration</p>
            <li className="my-2">1st December 2023</li>
            <p>RageScore integration</p>
          </ul>
        </div>
        <Link
          href={"/"}
          className="p-5 text-sm font-semibold border rounded-lg"
        >
          <p> 🚀 Now have fun with RageFormatter!</p>
        </Link>
      </main>
    </div>
  );
};

export default InfoPage;
