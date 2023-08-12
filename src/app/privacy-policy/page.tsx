import React from "react";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col items-center text-xs text-gray-600 space-y-2 mx-5 ">
      <h1 className="text-3xl mb-2 font-semibold pt-3">Privacy Policy</h1>
      <p>Last Update: 12th August 2023</p>
      <ul className="list-disc list-inside w-96 md:text-justify px-2 space-y-4 p-5">
        <li>
          RageFormatter is part of a series of open source side projects and it
          has no commercial use of any kind. The website is considered
          entertaining content and every improper use will be considered as a
          violation.
        </li>
        <li>
          It is your responsability to use the content in respect of other
          people rights and privacy. We do not encourage any aggressive or
          offensive act towards others.
        </li>
        <li>We only monetize from donations and GoogleAdSense.</li>
        <li>
          We do not gather personal data. However, third parties, such as
          Google, may have access to personal data for profiling purposes.
        </li>
        <li>
          We reserve the right to make changes to our privacy policy at any
          given time. Any significant changes will be promptly communicated on
          the website.
        </li>
        <li>
          If you have concerns or questions about our privacy policy or the
          tecnology , please reach out using our contact details or{" "}
          <Link
            href={
              "https://github.com/DataDavidProjects/rageformatter-nextjs/issues"
            }
            className="underline"
          >
            {" "}
            GitHub Issues{" "}
          </Link>
          .
        </li>
        <li>Thank you for using our website and services.</li>
      </ul>
      <Link href={"/"} className="p-5 text-sm font-semibold">
        <p> 🚀 Now have fun with RageFormatter!</p>
      </Link>
      <p className="pb-3">
        🇮🇹: Ma ti pare che devi leggere pure le policy, ma vedi te ...
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
