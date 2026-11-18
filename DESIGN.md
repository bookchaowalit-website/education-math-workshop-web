# Design direction — Math Workshop

A proof desk for one idea at a time. Since 2026-11-19 the site uses the shared **Reader shell** (see
`READER.md`): `app/reader-shell.css`, `components/reader-shell.tsx` and `tests/reader-shell.test.tsx` are
copied byte for byte from content-techblog-web. Geist via `next/font` (variable on `<html>`), `--rs-*` tokens
in light and dark; no site colour tokens remain.

- Structure: one h1 and lede, problem chips (`aria-pressed`), then the sheet: question, givens as tags, the
  notation "on the board", the numbered moves, a `role="status"` count, Reveal next move and Start the sheet
  over (shown once a move is open).
- Folded moves keep readable text and are marked with a dashed edge and the word "Folded", not by fading.
- Focus: Start over returns focus to Reveal; when the last move opens, focus moves to Start over (Reveal turns
  disabled).
- Floor: text ≥ 12px, controls ≥ 44px, 4.5:1 text contrast, forced colours, no horizontal scroll at 320px,
  footer link back to https://bookchaowalit.com/.
- Honesty: three synthetic, illustrative problems; not an assessment.
