# Build to-do

Ordered. Each phase is a self-contained pass for Claude Code — finish and verify one
before starting the next. Read `docs/REVAMP-SPEC.md` first.

Phases 0–2 don't need mockups and can start immediately. Phases 3–6 wait on Design.

---

## Phase 0 — Stop the bleeding

Independent of the redesign. These are live bugs.

- [x] **Fix the basePath asset bug.** Repo renamed to `bowdensw/bowdensw.github.io` (a
      user page, served at root); `basePath` and `assetPrefix` deleted from
      `next.config.ts`. Root-relative asset paths are now correct. Spec §5.
- [ ] Rename the local working directory to match:
      `mv ~/Documents/spencerbowden.github.io ~/Documents/bowdensw.github.io`
- [ ] Verify locally: `npm run build` clean, no asset 404s when serving `out/`.
- [ ] Confirm GitHub Settings → Pages points at the `gh-pages` branch (the `deploy`
      script pushes there, not to `main`).
- [x] Removed the three dead `<img>` tags in `app/page.tsx` (`/icons/*.png` never existed).
- [x] Fixed the Musical About tab — state widened to `"about" | "shows" | "training"`, and
      the About panel now renders the bio copy from the planning doc.
- [x] Deleted dead files: `attributes.tsx`, `about.tsx`, `AttributePanel.tsx`.
      **`techIcons.tsx` was kept** — it is imported by `Projects.tsx`, the spec was wrong.
- [x] Removed all emoji (`SKILL TREE🛠️`, and the `♪` glyph on Musical replaced with an
      inline SVG).
- [ ] Verify with a production build (`npm run build`) that no asset 404s remain.

## Phase 1 — Foundation

- [x] Wrote the `@theme` block in `app/globals.css` with the full token set from spec §3,
      plus spacing steps and two layered shadow tokens. No `tailwind.config.ts`.
- [x] Unified the background on `#CAC4CE` (`#CAC6CE` eliminated).
- [x] Replaced the Musical Material greens with the mint family (`#3E7A62`, `#87BFA5`).
- [x] Fonts wired. Geist Sans, Geist Mono, and Fraunces load in the root layout;
      **Silkscreen and Cormorant Garamond are scoped** to `app/technical/layout.tsx` and
      `app/musical/layout.tsx` so they only download on those routes.
- [x] Added `metadataBase`, a title template, and Open Graph tags to the root layout.
- [x] Created `components/` and `lib/`, with `lib/cn.ts` and `lib/routes.ts`.
- [x] Added a `prefers-reduced-motion` block that disables float, pulse, and orbit.
- [x] Stripped the inline `font-family: Georgia` / `monospace`. Those components were
      rebuilt in Phases 3–6.
- [x] shadcn/ui init'd against Tailwind v4.
- [x] `lib/cn.ts` deleted; `lib/utils.ts` is the single `twMerge(clsx(...))` `cn`, which
      is also where `components.json` points its `utils` alias.
- [x] **Fixed a silent site-wide font failure.** shadcn's scaffold left
      `--font-sans: var(--font-sans)` in the `@theme inline` block — a circular reference
      that made the variable invalid and dropped every page to a Times fallback. Removed.
- [x] **Font variables moved from `<body>` to `<html>`.** The `@theme` tokens that consume
      them are computed at `:root`; a `var()` that resolves to nothing there invalidates
      the whole declaration. Silkscreen and Cormorant moved into the root layout with
      `preload: false`, so they still only download on the routes that render them, and
      the section layouts no longer carry font wiring.
- [x] Added `--color-ink-deep`, `--color-on-dark`, `--color-on-dark-soft`, a fluid
      `--text-display`, and a `pixel-grid` utility.
- [ ] PxlKit (`@pxlkit/core` + `@pxlkit/ui-kit`) not installed. The mockups only borrowed
      its pixel *data*, not its components, so nothing depends on it. The two header
      sprites are PxlKit-derived and carry the required attribution in the skill-tree
      credit line; the lane glyphs are hand-made.

## Phase 2 — Navigation

- [x] Built `components/SiteNav.tsx`. Dark `#242038` bar, sticky, `h-14`, identical on
      every route. Accent comes from `lib/routes.ts` rather than a prop — the active
      route is derived from `usePathname()`, so nothing has to be passed per page.
