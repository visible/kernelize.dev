import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("betterauth");

const { handler, page } = createmcp({
  name: "betterauth",
  title: "better auth",
  description: "Better Auth authentication library documentation",
  basePath: "/betterauth/mcp",
  sections: content.getSections(),
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_betterauth_docs",
      description: "search documentation by keyword",
    },
    { name: "get_betterauth_doc", description: "get full content of a page" },
    { name: "list_betterauth_docs", description: "list available pages" },
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
