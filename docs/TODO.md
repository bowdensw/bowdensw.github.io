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
      Press Start 2P and Cormorant Garamond load there too but with `preload: false`,
      so their files are only fetched on the routes that render them.
- [x] Added `metadataBase`, a title template, and Open Graph tags to the root layout.
- [x] Created `components/` and `lib/`, with `lib/utils.ts` and `lib/routes.ts`.
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
      the whole declaration. The scoped faces moved into the root layout with
      `preload: false`, so they still only download on the routes that render them, and
      the section layouts no longer carry font wiring.
- [x] Added `--color-ink-deep`, `--color-on-dark`, `--color-on-dark-soft`, a fluid
      `--text-display`, and a `pixel-grid` utility.
- [x] **PxlKit installed** — `@pxlkit/core`, `@pxlkit/ui-kit`, `@pxlkit/parallax`.
      The header sprites (RetroTV, MagicOrb) and all six lane icons now come from
      `@pxlkit/parallax` rather than being transcribed by hand, so the art tracks the
      package and there is no second copy to drift. Attribution is in the skill-tree
      credit line.
- [x] `--font-pixel` switched from Silkscreen to **Press Start 2P**, PxlKit's own pixel
      face (`PXLKIT_FONTS`). Note PxlKit ships *no font files* — it only reads the
      token — so this is a `next/font` load like the others. Its advance width is about
      twice Silkscreen's, so every pixel-type size on Technical was retuned downward.
- [x] `docs/mockups/**` added to the ESLint ignore list; `support.js` is generated
      vendor code and was failing the build's lint step.
- [x] **Geist replaced with Atkinson Hyperlegible** (Next for body, Mono for the
      technical UI). Geist arrived with `create-next-app` and was the one face in the
      type system nobody picked — Fraunces, Cormorant, and Press Start 2P all have a
      reason written down and it did not. Surfaced by the `unslop-ui` scanner as the only
      legitimate "no decision made here" finding. The tokens are now `--font-body` and
      `--font-body-mono`, so nothing in the CSS names a vendor again.

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
- [x] Visual check at 375px — verified; all five routes have `scrollWidth === 375`.

## Handoff — done

shadcn/ui, PxlKit (`core` + `ui-kit` + `parallax`), `clsx`, and `tailwind-merge` are all
installed and wired. Nothing here is blocked on the registry any more.

`PxlKitSurfaceProvider` and `@import "@pxlkit/ui-kit/styles.css"` were **not** added: the
site uses PxlKit's icon *data* and its pixel font, not its component surface, so pulling
in its stylesheet would only add a second design system to fight with the tokens.

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
- [x] Hover icons now radiate in their button's accent, via a `--glow` custom property
      set from the entry's tone so one class covers all four.
- [x] Heading sits on one line at full size. It was wrapping because the text column
      sized to 58% instead of taking the row's free space; `flex-1` fixed it, no font
      shrink needed.
- [x] Bio copy supplied and in place verbatim.
- [x] Portrait replaced. The supplied `me.png` was 1366×2048 and 3.3 MB, and
      `images.unoptimized` is on for the static export, so the browser would have
      downloaded all of it for a 260px circle. Cropped to the top square (which centres
      the face; a centre crop cut the head off) and shipped as a 640×640 JPEG at 137 KB —
      `public/images/me.jpg`, the path the spec already documented.
- [x] **Backpack favicon shipped**, replacing the `create-next-app` penguin. Spencer
      supplied `.ico`, `.svg`, and a 180px apple-touch icon. Wired through Next's
      metadata file convention — `app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png`
      — rather than `public/` plus hand-written `<link>` tags, so Next emits the tags
      with content hashes and there is no second path to keep in sync. Verified: all
      three tags render on all five routes with correct `sizes` and `type`.
- [ ] OG image (Open Graph tags themselves are already in the root layout).

## Phase 4 — Résumé and Contact

**Résumé**

- [x] PDF replaced with `public/SWB_RESUME_Tech.pdf`; the download button points at it
      and the old `resume.pdf` is gone. The HTML résumé already matches it apart from two
      things the PDF omits — see the open item below.
- [x] Rendered HTML résumé is now the page; the PDF is the download. The `<iframe>` that
      iOS Safari refuses to render is gone.
