import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getProject, projects } from "@/lib/projects";

export default defineTool({
  name: "get_project",
  title: "Get portfolio project",
  description:
    "Get full details of a single portfolio project by its slug (e.g. 'aktina', 'cy-omt', 'mia-fora', 'viiibe').",
  inputSchema: {
    slug: z
      .string()
      .min(1)
      .describe("The project slug. Use list_projects to see all available slugs."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const project = getProject(slug);
    if (!project) {
      const available = projects.map((p) => p.slug).join(", ");
      return {
        content: [
          {
            type: "text",
            text: `No project found with slug "${slug}". Available slugs: ${available}`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(project, null, 2) }],
      structuredContent: { project },
    };
  },
});
