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
- [ ] Strip the remaining inline `font-family: Georgia` / `monospace` from components and
      use tokens. Deferred — those components are rebuilt in Phases 3–6 anyway.
- [ ] Init shadcn/ui against Tailwind v4. **Requires npm — see handoff below.**
- [ ] Install `@pxlkit/core` + `@pxlkit/ui-kit`, wire `PxlKitSurfaceProvider`, add
      `@source "../node_modules/@pxlkit/ui-kit"` to `globals.css`, add the attribution
      line to the footer. **Requires npm — see handoff below.**
- [ ] After shadcn installs `clsx` and `tailwind-merge`, upgrade `lib/cn.ts` to the
      `twMerge(clsx(...))` implementation (the target version is in the file's comment).

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
