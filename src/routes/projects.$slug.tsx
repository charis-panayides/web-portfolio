import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/lib/projects";
import { LaptopPreview, PhonePreview } from "@/components/DevicePreview";

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
  const asset = (name: string) => `${import.meta.env.BASE_URL}projects/${name}`;

  return (
    <div className="relative z-10 min-h-screen text-foreground">
      <header className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 py-8 md:px-12 md:py-10">
        <Link to="/" className="font-display text-xl md:text-2xl">
          Charis Panayides
        </Link>
        <Link to="/" className="font-mono-label text-muted-foreground hover:text-foreground">
          ← Index
        </Link>
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
              <div className="phone-pair md:col-span-6 md:col-start-7">
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
          className="group block"
        >
          <div className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 py-10 md:px-12 md:py-14">
            <div>
              <div className="font-mono-label text-muted-foreground">
                Next — {next.number}
              </div>
              <div className="mt-2 font-display text-3xl md:text-5xl">
                {next.title}
              </div>
            </div>
            <div className="font-mono-label transition-opacity group-hover:opacity-60">
              →
            </div>
          </div>
        </Link>
      </section>

      <footer className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-10 md:px-12">
        <Link to="/" className="font-mono-label text-muted-foreground hover:text-foreground">
          ← Back to Index
        </Link>
        <div className="font-mono-label text-muted-foreground">
          © {new Date().getFullYear()} Charis Panayides
        </div>
      </footer>
    </div>
  );
}
