"use client";

import { useEffect, useRef, useState } from "react";
import { Reader, ReaderFoot, ReaderHead, ReaderTop, Tags } from "@/components/reader-shell";
import { PROBLEMS, findProblem, isComplete, revealNext } from "@/lib/math-workshop";

// The proof desk on the Reader shell: pick a problem, keep its givens on the page, and open one move at a time.

const SOURCE = "https://github.com/bookchaowalit-website/education-math-workshop-web";

export function WorkshopView() {
  const [problemId, setProblemId] = useState("diagonal");
  const [revealed, setRevealed] = useState(0);
  const revealRef = useRef<HTMLButtonElement>(null);
  const overRef = useRef<HTMLButtonElement>(null);
  // Where focus goes after the next render: Reveal once a sheet starts over, Start over once Reveal turns disabled.
  const focusNext = useRef<"reveal" | "over" | null>(null);
  const problem = findProblem(problemId);
  const total = problem.steps.length;
  const done = isComplete(revealed, total);
  const select = (id: string) => { setProblemId(id); setRevealed(0); };
  const startOver = () => { focusNext.current = "reveal"; setRevealed(0); };
  const reveal = () => {
    if (revealed + 1 >= total) focusNext.current = "over";
    setRevealed((value) => revealNext(value, total));
  };
  useEffect(() => {
    if (focusNext.current === "reveal") revealRef.current?.focus();
    if (focusNext.current === "over") overRef.current?.focus();
    focusNext.current = null;
  }, [revealed]);

  return (
    <Reader>
      <ReaderTop name="Math Workshop" tagline="Proof desk" links={[{ href: "#sheet", label: "Problems" }]} />
      <main id="main" className="rs-main">
        <ReaderHead
          eyebrow="Open study"
          title="Make the proof visible."
          lede="Choose one idea. Keep its givens on the page. Reveal the next move only when you are ready to see why it works."
        />
        <section aria-labelledby="sheet" className="rs-toolbar">
          <div className="rs-section-head"><h2 id="sheet">Problems</h2></div>
          <ul className="site-chips" aria-label="Choose a problem">
            {PROBLEMS.map((item) => (
              <li key={item.id}>
                <button type="button" className="rs-chip" aria-pressed={item.id === problem.id} onClick={() => select(item.id)}>
                  {item.number} · {item.title}
                </button>
              </li>
            ))}
          </ul>
          <article className="math-sheet" aria-labelledby="question">
            <div>
              <p className="math-label">Problem {problem.number} · {problem.title}</p>
              <h2 id="question">{problem.question}</h2>
            </div>
            <div>
              <p className="math-label">Givens</p>
              <Tags tags={problem.givens} label="Givens" />
            </div>
            <div>
              <p className="math-label">On the board</p>
              <p className="math-board">{problem.notation}</p>
            </div>
            {/* The sheet's sketch, as on the page before the Reader shell; decorative, the question and givens say it. */}
            <div className="math-diagram" aria-hidden="true">{problem.diagram}</div>
            <ol className="math-steps" aria-label="Moves">
              {problem.steps.map((step, index) => {
                const open = index < revealed;
                return (
                  <li key={step.label} className="math-step" data-open={open}>
                    <h3>{step.label}</h3>
                    <p>{open ? step.detail : "Folded. Press Reveal next move to open it."}</p>
                  </li>
                );
              })}
            </ol>
            <p className="rs-count" role="status">{done ? `All ${total} moves shown. The proof is complete.` : `${revealed} of ${total} moves shown`}</p>
            <div className="rs-actions">
              <button ref={revealRef} type="button" className="rs-button" onClick={reveal} disabled={done}>
                {done ? "Proof complete" : "Reveal next move"}
              </button>
              {revealed > 0 ? <button ref={overRef} type="button" className="rs-plain" onClick={startOver}>Start the sheet over</button> : null}
            </div>
          </article>
        </section>
      </main>
      <ReaderFoot source={SOURCE} note="Three synthetic, illustrative problems written for this desk. Not an assessment." />
    </Reader>
  );
}
