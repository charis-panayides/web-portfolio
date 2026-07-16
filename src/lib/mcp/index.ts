import { defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import getProjectTool from "./tools/get-project";

export default defineMcp({
  name: "charis-portfolio-mcp",
  title: "Charis Panayides Portfolio",
  version: "0.1.0",
  instructions:
    "Public tools for browsing Charis Panayides' web design portfolio. Use list_projects to see all projects, and get_project with a slug for full details.",
  tools: [listProjectsTool, getProjectTool],
});
