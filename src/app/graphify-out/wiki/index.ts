import { promises as fsp, readFileSync } from "fs";
import { join } from "path";

export async function queryGraph(terms: string): Promise<string> {
  const path = join(import.meta.dirname, "..", "src", "app", "graphify-out", "wiki");
  try {
    const entries = await fsp.readdir(path);
    const md = entries
      .filter((n) => n.endsWith(".md"))
      .map((n) => {
        const text = readFileSync(join(path, n), "utf8");
        return { name: n.replace(/\.md$/, ""), text };
      });
    const hits = md
      .filter((m) => m.text.toLowerCase().includes(terms.toLowerCase()))
      .map((m) => `# ${m.name}\n\n${m.text.slice(0, 2400)}`)
      .join("\n\n---\n\n");
    return hits ? `## hits (${hits.split("\n").filter((l) => l.startsWith("#")).length})\n\n${hits}` : "no matches found in graphify-out/wiki";
  } catch {
    return "graphify-out/wiki not yet generated — run `npm run graphify:build` first";
  }
}
