import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("anthropic");

const { handler, page } = createmcp({
  name: "anthropic",
  title: "anthropic",
  description: "Anthropic API documentation",
  basePath: "/anthropic/mcp",
  sections: ["docs"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_anthropic_docs",
      description: "search documentation by keyword",
    },
    { name: "get_anthropic_doc", description: "get full content of a page" },
    { name: "list_anthropic_docs", description: "list available pages" },
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
