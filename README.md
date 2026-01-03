# Turborepo Monorepo

A pnpm-based Turborepo workspace with a Next.js App Router web app, an Expo mobile app, and shared packages for UI (Tamagui), core logic, and utilities.

## Project Structure

```
apps/
  web/      # Next.js app using App Router
  mobile/   # Expo React Native app
packages/
  ui/       # Shared Tamagui Provider and Button components
  core/     # Shared auth hook (useAuth)
  utils/    # Shared utility helpers (e.g., formatDate)
```

## Getting Started

1) Install dependencies from the repository root:

```
pnpm install
```

2) Start the web app (Next.js):

```
pnpm dev:web
```

Or directly from the app package:

```
pnpm --filter web dev
```

3) Start the mobile app (Expo):

```
pnpm --filter mobile start
```

Use `pnpm --filter mobile android` or `pnpm --filter mobile ios` for platform-specific native runs, and `pnpm --filter mobile web` for Expo web.

4) Run all dev targets together (Turbo, runs any `dev` scripts across the monorepo):

```
pnpm dev
```

## Additional Scripts

- Build all packages/apps: `pnpm build`
- Lint all packages/apps: `pnpm lint`
- Test all packages/apps: `pnpm test`

Run these from the repo root so Turbo can coordinate the tasks across workspaces.
