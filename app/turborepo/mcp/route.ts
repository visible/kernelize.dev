import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("turborepo");

const { handler, page } = createmcp({
  name: "turborepo",
  title: "turborepo",
  description: "Turborepo documentation",
  basePath: "/turborepo/mcp",
  sections: ["core-concepts", "crafting-your-repository", "getting-started", "guides", "messages", "reference"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_turborepo_docs",
      description: "search documentation by keyword",
    },
    { name: "get_turborepo_doc", description: "get full content of a page" },
    { name: "list_turborepo_docs", description: "list available pages" },
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
