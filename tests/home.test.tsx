import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

const text = (html: string) => html.replace(/<!-- -->/g, "");

describe("home page", () => {
  it("renders the proof desk with the first sheet and the synthetic-content notice", () => {
    const html = text(renderToString(<Home />));
    expect(html).toContain("Make the proof");
    expect(html).toContain("Can the diagonal be proved without measuring it?");
    expect(html).toContain("3 SHEETS");
    expect(html).toContain("SYNTHETIC EXAMPLES · NOT AN ASSESSMENT");
  });

  it("starts with every step folded away", () => {
    const html = text(renderToString(<Home />));
    expect(html).toContain("00 / 03 STEPS");
    expect(html.match(/Next move is folded away/g)).toHaveLength(3);
    expect(html).toContain("Reveal next move");
  });
});
