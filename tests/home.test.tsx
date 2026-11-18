// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import nextConfig from "@/next.config";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
const text = (html: string) => html.replace(/<!-- -->/g, "");

describe("home page (server render)", () => {
  it("renders one h1, the first sheet with every move folded, and the synthetic-content notice", () => {
    const html = text(renderToString(<Home />));
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).toContain("Make the proof visible.");
    expect(html).toContain("Can the diagonal be proved without measuring it?");
    expect(html).toContain("0 of 3 moves shown");
    expect(html.match(/Folded. Press Reveal/g)).toHaveLength(3);
    expect(html).toContain("Not an assessment.");
    expect(html).toContain('href="https://bookchaowalit.com/"');
  });
});

describe("home page (mounted)", () => {
  let root: Root;
  let host: HTMLDivElement;
  const button = (t: string) => [...host.querySelectorAll("button")].find((b) => b.textContent?.trim().startsWith(t)) as HTMLButtonElement;
  const press = (el: Element) => act(() => { el.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
  const status = () => host.querySelector("[role='status']")!.textContent;

  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    act(() => root.render(<Home />));
  });
  afterEach(() => { act(() => root.unmount()); host.remove(); });

  it("reveals one move at a time until the proof is complete, then starts over with focus on Reveal", () => {
    expect(button("Start the sheet over")).toBeUndefined();
    press(button("Reveal next move"));
    expect(status()).toBe("1 of 3 moves shown");
    expect(host.querySelector(".math-step[data-open='true'] p")!.textContent).toContain("two perpendicular legs");
    press(button("Reveal next move"));
    press(button("Reveal next move"));
    expect(status()).toBe("All 3 moves shown. The proof is complete.");
    expect(button("Proof complete").disabled).toBe(true);
    expect(document.activeElement?.textContent).toBe("Start the sheet over");
    press(button("Start the sheet over"));
    expect(status()).toBe("0 of 3 moves shown");
    expect(document.activeElement?.textContent).toBe("Reveal next move");
  });

  it("switches problems with pressed chips and folds the new sheet", () => {
    press(button("Reveal next move"));
    press(button("B ·"));
    expect(button("B ·").getAttribute("aria-pressed")).toBe("true");
    expect(host.querySelector("#question")!.textContent).toBe("How steep is the line between two points?");
    expect(status()).toBe("0 of 3 moves shown");
  });
});

describe("site files", () => {
  it("points robots and the sitemap at math.bookchaowalit.com and redirects /more-projects", async () => {
    expect(robots().sitemap).toBe("https://math.bookchaowalit.com/sitemap.xml");
    expect(sitemap()[0].url).toBe("https://math.bookchaowalit.com/");
    expect(await nextConfig.redirects!()).toContainEqual({ source: "/more-projects", destination: "https://bookchaowalit.com/", permanent: true });
  });
});
