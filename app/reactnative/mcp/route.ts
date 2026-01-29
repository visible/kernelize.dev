import { createcontent } from "@/lib/content";
import { createmcp } from "@/lib/mcp";

const content = createcontent("reactnative");

const { handler, page } = createmcp({
  name: "reactnative",
  title: "react native",
  description: "React Native framework documentation",
  basePath: "/reactnative/mcp",
  sections: content.getSections(),
  searchDocs: content.searchDocs,
  getDoc: content.getDoc,
  listDocs: content.listDocs,
  tools: [
    {
      name: "search_reactnative_docs",
      description: "search documentation by keyword",
    },
    { name: "get_reactnative_doc", description: "get full content of a page" },
    { name: "list_reactnative_docs", description: "list available pages" },
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
