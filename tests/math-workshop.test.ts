import { describe, expect, it } from "vitest";
import { PROBLEMS, findProblem, isComplete, pad2, revealNext } from "@/lib/math-workshop";

describe("authored problems", () => {
  it("has three sheets, each with three steps and unique ids", () => {
    expect(PROBLEMS.map((p) => p.id)).toEqual(["diagonal", "slope", "area"]);
    expect(PROBLEMS.every((p) => p.steps.length === 3)).toBe(true);
  });

  it("states answers that are actually correct", () => {
    const diagonal = findProblem("diagonal");
    expect(Math.hypot(3, 4)).toBe(5);
    expect(diagonal.steps[2].detail).toContain("c = 5");
    expect((10 - 2) / (5 - 1)).toBe(2);
    expect(findProblem("slope").steps[2].detail).toContain("rises by 2");
    for (const x of [0, 1, 7]) expect((x + 2) * (x + 3)).toBe(x * x + 5 * x + 6);
    expect(findProblem("area").notation).toBe("x² + 5x + 6");
  });

  it("falls back to the first sheet for an unknown id", () => {
    expect(findProblem("nope").id).toBe("diagonal");
  });
});

describe("step reveal", () => {
  it("opens one step at a time and stops at the last", () => {
    expect(revealNext(0, 3)).toBe(1);
    expect(revealNext(2, 3)).toBe(3);
    expect(revealNext(3, 3)).toBe(3);
  });

  it("recovers from a negative count", () => {
    expect(revealNext(-4, 3)).toBe(1);
  });

  it("is complete only when every step is open", () => {
    expect(isComplete(2, 3)).toBe(false);
    expect(isComplete(3, 3)).toBe(true);
  });

  it("pads counters to two digits", () => {
    expect(pad2(3)).toBe("03");
    expect(pad2(12)).toBe("12");
  });
});
