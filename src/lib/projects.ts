export type Project = {
  slug: string;
  number: string;
  title: string;
  client: string;
  description: string;
  role: string;
  year: string;
  website: string;
  websiteLabel: string;
  challenge: string;
  responsibilities: string[];
  approach: string;
  decisions: string[];
  structure: string[];
  technologies: string[];
  outcome: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "aktina",
    number: "01",
    title: "AKTINA Educational Center",
    client: "AKTINA Educational Center",
    description:
      "An educational platform organising courses, certifications and professional examinations through a scalable content system.",
    role: "UX/UI Design · WordPress Development · Content Architecture · Custom CMS",
    year: "2025–2026",
    website: "https://aktina.com.cy",
    websiteLabel: "aktina.com.cy",
    challenge:
      "AKTINA needed to organise a large amount of information covering courses, certifications, professional examinations, locations, schedules and pricing. The website needed to remain clear for visitors while also being manageable and scalable for the organisation.",
    responsibilities: [
      "UX/UI Design",
      "WordPress Development",
      "Content Architecture",
      "Custom CMS Development",
    ],
    approach:
      "I created a structured educational catalogue, established clear relationships between courses, certifications and examinations, and made complex information easier to explore through consistent hierarchy and reusable content patterns.",
    decisions: [
      "Treat courses, examinations and certifications as connected content rather than isolated pages.",
      "Keep schedules, locations and pricing close to the relevant programme information.",
      "Use reusable fields and templates so the catalogue can grow consistently.",
      "Balance a dense catalogue with restrained typography, grouping and navigation.",
    ],
    structure: [
      "Course, certification and professional examination catalogue",
      "Location-specific arrangements, schedules and pricing categories",
      "Custom relationships connecting relevant examinations and certifications",
      "LearnPress content supported by custom fields, tables and shortcodes",
    ],
    technologies: [
      "WordPress",
      "Elementor Pro",
      "LearnPress",
      "Advanced Custom Fields",
      "Custom Post Type UI",
      "TablePress",
      "Custom shortcodes",
    ],
    outcome:
      "A structured and scalable educational platform that allows visitors to find relevant programmes more easily and enables the organisation to maintain interconnected content.",
    imageAlt: "AKTINA Educational Center website showing its course and certification catalogue",
  },
  {
    slug: "cy-omt",
    number: "02",
    title: "CY-OMT",
    client: "Cyprus Orthopaedic Manual Therapy",
    description:
      "A professional education website presenting a specialised clinical programme with clarity, credibility and structure.",
    role: "Web Design · WordPress Development · Responsive Design",
    year: "2026",
    website: "https://cy-omt.com",
    websiteLabel: "cy-omt.com",
    challenge:
      "CY-OMT needed a professional website for its Orthopaedic Manual Therapy education programme. Dense clinical and educational information had to be presented in a way that felt credible, clear and approachable.",
    responsibilities: [
      "Web Design",
      "WordPress Development",
      "Responsive Design",
      "Content Structure",
    ],
    approach:
      "I used a calm clinical visual language, a clear page hierarchy and focused calls to action. Information is organised around the programme, instructors, applications, announcements and frequently asked questions.",
    decisions: [
      "Use a restrained clinical palette and measured typography to communicate authority without feeling distant.",
      "Break dense programme information into clear, scannable sections.",
      "Keep application actions visible at the moments where a prospective student is ready to proceed.",
      "Design each content block to remain readable and ordered on smaller screens.",
    ],
    structure: [
      "Programme overview and curriculum",
      "Instructor profiles",
      "Applications and enquiry forms",
      "Announcements and frequently asked questions",
    ],
    technologies: [
      "WordPress",
      "Elementor",
      "Jupiter X",
      "Responsive layouts",
      "Application forms",
      "Reliable email delivery",
    ],
    outcome:
      "A professional and accessible website that clearly communicates the programme’s authority while making it easier for potential students to understand the course and apply.",
    imageAlt: "CY-OMT website presenting the Orthopaedic Manual Therapy education programme",
  },
  {
    slug: "mia-fora",
    number: "03",
    title: "Μια φορά κι’ έναν καιρό",
    client: "Μια φορά κι’ έναν καιρό Kindergarten",
    description:
      "A warm kindergarten website combining playful visuals with clear, parent-focused information.",
    role: "Web Design · WordPress Development · SEO",
    year: "2025",
    website: "https://miaforakienankairo.com.cy",
    websiteLabel: "miaforakienankairo.com.cy",
    challenge:
      "Create a warm and playful kindergarten website while keeping important information clear and accessible to parents.",
    responsibilities: ["Web Design", "WordPress Development", "Responsive Design", "SEO"],
    approach:
      "Friendly colours and playful visuals are combined with a clear parent-focused structure covering the kindergarten, activities, classes, enrolment and contact information.",
    decisions: [
      "Let expressive visuals establish warmth while keeping navigation and information calm.",
      "Prioritise the questions parents need answered before enrolment.",
    ],
    structure: [
      "Kindergarten introduction",
      "Activities and classes",
      "Enrolment information",
      "Contact details and enquiries",
    ],
    technologies: ["WordPress", "Elementor", "Jupiter X", "Slider Revolution"],
    outcome:
      "A welcoming website that communicates the character of the kindergarten while giving parents a simple path to the information they need.",
    imageAlt: "Μια φορά κι’ έναν καιρό kindergarten website with playful, parent-focused content",
  },
  {
    slug: "viiibe",
    number: "04",
    title: "VIIIBE Architects",
    client: "VIIIBE Architects",
    description:
      "A restrained architecture portfolio built around space, imagery and quiet typography.",
    role: "Art Direction · Web Design · WordPress Development",
    year: "2023",
    website: "https://viiibearchitects.com",
    websiteLabel: "viiibearchitects.com",
    challenge:
      "Create a restrained architecture portfolio where projects and imagery remain the primary focus.",
    responsibilities: ["Art Direction", "Web Design", "WordPress Development"],
    approach:
      "Minimal typography, neutral colours, generous whitespace and a quiet project grid reflect the architectural character of the studio.",
    decisions: [
      "Keep interface elements subordinate to architectural imagery.",
      "Use spacing and typographic rhythm to give each project room to breathe.",
    ],
    structure: [
      "Bilingual project index",
      "Image-led project pages",
      "Studio information and contact details",
      "Responsive presentation across desktop and mobile",
    ],
    technologies: ["WordPress", "Elementor", "Responsive bilingual implementation"],
    outcome:
      "An understated bilingual portfolio that allows the architecture to speak through images, space and carefully controlled typography.",
    imageAlt: "VIIIBE Architects portfolio showing an image-led architectural project grid",
  },
];

export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
