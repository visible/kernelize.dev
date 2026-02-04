import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("deepgram");

const { handler, page } = createmcp({
  name: "deepgram",
  title: "deepgram",
  description: "Deepgram API documentation",
  basePath: "/deepgram/mcp",
  sections: ["openapi", "asyncapi"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_deepgram_docs",
      description: "search documentation by keyword",
    },
    { name: "get_deepgram_doc", description: "get full content of a page" },
    { name: "list_deepgram_docs", description: "list available pages" },
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
