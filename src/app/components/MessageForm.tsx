"use client";
import React, { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { duration, ease, enter, exit } from "@/lib/motion";
import { setMood, triggerBurst } from "@/lib/mood";
import { useDonate } from "./DonateProvider";
import RageHud from "./RageHud";
import {
  COMBO_WINDOW_MS,
  comboMultiplier,
  comboTags,
  placeholders,
  type Tag,
  randomQuote,
  rankIndex,
  ranks,
  scoreText,
} from "@/lib/rage";

const MAX_CHARS = 1000;

const copy = {
  english: {
    inputLabel: "What you really think",
    draftTag: "Draft: do not send",
    outputLabel: "What you will actually send",
    placeholder:
      "Dear [recipient], if you weren't a complete idiot, you would find the answer to your question in the previous email.",
    submit: "Make me employable",
    submitting: "Counting to ten…",
    emptyOutput:
      "Your polite version appears here. Something like: “As mentioned in my previous email, you will find the details there. Happy to help if anything is unclear.”",
    copy: "Copy",
    copied: "Copied",
    stamp: "Approved by HR",
    score: "Rage score",
    more: "more",
    combo: "Combo",
    finalScore: "Final rage score",
    nudge: "Did we just save your job?",
    nudgeAction: "Chip in for the OpenAI bill.",
    error:
      "Couldn't format your message. Even the AI needs a coffee break: try again in a moment.",
  },
  italian: {
    inputLabel: "Quello che pensi veramente",
    draftTag: "Bozza: non inviare",
    outputLabel: "Quello che invierai davvero",
    placeholder:
      "Caro [destinatario], se non fossi un idiota completo, troveresti la risposta alla tua domanda nell'email precedente.",
    submit: "Salvami il posto",
    submitting: "Conto fino a dieci…",
    emptyOutput:
      "La versione educata appare qui. Qualcosa come: “Come indicato nella mia email precedente, trovi i dettagli lì. Resto a disposizione per qualsiasi dubbio.”",
    copy: "Copia",
    copied: "Copiato",
    stamp: "Approvato dalle HR",
    score: "Punteggio rabbia",
    more: "altri",
    combo: "Combo",
    finalScore: "Punteggio rabbia finale",
    nudge: "Ti abbiamo appena salvato il posto?",
    nudgeAction: "Aiutaci a pagare il conto di OpenAI.",
    error:
      "Non siamo riusciti a formattare il messaggio. Anche l'AI ha bisogno di un caffè: riprova tra poco.",
  },
} as const;

type Language = keyof typeof copy;

const state = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: enter },
  exit: { opacity: 0, transition: exit },
};

// Loading state: the angry text gets redacted, line by line.
const RedactionSkeleton: React.FC<{ lines: number }> = ({ lines }) => (
  <div aria-hidden="true" className="space-y-3 pt-1">
    {Array.from({ length: lines }).map((_, i) => (
      <motion.div
        key={i}
        className="h-4 origin-left bg-toner"
        style={{ width: i === lines - 1 ? "55%" : "100%" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.9,
          ease: ease.smoothOut,
          delay: i * 0.14,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.25,
        }}
      />
    ))}
  </div>
);

