# Handbook

How this site is built and how to change it. Written so that six months from now you can add
a show, a project, or a skill without re-reading the source.

Two companion documents: `REVAMP-SPEC.md` is the source of truth for design tokens, page
structure, and library choices. `TODO.md` is the running work log. This file is the practical
one.

## Contents

1. [Tech stack](#1-tech-stack)
2. [Commands](#2-commands)
3. [File directory](#3-file-directory)
4. [Patterns](#4-patterns)
5. [Editing, page by page](#5-editing-page-by-page)
6. [Deploying](#6-deploying)
7. [Traps](#7-traps)

## 1. Tech stack

Everything is front-end. There is no database, no server, no API. The whole site compiles to
static HTML in `out/` and GitHub Pages serves those files.

### Framework

| Package | Version | What it does here |
| --- | --- | --- |
| `next` | 16.x | App Router, static export, font loading, image sizing, icon `<link>` generation |
| `react` / `react-dom` | 19.x | Component runtime |
| `typescript` | 5.x | Every file is `.ts`/`.tsx`; `npx tsc --noEmit` must pass |

### Styling

| Package | What it does here |
| --- | --- |
| `tailwindcss` | v4. All design tokens live in the `@theme` block in `app/globals.css` |
| `@tailwindcss/postcss` | The v4 PostCSS plugin, wired in `postcss.config.mjs` |
| `clsx` + `tailwind-merge` | Combined into `cn()` in `lib/utils.ts`. Merges class strings and resolves Tailwind conflicts so the last class wins |
| `class-variance-authority` | Variant props on `components/ui/button.tsx` (the `tone` prop) |
| `tw-animate-css` | Pulled in by the shadcn scaffold. Not used directly |

Tailwind v4 has no config file. There is no `tailwind.config.ts` and there must never be one.
A token added to `@theme` generates its utilities automatically: `--color-tech` produces
`bg-tech`, `text-tech`, `border-tech`, and the rest.

### Components and icons

| Package | What it does here |
| --- | --- |
| `shadcn` / `@base-ui/react` | Only `components/ui/button.tsx` came from shadcn. See the warning in [Traps](#7-traps) about its color palette |
| `lucide-react` | Every UI icon on the site. v1 dropped brand marks, so GitHub and LinkedIn are hand-drawn in `components/icons/Brand.tsx` |
| `@pxlkit/core` | Pixel art types and the `isAnimatedIcon` / `isParallaxIcon` guards |
| `@pxlkit/parallax` | Multi-layer 3D pixel icons. Three of the six skill-tree lane headings |
| `@pxlkit/effects` | Animated VFX pixel icons. `SparkBurst` heads the Academic lane |
| `@pxlkit/ui-kit` | Installed but not rendered. Its own look does not match this site |

No emoji anywhere: not in the UI, not in data files, not in headings. Icons come from lucide,
PxlKit, or hand-written SVG.

### Fonts

All five load through `next/font/google` in `app/layout.tsx`, which self-hosts the files at
build time. There are no `<link>` tags to Google and no `@import` in CSS.

| Face | Token | Where |
| --- | --- | --- |
| Atkinson Hyperlegible Next | `--font-sans` | Body copy, site-wide |
| Atkinson Hyperlegible Mono | `--font-mono` | Data and labels, site-wide |
| Fraunces | `--font-display` | Headings on Home, Résumé, Contact |
| Press Start 2P | `--font-pixel` | Technical only. `preload: false` |
| Cormorant Garamond | `--font-score` | Musical only. `preload: false` |

### Build and deploy

| Package | What it does here |
| --- | --- |
| `gh-pages` | Pushes `out/` to the `gh-pages` branch |
| `eslint` + `eslint-config-next` | Lint, via `npm run lint` |

`yargs` and `baseline-browser-mapping` are transitive and not used by any source file.

## 2. Commands

```bash
npm run dev          # dev server on localhost:3000
npm run build        # static export into out/
npm run lint         # eslint
npm run check:icons  # validate the hand-drawn pixel sprites
npx tsc --noEmit     # typecheck
npm run deploy       # build, then push out/ to the gh-pages branch
```

Never start a second dev server if one is already running.

Before any deploy, all of `npm run lint`, `npx tsc --noEmit`, `npm run check:icons`, and
`npm run build` should exit clean.

## 3. File directory

```
app/
  layout.tsx              root layout: fonts, metadata, <SiteNav>
  globals.css             @theme design tokens (the whole palette)
  page.tsx                landing page
  entry-points.ts         the four landing buttons and their hover icons
  favicon.ico             ┐
  icon.svg                ├ Next reads these filenames and writes the <link> tags
  apple-icon.png          ┘

  technical/
    layout.tsx            dark background + page <title>
    page.tsx              header, tabs, panels
    components/           About, Projects, SkillTree
    data/
      skills.ts           the skill tree: lanes, nodes, tiers
      projects.ts         the project cards
      pixel.ts            which sprite each lane and header frame uses
      icons/              the five hand-drawn sprites (see below)

  musical/
    layout.tsx            warm background + page <title>
    page.tsx              header, tabs, panels
    components/           About, Credits, Mainstage
    data/
      credits.ts          production credits
      mainstage.ts        MainStage session catalog, price, contact email

  resume/
    page.tsx              the résumé, rendered as HTML
    data/resume.ts        profile, education, skills, projects, experience, leadership

  contact/
    page.tsx
    components/           ChannelList, ContactForm
    data/channels.ts      email, phone, GitHub, LinkedIn

components/               shared by two or more sections
  SiteNav.tsx             sticky top bar
  PageShell.tsx           the centred page column
  Tabs.tsx                TabList + TabPanel, skinned per section
  PixelSprite.tsx         canvas renderer for PxlKit art
  icons/Brand.tsx         GitHub and LinkedIn marks
  ui/button.tsx           the one shadcn component

lib/
  routes.ts               the five nav links and their accent colors
  utils.ts                cn()
  useCopy.ts              copy-to-clipboard hook with a reset timer

public/
  images/                 profile photo, landing hover icons
  logos/                  course and technology logos (legacy, mostly unreferenced)
  SWB_RESUME_Tech.pdf     the résumé download

docs/
  REVAMP-SPEC.md          design and architecture source of truth
  DESIGN-BRIEF.md         the original brief
  TODO.md                 phased work log
  mockups/                exported design mockups

HANDBOOK.md               this file
README.md                 the front door
CLAUDE.md                 constraints for AI coding agents
```

The rule for where a component goes: it lives in its section's folder until a second section
needs it, and only then does it move to `components/`.

## 4. Patterns

### Content lives in data files, never in JSX

Every list on this site is an exported array in a `data/*.ts` file, and the component that
renders it takes no content of its own. Adding a credit means editing `credits.ts`, not
`Credits.tsx`. This is the single most useful convention in the repo, and it is why
[section 5](#5-editing-page-by-page) is short.

Two deliberate exceptions: the About paragraphs on Technical and Musical, and the landing
bio, all sit as consts at the top of the file that renders them. They are one block of prose
each with no shape to model.

### Data files carry the ordering rule

If a list has an order, the file enforces it rather than trusting whoever edits next.
`mainstage.ts` ends with `.sort((a, b) => a.title.localeCompare(b.title))` so the catalog
stays alphabetical on its own. `credits.ts` is hand-ordered newest first because it needs
judgment within a year, and says so in a comment.

### Layout is computed from shape, never from coordinates

`skills.ts` describes lanes and tiers. It contains no pixel positions. The grid, the spine,
and the marker styles are all derived in `SkillTree.tsx`. An earlier version hardcoded x/y
for forty nodes and was unmaintainable.

### One page column

`PageShell` is the only place page rhythm is defined: max width, gutters, vertical padding.
Its five named widths (`narrow` 760, `medium` 900, `wide` 1080, `full` 1160, `xwide` 1280)
keep the routes in step. No page sets its own `max-w` on `<main>`.

### Shared tab behavior, per-section skin

`Tabs.tsx` owns roving focus, arrow and Home/End keys, and the full ARIA wiring
(`role="tablist"`, `aria-selected`, `aria-controls`). Sections pass a `skin` and get a look:
`pixel` for Technical, `underline` for Musical. Adding a third look means adding a key to the
`skins` object, not writing a new tab component.

### The client boundary sits on the page, not the layout

`app/technical/page.tsx` and `app/musical/page.tsx` are `"use client"` because they hold tab
state. Their layouts stay server components, which is what lets them export `metadata`. Every
component below a client page inherits the boundary, so `Tabs.tsx` needs no directive of its
own. Résumé and Contact pages are server components; only `ContactForm` and `ChannelList` are
client.

### Tokens are the entire palette

The `@theme` block in `app/globals.css` is the whole color system. Default Tailwind palette
values (`indigo-500`, `blue-600`) never appear. Four section accents each have a `-deep`
variant, because the base colors fail WCAG AA as text on light backgrounds. Use the base for
fills and borders, and `-deep` whenever the color carries type.

### Motion is transform and opacity only

Never `transition-all`. Transitions name their properties
(`transition-[color,background-color]`). The three keyframe animations live in `globals.css`
and are switched off under `prefers-reduced-motion`, which is load-bearing here because the
site leans on float and pulse. `PixelSprite` checks the same media query in JS and holds at
frame 0.

### Every clickable element has three states

Hover, `focus-visible`, and active. No exceptions. Focus rings use the section accent.

### Section color appears in exactly one place in the chrome

`lib/routes.ts` carries an `accent` class per route, and `SiteNav` uses it for the active
underline. The nav itself is neutral everywhere else.

## 5. Editing, page by page

### Landing (`app/page.tsx`)

| To change | Edit |
| --- | --- |
| The bio paragraph | the `bio` const at the top of `app/page.tsx` |
| The heading or the "Tech. Music. Joy(!)" line | the JSX, same file |
| The four buttons, their order, or their hover icons | `app/entry-points.ts` |
| The profile photo | replace `public/images/me.jpg` |

`entry-points.ts` entries carry `scale` and `maxWidth`, which size the hover icon as a
percentage of its button. The source art is square, so those numbers are purely how large each
object should read next to the others. Nudge them by eye.

Keep the photo small. `next.config.ts` sets `images.unoptimized: true`, which static export
requires, so the browser downloads the file at full size for a 260px circle. The current one is
640×640 JPEG at about 137 KB. A 3 MB PNG would ship as a 3 MB PNG.

### Technical (`app/technical/`)

**To add a project**, append to `projects` in `data/projects.ts`:

```ts
{
  name: "Project Name",
  category: "Web",              // "Web" | "Game" | "Tool" | "AI/ML"
  description: "One sentence on what it does.",
  techStack: ["React", "TypeScript"],
  githubLink: "https://github.com/bowdensw/repo",
}
```

`category` is a union type, so a new category means widening the type in the same file. It
renders as the badge on the card; there is no filtering.

**To add a skill**, find the lane in `data/skills.ts` and append to its `skills` array:

```ts
{
  id: "kebab-case-unique",
  abbr: "TS",                   // 1–2 characters; it has to fit the 40px marker
  label: "TypeScript",
  tier: 3,                      // 1 Learning · 2 Working · 3 Fluent
  source: "CS 4288 / Triton",   // the course, job, or project that earned it
  year: 2024,
  blurb: "How it was used and what it made possible.",
}
```

Order inside a lane is reading order: foundational at the top, the work it enabled below.
`blurb` is how-and-why, never what. "React" should not say "a JavaScript library"; it should
say where it was used.

**To add a lane**, append a `{ id, name, skills }` object to `lanes` and add a matching entry
to `LANE_ICONS` in `data/pixel.ts`. A lane without an icon crashes the render, because
`PixelSprite` reads `layers[0]` unguarded. The grid is `sm:grid-cols-2 xl:grid-cols-3`, so
lanes wrap on their own and a seventh needs no layout change.

**To change a lane's sprite**, edit `LANE_ICONS` in `data/pixel.ts`. Any PxlKit icon works.
Flat icons from `@pxlkit/effects` and `icons/`, and layered ones from `@pxlkit/parallax`,
both go through `toLayers()`, which normalizes them. Every icon currently in use is 16×16,
though the format allows 8, 24, 32, 48, and 64 as well; `PixelSprite` reads its dimensions
from the first layer, so a whole sprite may be any size but its layers must agree.

Two properties of the format that `toLayers()` deliberately drops, because nothing we use
sets them: `AnimationFrame.palette` (per-frame color overrides) and `icon.trigger`
(`loop | once | hover | appear | ping-pong`). `PixelSprite` always loops. Check both before
swapping in an icon from a pack we haven't used.

**To draw a new sprite**, add a file to `data/icons/`. Five live there, because PxlKit
ships nothing close to any of them and its art comes in the pack's retro palette rather
than this site's:

| File | Where it renders | Shape |
| --- | --- | --- |
| `retro-computer.ts` | Technical header, left | 5-layer parallax |
| `handheld-console.ts` | Technical header, right | 5-layer parallax |
| `puzzle.ts` | Foundations lane | flat, 4 frames |
| `react-atom.ts` | Front End lane | flat, 12 frames |
| `backend-stack.ts` | Back End lane | flat, 6 frames |

The two parallax ones are stacks of five layers on the depth ladder PxlKit's own parallax
icons use (`3 / 2 / 0 / -1 / -2`, positive behind, negative popping out), built with the
`still()` and `animated()` helpers in `icons/layer.ts` so a file is grids rather than
scaffolding.

The three lane icons generate their frames instead of listing them, and that is the pattern
to follow for anything that moves. The puzzle computes each frame from a single `gap`, so
the four pieces cannot drift out of alignment between frames. The atom samples its ellipse
into an *ordered* ring, so the electron is an index into the track rather than a dot placed
by hand twelve times. The backend composites three independently animated parts, so the
gear can change without redrawing the terminal.

**The grid holds palette keys, not colors.** A cell is the single character `"G"`, and the
palette maps `G` to `#87bfa5`. Writing the hex into the cell is the mistake that looks
right and fails `check:icons` with every character reported missing.

Colors come from `icons/palette.ts`, which exports two things. `TECH_PALETTE` is a shading
ramp, not a color list: two arms off a shared base, one walking `--color-tech` toward
`--color-ink` for form shadow and one hue-shifting `--color-tech-soft` into indigo, blue
and cyan. Six of its fifteen entries are `@theme` tokens and the rest are interpolations
between them, so a new value should be derived rather than picked. Two conventions keep
the set consistent: light falls from the top left, and the cool arm is reserved for
surfaces that emit rather than reflect.

`SECTION_PALETTE` is the four site accents plus a shade each, and exactly one icon uses it:
the Foundations puzzle, whose four pieces are the four sections of the site.

The format takes literal hex, so a CSS variable cannot reach in there. If a token in
`globals.css` changes, the six anchors have to be updated by hand.

Validate with `npm run check:icons` before wiring anything up. That runs PxlKit's normative
`validateIconData()` over every frame of every layer, plus two checks of our own: layers
must agree on a grid size, and one of them has to sit at depth 0 to anchor the stack.

**To change the About copy**, edit the `paragraphs` array at the top of `components/About.tsx`.

### Musical (`app/musical/`)

**To add a credit**, insert into `credits` in `data/credits.ts` in the right chronological
slot. The list is newest first and hand-ordered within a year:

```ts
{
  title: "Show Title",
  year: 2026,                          // always a single year: the season it closed
  role: "Music Director, Piano",
  organization: "Producing Company",
  lead: "MD: Name",                    // or "Director:", "Advisor:", "Project Lead:"
}
```

The role glyphs are additive and derived from the `role` string by regex, in the `departments`
array at the top of `components/Credits.tsx`. A role matching `piano|keys|synth|accompanist|
music director|instructor` gets the piano glyph, `producer|stage manager` adds the clipboard,
`staging director` adds the pen. A credit that touches two departments shows two glyphs. If a
new role should have its own mark, add a `{ id, test, Icon }` entry rather than special-casing
the row.

**To add a MainStage session**, append to `sessions` in `data/mainstage.ts`. Do not worry about
position; the `.sort()` at the end of the array handles it.

```ts
{ title: "Show Title", meta: "Composer · 2 acts · 40 cues" }
```

The price and the contact address are `PRICE` and `CONTACT_EMAIL` consts in the same file, and
the mailto links are built from them.

**To change the About copy or the engagements list**, both are consts at the top of
`components/About.tsx`.

### Résumé (`app/resume/`)

The page is HTML, not an embedded PDF. It used to be an `<iframe>`, which iOS Safari refuses to
render, so the PDF is now only the download button.

Everything on the page comes from `data/resume.ts`, which exports `profile`, `education`,
`skillGroups`, `projects`, `experience`, and `leadership`. Each is a plain object or array;
append or edit in place.

`skillGroups` takes two shapes. `items` is either a single string, or an array of
`{ sub, text }` for a group that needs labelled sub-lines:

```ts
{ label: "Languages", items: "C++, JavaScript/TypeScript, Python" },
{ label: "Full-Stack", items: [{ sub: "Front-End", text: "React, TypeScript" }] },
```

**To swap the PDF**, drop the new file in `public/` and update the `href` in `page.tsx`. If the
filename is unchanged, nothing else needs to move. Keep the HTML and the PDF saying the same
thing; they drift easily.

### Contact (`app/contact/`)

**To add or change a channel**, edit `channels` in `data/channels.ts`. `icon` is a union of
`"mail" | "phone" | "github" | "linkedin"` mapped to a component inside `ChannelList.tsx`, so a
new icon means adding to both. `copyValue` overrides what lands on the clipboard when the
displayed text is formatted for reading rather than pasting, which is why the phone number
displays as `(513) 503-9631` and copies as `5135039631`.

**The form** posts to Web3Forms, which is the only way to accept a submission from a site with
no backend. The access key is committed in `ContactForm.tsx` as the default for
`NEXT_PUBLIC_WEB3FORMS_KEY`. That is safe: it ships in the client bundle either way, and all it
can do is deliver a message to Spencer's inbox. To point the form at a different mailbox, set
the env var rather than editing the literal.

**To change the fields**, edit the `fields` array at the top of `ContactForm.tsx` and add a
rule to `validate()`. Both are keyed off the same `name`, so they stay in sync.

### Site chrome

| To change | Edit |
| --- | --- |
| Nav links, their order, or their accent color | `lib/routes.ts` |
| Nav height or the separator under it | `components/SiteNav.tsx` |
| Site title, description, or Open Graph tags | `metadata` in `app/layout.tsx` |
| A single page's `<title>` | `metadata` in that route's `layout.tsx` or `page.tsx` |
| The favicon | replace `app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png` |
| Any color, font, spacing step, or shadow | the `@theme` block in `app/globals.css` |

### Adding a new page

1. `mkdir app/<route>` and add `page.tsx`.
2. Wrap the content in `<PageShell width="...">`.
3. Export `metadata` from the page, or from a `layout.tsx` if the page needs `"use client"`.
4. Add the route to `lib/routes.ts` so it appears in the nav.
5. If it needs a background of its own, put it on a `layout.tsx` rather than the page. Use
   `min-h-[calc(100vh-3.5rem)]`, where 3.5rem is the nav height.
6. Put content in `app/<route>/data/` and components in `app/<route>/components/`.

## 6. Deploying

```bash
npm run deploy
```

That runs `predeploy` (a full `npm run build`), then pushes `out/` to the `gh-pages` branch.
`postbuild` writes `out/.nojekyll`, which stops GitHub Pages from eating the `_next` directory
because of the leading underscore.

The site is a GitHub **user** page at `https://bowdensw.github.io/`, served from the domain
root. See [Traps](#7-traps) before touching anything about paths.

## 7. Traps

Each of these has already cost a debugging session.

**No `basePath`, ever.** `basePath` and `assetPrefix` were removed deliberately. Next prefixes
its own JS and CSS but not a raw `<img src="/...">`, so a basePath silently 404s every image,
logo, sprite, and PDF in production while the build stays green. Root-relative asset paths like
`/images/me.jpg` are correct as written.

**No server code.** `output: "export"` is set. No server actions, no route handlers, no
middleware, no `dynamic`, no server-side data fetching. A feature that needs a backend needs a
third-party service instead, which is how the contact form ended up on Web3Forms.

**No `tailwind.config.ts`.** Tailwind v4 has no config file. Colors, fonts, and spacing go in
the `@theme` block in `app/globals.css`.

**The shadcn palette is not the site palette.** `shadcn init` appended its own neutral `oklch()`
variables to `globals.css`: `--primary`, `--accent`, `--border`, `--sidebar-*`, and a `.dark`
block. They exist only so shadcn components resolve at all. Never style anything with them, and
never delete them either, because the components import against those names. When using a
shadcn component, override with real tokens: `bg-tech`, not `bg-primary`.

**Font variables belong on `<html>`, not `<body>`.** The `@theme` tokens that consume them are
computed at `:root`. A `var()` that resolves to nothing there invalidates the whole declaration
and silently drops the page to a serif fallback.

**Never write `--font-sans: var(--font-sans)`.** The shadcn scaffold shipped exactly that in the
`@theme inline` block. It is circular, it makes the variable invalid, and it took a while to
find.

**Both Atkinson faces carry `adjustFontFallback: false`.** Next builds its metric-matched
fallback from a precalculated table that does not yet contain Atkinson Hyperlegible Next or
Mono, so it logged "Failed to find font override values" on every compile and returned nothing.
Opting out changes no emitted CSS; it only stops asking. Drop those two lines once the families
reach the table.

**Icons use Next's file convention.** `app/favicon.ico`, `app/icon.svg`, and `app/apple-icon.png`
are read by filename, and Next writes the `<link>` tags itself with content hashes. Do not move
them to `public/` and do not hand-write icon tags. `favicon` is only valid at the top level of
`app/`.

**Images are unoptimized.** Static export cannot run the image optimizer. `next/image` still
gives correct sizing and layout, but the file that ships is the file in `public/`. Resize before
committing.

**A lane without a sprite crashes the skill tree.** `PixelSprite` reads `layers[0].frames[0]`
with no guard, so a `lanes` entry missing from `LANE_ICONS` throws at render.

**PxlKit's own `check-icon.mjs` cannot read our icon files.** Its plugin ships a pre-flight
checker that parses icon sources as *text*, on the assumption a consumer project has no
TypeScript build to hand. It only recognizes literal palettes, so it reads the shared
`TECH_PALETTE` shorthand as empty and reports every character as missing. Use
`npm run check:icons`, which runs the normative `validateIconData()` against resolved values.

**`AnimatedPxlKitData` still requires the deprecated `loop` field.** PxlKit's docs say
`trigger` supersedes it and that it is ignored when `trigger` is set, but the type has it as
required, so omitting it fails the build. `icons/layer.ts` sets both in one place.
