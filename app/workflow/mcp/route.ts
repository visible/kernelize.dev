import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("workflow");

const { handler, page } = createmcp({
  name: "workflow",
  title: "workflow",
  description: "Vercel Workflow documentation",
  basePath: "/workflow/mcp",
  sections: ["docs", "guides"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_workflow_docs",
      description: "search documentation by keyword",
    },
    { name: "get_workflow_doc", description: "get full content of a page" },
    { name: "list_workflow_docs", description: "list available pages" },
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
