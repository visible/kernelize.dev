import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("assemblyai");

const { handler, page } = createmcp({
  name: "assemblyai",
  title: "assemblyai",
  description: "AssemblyAI API documentation",
  basePath: "/assemblyai/mcp",
  sections: ["openapi"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_assemblyai_docs",
      description: "search documentation by keyword",
    },
    { name: "get_assemblyai_doc", description: "get full content of a page" },
    { name: "list_assemblyai_docs", description: "list available pages" },
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