const MessageForm: React.FC = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState<Language>("english");
  const t = copy[language];
  const { open: openDonate } = useDonate();

  // rage score: text-based points plus a running typing-combo bonus
  const [combo, setCombo] = useState(0);
  const [lastKeyAt, setLastKeyAt] = useState(0);
  const [comboBonus, setComboBonus] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [final, setFinal] = useState<{
    score: number;
    idx: number;
    quote: string;
    tags: Tag[];
  } | null>(null);
  const breakdown = useMemo(() => scoreText(message), [message]);
  const score = breakdown.total + Math.round(comboBonus);
  const tags = useMemo(
    () => [...breakdown.tags, ...comboTags(maxCombo)],
    [breakdown, maxCombo]
  );

  // a random funny placeholder (picked after mount so server and client markup match)
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  useEffect(() => {
    setPlaceholderIdx(Math.floor(Math.random() * placeholders.english.length));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    // only real keystrokes build the combo; pasting a wall of text does not
    const typed =
      (e.nativeEvent as InputEvent).inputType === "insertText" &&
      value.length > message.length;
    if (typed) {
      const now = Date.now();
      const next = combo > 0 && now - lastKeyAt < COMBO_WINDOW_MS ? combo + 1 : 1;
      setCombo(next);
      setMaxCombo((m) => Math.max(m, next));
      setLastKeyAt(now);
      setComboBonus((b) => b + comboMultiplier(next) * 2);
    }
    setMessage(value);
  };

  // the combo dies if you stop typing
  useEffect(() => {
    if (combo === 0) return;
    const id = setTimeout(() => setCombo(0), COMBO_WINDOW_MS);
    return () => clearTimeout(id);
  }, [combo, lastKeyAt]);

  useEffect(() => {
    if (message === "") {
      setResponse("");
      setError(false);
      setComboBonus(0);
      setCombo(0);
      setMaxCombo(0);
      setFinal(null);
    }
  }, [message]);

  // Tell the 3D face what is going on: pressure builds with every character,
  // it explodes on send, then smiles when the polite version is ready.
  useEffect(() => {
    setMood({
      phase: loading ? "loading" : response ? "calm" : "typing",
      // the face's pressure follows the rage score; "Menace" (1400) is the blow-up point
      chars: Math.round(score * 0.2),
    });
  }, [loading, response, score]);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Unable to copy text to clipboard", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    triggerBurst(); // release the pressure: the face explodes on send
    const idx = rankIndex(score);
    setFinal({ score, idx, quote: randomQuote(idx, language), tags });
    setLoading(true);
    setError(false);
    setResponse("");

    try {
      const res = await fetch("/api/completion/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: { user: message, language: language },
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setResponse(data?.message?.content ?? "");
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const skeletonLines = Math.min(9, Math.max(3, Math.ceil(message.length / 38)));
  const view = loading ? "loading" : response ? "done" : error ? "error" : "empty";

  return (
    <section className="w-full">
      <div
        role="group"
        aria-label="Language"
        className="mb-5 inline-flex rounded-sm border border-redline bg-letterhead p-0.5 text-sm"
      >
        {(["english", "italian"] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={language === lang}
            className={`relative px-3 py-1 font-medium transition-colors ${
              language === lang ? "text-white" : "text-carbon hover:text-toner"
            }`}
          >
            {language === lang && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 bg-toner"
                transition={{ duration: duration.fast, ease: ease.smoothOut }}
              />
            )}
            <span className="relative">{lang === "english" ? "EN" : "IT"}</span>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 md:grid-cols-2 md:gap-8"
      >
        {/* Rage sheet */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <label
              htmlFor="message"
              className="text-sm font-semibold text-carbon"
            >
              {t.inputLabel}
            </label>
            <span className="font-mono text-xs text-ballpoint">
              {t.draftTag}
            </span>
          </div>
          <RageHud
            score={score}
            combo={combo}
            lastKeyAt={lastKeyAt}
            language={language}
            labels={{ score: t.score, combo: t.combo, more: t.more }}
            tags={tags}
          />
          <textarea
            id="message"
            name="message"
            required
            value={message}
            maxLength={MAX_CHARS}
            onChange={handleChange}
            rows={11}
            placeholder={placeholders[language][placeholderIdx]}
            className="min-h-[18rem] w-full flex-1 resize-none rounded-sm border border-redline border-l-[3px] border-l-ballpoint bg-fax p-4 font-mono text-base leading-6 md:text-[13px] text-toner shadow-sheet transition-shadow duration-200 placeholder:text-carbon/60 focus:shadow-[0_1px_0_rgba(28,31,38,.06),0_16px_32px_-12px_rgba(164,38,44,.3)]"
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <motion.button
              type="submit"
              disabled={loading || message.trim() === ""}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: duration.quick, ease: ease.smoothOut }}
              className="rounded-sm bg-ballpoint px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ballpoint-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? t.submitting : t.submit}
            </motion.button>
            <span className="text-xs tabular-nums text-carbon">
              {message.length} / {MAX_CHARS}
            </span>
          </div>
        </div>

        {/* Polite sheet */}
        <div className="flex flex-col md:-rotate-[0.4deg]">
          <div className="mb-2 text-sm font-semibold text-carbon">
            {t.outputLabel}
          </div>
          <div
            aria-live="polite"
            aria-busy={loading}
            className="relative min-h-[18rem] flex-1 overflow-hidden rounded-sm border border-redline bg-letterhead p-6 shadow-sheet"
          >
            <AnimatePresence mode="wait" initial={false}>
              {view === "loading" && (
                <motion.div key="loading" {...state}>
                  <RedactionSkeleton lines={skeletonLines} />
                </motion.div>
              )}

              {view === "done" && (
                <motion.div key="done" {...state}>
                  {final && (
                    <div className="mb-4 border-b border-redline pb-3">
                      <p className="font-mono text-xs text-ballpoint">
                        {t.finalScore}{" "}
                        <span className="font-semibold tabular-nums">
                          {final.score.toLocaleString()}
                        </span>{" "}
                        · {ranks[final.idx].letter} {ranks[final.idx].label[language]}
                      </p>
                      <p className="mt-1 text-xs italic text-carbon">“{final.quote}”</p>
                      {final.tags.length > 0 && (
                        <p className="mt-2 text-[11px] leading-relaxed text-carbon">
                          {[...final.tags]
                            .sort((a, b) => b.points - a.points)
                            .slice(0, 5)
                            .map((tg) => tg.label[language])
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="whitespace-pre-wrap font-serif text-[17px] leading-relaxed text-toner">
                    {response}
                  </p>
                  <motion.button
                    type="button"
                    onClick={handleCopyToClipboard}
                    whileTap={{ scale: 0.97 }}
                    className="mt-6 inline-flex items-center gap-2 rounded-sm border border-redline px-3 py-1.5 text-sm font-medium text-carbon transition-colors hover:border-carbon hover:text-toner"
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={copied ? "check" : "copy"}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: duration.quick }}
                        className="inline-flex"
                      >
                        {copied ? <FaCheck size={14} /> : <FaRegCopy size={14} />}
                      </motion.span>
                    </AnimatePresence>
                    {copied ? t.copied : t.copy}
                  </motion.button>
                  <p className="mt-4 max-w-[26ch] text-xs leading-relaxed text-carbon">
                    {t.nudge}{" "}
                    <button
                      type="button"
                      onClick={openDonate}
                      className="font-semibold text-ballpoint underline underline-offset-2 hover:text-ballpoint-dark"
                    >
                      {t.nudgeAction}
                    </button>
                  </p>
                  <motion.span
                    aria-hidden="true"
                    initial={{ opacity: 0, scale: 1.8, rotate: -9 }}
                    animate={{ opacity: 0.9, scale: 1, rotate: -9 }}
                    transition={{
                      type: "spring",
                      stiffness: 520,
                      damping: 24,
                      delay: 0.35,
                    }}
                    className="pointer-events-none absolute bottom-5 right-5 select-none rounded-sm border-[3px] border-ballpoint px-3 py-1 font-display text-sm font-bold uppercase tracking-wider text-ballpoint"
                  >
                    {t.stamp}
                  </motion.span>
                </motion.div>
              )}

              {view === "error" && (
                <motion.p
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, x: 0 }}
                  animate={{
                    opacity: 1,
                    x: [0, -6, 6, -4, 4, 0],
                    transition: { duration: 0.4 },
                  }}
                  exit={{ opacity: 0, transition: exit }}
                  className="text-sm font-medium text-ballpoint"
                >
                  {t.error}
                </motion.p>
              )}

              {view === "empty" && (
                <motion.p
                  key="empty"
                  {...state}
                  className="font-serif text-[17px] italic leading-relaxed text-carbon/60"
                >
                  {t.emptyOutput}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MessageForm;
