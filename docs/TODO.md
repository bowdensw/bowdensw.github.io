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
- [ ] Create the missing `public/icons/` assets, or remove the three dead `<img>` tags in
      `app/page.tsx` (`/icons/code.png`, `/icons/music.png`, `/icons/book.png`).
- [ ] Fix the Musical About tab — state is typed `"shows" | "training"` but three buttons
      render. Clicking About does nothing.
- [ ] Delete dead files: `technical/components/attributes.tsx`, `techIcons.tsx`, and the
      two 0-byte files `about.tsx` and `AttributePanel.tsx`.
- [ ] Remove every emoji from the codebase. Starts with `SKILL TREE🛠️`.
- [ ] Verify with a production build (`npm run build`) that no asset 404s remain.

## Phase 1 — Foundation

- [ ] Write the `@theme` block in `app/globals.css` with the full token set from spec §3.
      No `tailwind.config.ts` — Tailwind v4 doesn't use one.
- [ ] Unify the background color. `#CAC4CE` and `#CAC6CE` are both in use; keep `#CAC4CE`.
- [ ] Replace the Musical Material greens (`#1b5e20`, `#4caf50`) with the mint family.
- [ ] Load the five font families via `next/font/google` in `layout.tsx`.
- [ ] Strip every inline `font-family: Georgia` and `font-family: monospace` from
      components; use tokens.
- [ ] Create `components/`, `lib/`, and `public/icons/`.
- [ ] Add `lib/cn.ts`. (No `basePath.ts` needed — basePath is gone.)
- [ ] Init shadcn/ui against Tailwind v4.
- [ ] Install `@pxlkit/core` + `@pxlkit/ui-kit`, wire `PxlKitSurfaceProvider`, add the
      `@source "../node_modules/@pxlkit/ui-kit"` line to `globals.css`. Licensing cleared;
      add the attribution line to the footer.
- [ ] Add a `prefers-reduced-motion` block covering the float, pulse, and orbit keyframes.

## Phase 2 — Navigation

- [ ] Build `components/SiteNav.tsx`. One `accent` prop, nothing else varies. Dark
      `#242038` background on every route, sticky, ~56px.
- [ ] Mobile menu — wordmark plus menu button, slide-down panel. No emoji.
- [ ] Mount in `app/layout.tsx`, pass `accent` per route.
- [ ] Delete all five "← Back to Home" links.
- [ ] Keyboard nav: tab order, visible `focus-visible` rings, escape closes the mobile
      panel.

## Phase 3 — Landing *(needs mockup)*

- [ ] Rebuild on shadcn.
- [ ] Keep and fix the hover-icon interaction.
- [ ] Bio copy — keep the existing paragraph for now; Spencer rewrites later.
- [ ] Backpack favicon replacing the penguin. Kanken silhouette, `#FFD76A` body,
      `#8C6E4F` straps. Author as SVG, export 16/32/180/512px plus `apple-touch-icon`.
- [ ] Update `metadata` in `layout.tsx`. Add Open Graph tags and an OG image.

## Phase 4 — Résumé and Contact *(needs mockups)*

**Résumé**

- [ ] shadcn shell.
- [ ] Rendered HTML résumé as the primary view; PDF as download. The current iframe fails
      on iOS Safari.

**Contact**

- [ ] shadcn form.
- [ ] Wire Web3Forms. Access key in `NEXT_PUBLIC_WEB3FORMS_KEY`. Add a honeypot field.
- [ ] Click-to-copy on email, phone, GitHub, LinkedIn — with a "copied" confirmation.
      Needs a `navigator.clipboard` fallback for non-secure contexts.
- [ ] Direct-open buttons for GitHub and LinkedIn.
- [ ] Build the loading, success, and failure states.
- [ ] **Send a real test message and confirm it arrives.** Explicitly on Spencer's list.

## Phase 5 — Musical *(needs mockup)*

- [ ] Reorder tabs: About → Shows → Mainstage.
- [ ] About: bio copy from the planning doc, verbatim, plus the notable-gigs line.
- [ ] Shows: compact rows replacing the card grid. Optional row/grid toggle.
- [ ] Move the `shows` array out of `page.tsx` into `app/musical/data/shows.ts`.
- [ ] Mainstage Files tab — sales copy verbatim, $300/show, mailto with a prefilled
      subject. Empty state is the main deliverable; there are no files yet.

## Phase 6 — Technical *(needs mockup)*

- [ ] Reorder tabs: About → Projects → Skills.
- [ ] Move the inlined About copy into `technical/components/About.tsx`.
- [ ] Rebuild the surface with PxlKit components.
- [ ] New idle sprite — Spencer at a computer, replacing the walking sprite.

**Skill tree**

- [ ] Restructure the data model: replace hardcoded `x`/`y` pixel coordinates with
      `{ lane, tier }` and compute layout. The current 459-line `skills.tsx` is
      unmaintainable.
- [ ] Rebuild as vertical specialty lanes with horizontal scroll/snap.
- [ ] Replace the eight-radial-gradient backdrop with a flat surface or pixel grid.
- [ ] Rewrite tooltips to carry how and why, not what. **~40 nodes × 1–2 sentences.
      Blocked on Spencer's copy** — this is the single biggest content dependency in the
      project and it gates the page.
- [ ] Reduce cross-lane connections to only the meaningful ones; make them visually
      subordinate.
- [ ] Legend out of `position: fixed`.
- [ ] Mobile layout — one lane at a time.
- [ ] Decide what "unlocked" means and apply it consistently.

## Phase 7 — Verification

- [ ] `npm run build` clean, `npm run lint` clean.
- [ ] Production build serves with zero 404s — check every image, logo, sprite, and PDF.
- [ ] Lighthouse on all five routes: performance, a11y, best practices, SEO.
- [ ] Keyboard-only pass over every interactive element.
- [ ] Contrast audit — especially anywhere `#FFD76A` or `#87BFA5` carries text.
- [ ] Mobile pass at 375px on all five routes.
- [ ] `prefers-reduced-motion` verified.
- [ ] Contact form round-trip confirmed.
- [ ] Grep for emoji across `app/` and `components/` — expect zero hits.

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
