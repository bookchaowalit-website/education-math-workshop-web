"use client";

import { useState } from "react";
import { PROBLEMS, findProblem, isComplete, pad2, revealNext as nextStep } from "@/lib/math-workshop";

export default function Home() {
  const [problemId, setProblemId] = useState("diagonal");
  const [revealed, setRevealed] = useState(0);
  const problem = findProblem(problemId);
  const done = isComplete(revealed, problem.steps.length);
  const selectProblem = (id: string) => { setProblemId(id); setRevealed(0); };
  const revealNext = () => setRevealed((value) => nextStep(value, problem.steps.length));
  const reset = () => setRevealed(0);

  return (
    <main className="math-page">
      <div className="math-shell">
        <header className="math-header"><a className="math-brand" href="#workbench" aria-label="Math Workshop home"><span className="math-mark">∑</span><span>MATH WORKSHOP</span></a><span>PROOF DESK / OPEN STUDY</span><span className="math-status">{pad2(revealed)} / {pad2(problem.steps.length)} STEPS</span></header>

        <section className="math-hero"><div><h1>Make the proof<br /><em>visible.</em></h1><p>Choose one idea. Keep its givens on the page. Reveal the next move only when you are ready to see why it works.</p></div><div className="math-equation" aria-label={`Selected notation ${problem.notation}`}><span>NOW ON THE BOARD</span><strong>{problem.notation}</strong><small>illustrative problem set</small></div></section>

        <section className="math-workbench" id="workbench">
          <aside className="problem-index"><div className="math-label"><span>OPEN PROBLEMS</span><span>{PROBLEMS.length} SHEETS</span></div><p>Pick the question that deserves a slower look.</p><div className="problem-list">{PROBLEMS.map((item) => <button key={item.id} type="button" className={item.id === problem.id ? "problem-row is-active" : "problem-row"} onClick={() => selectProblem(item.id)}><span>{item.number}</span><strong>{item.title}</strong><small>{item.givens.join(" · ")}</small></button>)}</div><div className="margin-note"><span>MARGIN NOTE</span><p>Proof is not a performance. Leave the scratch marks where the idea changed.</p></div></aside>

          <section className="proof-sheet" aria-labelledby="problem-title"><div className="sheet-rule"><span>SHEET {problem.number} / {problem.title.toUpperCase()}</span><span>REASONING IN THREE MOVES</span></div><div className="problem-question"><span>THE QUESTION</span><h2 id="problem-title">{problem.question}</h2></div><div className="visual-proof"><div className="diagram-frame"><div className="diagram-glyph" aria-hidden="true">{problem.diagram}</div><div className="diagram-label diagram-label-a">known</div><div className="diagram-label diagram-label-b">unknown</div></div><div className="givens"><span>GIVENS</span>{problem.givens.map((given) => <strong key={given}>{given}</strong>)}</div></div><div className="step-stack">{problem.steps.map((step, index) => <article key={step.label} className={index < revealed ? "proof-step is-open" : "proof-step"}><div className="step-number">{String(index + 1).padStart(2, "0")}</div><div><h3>{step.label}</h3>{index < revealed ? <p>{step.detail}</p> : <span className="step-closed">Next move is folded away</span>}</div>{index < revealed && <span className="step-check" aria-label="Revealed">✓</span>}</article>)}</div><div className="proof-actions"><button type="button" className="math-primary" onClick={revealNext} disabled={done}>{done ? "Proof complete" : "Reveal next move"}</button><button type="button" className="math-reset" onClick={reset}>Start the sheet over</button></div></section>
        </section>
        <footer className="math-footer"><span>MATH WORKSHOP / PROOF DESK</span><span>SYNTHETIC EXAMPLES · NOT AN ASSESSMENT</span></footer>
      </div>
    </main>
  );
}
