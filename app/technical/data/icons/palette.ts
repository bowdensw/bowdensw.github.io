/**
 * The shading ramp both hand-authored parallax icons draw from.
 *
 * PxlKit's own art ships in its retro palette (the RetroTV is grey with a green
 * CRT), which is why it never quite belonged on this page. These two are drawn
 * against the Technical tokens instead, so the header sprites and the skill tree
 * below them are the same family of colour.
 *
 * The ramp has two arms off a shared base. The warm arm walks `--color-tech`
 * toward `--color-ink` for form shadow; the cool arm hue-shifts
 * `--color-tech-soft` into indigo and blue, and carries the rim light, the
 * screen, and anything meant to read as emitting rather than reflecting. Light
 * falls from the top left in both icons, so H/C sit on top and left edges and
 * M/I/J/N on bottom and right.
 *
 * Only W, P, S, K, D and L are tokens; the rest are interpolations between them,
 * committed as literals because the icon format takes hex and a CSS variable
 * cannot reach in here. Keep the six token values in step with the `@theme`
 * block in app/globals.css by hand.
 */
export const TECH_PALETTE = {
  /** --color-on-dark. Specular: the brightest pixel on either icon. */
  W: "#edebf3",
  /** `tech` lifted 45% toward white. Lit faces. */
  H: "#baa2da",
  /** --color-tech. The base every other purple is measured from. */
  P: "#9067c6",
  /** --color-tech-soft. Periwinkle midtone, one step cool of the base. */
  S: "#8d86c9",
  /** `tech` 30% toward `ink`. First shadow. */
  M: "#70529b",
  /** `tech` 52% toward `ink`. Deep shadow, still purple. */
  I: "#58427c",
  /** `tech-soft` hue-shifted to blue. Rim light, screens, a lit button. */
  B: "#6578e7",
  /** `B` lifted 40% toward white. Cool highlight and the cold edge of a glow. */
  C: "#9ba6ec",
  /** `B` 34% toward `ink`. Indigo: shadow on a surface catching cool light. */
  J: "#4f5aac",
  /** `B` 66% toward `ink-deep`. The core shadow where both arms meet. */
  N: "#34386e",
  /** --color-ink-deep. Outlines and the screen bezel. */
  K: "#1a1730",
  /** --color-paper. The one neutral: cabling and hardware trim. */
  L: "#cac4ce",
  /** `B` rotated to cyan. React's orbit and its electron: 9.7:1 on the ground. */
  T: "#3dd2f1",
  /** `T` 45% toward `ink-deep`. The cooled tail the electron leaves behind. */
  V: "#2d7e9a",
} as const;

/**
 * The four section accents, straight from `@theme`, plus a shade each.
 *
 * Used by one icon: the Foundations puzzle. Four pieces in the four colours the
 * rest of the site navigates by is the whole point of that lane — the parts fit
 * together — so it borrows the site palette rather than the ramp above. Every
 * one of them clears 4:1 against `--color-ink-deep`, gold by a mile at 12.6:1.
 *
 * Shades are each accent 38% toward `--color-ink`, which is enough to read as a
 * lit edge at 6×6 without turning the piece muddy.
 */
export const SECTION_PALETTE = {
  /** --color-music, and its shade. */
  G: "#87bfa5",
  g: "#61837c",
  /** --color-contact. */
  R: "#b56c8c",
  r: "#7e4f6c",
  /** --color-tech. Same hex as `P` above; named apart so the puzzle reads. */
  U: "#9067c6",
  u: "#674c90",
  /** --color-resume. */
  Y: "#ffd76a",
  y: "#ac9157",
} as const;
