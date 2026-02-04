import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("groq");

const { handler, page } = createmcp({
  name: "groq",
  title: "groq",
  description: "Groq API documentation",
  basePath: "/groq/mcp",
  sections: ["docs"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_groq_docs",
      description: "search documentation by keyword",
    },
    { name: "get_groq_doc", description: "get full content of a page" },
    { name: "list_groq_docs", description: "list available pages" },
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
