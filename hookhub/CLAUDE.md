# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Layout

The application lives entirely in [hookhub/](hookhub/). All development commands should be run from that directory.

## Development Commands

Run from the `hookhub/` directory:

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured yet.

## Architecture

This is a **Next.js 16 App Router** project using TypeScript, React 19, and Tailwind CSS 4.

- [hookhub/app/](hookhub/app/) — App Router pages and layouts. `layout.tsx` is the root layout; `page.tsx` is the home page.
- [hookhub/app/globals.css](hookhub/app/globals.css) — Global styles using Tailwind CSS v4 (`@import "tailwindcss"`). CSS custom properties define light/dark theme tokens (`--background`, `--foreground`).
- [hookhub/public/](hookhub/public/) — Static assets (SVGs, favicon).

**Key conventions:**
- Path alias `@/*` maps to the `hookhub/` root (configured in [tsconfig.json](hookhub/tsconfig.json)).
- TypeScript strict mode is enabled.
- Tailwind CSS v4 is used — syntax differs from v3 (no `tailwind.config.js`, config is done in CSS).

## Important: Next.js Version

This version of Next.js has breaking changes — APIs, conventions, and file structure may differ from training data. Read the relevant guide in `hookhub/node_modules/next/dist/docs/` before writing any Next.js-specific code. Heed deprecation notices.
