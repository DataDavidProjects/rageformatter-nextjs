// Motion tokens (from transitions.dev): one scale for the whole app.
export const ease = {
  smoothOut: [0.22, 1, 0.36, 1] as const,
  inOut: "easeInOut" as const,
};

export const duration = {
  stagger: 0.04,
  quick: 0.15,
  fast: 0.25,
  medium: 0.35,
  slow: 0.4,
  verySlow: 0.5,
};

export const enter = { duration: duration.slow, ease: ease.smoothOut };
export const exit = { duration: duration.quick, ease: ease.smoothOut };
