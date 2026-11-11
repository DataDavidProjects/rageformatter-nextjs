import React from "react";
import PageShell from "../components/PageShell";
import Faq from "../components/Faq";
import Changelog from "../components/Changelog";
import Reveal from "../components/Reveal";

const InfoPage = () => {
  return (
    <PageShell title="Questions, mostly about your job security.">
      <Faq />
      <Reveal className="mt-20">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight text-toner">
          Change log
        </h2>
        <Changelog />
      </Reveal>
    </PageShell>
  );
};

export default InfoPage;
