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
  focus: string[];
  closing: string;
};

export const projects: Project[] = [
  {
    slug: "aktina",
    number: "01",
    title: "AKTINA Educational Center",
    description:
      "Educational website for courses, exams and certifications — built for clarity across a wide catalogue of programs.",
    role: "Web Design / WordPress Development / SEO / Content Structure",
    year: "2025",
    website: "https://aktina.com.cy",
    websiteLabel: "aktina.com.cy",
    tools: "WordPress, Eduma, LearnPress, Elementor Pro, ACF, Rank Math",
    focus: [
      "A clear hierarchy for courses, exams and certifications",
      "Reusable content structures for a growing programme catalogue",
      "Responsive paths that help students find information quickly",
      "Search-friendly pages with a consistent editorial system",
    ],
    closing: "A calm, structured platform that lets students find the right course in seconds.",
  },
  {
    slug: "cy-omt",
    number: "02",
    title: "CY-OMT",
    description:
      "Website for an orthopaedic manual therapy education program in Cyprus — clinical, precise and quietly authoritative.",
    role: "Web Design / WordPress Development / SEO / Contact Forms",
    year: "2026",
    website: "https://cy-omt.com",
    websiteLabel: "cy-omt.com",
    tools: "WordPress, Jupiter X, Elementor, Rank Math, Forms",
    focus: [
      "A credible visual language for specialist clinical education",
      "Straightforward course information and registration paths",
      "Responsive layouts for professionals researching on the move",
      "Search and form foundations that support enquiries",
    ],
    closing: "A trustworthy home for a specialised clinical education program.",
  },
  {
    slug: "mia-fora",
    number: "03",
    title: "Μια φορά κι᾽ έναν καιρό",
    description:
      "Warm kindergarten website with playful visuals and clear parent-focused information architecture.",
    role: "Web Design / WordPress Development / Responsive Design",
    year: "2025",
    website: "https://miaforakienankairo.com.cy",
    websiteLabel: "miaforakienankairo.com.cy",
    tools: "WordPress, Jupiter X, Elementor, Revolution Slider",
    focus: [
      "A warm visual system that still feels clear and organised",
      "Parent-focused navigation for classes and practical information",
      "Playful movement used without overwhelming the content",
      "Responsive pages and enquiry points across devices",
    ],
    closing: "A gentle, welcoming space online — as reassuring for parents as the school itself.",
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
    tools: "WordPress, Elementor, Responsive Design",
    focus: [
      "An image-led portfolio that gives each project room to breathe",
      "Restrained typography and a disciplined architectural grid",
      "Simple project browsing across Greek and English content",
      "A responsive composition that keeps imagery central",
    ],
    closing: "A quiet stage for architectural work — restraint, grid and generous whitespace.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
