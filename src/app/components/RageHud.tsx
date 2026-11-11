"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import {
  COMBO_WINDOW_MS,
  comboMultiplier,
  randomQuote,
  ranks,
  rankIndex,
  type Tag,
} from "@/lib/rage";
import { duration, ease } from "@/lib/motion";

type Props = {
  score: number;
  combo: number;
  lastKeyAt: number;
  language: "english" | "italian";
  labels: { score: string; combo: string; more: string };
  tags: Tag[];
};

const MAX_CHIPS = 8;

// God of War-style combo HUD: rank stamp, rage score, combo meter, random quip.
const RageHud: React.FC<Props> = ({ score, combo, lastKeyAt, language, labels, tags }) => {
  // biggest bonuses first; the rest collapse into a "+N more" counter
  const sorted = [...tags].sort((a, b) => b.points - a.points);
  const shownTags = sorted.slice(0, MAX_CHIPS);
  const hiddenTags = sorted.length - shownTags.length;

  const idx = rankIndex(score);
  const rank = ranks[idx];
  const [quote, setQuote] = useState("");
  const prevIdx = useRef(0);

  // roll a new quip every time the rank changes (up or down)
  useEffect(() => {
    if (idx !== prevIdx.current || (idx === 0 && !quote)) {
      setQuote(randomQuote(idx, language));
      prevIdx.current = idx;
    }
  }, [idx, language, quote]);

  // the quote follows the language toggle
  useEffect(() => {
    setQuote(randomQuote(prevIdx.current, language));
  }, [language]);

  // count the score up smoothly
  const mv = useMotionValue(0);
  const shown = useTransform(mv, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    const controls = animate(mv, score, { duration: duration.slow, ease: ease.smoothOut });
    return () => controls.stop();
  }, [score, mv]);

  const hot = idx >= 4; // A rank and above

  return (
    <div className="mb-3 border-b border-redline pb-2" aria-live="off">
      <div className="flex items-center gap-4">
        {/* rank stamp */}
        <div className="relative flex h-14 w-16 shrink-0 items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={rank.letter}
              initial={{ opacity: 0, scale: 1.9, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              exit={{ opacity: 0, scale: 0.6, transition: { duration: duration.quick } }}
              transition={{ type: "spring", stiffness: 520, damping: 22 }}
              className={`select-none rounded-sm border-[3px] px-2 py-0.5 font-display font-bold leading-none ${
                idx === 0
                  ? "border-carbon/40 text-carbon/50 text-2xl"
                  : "border-ballpoint text-ballpoint " +
                    (rank.letter.length > 2 ? "text-2xl" : "text-3xl")
              }`}
            >
              {rank.letter}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* label + score */}
        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={rank.label[language]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0, transition: { duration: duration.fast, ease: ease.smoothOut } }}
              exit={{ opacity: 0, transition: { duration: duration.quick } }}
              className={`truncate font-display text-lg font-bold leading-tight tracking-tight ${
                hot ? "text-ballpoint" : "text-toner"
              }`}
            >
              {rank.label[language]}
            </motion.p>
          </AnimatePresence>
          <p className="text-xs text-carbon">
            {labels.score}{" "}
            <motion.span className="font-semibold tabular-nums text-toner">{shown}</motion.span>
          </p>
        </div>

        {/* combo */}
        <div className="w-24 shrink-0 text-right">
          <motion.p
            key={combo > 0 ? combo : "idle"}
            initial={{ scale: combo > 0 ? 1.25 : 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: duration.quick, ease: ease.smoothOut }}
            className={`font-display text-2xl font-bold leading-none tabular-nums ${
              combo > 0 ? "text-ballpoint" : "text-carbon/40"
            }`}
          >
            ×{comboMultiplier(combo).toFixed(1)}
          </motion.p>
          <p className="mt-1 text-[11px] text-carbon">
            {labels.combo} {combo}
          </p>
          <div className="mt-1 h-1 w-full overflow-hidden bg-redline">
            {combo > 0 && (
              <motion.div
                key={lastKeyAt}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: COMBO_WINDOW_MS / 1000, ease: "linear" }}
                className="h-full origin-left bg-ballpoint"
              />
            )}
          </div>
        </div>
      </div>

      <div className="mt-2 min-h-[1.25rem] text-sm italic text-carbon">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={quote}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0, transition: { duration: duration.fast, ease: ease.smoothOut } }}
            exit={{ opacity: 0, transition: { duration: duration.quick } }}
          >
            {quote && `“${quote}”`}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* achievement tags: each bonus pops in as you earn it */}
      <ul className="mt-2 flex min-h-[1.5rem] flex-wrap gap-1.5" aria-label="Rage bonuses">
        <AnimatePresence initial={false} mode="popLayout">
          {shownTags.map((tag) => (
            <motion.li
              key={tag.id}
              layout
              initial={{ opacity: 0, scale: 1.7, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, transition: { duration: duration.quick } }}
              transition={{ type: "spring", stiffness: 520, damping: 26 }}
              className="inline-flex items-center gap-1.5 rounded-sm border border-ballpoint/40 bg-letterhead px-2 py-0.5 text-xs font-medium text-toner"
            >
              {tag.label[language]}
              {tag.count > 1 && <span className="text-carbon">×{tag.count}</span>}
              {tag.points > 0 && (
                <span className="font-mono font-semibold text-ballpoint">+{tag.points}</span>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
        {hiddenTags > 0 && (
          <li className="px-1 py-0.5 text-xs text-carbon">
            +{hiddenTags} {labels.more}
          </li>
        )}
      </ul>
    </div>
  );
};

export default RageHud;
