# Math Workshop

A proof desk for three small synthetic problems: choose a sheet, read the givens, reveal the proof one step at a time, start over.

Live: https://math.bookchaowalit.com (Vercel deploys every push to `main`).

## What it does not do

- No exercises, grading, progress or accounts. Three fixed sample problems.

## Run

```bash
npm ci
npm run dev
```

## Checks

```bash
npm test           # Vitest: problem content and reveal rules, home page render, Sentry scrubbing
npm run lint
npm run typecheck
npm run build
```

CI (`.github/workflows/ci.yml`) runs the shared Node workflow (with a line-coverage gate) and the shared security
scan on every push and PR to `main`.

## Code map

- `lib/math-workshop.ts`: the three authored problems, `findProblem`, `revealNext`, `isComplete`.
- `lib/sentry.ts` + `instrumentation*.ts`: error reporting to Sentry, errors only, personal data stripped; off when `NEXT_PUBLIC_SENTRY_DSN` is unset.
