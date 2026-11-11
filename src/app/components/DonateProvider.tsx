"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaXmark } from "react-icons/fa6";
import { StripeDonation } from "./StripeDonation";
import { duration, ease } from "@/lib/motion";

const DonateContext = createContext<{ open: () => void }>({ open: () => {} });
export const useDonate = () => useContext(DonateContext);

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

// One donation popup for the whole app. The Stripe widget only mounts (and
// its script only loads) the first time someone opens it.
export const DonateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => {
    trigger.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(
        panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  return (
    <DonateContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="donate"
            className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: duration.quick } }}
            exit={{ opacity: 0, transition: { duration: duration.quick } }}
          >
            <button
              type="button"
              tabIndex={-1}
              aria-label="Close donation popup"
              onClick={close}
              className="absolute inset-0 cursor-default bg-toner/60 backdrop-blur-[2px]"
            />
            <motion.div
              ref={panel}
              role="dialog"
              aria-modal="true"
              aria-labelledby="donate-title"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: duration.fast, ease: ease.smoothOut },
              }}
              exit={{
                opacity: 0,
                y: 12,
                scale: 0.98,
                transition: { duration: duration.quick, ease: ease.smoothOut },
              }}
              className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-sm border border-redline border-t-4 border-t-ballpoint bg-letterhead p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-sheet"
            >
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-sm p-2 text-carbon transition-colors hover:text-toner"
              >
                <FaXmark size={16} />
              </button>
              <h2
                id="donate-title"
                className="pr-8 font-display text-2xl font-bold tracking-tight text-toner"
              >
                Keep the AI on the payroll
              </h2>
              <p className="mt-2 font-serif text-[17px] leading-relaxed text-carbon">
                Every message you format costs a small OpenAI bill. A donation
                keeps RageFormatter free for the next person about to hit
                “reply all”.
              </p>
              <div className="relative mt-5 flex min-h-[160px] items-center justify-center">
                <span className="absolute text-sm text-carbon/70">
                  Loading checkout…
                </span>
                <div className="relative w-full">
                  <StripeDonation />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DonateContext.Provider>
  );
};

type Variant = "nav" | "solid" | "link";

const styles: Record<Variant, string> = {
  nav: "rounded-sm border border-white/60 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-white hover:text-ballpoint",
  solid:
    "rounded-sm bg-ballpoint px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ballpoint-dark",
  link: "text-sm underline underline-offset-2 transition-colors hover:text-toner",
};

export const DonateButton: React.FC<{
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
}> = ({ variant = "solid", className = "", children = "Donate" }) => {
  const { open } = useDonate();
  return (
    <motion.button
      type="button"
      onClick={open}
      whileTap={{ scale: 0.97 }}
      className={`${styles[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
