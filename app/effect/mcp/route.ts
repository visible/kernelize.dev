import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("effect");

const { handler, page } = createmcp({
  name: "effect",
  title: "effect",
  description: "Effect-TS documentation",
  basePath: "/effect/mcp",
  sections: content.getSections(),
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_effect_docs",
      description: "search documentation by keyword",
    },
    { name: "get_effect_doc", description: "get full content of a page" },
    { name: "list_effect_docs", description: "list available pages" },
  ],
});

export async function GET(request: Request) {
  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/html")) {
    return new Response(page, { headers: { "Content-Type": "text/html" } });
  }
  return handler(request);
}

export { handler as POST, handler as DELETE };
