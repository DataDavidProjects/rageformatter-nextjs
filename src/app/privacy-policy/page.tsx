import React from "react";
import Link from "next/link";
import PageShell from "../components/PageShell";

const points: React.ReactNode[] = [
  "RageFormatter is part of a series of open source side projects and it has no commercial use of any kind. The website is considered entertaining content and every improper use will be considered as a violation.",
  "It is your responsibility to use the content in respect of other people’s rights and privacy. We do not encourage any aggressive or offensive act towards others.",
  "We only monetize from donations and GoogleAdSense.",
  "We do not gather personal data. However, third parties, such as Google or OpenAI, may have access to personal data for profiling purposes or moderation policy.",
  "We reserve the right to make changes to our privacy policy at any given time. Any significant changes will be promptly communicated on the website.",
  <>
    If you have concerns or questions about our privacy policy or the
    technology, please reach out using our contact details or{" "}
    <Link
      href="https://github.com/DataDavidProjects/rageformatter-nextjs/issues"
      className="underline underline-offset-2 hover:text-toner"
    >
      GitHub Issues
    </Link>
    .
  </>,
  "Thank you for using our website and services.",
];

const PrivacyPolicyPage = () => {
  return (
    <PageShell
      title="Privacy policy"
      intro="Last update: 12 August 2023. Short, because we collect nothing."
    >
      <ul className="max-w-[65ch] divide-y divide-redline border-y border-redline">
        {points.map((point, i) => (
          <li
            key={i}
            className="py-4 font-serif text-[17px] leading-relaxed text-carbon"
          >
            {point}
          </li>
        ))}
      </ul>
    </PageShell>
  );
};

export default PrivacyPolicyPage;
