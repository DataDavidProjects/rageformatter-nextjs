# RageFormatter — design plan (v1, pre-build)

## Brief, as understood
- **Subject:** a web tool that turns an angry office message into one you can actually send. IT/EN. Free, ad- and donation-supported.
- **Audience:** someone mid-frustration at their desk, often on a phone, who wants a result in ~10 seconds.
- **Primary job:** paste rage → get a polite version → copy. Everything else is secondary.
- **What exists today:** red gradient header/footer, emoji as chrome, white card on slate-100, Inter, 3 text sizes, one spinner. It works, but it looks like a default template and says nothing about the product's idea.

## The idea
The product *is* a before/after. So the design should make the transformation visible, not just do it.
Two voices, two surfaces:
- **Rage** = typed fast, raw, monospace, on cheap grey fax-style paper.
- **Polite** = set in a book serif, on crisp letterhead white.

The one memorable moment: **while the AI works, the angry text gets redacted** — black bars sweep over each line, then dissolve into the polite letter. That *is* the loading state (a skeleton shaped like the real content), and it is the joke of the product in one gesture. Everything else stays quiet.

## Mood
Deadpan, bureaucratic, dry Italian-office humour. Calm competence around an angry core. Never shouty, never "AI-sparkly".

## Tokens

### Color (one accent)
| Name | Hex | Role |
|---|---|---|
| Toner | `#1C1F26` | text, redaction bars |
| Fax grey | `#E6E8EC` | page background (cool) |
| Letterhead | `#FBFBFA` | polite-output sheet |
| Carbon | `#4A5160` | secondary text, borders |
| Ballpoint red | `#A4262C` | the only accent: primary button, "Rage" strike, errors |
| Redline | `#D9DCE2` | hairlines, input sheet |

Rules: grays all cool-tinted; shadows tinted with Toner at low alpha; no gradients; subtle paper grain on the page background only.

### Type
- **Display / wordmark / headings:** Bricolage Grotesque, 600–700, tight tracking. Wordmark: "~~Rage~~Formatter" with a thin strike through "Rage".
- **Rage input:** IBM Plex Mono 400 — the "typed in a hurry" voice.
- **Polite output + long-form pages:** Source Serif 4, ~17px, line-height 1.6 — the "letter" voice.
- **UI labels / buttons:** Bricolage Grotesque 500, sentence case.
- Scale: 13 / 15 / 17 / 22 / 34 / 56. Body measure ≤ 65ch.

### Layout
Left-aligned throughout (the centered-everything look goes). Max width 1120px. Tool is the hero; no marketing hero above it.

Desktop — two sheets side by side, the output sheet slightly overlapping/rotated 0.4° like a letter laid on the desk:
```
┌──────────────────────────────────────────────────────────┐
│ ~~Rage~~Formatter            How it works     [IT | EN]  │
├──────────────────────────────────────────────────────────┤
│ Write what you think.                                    │
│ Send what you should.                                    │
│                                                          │
│ ┌─────────────────────┐   ┌─────────────────────────┐    │
│ │ (mono, fax grey)    │   │ (serif, letterhead)     │    │
│ │ Dear [recipient],   │   │                         │    │
│ │ if you weren't...   │ ► │  empty: faint example   │    │
│ │                     │   │  loading: redaction bars│    │
│ │                     │   │  done: letter + [Copy]  │    │
│ └─────────────────────┘   └─────────────────────────┘    │
│ [ Format message ]                    0 / 1000           │
├──────────────────────────────────────────────────────────┤
│ donation · ad slot (clearly separated)                   │
│ privacy · built by Davide Lupis · socials (small)        │
└──────────────────────────────────────────────────────────┘
```
Mobile — sheets stack; output sheet slides under the input after submit; button sticky at bottom.

## States
- **Empty:** output sheet shows a ghosted example pair so people see what they'll get.
- **Loading:** redaction skeleton (bars matched to the input's line count), `aria-busy`, button disabled and relabelled "Formatting…".
- **Success:** polite text fades in line by line; "Copy" button confirms with "Copied" and keeps the same label vocabulary.
- **Error:** inline under the button in ballpoint red: "Couldn't format your message. Try again in a moment." No emoji, no "Oops".
- **Focus / hover / press:** visible 2px focus ring, 150–200ms transitions, `scale(.98)` on press, `prefers-reduced-motion` turns the redaction into a simple fade.

## Principles
1. The transformation is the design: two voices, two surfaces, one redaction moment.
2. Spend boldness in one place (the redaction loader); everything else disciplined.
3. Emoji and gradients leave the chrome; personality comes from type and copy.
4. Copy is deadpan and specific, sentence case, no exclamation marks.
5. Mobile first: the 10-second job must work one-handed.

## Review of this plan against the brief (what I changed after first draft)
- First draft used warm cream paper + serif + terracotta stamp. That is the generic "AI editorial" palette and says nothing about an angry office. Changed to **cool fax grey + letterhead white + a deeper ballpoint red** drawn from real office stationery.
- First draft had a numbered "1 / 2 / 3 how it works" strip. The content isn't really a sequence beyond "paste → format → copy" and the tool already shows that, so it was **cut**; the tutorial page keeps its own content.
- First draft used a mono face for all small labels (a common tell). Mono is now **reserved for the rage input only**, where it carries meaning.
- Kept the red brand colour, because it is the existing identity, but demoted it from full-bleed gradient bands to a single accent.

## Open decisions for you
1. Keep the 🤬 brand emoji anywhere (favicon/OG image), or go fully typographic?
2. Add a character counter / length cap on input (also limits OpenAI cost)?
3. How loud should the ad slot and donation block be? (They affect the layout hierarchy.)

## Suggested build order
1. Fonts + tokens (Tailwind theme, `globals.css`, paper grain)
2. Header/footer restyle + language toggle moved into the header
3. Two-sheet tool layout + states (empty / redaction loading / success / error)
4. Tutorial, info and privacy pages inherit the type scale
5. Pass for focus, reduced motion, mobile, and contrast