- [ ] **Decide two deltas between the HTML résumé and the new PDF.** The page carries the
      2.5D RPG Game Engine project and a third Triton bullet ("All features are live in
      production…"); the PDF has neither. Also `Languages` reads "JavaScript/TypeScript"
      on the page and "JavaScript" in the PDF. Left as-is pending a call.
- [x] Content extracted to `app/resume/data/resume.ts`.

**Contact**

- [x] Form built, wired to Web3Forms, with a honeypot field.
- [x] Click-to-copy on all four values, with a `document.execCommand` fallback in
      `lib/useCopy.ts` for non-secure contexts where `navigator.clipboard` is undefined.
- [x] Direct-open links for GitHub and LinkedIn, with an external-link affordance.
- [x] Loading, success, failure, and validation states.
- [x] **Web3Forms key wired.** Spencer pasted it straight into the fetch body, which
      left `ACCESS_KEY` undefined — so the form still rendered "not connected yet" and
      the submit button stayed disabled, and the hardcoded key could never be reached.
      The key is now the constant's default (the env var still overrides), so there is
      one source of truth. Committing it is deliberate: a Web3Forms access key is public
      by design — it ships in the client bundle either way and can only deliver a message
      to Spencer's inbox — and a gitignored `.env.local` would mean a deploy from a fresh
      clone silently ships a dead form.
- [ ] **Send a real test message and confirm it arrives.** Blocked on the key above.

## Phase 5 — Musical

- [x] Tabs reordered: About → Credits → Mainstage Files.
- [x] About: bio verbatim, plus the notable-engagements list.
- [x] Credits: compact rows replacing the card grid, with a role glyph per row and
      screen-reader labels for the columns that are hidden on mobile.
- [x] Credits gained a **Year** column (between Production and Role) and switched from
      baseline to top alignment, so a two-line title still lines up with its role,
      company, and credit.
- [x] "Shows" renamed to **Credits** throughout — tab, component, and data file. The
      list holds an intensive and a summer camp as well as productions, so "shows" was
      never quite right.
- [x] All years are now single (the latest), supplied by Spencer. Five new credits added:
      Merrily We Roll Along, Come From Away, Mean Girls Jr. Camp, and CCM Musical Theatre
      Intensive twice (2023 and 2024). Ordered newest first, hand-ordered within a year.
- [x] Falsettos gained **Producer**, and role glyphs became additive — a credit that is
      both music direction and production shows piano *and* clipboard.
- [x] Musical shell widened `medium` → `wide`: five columns of dense credit text did not
      fit 900px. Mainstage caps itself at 820px so a three-column price list is not
      mostly gap.
- [x] Mainstage rebuilt as aligned rows matching Credits, replacing the mockup's 2-up
      card grid — both tabs list the same kind of thing and should scan the same way.
- [x] Mainstage "Includes" column removed and the catalog alphabetised. The sort lives in
      the data so it stays alphabetical as sessions are added; the `tags` field is gone.
- [x] Musical H1 underlined.
- [x] `credits` in `app/musical/data/credits.ts`; Mainstage copy in `data/mainstage.ts`.
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
- [x] Rebuilt as **six** vertical specialty lanes — Foundations, Front End, Back End,
      Systems / Game Design, Academic / Research, UI / UX — matching the mockup, which
      splits the old single "Web" lane in two.
- [x] Lanes now **wrap 3-up** instead of scroll-snapping horizontally. With six lanes the
      scroller cut the fourth column off mid-node, which read as broken rather than as
      "there is more"; the fade overlay and snap styling are gone with it.
- [x] Every lane heading is an animated PxlKit parallax icon: crown, rocket, ghost,
      joystick, cyber-eye, heart.
- [x] Eight-radial-gradient backdrop replaced with a flat surface and a `pixel-grid`
      graticule.
- [x] Cross-lane connections dropped entirely — progress now reads top-to-bottom *within*
      a lane, which was the point.
- [x] Legend is in normal flow, no longer `position: fixed`.
- [x] Mobile: lanes stack one per row, with a bottom sheet for detail since there is no
      room for the rail and no hover on touch.
- [x] **"unlocked" resolved.** It is replaced by a three-step `tier` — Learning (dashed),
      Working (tinted), Fluent (filled) — applied consistently in the markers, the
      legend, and the detail pips.
- [x] Node copy drafted for all 48 nodes: how and why, never what, each stamped with the
      course or project that earned it. **Spencer to edit** — these are drafts from the
      résumé and project list, not his words.
- [ ] **Confirm Python's tier.** The mockup draws it as Working, so that is what shipped,
      but it is the language his research lives in and the résumé lists it under
      Languages. One-line change in `app/technical/data/skills.ts` if it should be Fluent.

## Phase 8 — unslop-ui audit

`unslop-ui` shipped as a zipped `.skill` bundle in `.claude/skills/`, so it never
registered as an invocable skill; the scanner was run manually from an extraction.
`unslop-ai`, `unslop-code`, and `unslop-text` are not on this machine.

- [x] Scanner run. 38 findings, 32 of them keyword matches on the strings "Fraunces"
      and "Cormorant" — it cannot see that Technical is dark purple pixel art, and its
      own rule is that a deliberate choice is not a tell.
- [x] **Geist replaced** — the one genuine finding. See Phase 1.
- [ ] Declined for now: the neon glow on the active pixel tab
      (`components/Tabs.tsx:18`, `shadow-[0_0_12px] shadow-tech/40`) and the
      `hover:scale-110 active:scale-95` on the contact channel icons
      (`app/contact/components/ChannelList.tsx:78`). Both are real tells by the
      catalog; both were kept on purpose.
- [ ] Declined for now: `unslop-ignore` comments on the cream / Fraunces / Cormorant /
      green choices. Without them every future scan reports 32 false positives, which is
      how a scanner stops being read.

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
- [ ] Row/grid toggle for Credits if it proves worth it.

---

## Content status

1. Skill tree node copy — 48 entries, how and why. **Claude drafts from résumé and
   projects; Spencer edits.** Still gates Phase 6, but no longer blocked on a blank page.
2. Landing bio — supplied and in place.
3. Favicon — decided, authored, and shipped.
4. Repo rename — done.
5. PxlKit license — cleared.
6. Project descriptions — refresh alongside Phase 6 if needed.
