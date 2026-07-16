import { defineTool } from "@lovable.dev/mcp-js";
import { projects } from "@/lib/projects";

export default defineTool({
  name: "list_projects",
  title: "List portfolio projects",
  description:
    "List all web design projects in Charis Panayides' portfolio, including title, description, role, year, tools, and website URL.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(projects, null, 2) }],
    structuredContent: { projects },
  }),
});
