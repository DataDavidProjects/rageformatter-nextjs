import React from "react";

const entries = [
  { date: "1 August 2023", text: "English language integration" },
  { date: "17 September 2023", text: "Stripe integration" },
  { date: "1 December 2023", text: "RageScore integration" },
];

const Changelog: React.FC = () => (
  <ul className="divide-y divide-redline border-y border-redline">
    {entries.map(({ date, text }) => (
      <li key={date} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4">
        <span className="w-44 shrink-0 font-semibold tabular-nums text-toner">
          {date}
        </span>
        <span className="text-carbon">{text}</span>
      </li>
    ))}
  </ul>
);

export default Changelog;
