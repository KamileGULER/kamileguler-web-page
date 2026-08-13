# Kamile Guler - Portfolio Redesign

This repository now contains the Phase 1 migration of the portfolio into a `Vite + React + TypeScript + Tailwind CSS` application.

## What Changed

- Preserved the original single-file site as `legacy/index.legacy.html`
- Rebuilt the root app with a new component architecture
- Added a premium dark design system and responsive layout foundation
- Implemented the Phase 1 boot sequence, navigation, universe background, hero, and content-preserving preview sections

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Three.js + React Three Fiber
- Framer Motion
- Lucide React

## Run

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## GitHub Pages

The Vite config uses `base: "./"` so the production build stays compatible with GitHub Pages project-path deployments.
