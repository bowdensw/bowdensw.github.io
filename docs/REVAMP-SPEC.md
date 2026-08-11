# Portfolio Revamp — Spec

Status: decisions locked, ready for Design.
Owner: Spencer Bowden. Last updated: 2026-08-10.

This is the source of truth. `docs/DESIGN-BRIEF.md` is what gets handed to Claude Design;
`docs/TODO.md` is what gets handed to Claude Code. Both derive from this file.

---

## 1. Decisions locked

| Question | Decision |
|---|---|
| Nav model | One neutral bar on every page. Section color enters only through the active-link underline. |
| Skill tree | Keep the node graph. Restructure into vertical specialty lanes, scrolled horizontally. |
| v1 scope | Landing, Résumé, Contact, Musical. Technical ships with a restructured but static skill tree. Pixel animation and playable instruments are v2. |
| Two portfolios | Yes — Technical and Musical stay visually distinct, but the distinction lives in the page content, not the chrome. |

---

## 2. Information architecture

```
/                 Landing — hero, short bio, four entry points
/technical        About → Projects → Skills          (tabs, in that order)
/musical          About → Shows → Mainstage Files    (tabs, in that order)
/resume           Viewer + download
/contact          Info cards + form
```

Both section orders are reversed from today. Technical currently opens on the skill
tree; it should open on About and end on Skills, so the fun thing is a payoff rather
than a cold open. Musical currently has a dead `training` tab wired to a two-value
`useState` while rendering three buttons — that's a live bug, the About button does
nothing.

### Navigation

A single `<SiteNav>` component, sticky, ~56px, identical on every route.

