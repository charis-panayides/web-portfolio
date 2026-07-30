import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/lib/projects";
import {
  LaptopPreview,
  LaptopVideoPreview,
  PhonePreview,
  PhoneVideoPreview,
} from "@/components/DevicePreview";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found — Charis Panayides" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — Charis Panayides` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.title} — Charis Panayides` },
        { property: "og:description", content: project.description },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="font-mono-label text-muted-foreground">404</div>
        <h1 className="mt-2 font-display text-4xl">Project not found</h1>
        <Link to="/" className="mt-6 inline-block border-b border-foreground pb-0.5">
          ← Back to work
        </Link>
      </div>
    </div>
  ),
});

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const isAktina = project.slug === "aktina";
  const isCyOmt = project.slug === "cy-omt";
  const isMiaFora = project.slug === "mia-fora";
  const isViiibe = project.slug === "viiibe";
  const asset = (name: string) => `${import.meta.env.BASE_URL}projects/${name}`;

  return (
    <div
      id="top"
      className={`project-page project-page--${project.slug} relative z-10 min-h-screen text-foreground`}
    >
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-8 md:px-12 md:py-10">
        <Link to="/" className="font-display text-xl md:text-2xl">
          Charis Panayides
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="font-mono-label text-muted-foreground hover:text-foreground">
            ← Index
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Title block */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-12 md:px-12 md:pb-24 md:pt-20">
        <div className="font-mono-label mb-8 text-muted-foreground">
          Project {project.number} / {project.year}
        </div>
        <h1 className="font-display text-[11vw] leading-[0.95] md:text-[7vw]">
          {project.title}
        </h1>
      </section>

      {/* Meta grid */}
      <section className="border-y border-hairline">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-6 py-10 md:grid-cols-4 md:gap-6 md:px-12 md:py-12">
          <div>
            <div className="font-mono-label text-muted-foreground">About</div>
            <p className="mt-2 text-base">{project.description}</p>
          </div>
          <div>
            <div className="font-mono-label text-muted-foreground">Role</div>
            <p className="mt-2 text-base">{project.role}</p>
          </div>
          <div>
            <div className="font-mono-label text-muted-foreground">Tools</div>
            <p className="mt-2 text-base">{project.tools}</p>
          </div>
          <div>
            <div className="font-mono-label text-muted-foreground">Live</div>
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block border-b border-foreground pb-0.5 text-base"
            >
              {project.websiteLabel} ↗
            </a>
          </div>
        </div>
      </section>

      {isAktina ? (
        <>
          <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-28">
            <div className="font-mono-label mb-8 text-muted-foreground">
              Desktop presentation — 01
            </div>
            <div className="grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <LaptopPreview
                  src={asset("aktina.png")}
                  alt="AKTINA Educational Center homepage shown inside a laptop"
                />
              </div>
              <div className="space-y-8 md:col-span-3 md:col-start-10">
                <div>
                  <h2 className="font-display text-3xl">Platform overview</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    A scalable educational platform organising courses,
                    certifications and professional examinations across locations,
                    schedules and pricing.
                  </p>
                </div>
                <div>
                  <div className="font-mono-label text-muted-foreground">Project scope</div>
                  <ul className="case-list mt-4">
                    <li>UX/UI design</li>
                    <li>Content architecture</li>
                    <li>WordPress development</li>
                    <li>Custom CMS</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-hairline bg-background/75">
            <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 md:grid-cols-12 md:px-12 md:py-28">
              <div className="md:col-span-4">
                <div className="font-mono-label text-muted-foreground">The challenge — 02</div>
                <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-5xl">
                  Making a large educational catalogue feel clear.
                </h2>
              </div>
              <div className="space-y-8 text-lg leading-relaxed md:col-span-6 md:col-start-7">
                <p>
                  AKTINA needed to organise a large amount of information covering
                  courses, certifications, professional examinations, locations,
                  schedules and pricing. The website needed to remain clear for
                  visitors while also being manageable and scalable for the
                  organisation.
                </p>
                <div>
                  <div className="font-mono-label text-muted-foreground">My approach</div>
                  <p className="mt-3">
                    I created a structured educational catalogue, established clear
                    relationships between courses, certifications and examinations,
                    and made complex information easier to explore.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
            <div className="font-mono-label mb-8 text-muted-foreground">
              Content system — 03
            </div>
            <div className="grid items-start gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <LaptopPreview
                  src={asset("aktina-courses.png")}
                  alt="AKTINA course catalogue shown inside a laptop"
                />
              </div>
              <div className="space-y-8 md:col-span-3 md:col-start-10">
                <div>
                  <h2 className="font-display text-3xl">Designed around relationships</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Custom content relationships connect courses with relevant
                    examinations and certifications. Course arrangements support
                    different locations and pricing categories without duplicating
                    information.
                  </p>
                </div>
                <div>
                  <div className="font-mono-label text-muted-foreground">Key functionality</div>
                  <ul className="case-list mt-4">
                    <li>Structured course catalogue</li>
                    <li>Related exams and certifications</li>
                    <li>Location-specific arrangements</li>
                    <li>Reusable pricing information</li>
                    <li>Custom CMS fields and shortcodes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-24 border-t border-hairline pt-16 md:mt-32 md:pt-24">
              <div className="font-mono-label mb-8 text-muted-foreground">
                Course detail — 04
              </div>
              <div className="grid items-center gap-12 md:grid-cols-12">
                <div className="space-y-5 md:col-span-3">
                  <h2 className="font-display text-3xl">From catalogue to course detail</h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Individual course pages bring the programme overview,
                    arrangements, cost, certification links and registration
                    actions into one consistent structure.
                  </p>
                </div>
                <div className="md:col-span-8 md:col-start-5">
                  <LaptopPreview
                    src={asset("aktina-course-cism.png")}
                    alt="AKTINA CISM individual course page shown inside a laptop"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-hairline">
            <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-20 md:grid-cols-12 md:px-12 md:py-32">
              <div className="md:col-span-4">
                <div className="font-mono-label text-muted-foreground">
                  Responsive presentation — 05
                </div>
                <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
                  The same hierarchy, adapted for smaller screens.
                </h2>
                <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                  Navigation, course discovery, news, categories and contact
                  information remain accessible in a clear single-column flow.
                </p>
              </div>
              <div className="phone-pair aktina-phone-pair md:col-span-6 md:col-start-7">
                <PhonePreview
                  src={asset("aktina-mobile-home.png")}
                  alt="AKTINA homepage displayed on a mobile device"
                />
                <PhonePreview
                  src={asset("aktina-mobile-course.png")}
                  alt="AKTINA CISSP course page displayed on a mobile device"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-12 md:px-12 md:py-32">
              <div className="md:col-span-3">
                <div className="font-mono-label text-muted-foreground">Outcome — 06</div>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <p className="font-display text-3xl leading-tight md:text-5xl">
                  {project.closing}
                </p>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex min-h-11 items-center border-b border-foreground text-base focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Visit AKTINA website ↗
                </a>
              </div>
            </div>
          </section>
        </>
      ) : isCyOmt ? (
        <>
          <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-28">
            <div className="font-mono-label mb-8 text-muted-foreground">
              Programme overview — 01
            </div>
            <div className="grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <LaptopPreview
                  src={asset("cy-omt-home.png")}
                  alt="CY-OMT programme homepage shown inside a laptop"
                />
              </div>
              <div className="space-y-8 md:col-span-3 md:col-start-10">
                <div>
                  <h2 className="font-display text-3xl">Clinical education, clearly presented</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    A professional education website presenting a specialised
                    Orthopaedic Manual Therapy programme with clarity, credibility
                    and structure.
                  </p>
                </div>
                <div>
                  <div className="font-mono-label text-muted-foreground">Project scope</div>
                  <ul className="case-list mt-4">
                    <li>Web design</li>
                    <li>WordPress development</li>
                    <li>Responsive design</li>
                    <li>Content structure</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-hairline bg-background/75">
            <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 md:grid-cols-12 md:px-12 md:py-28">
              <div className="md:col-span-4">
                <div className="font-mono-label text-muted-foreground">The challenge — 02</div>
                <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-5xl">
                  Making dense clinical information feel credible and approachable.
                </h2>
              </div>
              <div className="space-y-8 text-lg leading-relaxed md:col-span-6 md:col-start-7">
                <p>
                  CY-OMT needed a professional website for its Orthopaedic Manual
                  Therapy education programme. Detailed clinical and educational
                  information had to remain authoritative without becoming difficult
                  for prospective students to understand.
                </p>
                <div>
                  <div className="font-mono-label text-muted-foreground">My approach</div>
                  <p className="mt-3">
                    I used a calm clinical visual language, a clear page hierarchy
                    and focused calls to action. Content is organised around the
                    programme, instructors, applications, announcements and
                    frequently asked questions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
            <div className="font-mono-label mb-8 text-muted-foreground">
              Programme structure — 03
            </div>
            <div className="grid items-center gap-12 md:grid-cols-12">
              <div className="space-y-8 md:col-span-3">
                <div>
                  <h2 className="font-display text-3xl">A hierarchy built around trust</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Programme philosophy, teaching standards and practical
                    advantages are separated into readable sections supported by
                    authentic training photography.
                  </p>
                </div>
                <div>
                  <div className="font-mono-label text-muted-foreground">Technology</div>
                  <ul className="case-list mt-4">
                    <li>WordPress</li>
                    <li>Elementor</li>
                    <li>Responsive layouts</li>
                    <li>Application forms</li>
                    <li>Reliable email delivery</li>
                  </ul>
                </div>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <LaptopPreview
                  src={asset("cy-omt-philosophy.png")}
                  alt="CY-OMT programme philosophy page shown inside a laptop"
                />
              </div>
            </div>

          </section>

          <section className="border-y border-hairline">
            <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-20 md:grid-cols-12 md:px-12 md:py-32">
              <div className="md:col-span-4">
                <div className="font-mono-label text-muted-foreground">
                  Responsive presentation — 04
                </div>
                <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
                  Clear calls to action across smaller screens.
                </h2>
                <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                  Programme information, announcements, photography and application
                  routes retain their hierarchy in a focused single-column layout.
                </p>
              </div>
              <div className="phone-pair cy-omt-phone-pair md:col-span-6 md:col-start-7">
                <PhonePreview
                  src={asset("cy-omt-mobile-home.png")}
                  alt="CY-OMT homepage displayed on a mobile device"
                />
                <PhonePreview
                  src={asset("cy-omt-mobile-philosophy.png")}
                  alt="CY-OMT programme philosophy page displayed on a mobile device"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-12 md:px-12 md:py-32">
              <div className="md:col-span-3">
                <div className="font-mono-label text-muted-foreground">Outcome — 05</div>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <p className="font-display text-3xl leading-tight md:text-5xl">
                  A professional and accessible website that communicates the
                  programme’s authority while making it easier for potential
                  students to understand the course and apply.
                </p>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex min-h-11 items-center border-b border-foreground text-base focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Visit CY-OMT website ↗
                </a>
              </div>
            </div>
          </section>
        </>
      ) : isMiaFora ? (
        <>
          <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-28">
            <div className="font-mono-label mb-8 text-muted-foreground">
              Website overview — 01
            </div>
            <div className="grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <LaptopPreview
                  src={asset("mia-fora-home.png")}
                  alt="Μια φορά κι’ έναν καιρό kindergarten homepage shown inside a laptop"
                />
              </div>
              <div className="space-y-8 md:col-span-3 md:col-start-10">
                <div>
                  <h2 className="font-display text-3xl">
                    A welcoming digital home for children and parents
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    A warm kindergarten website combining playful visuals with
                    clear, parent-focused information.
                  </p>
                </div>
                <div>
                  <div className="font-mono-label text-muted-foreground">
                    Project scope
                  </div>
                  <ul className="case-list mt-4">
                    <li>Web design</li>
                    <li>WordPress development</li>
                    <li>Responsive design</li>
                    <li>Search optimisation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-hairline bg-background/75">
            <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 md:grid-cols-12 md:px-12 md:py-28">
              <div className="md:col-span-4">
                <div className="font-mono-label text-muted-foreground">
                  The challenge — 02
                </div>
                <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-5xl">
                  Playful enough for a kindergarten, clear enough for parents.
                </h2>
              </div>
              <div className="space-y-8 text-lg leading-relaxed md:col-span-6 md:col-start-7">
                <p>
                  The website needed to express the warmth, creativity and
                  character of the kindergarten while keeping practical
                  information easy for parents to understand and find.
                </p>
                <div>
                  <div className="font-mono-label text-muted-foreground">
                    My approach
                  </div>
                  <p className="mt-3">
                    I paired friendly colours, children’s artwork and authentic
                    photography with a calm page structure covering the school,
                    classes, activities, enrolment and contact information.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
            <div className="font-mono-label mb-8 text-muted-foreground">
              Story and character — 03
            </div>
            <div className="grid items-center gap-12 md:grid-cols-12">
              <div className="space-y-8 md:col-span-3">
                <div>
                  <h2 className="font-display text-3xl">
                    The school’s identity, told through real moments
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    The profile page combines the kindergarten’s history,
                    philosophy, team and environment without losing the gentle
                    visual language established on the homepage.
                  </p>
                </div>
                <div>
                  <div className="font-mono-label text-muted-foreground">
                    Design decisions
                  </div>
                  <ul className="case-list mt-4">
                    <li>Authentic school photography</li>
                    <li>Watercolour visual language</li>
                    <li>Parent-focused hierarchy</li>
                    <li>Warm, accessible typography</li>
                  </ul>
                </div>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <LaptopPreview
                  src={asset("mia-fora-profile.png")}
                  alt="Μια φορά κι’ έναν καιρό school profile page shown inside a laptop"
                />
              </div>
            </div>
          </section>

          <section className="border-y border-hairline">
            <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
              <div className="font-mono-label mb-8 text-muted-foreground">
                Content structure — 04
              </div>
              <div className="grid items-center gap-12 md:grid-cols-12">
                <div className="md:col-span-8">
                  <LaptopPreview
                    src={asset("mia-fora-activities.png")}
                    alt="Μια φορά κι’ έναν καιρό kindergarten activities page shown inside a laptop"
                  />
                </div>
                <div className="space-y-8 md:col-span-3 md:col-start-10">
                  <div>
                    <h2 className="font-display text-3xl">
                      Learning areas made easy to explore
                    </h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      The programme translates educational ideas into an
                      approachable structure of themes, projects and learning
                      areas, supported by photography from everyday school life.
                    </p>
                  </div>
                  <div>
                    <div className="font-mono-label text-muted-foreground">
                      Technology
                    </div>
                    <ul className="case-list mt-4">
                      <li>WordPress</li>
                      <li>Elementor</li>
                      <li>Jupiter X</li>
                      <li>Slider Revolution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-20 md:grid-cols-12 md:px-12 md:py-32">
              <div className="md:col-span-4">
                <div className="font-mono-label text-muted-foreground">
                  Responsive presentation — 05
                </div>
                <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
                  The same warmth, composed for smaller screens.
                </h2>
                <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                  Key information, photography and programme content remain
                  readable and visually engaging in a focused mobile flow.
                </p>
              </div>
              <div className="phone-pair mia-fora-phone-pair md:col-span-6 md:col-start-7">
                <PhonePreview
                  src={asset("mia-fora-mobile-classes.png")}
                  alt="Kindergarten class information displayed on a mobile device"
                />
                <PhonePreview
                  src={asset("mia-fora-mobile-profile.png")}
                  alt="Kindergarten profile page displayed on a mobile device"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-hairline">
            <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-12 md:px-12 md:py-32">
              <div className="md:col-span-3">
                <div className="font-mono-label text-muted-foreground">
                  Outcome — 06
                </div>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <p className="font-display text-3xl leading-tight md:text-5xl">
                  A welcoming website that communicates the character of the
                  kindergarten while giving parents a simple path to the
                  information they need.
                </p>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex min-h-11 items-center border-b border-foreground text-base focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Visit Μια φορά κι’ έναν καιρό ↗
                </a>
              </div>
            </div>
          </section>
        </>
      ) : isViiibe ? (
        <>
          <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-28">
            <div className="font-mono-label mb-8 text-muted-foreground">
              Studio introduction — 01
            </div>
            <div className="grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <LaptopVideoPreview
                  src={asset("viiibe-intro-desktop.mp4")}
                  alt="VIIIBE Architects website introduction playing inside a laptop"
                />
              </div>
              <div className="space-y-8 md:col-span-3 md:col-start-10">
                <div>
                  <h2 className="font-display text-3xl">
                    Architecture given room to speak
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    A restrained architecture portfolio built around space,
                    imagery and carefully controlled typography.
                  </p>
                </div>
                <div>
                  <div className="font-mono-label text-muted-foreground">
                    Project scope
                  </div>
                  <ul className="case-list mt-4">
                    <li>Art direction</li>
                    <li>Web design</li>
                    <li>WordPress development</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-hairline bg-background/75">
            <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-20 md:grid-cols-12 md:px-12 md:py-28">
              <div className="md:col-span-4">
                <div className="font-mono-label text-muted-foreground">
                  The challenge — 02
                </div>
                <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-5xl">
                  Creating a portfolio where the work remains primary.
                </h2>
              </div>
              <div className="space-y-8 text-lg leading-relaxed md:col-span-6 md:col-start-7">
                <p>
                  VIIIBE Architects needed a restrained architecture portfolio
                  where projects and imagery could carry the experience without
                  visual noise or a conventional corporate presentation.
                </p>
                <div>
                  <div className="font-mono-label text-muted-foreground">
                    My approach
                  </div>
                  <p className="mt-3">
                    I used minimal typography, neutral colours, generous whitespace
                    and a quiet project grid that reflects the architectural
                    character of the studio.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
            <div className="font-mono-label mb-8 text-muted-foreground">
              Project index — 03
            </div>
            <div className="grid items-center gap-12 md:grid-cols-12">
              <div className="md:col-span-8">
                <LaptopPreview
                  src={asset("viiibe-projects.png")}
                  alt="VIIIBE Architects project index shown inside a laptop"
                />
              </div>
              <div className="space-y-8 md:col-span-3 md:col-start-10">
                <div>
                  <h2 className="font-display text-3xl">
                    A disciplined visual index
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Projects are presented as a measured grid of drawings with
                    concise titles, locations and descriptions. The interface stays
                    quiet so the studio’s visual material remains dominant.
                  </p>
                </div>
                <div>
                  <div className="font-mono-label text-muted-foreground">
                    Design decisions
                  </div>
                  <ul className="case-list mt-4">
                    <li>Image-led project grid</li>
                    <li>Restrained typographic hierarchy</li>
                    <li>Concise project metadata</li>
                    <li>Generous negative space</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-hairline">
            <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
              <div className="font-mono-label mb-8 text-muted-foreground">
                Project narrative — 04
              </div>
              <div className="grid items-center gap-12 md:grid-cols-12">
                <div className="space-y-5 md:col-span-3">
                  <h2 className="font-display text-3xl">
                    Drawings and images form the narrative
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    Individual projects use a long, deliberately paced sequence of
                    plans, studies and architectural imagery. Each page feels more
                    like a considered folio than a conventional gallery.
                  </p>
                </div>
                <div className="md:col-span-8 md:col-start-5">
                  <LaptopPreview
                    src={asset("viiibe-family-house.png")}
                    alt="VIIIBE Architects Family House case study shown inside a laptop"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-20 md:grid-cols-12 md:px-12 md:py-32">
              <div className="md:col-span-4">
                <div className="font-mono-label text-muted-foreground">
                  Responsive presentation — 05
                </div>
                <h2 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
                  The same restraint, preserved on smaller screens.
                </h2>
                <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
                  The studio identity, project navigation and publication grid
                  remain composed and legible in a focused mobile format.
                </p>
              </div>
              <div className="phone-pair viiibe-phone-pair md:col-span-6 md:col-start-7">
                <PhoneVideoPreview
                  src={asset("viiibe-intro-mobile.mp4")}
                  alt="VIIIBE Architects mobile introduction playing inside a phone"
                />
                <PhonePreview
                  src={asset("viiibe-mobile-awards.png")}
                  alt="VIIIBE Architects awards and publications page displayed on a mobile device"
                />
              </div>
            </div>
          </section>

          <section className="border-t border-hairline">
            <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-12 md:px-12 md:py-32">
              <div className="md:col-span-3">
                <div className="font-mono-label text-muted-foreground">
                  Outcome — 06
                </div>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <p className="font-display text-3xl leading-tight md:text-5xl">
                  An understated portfolio that allows the architecture to speak
                  through images, space and carefully controlled typography.
                </p>
                <a
                  href="https://viiibearchitects.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex min-h-11 items-center border-b border-foreground text-base focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  Visit VIIIBE Architects ↗
                </a>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-28">
            <div className="font-mono-label mb-6 text-muted-foreground">Desktop — 01</div>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-accent">
              <div className="absolute inset-0 flex items-center justify-center font-mono-label text-muted-foreground">
                Desktop screenshot
              </div>
            </div>
          </section>
          <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-12 md:pb-40">
            <div className="font-mono-label mb-6 text-muted-foreground">Mobile — 02</div>
            <div className="flex justify-center">
              <div className="relative aspect-[9/19] w-full max-w-[320px] rounded-2xl bg-accent" />
            </div>
          </section>
          <section className="border-t border-hairline">
            <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
              <p className="max-w-3xl font-display text-3xl leading-tight md:text-5xl">
                {project.closing}
              </p>
            </div>
          </section>
        </>
      )}

      {/* Next */}
      <section className="border-t border-hairline">
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="project-action group block transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-foreground"
        >
          <div className="mx-auto grid max-w-[1400px] gap-8 px-6 py-16 md:grid-cols-12 md:items-end md:px-12 md:py-24">
            <div className="md:col-span-10">
              <div className="font-mono-label text-muted-foreground">
                Next project — {next.number}
              </div>
              <div className="mt-4 font-display text-5xl leading-none md:text-7xl">
                {next.title}
              </div>
            </div>
            <div
              aria-hidden="true"
              className="project-action-arrow text-sm text-muted-foreground transition-colors group-hover:text-foreground md:col-span-2 md:justify-self-end"
            >
              →
            </div>
          </div>
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
