// Math Workshop: the three authored (synthetic) problems and the step-reveal rules.

export type Problem = { id: string; number: string; title: string; question: string; givens: string[]; notation: string; diagram: string; steps: { label: string; detail: string }[] };

export const PROBLEMS: Problem[] = [
  { id: "diagonal", number: "A", title: "The quiet diagonal", question: "Can the diagonal be proved without measuring it?", givens: ["a = 3", "b = 4", "right angle"], notation: "c² = a² + b²", diagram: "3—4", steps: [{ label: "Name the relationship", detail: "A right triangle gives us two perpendicular legs and one unknown hypotenuse." }, { label: "Substitute the known lengths", detail: "c² = 3² + 4², so the square of the diagonal is 9 + 16." }, { label: "Take the root", detail: "c² = 25. The positive length is c = 5." }] },
  { id: "slope", number: "B", title: "A line's intention", question: "How steep is the line between two points?", givens: ["P₁ = (1, 2)", "P₂ = (5, 10)", "rise / run"], notation: "m = Δy / Δx", diagram: "↗ 2", steps: [{ label: "Read the vertical change", detail: "The line rises from 2 to 10. That gives Δy = 8." }, { label: "Read the horizontal change", detail: "The x-coordinate travels from 1 to 5. That gives Δx = 4." }, { label: "Divide change by change", detail: "m = 8 / 4, so every one step right rises by 2." }] },
  { id: "area", number: "C", title: "The shared rectangle", question: "Why does the sum of two areas stay equal?", givens: ["x + 2", "x + 3", "same whole", "x ≥ 0"], notation: "x² + 5x + 6", diagram: "□ + □", steps: [{ label: "Keep the whole visible", detail: "Both expressions describe the same rectangle: width x + 2 and height x + 3." }, { label: "Distribute by strips", detail: "The four regions are x², 3x, 2x, and 6." }, { label: "Collect like regions", detail: "x² + 3x + 2x + 6 becomes x² + 5x + 6." }] },
];

export function findProblem(id: string): Problem {
  return PROBLEMS.find((item) => item.id === id) ?? PROBLEMS[0];
}

/** One more step open, never past the last one. */
export function revealNext(revealed: number, total: number): number {
  return Math.min(Math.max(revealed, 0) + 1, total);
}

export function isComplete(revealed: number, total: number): boolean {
  return revealed >= total;
}

export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}
