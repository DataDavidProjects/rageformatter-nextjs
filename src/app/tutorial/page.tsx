import React from "react";
import PageShell from "../components/PageShell";
import Reveal from "../components/Reveal";
import TutorialScene from "../components/TutorialScene";
import { FaxDemo, RedactionDemo, LetterDemo } from "../components/DemoSheets";
import { DonateButton } from "../components/DonateProvider";
import { credits } from "@/lib/credits";

const link = "underline underline-offset-2 hover:text-toner";

const TutorialPage = () => {
  return (
    <PageShell
      title="Three steps from rage to promotion."
      intro="No account, no sign-up, no eye contact. Paste your frustration and get back something you can safely send."
    >
      <ol className="space-y-28 md:space-y-36">
        <TutorialScene
          n={1}
          title="Write what you actually think"
          body="Type the message you would love to send. Be specific about the subject and the situation: the more context, the better the polite version."
          photo={{
            src: "/images/frustrated.jpg",
            alt: credits.frustrated.alt,
          }}
        >
          <FaxDemo />
        </TutorialScene>

        <TutorialScene
          n={2}
          flip
          title="Press the button, count to ten"
          body="Pick English or Italian, then press “Make me employable”. The angry lines get redacted while the AI does the diplomacy."
          photo={{ src: "/images/crumpled.jpg", alt: credits.crumpled.alt }}
        >
          <RedactionDemo />
        </TutorialScene>

        <TutorialScene
          n={3}
          title="Copy it, send it, keep your job"
          body="The HR-approved text lands on the letter. Press Copy and paste it into your email. Not happy with the tone? Press the button again for another take."
          photo={{
            src: "/images/handshake.jpg",
            alt: credits.handshake.alt,
          }}
        >
          <LetterDemo />
        </TutorialScene>
      </ol>

      <Reveal className="mt-32 flex flex-wrap items-center justify-between gap-4 border-t border-redline pt-8">
        <p className="max-w-[48ch] text-sm text-carbon">
          Still free. A donation covers the OpenAI bill.
        </p>
        <DonateButton variant="solid">Donate</DonateButton>
      </Reveal>

      <p className="mt-12 text-xs text-carbon">
        Photos by{" "}
        {(["frustrated", "crumpled", "handshake"] as const).map((k, i, arr) => (
          <React.Fragment key={k}>
            <a href={credits[k].profile} className={link}>
              {credits[k].photographer}
            </a>
            {i < arr.length - 1 ? ", " : " "}
          </React.Fragment>
        ))}
        on{" "}
        <a
          href="https://unsplash.com/?utm_source=rageformatter&utm_medium=referral"
          className={link}
        >
          Unsplash
        </a>
        .
      </p>
    </PageShell>
  );
};

export default TutorialPage;
