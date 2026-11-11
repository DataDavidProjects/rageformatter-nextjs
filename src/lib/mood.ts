// Tiny shared store: the form tells the 3D face what is going on.
// The face reads it every frame, so no React re-render is involved.
export type Mood = {
  phase: "typing" | "loading" | "calm";
  /** characters typed so far: pressure builds with them */
  chars: number;
  /** increments every time the face should explode right now (e.g. on send) */
  burst: number;
};

let mood: Mood = { phase: "typing", chars: 0, burst: 0 };

export const getMood = () => mood;
export const setMood = (next: Partial<Mood>) => {
  mood = { ...mood, ...next };
};
export const triggerBurst = () => {
  mood = { ...mood, burst: mood.burst + 1 };
};
