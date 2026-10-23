# Math Workshop — Product truth

> Inferred from the code and copy (no user interview). Checked against the portfolio card claims review
> (`portfolio-site-web/docs/audits/CARD-CLAIMS-REVIEW-2026-10.md`, row `math-workshop`) on 2026-10-23.

## What it is

A client-only proof desk over three authored, synthetic problems (a right-triangle diagonal, a slope, a rectangle's area). Each has givens, a notation line and three proof steps you reveal one at a time.

## Who it is for

A student or curious visitor who wants to walk through one small proof slowly.

## What works today

1. Pick a sheet (A, B or C); its question, givens, notation and diagram glyph show.
2. Reveal next move opens one proof step at a time until the proof is complete; Start the sheet over folds them again. The step counter in the header follows.
3. The three worked answers are checked by tests (c = 5, slope 2, (x + 2)(x + 3) = x² + 5x + 6).
4. Front-end and server errors go to Sentry (errors only, personal data stripped) when `NEXT_PUBLIC_SENTRY_DSN` is set.

## What does not work (and must not be claimed)

- No exercises to solve, grading, progress, accounts or new problems: the three sheets are fixed sample content, not an assessment.
- No API or MCP route; nothing is stored.

## Live URL and deploy state

- Live: https://math.bookchaowalit.com (HTTP 200 on 2026-10-23).
- The Vercel project `bookchaowalit-math-workshop-frontend` is Git-linked to this repository (`main`), so a push to `main` deploys to production. The CVE patch (commit e8e9c96) went out that way on 2026-10-23. The L2 push on 2026-10-23 may not have deployed because the Vercel free plan hit its daily deployment limit that day; the coordinator redeploys the latest green `main` once the window resets. `NEXT_PUBLIC_SENTRY_DSN` is set on the Vercel project (Sentry project `education-math-workshop-web`, org `personal-yu0`).

## Boundaries

- Browser-only static page; no API routes, storage or network calls of its own.
