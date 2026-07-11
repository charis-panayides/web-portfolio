import aktinaAsset from "@/assets/aktina.png.asset.json";
import cyomtAsset from "@/assets/cyomt.png.asset.json";
import miaforaAsset from "@/assets/miafora.png.asset.json";
import viiibeAsset from "@/assets/viiibe.png.asset.json";

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
  image: string;
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "aktina",
    number: "01",
    title: "AKTINA Educational Center",
    description:
      "Educational website for courses, exams and certifications — built for clarity across a wide catalogue of programs.",
    role: "Web Design / WordPress Development / SEO / Content Structure",
    year: "2024",
    website: "https://aktina.com.cy",
    websiteLabel: "aktina.com.cy",
    tools: "WordPress, Elementor, Figma, Rank Math",
    closing:
      "A calm, structured platform that lets students find the right course in seconds.",
    image: aktinaAsset.url,
    accent: "#e53935",
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
    image: cyomtAsset.url,
    accent: "#f2994a",
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
    image: miaforaAsset.url,
    accent: "#5aa9e6",
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
    image: viiibeAsset.url,
    accent: "#4a4a4a",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
