# Design brief — spencerbowden.github.io

Hand this to Claude Design, one section at a time. Do not paste the whole file at once —
each surface below is its own conversation, and the skill tree deserves its own session.

**How to start a session:** paste **Context** + **Fixed constraints** + the one surface
you're working on. Those three blocks together are the complete prompt. The constraints
have to come along every time or Design will invent its own palette.

Suggested order: Landing → Résumé → Contact → Musical → Technical → skill tree. Landing
first because it sets the tone everything else answers to; the skill tree last because
it's the hardest and benefits from the rest being settled.

Everything here is constrained on purpose. The palette and type are already decided; the
job is layout, hierarchy, and craft, not color exploration.

---

## Context

Personal portfolio for Spencer Bowden — software engineer and music director, Vanderbilt,
double degree in Cognitive Studies and Computer Science with a music minor. Two audiences
that barely overlap: engineering recruiters and theatre/music directors. Hence two
portfolios under one roof.

The site should feel handmade and specific, not like a template. Warmth over polish.
The current version has real personality (hover icons, an RPG skill tree, a pixel sprite)
and that personality should survive the revamp — it's being restructured, not sanded off.

## Fixed constraints — do not change these

**Palette.** This is the whole thing. No additions.

| Token | Hex | Use |
|---|---|---|
| ink | `#242038` | primary text, nav background |
| ink-soft | `#4A4260` | secondary text |
| paper | `#CAC4CE` | landing / résumé / contact background |
| paper-warm | `#F4F1E8` | musical background |
| surface | `#FFFFFF` | cards |
| tech | `#9067C6` | technical accent |
| music | `#87BFA5` | musical accent (deep: `#3E7A62` for text) |
| resume | `#FFD76A` | résumé accent (deep: `#8A6A0B` for text) |
| contact | `#B56C8C` | contact accent (deep: `#9E5677` for text) |

`resume` and `music` fail AA as text on white — use the deep variants whenever the color
carries type.

**Type.** Geist Sans for body everywhere. Fraunces for landing/résumé/contact headings.
Geist Mono + Silkscreen on Technical. Cormorant Garamond on Musical. Never the same
family for heading and body on one page.

**Spacing.** 4px scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.

**No emoji. Ever.** Tabler outline icons or pixel icons only.

**Navigation is already decided** — do not redesign it. One dark `#242038` bar, sticky,
~56px, identical on every page. Wordmark left, five links right (Home, Technical, Musical,
Résumé, Contact). Active link is white with a 3px underline in the section accent. That
underline is the only place section color appears in the chrome.

---

## Surface 1 — Landing

A hub. Someone arrives knowing nothing and needs to pick a direction in about four seconds.

Contains: hero with name and a one-paragraph bio, a portrait, and four entry points
(Technical, Musical, Résumé, Contact).

Keep the existing hover behavior — hovering an entry point floats a themed illustration up
from beneath the button. It's charming and it's his. Design around it rather than
replacing it.

The hard part: making one page introduce two unrelated careers without feeling like it's
apologizing for either. The bio should read as one person with range, not two résumés
stapled together.

Deliver desktop and mobile.

---

## Surface 2 — Résumé

Simplest page. shadcn shell, yellow accent, a document viewer and a download button.

The current version embeds a PDF in an iframe, which fails on iOS Safari. Design for a
rendered HTML résumé as the primary view, with the PDF as a download — so it needs an
actual résumé layout, not just a frame around a file.

---

## Surface 3 — Contact

Two columns: contact methods on the left, message form on the right.

Every contact value is click-to-copy — email, phone, GitHub, LinkedIn. Needs a copy
affordance and a "copied" confirmation state, both designed. GitHub and LinkedIn
additionally get a direct-open action, so those rows carry two actions and need to not
look cluttered.

Form fields: name, email, subject, message. Design the error, sending, success, and
failure states — not just the resting state.

---

## Surface 4 — Musical

Cream `#F4F1E8`, mint accent, Cormorant Garamond headings. Sophisticated but warm —
think a well-set concert program, not a corporate site. Musical motifs are welcome if
they're restrained; no clip-art notes.

Three tabs: **About → Shows → Mainstage Files.**

**About** — a bio paragraph plus a short list of notable gigs. Copy is already written.

**Shows** — nine productions, each with title, role, organization, and a director or
advisor credit. Currently a two-column card grid; it should be **compact rows** instead,
scannable, minimal padding. A music director scanning this wants to see nine titles at a
glance, not scroll through nine cards. Optional row/grid toggle if it earns its place.

**Mainstage Files** — a storefront tab for MainStage session files, $300/show, sold by
email. **He has zero files right now**, so the empty state is the actual deliverable here.
It has to read as "opening soon" rather than "broken." Design the populated state too, so
there's something to grow into.

Note for later: v2 adds clickable instruments in a sidebar that play show snippets. Leave
room in the Shows layout for a sidebar, but don't design it yet.

---

## Surface 5 — Technical

Dark, pixel-art, RPG-influenced. Uses the PxlKit component library. Purple `#9067C6`
accent on `#242038`.

Three tabs: **About → Projects → Skills.**

**About** — three paragraphs of narrative copy, already written. Needs to be readable, not
just atmospheric — dark pixel themes tend to lose long-form legibility.

**Projects** — project cards. Content exists in the current codebase.

**Skills** — the skill tree. **Design this in a separate session** using the brief below.

Also: a pixel sprite of Spencer at a computer, replacing the current walking sprite. v1 is
a single idle state. v2 animates through coding, debugging, writing on paper, head against
wall, and leaving to play music. Design the idle frame with that sequence in mind.

---

## Surface 5b — The skill tree (own session)

The centerpiece, and the thing most in need of rethinking.

**What exists:** ~40 skills as glowing spheres on a 1500px canvas at hardcoded pixel
coordinates, wired together with SVG lines, over a backdrop of eight stacked radial
gradients. Clicking toggles a node "unlocked." Hovering shows the skill's name.

**What's wrong with it:**

- The gradient backdrop reads as mud, not as anything fantastical.
- Everything connects to everything, so there's no readable progression. It's modeled on
  the FFX sphere grid, which means it's illegible to anyone who hasn't played FFX — which
  is most recruiters.
- Tooltips say *what* a technology is. That's worthless; anyone reading this already knows
  what React is.
- No mobile story at all.

**The direction (already decided):** keep the node graph, restructure into **vertical
specialty lanes** — Foundations, Web, Systems / Game Design, ML / Academic, UI/UX — scrolled
or snapped horizontally. Progress reads top-to-bottom within a lane: fundamentals up top,
advanced work below. Cross-lane connections only where one genuinely exists, and visually
subordinate to the within-lane spine.

**The tooltip is the real work.** It should carry *how and why Spencer used this*, not what
it is. Two sentences, specific, with a project attached where possible. Design a tooltip
that can hold that much text without collapsing — probably a panel, not a floating label.

**Also needed:**

- A backdrop that isn't gradient soup. Flat dark, or a subtle pixel grid.
- A legend that doesn't float in a fixed corner box (it currently uses `position: fixed`
  and collides with content).
- An honest progress representation. If "unlocked" is going to mean something, it should
  mean something consistent — proficiency, or chronology, or coursework completed. Pick
  one and design to it.
- A mobile layout. One lane at a time, probably.

Deliver 2–3 directions before committing.
