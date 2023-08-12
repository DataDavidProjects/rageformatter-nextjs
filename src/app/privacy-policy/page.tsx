import React from "react";
import Link from "next/link";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex flex-col items-center text-xs text-gray-600 space-y-2 mx-5 ">
      <h1 className="text-4xl mb-2 font-semibold pt-3">Privacy Policy</h1>
      <p>Last Update: 12th August 2023</p>
      <ul className="list-disc list-inside w-96 md:text-justify px-2 space-y-4 p-5">
        <li>
          RageFormatter is part of a series of side projects and it has no
          commercial use of any kind. The website is considered entertainment
          content and every improper use will be considered as a violation.
        </li>

        <li>
          When you visit our website, we aim to gather only aggregated and
          anonymous data. We do not collect personal information. We only
          monetize from donations and GoogleAdSense.
        </li>
        <li>
          We do not gather your personal data. However, third parties, such as
          Google, may have access to your personal data for profiling purposes.
        </li>
        <li>We do not store any personal information .</li>
        <li>
          You have the right to request access to any personal information we
          might hold and the right to request its deletion at your discretion.
        </li>

        <li>
          We reserve the right to make changes to our privacy policy at any
          given time. Any significant changes will be promptly communicated on
          the website.
        </li>
        <li>
          If you have concerns or questions about our privacy policy or the data
          we might have stored, please reach out using our contact details .
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
