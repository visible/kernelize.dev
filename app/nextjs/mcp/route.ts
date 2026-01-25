import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("nextjs");

const { handler, page } = createmcp({
  name: "nextjs",
  title: "next.js",
  description: "Next.js documentation",
  basePath: "/nextjs/mcp",
  sections: ["01-app", "02-pages", "03-architecture", "04-community"],
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_nextjs_docs",
      description: "search documentation by keyword",
    },
    { name: "get_nextjs_doc", description: "get full content of a page" },
    { name: "list_nextjs_docs", description: "list available pages" },
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