- [x] Active underline animates via `scale-x` (transform only, no `transition-all`).
- [x] Mobile menu — wordmark plus hand-drawn SVG menu icon, slide-down panel.
- [x] Mounted in `app/layout.tsx`, above `{children}`.
- [x] Deleted all five "← Back to Home" links and the now-unused `Link` imports.
- [x] Keyboard nav: `focus-visible` rings on every link, Escape closes the mobile panel
      and returns focus to the toggle, outside-click closes, route change closes.
      `aria-current="page"`, `aria-expanded`, `aria-controls` all set.
- [ ] Visual check at 375px — not yet verified in a browser.

## Handoff — commands Spencer needs to run

These need npm registry access, which the Cowork sandbox doesn't have.

```bash
# 1. Confirm Phases 0-2 build and look right
npm run dev            # check the nav on every route, then at 375px
npm run build          # must exit clean
npm run lint

# 2. shadcn/ui (also installs clsx + tailwind-merge)
npx shadcn@latest init

# 3. PxlKit — licensing cleared, attribution required
npm install @pxlkit/core @pxlkit/ui-kit
```

After PxlKit installs, add to `app/globals.css`:

```css
@import "@pxlkit/ui-kit/styles.css";
@source "../node_modules/@pxlkit/ui-kit";
```

and wrap `/technical` in `<PxlKitSurfaceProvider surface="pixel">` inside
`app/technical/layout.tsx`.

**Note:** `npm run build` currently downloads a platform-specific SWC binary on first
run. That's expected.

---

## Shared work (built from the mockups)

- [x] `components/PageShell.tsx` — the one place page width, gutters, and vertical
      rhythm are defined. Four named widths.
- [x] `components/Tabs.tsx` — one accessible tab set (roving focus, arrow/Home/End keys,
      full ARIA wiring) with two skins: `pixel` for Technical, `underline` for Musical.
- [x] `components/PixelSprite.tsx` — canvas renderer for all layered pixel art. The
      mockup used one `<div>` per cell, so five 16×16 layers meant 1,280 nodes
      re-rendering ten times a second; this draws the same thing in fillRects and never
      touches the DOM. Honors `prefers-reduced-motion` by holding frame 0.
- [x] `components/ui/button.tsx` — shadcn's Button rebuilt on the real tokens. Its
      scaffold shipped `bg-primary` and a `transition-all`, both project hard rules.
      Section colour arrives via `tone`; ink-on-accent everywhere, which clears AA on all
      four accents where white does not.
- [x] **All the mockups' `window.innerWidth` breakpoint state replaced with CSS media
      queries.** On a static export, JS-measured layout means a first paint at the wrong
      breakpoint. Nothing renders differently between server and client now.
- [x] Section backgrounds live in each section's `layout.tsx`, next to the section
      metadata, rather than being repeated per page.

## Phase 3 — Landing

- [x] Rebuilt. Hero, bio, four entry points.
- [x] Hover-icon interaction fixed and now pure CSS — `group-hover` / `group-focus-within`
      with the float on an inner element so the reveal transition and the animation don't
      fight. No JS, keyboard-reachable.
- [x] Fluid sizing: `--text-display` clamps 34→52px, the portrait clamps 180→260px.
- [x] Entry points are a 2×2 grid below `sm` and a row above it. The mockup's
      no-wrap row exists to stage the hover icons, which no touch device sees; four
      buttons crammed into 343px was worse than four tappable ones.
- [ ] Bio copy — existing paragraph stands; Spencer rewrites later.
- [ ] Backpack favicon replacing the penguin. Kanken silhouette, `#FFD76A` body,
      `#8C6E4F` straps. Author as SVG, export 16/32/180/512px plus `apple-touch-icon`.
- [ ] OG image (Open Graph tags themselves are already in the root layout).

## Phase 4 — Résumé and Contact

**Résumé**

- [x] Rendered HTML résumé is now the page; the PDF is the download. The `<iframe>` that
      iOS Safari refuses to render is gone.
- [x] Content extracted to `app/resume/data/resume.ts`.

**Contact**

- [x] Form built, wired to Web3Forms, with a honeypot field.
- [x] Click-to-copy on all four values, with a `document.execCommand` fallback in
      `lib/useCopy.ts` for non-secure contexts where `navigator.clipboard` is undefined.
- [x] Direct-open links for GitHub and LinkedIn, with an external-link affordance.
- [x] Loading, success, failure, and validation states.
- [ ] **Add `NEXT_PUBLIC_WEB3FORMS_KEY`.** Until it is set the form explains it isn't
      connected yet and points at the email address instead of silently dropping
      messages. No code change needed once the key exists.
