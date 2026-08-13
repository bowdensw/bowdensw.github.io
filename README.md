# bowdensw.github.io

Spencer Bowden's personal site. Software engineering on one side, music direction on the
other, and a landing page that lets you pick.

Live at **https://bowdensw.github.io**

## Stack

Next.js 16 (App Router) with React 19 and Tailwind v4, statically exported to GitHub Pages.
No database, no backend, no API routes. The whole site compiles to HTML in `out/`.

Pixel art comes from [PxlKit](https://pxlkit.xyz). Body type is Atkinson Hyperlegible, the
Braille Institute's low-vision family.

## Running it

```bash
npm install
npm run dev      # localhost:3000
```

```bash
npm run build    # static export into out/
npx eslint .     # lint
npx tsc --noEmit # typecheck
npm run deploy   # build, then push out/ to gh-pages
```

## Where things are

```
app/          one folder per route, each with its own components/ and data/
components/   shared across sections: SiteNav, PageShell, Tabs, PixelSprite
lib/          routes, cn(), the clipboard hook
public/       images, logos, résumé PDF
docs/         spec, brief, todo, handbook
```

Content lives in `data/*.ts` files, not in JSX. Adding a credit means editing
`app/musical/data/credits.ts`; adding a skill means editing
`app/technical/data/skills.ts`.

## Docs

- **[HANDBOOK.md](HANDBOOK.md)** is the one to start with. The stack in full, the
  file tree, the patterns, and how to edit each page.
- **[docs/REVAMP-SPEC.md](docs/REVAMP-SPEC.md)** covers design tokens, information
  architecture, and library decisions.
- **[docs/TODO.md](docs/TODO.md)** is the phased work log.
- **[CLAUDE.md](CLAUDE.md)** holds the constraints for AI coding agents working in this repo.

Before changing anything about paths, `output: "export"`, or the Tailwind setup, read the
**Traps** section of the handbook. Each entry there has already cost a debugging session.
