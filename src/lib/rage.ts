// Rage score: how angry is this message? Pure functions, no network.
// Every bonus comes with a funny tag ("achievement") so the score explains itself.
// The typing combo adds a running bonus on top (kept in the form, not here).

type Lang = "english" | "italian";
type Label = { english: string; italian: string };

export type Tag = { id: string; label: Label; points: number; count: number };

const SWEAR =
  /\b(fuck\w*|shit\w*|idiot\w*|moron\w*|stupid|dumb\w*|damn\w*|asshole\w*|bastard\w*|crap\w*|useless|incompeten\w*|cazz\w*|stronz\w*|imbecill\w*|coglion\w*|merd\w*|vaffanculo|deficient\w*|cretin\w*|scem\w*|rompi\w*)\b/gi;

const PASSIVE_AGGRESSIVE =
  /(per my last email|as i (already )?(said|mentioned)|\bagain\b|already (sent|told|said)|for the (last|third|tenth) time|come (già )?(detto|scritto)|ti ho già|te l'ho già)/gi;

const ABSOLUTES = /\b(you always|you never|always|never|sempre|mai)\b/gi;
const FINE = /(^|[\s.!])(fine|whatever|va bene|come vuoi)(?=[.!\s]|$)/gi;
const BOSS = /\b(boss|manager|hr|ceo|director|capo|direttore|responsabile)\b/gi;
const MEETING = /\b(meeting|riunione)\b/gi;
const REPLY_ALL = /(reply[- ]all|rispondi a tutti)/gi;
const QUIT = /\b(i quit|i resign|resignation|mi licenzio|dimissioni|me ne vado)\b/gi;
const OBVIOUSLY = /\b(obviously|clearly|literally|ovviamente|chiaramente|letteralmente)\b/gi;
const STRETCH = /([a-zà-ý])\1{3,}/gi;
const EMOJI = /[😡🤬😤💢🔥]/gu;
const ELLIPSIS = /(\.{3,}|…)/g;
const INTERROBANG = /(\?!|!\?)/g;
const SIGN_OFF = /\b(best regards|kind regards|regards|cordiali saluti|distinti saluti)\b/gi;
const THANKS = /(thanks in advance|grazie in anticipo)/gi;

const count = (text: string, re: RegExp) => (text.match(re) || []).length;

export type ScoreBreakdown = { total: number; tags: Tag[] };

export const scoreText = (text: string): ScoreBreakdown => {
  const chars = text.trim().length;
  if (chars === 0) return { total: 0, tags: [] };

  const tags: Tag[] = [];
  const add = (id: string, english: string, italian: string, points: number, n = 1) => {
    if (n > 0) tags.push({ id, label: { english, italian }, points: Math.round(points), count: n });
  };

  const capsWords = count(text, /\b[A-ZÀ-Ý]{3,}\b/g);
  add("caps", "Caps Lock Warrior", "Guerriero del Maiuscolo", capsWords * 25, capsWords);

  const excl = count(text, /!/g);
  add("excl", "Exclamation Abuser", "Abuso di Esclamativi", excl * 15, excl);

  const swears = count(text, SWEAR);
  add("swear", "Sailor Mouth", "Linguaggio da Scaricatore", swears * 60, swears);

  const passive = count(text, PASSIVE_AGGRESSIVE);
  add("passive", "Per My Last Email", "Come da Mia Ultima Mail", passive * 40, passive);

  const absolutes = Math.min(3, count(text, ABSOLUTES));
  add("absolute", "Absolutist (Never Wrong)", "Assolutista (Mai in Torto)", absolutes * 20, absolutes);

  const fine = count(text, FINE);
  add("fine", "“Fine.” (It Is Not Fine)", "“Va bene.” (Non Va Bene)", fine * 25, fine);

  add("boss", "Going Over Their Head", "Scavalcare il Capo", 35, Math.min(1, count(text, BOSS)));
  add("meeting", "Could Have Been An Email", "Poteva Essere una Mail", 30, Math.min(1, count(text, MEETING)));
  add("replyall", "Reply-All Energy", "Energia da Rispondi-a-Tutti", 50, Math.min(1, count(text, REPLY_ALL)));
  add("quit", "Resignation Draft", "Bozza di Dimissioni", 80, Math.min(1, count(text, QUIT)));

  const obvious = Math.min(3, count(text, OBVIOUSLY));
  add("obvious", "Obviously™", "Ovviamente™", obvious * 20, obvious);

  const stretch = Math.min(2, count(text, STRETCH));
  add("stretch", "Stretch Goal (Soooo)", "Vocali Elastiche (Nooo)", stretch * 20, stretch);

  const emoji = Math.min(4, count(text, EMOJI));
  add("emoji", "Emoji Escalation", "Escalation di Emoji", emoji * 30, emoji);

  const ellipsis = Math.min(2, count(text, ELLIPSIS));
  add("ellipsis", "Dramatic Pause...", "Pausa Drammatica...", ellipsis * 15, ellipsis);

  const qm = count(text, /\?/g);
  add("interrogation", "Interrogation Room", "Sala Interrogatori", qm >= 3 ? 30 : 0, qm >= 3 ? qm : 0);

  const bang = Math.min(2, count(text, INTERROBANG));
  add("interrobang", "Interrobang Enjoyer", "Fan dell'Interrobang", bang * 25, bang);

  add("thanks", "Thanks In Advance (Threat)", "Grazie in Anticipo (Minaccia)", 40, Math.min(1, count(text, THANKS)));
  add("signoff", "Sincerely Insincere", "Cordialmente Falso", 20, Math.min(1, count(text, SIGN_OFF)));

  // long rants pay: half a point per character past 200
  const novel = Math.max(0, chars - 200) * 0.5;
  if (novel > 0) add("novel", "Novelist", "Romanziere", novel);
  if (chars > 600) tags.push({ id: "war", label: { english: "War and Peace", italian: "Guerra e Pace" }, points: 0, count: 1 });

  const total = chars + tags.reduce((sum, t) => sum + t.points, 0);
  return { total, tags };
};

/** Tags earned from typing speed rather than from the words themselves. */
export const comboTags = (maxCombo: number): Tag[] => {
  const out: Tag[] = [];
  if (maxCombo >= 15)
    out.push({ id: "kw", label: { english: "Keyboard Warrior", italian: "Guerriero della Tastiera" }, points: 0, count: 1 });
  if (maxCombo >= 40)
    out.push({ id: "mk", label: { english: "Mechanical Keyboard Menace", italian: "Minaccia Meccanica" }, points: 0, count: 1 });
  return out;
};

export type Rank = {
  letter: string;
  label: Label;
  min: number;
  quotes: { english: string[]; italian: string[] };
};

export const ranks: Rank[] = [
  {
    letter: "–",
    min: 0,
    label: { english: "Mildly annoyed", italian: "Leggermente seccato" },
    quotes: {
      english: [
        "Calm. Suspiciously calm.",
        "Keep typing. We believe in you.",
        "Zero rage detected. Is this your first Monday?",
        "Your boss is safe. For now.",
      ],
      italian: [
        "Calmo. Sospettosamente calmo.",
        "Continua a scrivere. Crediamo in te.",
        "Zero rabbia rilevata. È il tuo primo lunedì?",
        "Il tuo capo è al sicuro. Per ora.",
      ],
    },
  },
  {
    letter: "D",
    min: 60,
    label: { english: "Irritated", italian: "Irritato" },
    quotes: {
      english: [
        "Noted. HR has not been informed.",
        "A polite email is still technically possible.",
        "Your left eye just twitched. We saw it.",
        "Breathe in. Now type with more feeling.",
      ],
      italian: [
        "Annotato. Le HR non sono state avvisate.",
        "Una mail educata è ancora tecnicamente possibile.",
        "Ti è appena scattato l'occhio sinistro. L'abbiamo visto.",
        "Inspira. Ora scrivi con più sentimento.",
      ],
    },
  },
  {
    letter: "C",
    min: 140,
    label: { english: "Fuming", italian: "Furente" },
    quotes: {
      english: [
        "Your keyboard is starting to sweat.",
        "“Per my last email” is practically writing itself.",
        "Somewhere, a coffee machine feels judged.",
        "That vein on your forehead has its own zip code.",
      ],
      italian: [
        "La tua tastiera inizia a sudare.",
        "“Come da mia ultima mail” si scrive da solo.",
        "Da qualche parte, una macchinetta del caffè si sente giudicata.",
        "Quella vena sulla fronte ha il suo CAP.",
      ],
    },
  },
  {
    letter: "B",
    min: 260,
    label: { english: "Brutal", italian: "Brutale" },
    quotes: {
      english: [
        "Somebody’s calendar invite just got declined.",
        "Even the printer is afraid of you.",
        "The Wi-Fi password just changed. Coincidence?",
        "Your desk plant has requested a transfer.",
      ],
      italian: [
        "Qualcuno ha appena rifiutato un invito in calendario.",
        "Perfino la stampante ha paura di te.",
        "La password del Wi-Fi è appena cambiata. Coincidenza?",
        "La pianta sulla tua scrivania ha chiesto il trasferimento.",
      ],
    },
  },
  {
    letter: "A",
    min: 420,
    label: { english: "Savage", italian: "Selvaggio" },
    quotes: {
      english: [
        "Your manager just felt a disturbance.",
        "Legendary. Please do not send this.",
        "Three colleagues just developed a sudden interest in their phones.",
        "This is not an email. This is a war crime with a subject line.",
      ],
      italian: [
        "Il tuo capo ha appena sentito un disturbo.",
        "Leggendario. Per favore, non inviarlo.",
        "Tre colleghi hanno scoperto un improvviso interesse per il telefono.",
        "Questa non è una mail. È un crimine di guerra con un oggetto.",
      ],
    },
  },
  {
    letter: "S",
    min: 650,
    label: { english: "Unemployable", italian: "Inassumibile" },
    quotes: {
      english: [
        "Congratulations. You are now a case study.",
        "LinkedIn is drafting your “open to work” post.",
        "Your reference letter just burst into flames.",
        "Legal would like a word. And a lawyer. And a bigger room.",
      ],
      italian: [
        "Complimenti. Sei diventato un caso di studio.",
        "LinkedIn sta scrivendo il tuo post “disponibile a nuove opportunità”.",
        "La tua lettera di referenze ha preso fuoco.",
        "L'ufficio legale vuole parlarti. E vuole un avvocato. E una stanza più grande.",
      ],
    },
  },
  {
    letter: "SS",
    min: 950,
    label: { english: "HR on speed dial", italian: "HR in chiamata rapida" },
    quotes: {
      english: [
        "HR has pre-filled the form for you.",
        "Security is checking the cameras.",
        "Your badge just stopped working. Spooky.",
        "Someone is already booking the “quick chat” room.",
      ],
      italian: [
        "Le HR hanno già compilato il modulo per te.",
        "La sicurezza sta guardando le telecamere.",
        "Il tuo badge ha smesso di funzionare. Inquietante.",
        "Qualcuno sta già prenotando la sala per la “breve chiacchierata”.",
      ],
    },
  },
  {
    letter: "SSS",
    min: 1400,
    label: { english: "Menace", italian: "Una minaccia" },
    quotes: {
      english: [
        "You are the reason this meeting could have been an email.",
        "Menace. Absolute menace.",
        "The office fridge has been evacuated.",
        "Please step away from the keyboard. Slowly. With your hands visible.",
      ],
      italian: [
        "Sei il motivo per cui questa riunione era una mail.",
        "Una minaccia. Una minaccia assoluta.",
        "Il frigo dell'ufficio è stato evacuato.",
        "Allontanati dalla tastiera. Lentamente. Con le mani in vista.",
      ],
    },
  },
];

export const rankIndex = (score: number) => {
  let idx = 0;
  ranks.forEach((r, i) => {
    if (score >= r.min) idx = i;
  });
  return idx;
};

export const randomQuote = (idx: number, language: Lang) => {
  const list = ranks[idx].quotes[language];
  return list[Math.floor(Math.random() * list.length)];
};

/** Funny placeholders for the empty textarea. */
export const placeholders: Record<Lang, string[]> = {
  english: [
    "Dear [recipient], if you weren't a complete idiot, you would find the answer to your question in the previous email.",
    "Hi Marco, circling back on the thing I have now sent you three times, in bold, with a screenshot…",
    "Team, I would like to politely remind you that the printer is not a personal project.",
    "Dear all, per my last email, which none of you read, the meeting has been moved to never.",
  ],
  italian: [
    "Caro [destinatario], se non fossi un idiota completo, troveresti la risposta alla tua domanda nell'email precedente.",
    "Ciao Marco, riprendo la cosa che ti ho già mandato tre volte, in grassetto, con screenshot…",
    "Team, vi ricordo gentilmente che la stampante non è un progetto personale.",
    "Gentili tutti, come da mia ultima mail che nessuno ha letto, la riunione è spostata a mai.",
  ],
};

/** Typing combo: keystrokes within this window keep the combo alive. */
export const COMBO_WINDOW_MS = 1500;
export const comboMultiplier = (combo: number) => 1 + Math.min(combo, 60) / 20; // 1x .. 4x
