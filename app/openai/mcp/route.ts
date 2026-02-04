import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("openai");

const { handler, page } = createmcp({
  name: "openai",
  title: "openai",
  description: "OpenAI API documentation",
  basePath: "/openai/mcp",
  sections: ["docs"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_openai_docs",
      description: "search documentation by keyword",
    },
    { name: "get_openai_doc", description: "get full content of a page" },
    { name: "list_openai_docs", description: "list available pages" },
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