- [ ] **Send a real test message and confirm it arrives.** Blocked on the key above.

## Phase 5 — Musical

- [x] Tabs reordered: About → Shows → Mainstage Files.
- [x] About: bio verbatim, plus the notable-engagements list.
- [x] Shows: compact rows replacing the card grid, with a role glyph per row and
      screen-reader labels for the columns that are hidden on mobile.
- [x] `shows` moved to `app/musical/data/shows.ts`; Mainstage copy to `data/mainstage.ts`.
- [x] Mainstage Files tab — sales copy verbatim, $300/show, prefilled mailto per session.
- [ ] Row/grid toggle — deferred to v2, as specced.

## Phase 6 — Technical

- [x] Tabs reordered: About → Projects → Skills.
- [x] About copy moved into `technical/components/About.tsx`.
- [x] Header sprites (RetroTV, MagicOrb) with pointer parallax, on canvas.
- [ ] Idle sprite of Spencer at a computer — still the v1 gap; the walking sprite was
      deleted rather than kept.

**Skill tree**

- [x] Data model restructured: the 459-line `skills.tsx` of hardcoded `x`/`y` pixels is
      replaced by `{ lane, tier }` in `app/technical/data/skills.ts`, layout computed.
- [x] Rebuilt as five vertical specialty lanes with horizontal scroll-snap.
- [x] Eight-radial-gradient backdrop replaced with a flat surface and a `pixel-grid`
      graticule.
- [x] Cross-lane connections dropped entirely — progress now reads top-to-bottom *within*
      a lane, which was the point.
- [x] Legend is in normal flow, no longer `position: fixed`.
- [x] Mobile: one lane at a time via snap, with a bottom sheet for detail since there is
      no room for the rail and no hover on touch.
- [x] **"unlocked" resolved.** It is replaced by a three-step `tier` — Learning (dashed),
      Working (tinted), Fluent (filled) — applied consistently in the markers, the
      legend, and the detail pips.
- [x] Node copy drafted for all 40 nodes: how and why, never what, each stamped with the
      course or project that earned it. **Spencer to edit** — these are drafts from the
      résumé and project list, not his words.

## Phase 7 — Verification

- [x] `npm run build` clean, `npm run lint` clean.
- [x] Every image and the PDF resolve in the production build — verified against `out/`.
- [x] Mobile pass at 375px on all five routes. Found and fixed a horizontal overflow on
      Contact: the channel list is a grid item, and grid items size to their content
      unless told otherwise, so the long LinkedIn URL widened the whole page. All five
      routes now have `scrollWidth === 375`.
- [x] `prefers-reduced-motion` verified — the sprite paints one frame and never starts
      its rAF loop.
- [x] Emoji grep across `app/`, `components/`, `lib/` — zero hits.
- [x] Fixed a `PixelSprite` crash: the first rAF timestamp can predate the
      `performance.now()` that scheduled it, so `elapsed` went negative and
      `Math.floor(-3/500) % 2` produced `frames[-1]`. Anchored to the first frame instead.
- [ ] Lighthouse on all five routes.
- [ ] Full keyboard-only pass. Focus states and tab semantics are built throughout, but
      not yet walked end-to-end by hand.
- [ ] Contrast audit — `#FFD76A` and `#87BFA5` only ever carry ink or their `-deep`
      variants by construction, but this hasn't been measured.
- [ ] Contact form round-trip (blocked on the access key).

---

## v2 — after v1 ships

- [ ] Multi-state pixel animation: coding → debugging → writing → head against wall →
      leaving to play music → returning.
- [ ] Musical instrument sidebar via Tone.js + smplr. **Not react-orchestra** — it's been
      unmaintained since ~2017 and won't run on React 19. Needs rights-cleared audio;
      Spencer's own recordings, not cast albums.
- [ ] Populate Mainstage Files once files exist.
- [ ] Row/grid toggle for Shows if it proves worth it.

---

## Content status

1. Skill tree node copy — ~40 entries, how and why. **Claude drafts from résumé and
   projects; Spencer edits.** Still gates Phase 6, but no longer blocked on a blank page.
2. Landing bio rewrite — Spencer, later. Not blocking.
3. Favicon colorway — decided.
4. Repo rename — done.
5. PxlKit license — cleared.
6. Project descriptions — refresh alongside Phase 6 if needed.
