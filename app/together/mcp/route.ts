import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("together");

const { handler, page } = createmcp({
  name: "together",
  title: "together",
  description: "Together.ai API documentation",
  basePath: "/together/mcp",
  sections: ["docs"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_together_docs",
      description: "search documentation by keyword",
    },
    { name: "get_together_doc", description: "get full content of a page" },
    { name: "list_together_docs", description: "list available pages" },
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