- Background `--ink` (#242038) everywhere. Deliberately detached from the page
  background so it reads as a fixed layer.
- Wordmark left ("Spencer Bowden"), five links right: Home, Technical, Musical,
  Résumé, Contact. Same order everywhere.
- Active link: white text + 3px underline in that section's accent. That underline is
  the *only* place section color appears in the chrome.
- Takes one prop: `accent`. Nothing else varies.
- Mobile: wordmark + menu button, slide-down panel. No emoji — Tabler outline or a
  hand-made pixel glyph.

All five "← Back to Home" links are deleted; the wordmark replaces them.

Section tabs (About / Projects / Skills, etc.) sit *below* the bar and are styled per
section. Two tiers: global chrome on top, local navigation beneath.

---

## 3. Design tokens

Tailwind v4 has no `tailwind.config.ts`. Custom colors go in an `@theme` block in
`app/globals.css`. This is the whole palette — nothing outside it.

### Color

**shadcn/ui's `init` appended its own neutral `oklch()` palette to `globals.css`**
(`--primary`, `--accent`, `--border`, `--sidebar-*`, a `.dark` block, etc). That palette
is scaffolding, not design — never the source of a visible color. If a shadcn component
is used anywhere, override its default classes with the tokens below (a shadcn `Button`
gets `bg-tech`, not `bg-primary`). See the comment above the `@theme` block in
`globals.css` for the long version.

```css
@theme {
  /* Structure */
  --color-ink:          #242038;  /* primary text, nav background */
  --color-ink-soft:     #4A4260;  /* secondary text */
  --color-paper:        #CAC4CE;  /* landing / resume / contact background */
  --color-paper-warm:   #F4F1E8;  /* musical background */
  --color-surface:      #FFFFFF;  /* cards */

  /* Section accents — used for the nav underline and within each page */
  --color-tech:         #9067C6;
  --color-tech-soft:    #8D86C9;
  --color-music:        #87BFA5;
  --color-music-deep:   #3E7A62;  /* text-safe on light */
  --color-resume:       #FFD76A;
  --color-resume-deep:  #8A6A0B;  /* text-safe on light */
  --color-contact:      #B56C8C;
  --color-contact-deep: #9E5677;
}
```

Three cleanups baked into that list:

1. **The background was two colors.** Landing uses `#CAC4CE`, every other page uses
   `#CAC6CE`. One character apart, almost certainly a typo. Unified to `#CAC4CE`.
2. **Musical has two unrelated greens.** The landing button is mint `#87BFA5`, but the
   Musical page itself uses `#1b5e20` / `#4caf50` — those are stock Material greens and
   they clash with the rest of the palette. Musical is now derived from the mint.
3. **`-deep` variants exist for contrast.** `#FFD76A` and `#87BFA5` both fail WCAG AA as
   text on white. Use the base color for fills and borders, the `-deep` variant whenever
   the color carries text.

### Type

Two base families plus two section display faces. Never the same face for heading and
body on any given page.

```css
--font-sans:    Geist Sans        /* body, everywhere. Already installed. */
--font-display: Fraunces          /* landing, résumé, contact headings */
--font-mono:    Geist Mono        /* technical body + UI */
--font-pixel:   Silkscreen        /* technical H1 and skill-tree labels only */
--font-score:   Cormorant Garamond /* musical headings */
```

Large headings get `letter-spacing: -0.03em`. Body copy gets `line-height: 1.7`.
Georgia and `font-family: monospace` are currently hardcoded inline in five files —
all of it moves into tokens.

### Spacing and depth

Use a 4px-based scale and stick to it: `4 8 12 16 24 32 48 64 96`. Current code mixes
`p-6`, `mt-12`, `mb-16`, `gap-10` with no system.

Three surface levels: `paper` (page) → `surface` (card) → floating (modal, tooltip).
Shadows are color-tinted and low-opacity, never flat `shadow-md`.

---

## 4. Library decisions

| Need | Choice | Notes |
|---|---|---|
| Base components | **shadcn/ui** | Copy-paste, not a dependency. Works with Tailwind v4 + React 19. Used on landing, résumé, contact, musical. |
| Technical aesthetic | **PxlKit** (`@pxlkit/core` + `@pxlkit/ui-kit`) | v2.1.1, TypeScript, built for Tailwind v4, documents its Next.js setup. 111 components, 226 icons. Also publishes Claude Code skills at pxlkit.xyz/skills. |
| Icons | **Tabler outline** + PxlKit icons on Technical | No emoji anywhere. See §7. |
| Audio (v2) | **Tone.js + smplr** | *Not* react-orchestra — see below. |
| Contact form | **Web3Forms** | 250 submissions/month free. See §6. |
| Fonts | **next/font** (Google) | Already the pattern in `layout.tsx`. |

### react-orchestra is not viable

Your doc names it twice. It was last published around 2017, predates hooks, and will
not run on React 19. Use `tone` for the audio graph and `smplr` for sampled instruments
— `smplr` is the maintained successor to `soundfont-player`, ships a `SplendidGrandPiano`,
and streams samples from a CDN so no audio files live in the repo. Same end result:
click an instrument in the sidebar, hear a snippet.

### PxlKit licensing — CLEARED

Confirmed free to use. Source: https://github.com/joangeldelarosa/pxlkit — code packages
MIT, icon packs free with attribution. Add the attribution line to the site footer or
README when the packs go in.

### Two component libraries is fine

shadcn is copied source, not an npm dependency, so pairing it with PxlKit costs nothing
in bundle size and creates no version conflict. Keep the boundary clean: PxlKit only
inside `/technical`.

---

## 5. Bugs in the current build

Found by inspecting `out/`. These are real and shipping today.

### Every image 404s in production — RESOLVED 2026-08-10

`next.config.ts` set `basePath: "/spencerbowden.github.io"` in production. Next prefixes
its own JS and CSS but does **not** prefix raw `<img src="/...">`. The built
`out/index.html` contained:

```
href="/spencerbowden.github.io/_next/static/chunks/....css"   ← prefixed
src="/images/me.jpg"                                          ← not prefixed
src="/resume.pdf"                                             ← not prefixed
```

Broken in production: the portrait, all four hover icons, all 40+ skill-tree logos, the
sprite, the résumé iframe, and the résumé download button.

**Fixed.** The repo is now `bowdensw/bowdensw.github.io` — a GitHub *user* page served at
the domain root. `basePath` and `assetPrefix` have been deleted from `next.config.ts`.
Root-relative asset paths are now correct as written, and no `withBasePath()` helper is
needed. Do not reintroduce either setting.

Still to verify locally: `npm run build` clean, and GitHub Pages' source branch set
correctly for a user page (the `deploy` script pushes to `gh-pages` via the `gh-pages`
package — confirm Settings → Pages points at that branch, not `main`).

### Three images that never existed

`app/page.tsx` references `/icons/code.png`, `/icons/music.png`, `/icons/book.png`.
There is no `public/icons/` directory. Broken in dev too.

### The Musical About tab is dead

`app/musical/page.tsx` renders three buttons but types state as `"shows" | "training"`.
Clicking About sets an out-of-range value and renders nothing.

### The contact form does not send

`handleSubmit` calls `alert("Message sent! (Demo)")`. Because `output: "export"` is set,
there are no API routes and no server actions available — a form backend is mandatory,
not optional.

### Dead and empty files — RESOLVED 2026-08-10

Deleted:

- `app/technical/components/about.tsx` — 0 bytes
- `app/technical/components/AttributePanel.tsx` — 0 bytes
- `app/technical/components/attributes.tsx` — 292 lines, imported by nothing, emoji-laden

**Correction:** `techIcons.tsx` was listed here in error. It is imported by
`Projects.tsx` (`getTechIcon`) and is live code. Kept.

The About copy that should live in `about.tsx` is still inlined in `page.tsx` — move it
during Phase 6.

### Emoji in the codebase

The skill tree H1 is literally `SKILL TREE🛠️`, and `attributes.tsx` uses 🧩 ⚔️ 🧠 ⚙️ 🌐.
Violates the project's own hard rule.

---

## 6. Per-page requirements

### Landing

- shadcn portfolio-style layout. Hero, short bio, four entry points.
- Keep the hover-icon idea — it has personality and it's yours. Fix the assets, keep the
  float animation, add `prefers-reduced-motion` handling.
- New favicon: yellow backpack, replacing the penguin. **Decided** — Kanken silhouette,
  body in `#FFD76A`, straps and buckles in tan `#8C6E4F`. Reads as the Acorn colorway
  while keeping the résumé yellow dominant, and stays legible at 16px. Export 16 / 32 /
  180 / 512px plus `apple-touch-icon`. Build it as SVG first so it scales cleanly.
- Bio copy needs a rewrite (flagged in your doc, no replacement text supplied yet).

### Technical

Tab order: **About → Projects → Skills.**

Skill tree, restructured:

- Vertical lanes by specialty — Web, Systems / Game Design, ML / Academic, UI/UX,
  Foundations. Horizontal scroll or snap between lanes.
- Progress reads top-to-bottom *within* a lane. Foundations at the top, advanced work at
  the bottom. The current graph has everything cross-connected, which is why it reads as
  noise to anyone who hasn't played FFX.
- Kill the multi-radial-gradient backdrop. Flat dark surface, or a subtle pixel grid.
- **Tooltips carry how and why, not what.** "React" shouldn't say "a JavaScript library."
  It should say where you used it and what it let you build. This is the highest-value
  change on the page and it's a writing job, not a code job — budget real time for it.
  Every node needs 1–2 sentences from you.
- Node data moves from hardcoded `x`/`y` pixel coordinates to lane + tier indices, with
  layout computed. The current 459-line `skills.tsx` is unmaintainable as absolute
  positions.
- Pixel art: sprite of you at a computer, replacing the walking sprite. **v2** — multi-state
  animation (coding → debugging → writing → head-against-wall → going to play music).
  v1 ships one idle state.

### Musical

Tab order: **About → Shows → Mainstage Files.**

- About: the bio from your planning doc goes in verbatim, plus the "other notable gigs"
  line. Break into two or three paragraphs.
- Shows: compact rows, not the current two-column card grid. Optional row/grid toggle.
  Strip the padding down.
- Mainstage Files: new tab. Your sales copy goes in verbatim, base price $300/show,
  contact `spencerbowden337@gmail.com`. **You have no files yet** — this needs a real
  empty state that reads as "coming soon," not as a broken page.
- Instruments in the sidebar playing show snippets: **v2**, via Tone.js + smplr.
  Note you'll need rights-cleared audio — recordings of yourself, not cast albums.

### Résumé

- shadcn shell, keep the yellow.
- The `<iframe src="/resume.pdf">` is a poor mobile experience — iOS Safari often won't
  render it. Add a visible download fallback and consider a rendered HTML version as the
  primary view with the PDF as the download.

### Contact

- shadcn form. Wire to Web3Forms. Test end-to-end with a real send.
- Click-to-copy on every value — email, phone, GitHub, LinkedIn. Copy icon, "Copied"
  confirmation, `navigator.clipboard`.
- GitHub and LinkedIn also get direct-link buttons ("Open in GitHub").
- Honeypot field for spam. hCaptcha is available free if it becomes a problem.

---

## 7. Standing rules

- **Never any emoji.** Icons are Tabler outline, PxlKit pixel icons, or hand-made SVG.
- No default Tailwind palette colors. The `@theme` block above is the whole palette.
- Never `transition-all`. Animate `transform` and `opacity` only.
- Every interactive element needs hover, `focus-visible`, and active states.
- Respect `prefers-reduced-motion` — the site leans on float and pulse animations.
- Mobile-first. The skill tree in particular has no mobile story today.
- Keep `output: "export"` compatible. No server actions, no API routes, no dynamic
  rendering.

---

## 8. Open questions — all resolved 2026-08-10

| # | Question | Resolution |
|---|---|---|
| 1 | Favicon colorway | Hybrid approved — `#FFD76A` body, `#8C6E4F` straps. |
| 2 | Repo rename | Done. `bowdensw/bowdensw.github.io`, basePath removed. |
| 3 | Landing bio | Spencer will rewrite later. Current copy stands for now. |
| 4 | Skill tree copy | Claude drafts from résumé and projects; Spencer edits. |
| 5 | PxlKit licensing | Cleared — free to use, attribution required. |
| 6 | Show audio rights | Deferred to v2. |

Remaining local task for Spencer: rename the working directory to match the repo.

```bash
mv ~/Documents/spencerbowden.github.io ~/Documents/bowdensw.github.io
```

Then reconnect the folder in Cowork. The git remote already points at the new repo, so
nothing else changes.
