import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("deepseek");

const { handler, page } = createmcp({
  name: "deepseek",
  title: "deepseek",
  description: "DeepSeek API documentation",
  basePath: "/deepseek/mcp",
  sections: ["docs"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_deepseek_docs",
      description: "search documentation by keyword",
    },
    { name: "get_deepseek_doc", description: "get full content of a page" },
    { name: "list_deepseek_docs", description: "list available pages" },
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
