export type Project = {
  slug: string;
  number: string;
  title: string;
  description: string;
  role: string;
  year: string;
  website: string;
  websiteLabel: string;
  tools: string;
  closing: string;
};

export const projects: Project[] = [
  {
    slug: "aktina",
    number: "01",
    title: "AKTINA Educational Center",
    description:
      "An educational platform organising courses, certifications and professional examinations through a scalable content system.",
    role: "UX/UI Design / WordPress Development / Content Architecture / Custom CMS",
    year: "2025–2026",
    website: "https://aktina.com.cy",
    websiteLabel: "aktina.com.cy",
    tools: "WordPress, Elementor Pro, LearnPress, ACF, CPT UI, TablePress",
    closing:
      "A structured and scalable educational platform that makes complex, interconnected information easier to explore and maintain.",
  },
  {
    slug: "cy-omt",
    number: "02",
    title: "CY-OMT",
    description:
      "Website for an orthopaedic manual therapy education program in Cyprus — clinical, precise and quietly authoritative.",
    role: "Web Design / WordPress Development / SEO / Contact Forms",
    year: "2024",
    website: "https://cy-omt.com",
    websiteLabel: "cy-omt.com",
    tools: "WordPress, Elementor, Figma, WPForms",
    closing:
      "A trustworthy home for a specialised clinical education program.",
  },
  {
    slug: "mia-fora",
    number: "03",
    title: "Μια φορά κι᾽ έναν καιρό",
    description:
      "Warm kindergarten website with playful visuals and clear parent-focused information architecture.",
    role: "Web Design / WordPress Development / Responsive Design",
    year: "2023",
    website: "https://miaforakienankairo.com.cy",
    websiteLabel: "miaforakienankairo.com.cy",
    tools: "WordPress, Elementor, Figma",
    closing:
      "A gentle, welcoming space online — as reassuring for parents as the school itself.",
  },
  {
    slug: "viiibe",
    number: "04",
    title: "VIIIBE Architects",
    description:
      "Minimal architecture portfolio focused on space, projects and visual presentation. Typography and image do all the talking.",
    role: "Web Design / WordPress Development / Portfolio Structure",
    year: "2023",
    website: "https://viiibearchitects.com",
    websiteLabel: "viiibearchitects.com",
    tools: "WordPress, Elementor, Figma",
    closing:
      "A quiet stage for architectural work — restraint, grid and generous whitespace.",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
