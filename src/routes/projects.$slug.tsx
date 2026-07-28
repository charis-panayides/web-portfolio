import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CaseStudyMedia } from "@/components/CaseStudyMedia";
import { projectPreviews } from "@/lib/project-previews";
import { getProject, projects } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Charis Panayides` },
          { name: "description", content: loaderData.project.description },
        ]
      : [{ title: "Project not found — Charis Panayides" }],
  }),
  component: ProjectPage,
});

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed">
          <span aria-hidden="true">—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="relative z-10 min-h-screen text-foreground">
      <header className="mx-auto flex max-w-[1400px] items-baseline justify-between gap-6 px-6 py-8 md:px-12 md:py-10">
        <Link to="/" className="font-display text-xl md:text-2xl">
          Charis Panayides
        </Link>
        <nav aria-label="Case study navigation" className="flex gap-5 font-mono-label">
          <Link to="/" hash="work" className="editorial-link">
            Work
          </Link>
          <Link to="/" hash="contact" className="editorial-link">
            Contact
          </Link>
        </nav>
      </header>

      <main id="main-content">
        <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-12 md:px-12 md:pb-24 md:pt-20">
          <p className="font-mono-label text-muted-foreground">
            Project {project.number} / {project.year}
          </p>
          <h1 className="mt-7 max-w-6xl font-display text-[14vw] leading-[0.9] sm:text-[10vw] md:text-[7vw]">
            {project.title}
          </h1>
          <p className="mt-10 max-w-3xl font-editorial text-xl leading-relaxed text-muted-foreground md:text-2xl">
            {project.description}
          </p>
        </section>

        <section aria-label="Project information" className="border-y border-hairline">
          <dl className="mx-auto grid max-w-[1400px] gap-8 px-6 py-10 md:grid-cols-4 md:px-12 md:py-14">
            <div>
              <dt className="font-mono-label text-muted-foreground">Client / organisation</dt>
              <dd className="mt-2 leading-relaxed">{project.client}</dd>
            </div>
            <div>
              <dt className="font-mono-label text-muted-foreground">My responsibilities</dt>
              <dd className="mt-2 leading-relaxed">{project.role}</dd>
            </div>
            <div>
              <dt className="font-mono-label text-muted-foreground">Year</dt>
              <dd className="mt-2">{project.year}</dd>
            </div>
            <div>
              <dt className="font-mono-label text-muted-foreground">Live website</dt>
              <dd className="mt-2">
                <a
                  href={project.website}
                  target="_blank"
                  rel="noreferrer"
                  className="editorial-link"
                  aria-label={`Visit ${project.title} website (opens in a new tab)`}
                >
                  {project.websiteLabel} ↗
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="mx-auto grid max-w-[1400px] gap-14 px-6 py-16 md:grid-cols-12 md:px-12 md:py-28">
          <div className="md:col-span-7">
            <p className="font-mono-label text-muted-foreground">The original challenge</p>
            <h2 className="sr-only">The original challenge</h2>
            <p className="mt-5 font-display text-3xl leading-tight md:text-5xl">
              {project.challenge}
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="font-mono-label text-muted-foreground">Responsibilities</p>
            <TextList items={project.responsibilities} />
          </div>
        </section>

        <section className="border-y border-hairline">
          <div className="mx-auto grid max-w-[1400px] gap-14 px-6 py-16 md:grid-cols-12 md:px-12 md:py-28">
            <div className="md:col-span-5">
              <p className="font-mono-label text-muted-foreground">Design approach</p>
              <h2 className="mt-4 font-display text-4xl md:text-6xl">Clarity through structure.</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.approach}
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <p className="font-mono-label text-muted-foreground">Important decisions</p>
              <TextList items={project.decisions} />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1400px] gap-14 px-6 py-16 md:grid-cols-12 md:px-12 md:py-28">
          <div className="md:col-span-6">
            <p className="font-mono-label text-muted-foreground">
              Website structure and functionality
            </p>
            <TextList items={project.structure} />
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="font-mono-label text-muted-foreground">Technologies used</p>
            <TextList items={project.technologies} />
          </div>
        </section>

        <CaseStudyMedia
          src={projectPreviews[project.slug]}
          title={project.title}
          alt={project.imageAlt}
          website={project.website}
          websiteLabel={project.websiteLabel}
        />

        <section className="border-t border-hairline">
          <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
            <p className="font-mono-label text-muted-foreground">Final outcome</p>
            <h2 className="sr-only">Final outcome</h2>
            <p className="mt-5 max-w-4xl font-display text-3xl leading-tight md:text-5xl">
              {project.outcome}
            </p>
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="editorial-link mt-10 inline-flex min-h-11 items-center"
              aria-label={`Visit ${project.title} website (opens in a new tab)`}
            >
              Visit Website ↗
            </a>
          </div>
        </section>

        <nav aria-label="Project pagination" className="border-y border-hairline">
          <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
            <Link
              to="/projects/$slug"
              params={{ slug: previous.slug }}
              className="group px-6 py-10 md:border-r md:border-hairline md:px-12 md:py-14"
            >
              <span className="font-mono-label text-muted-foreground">← Previous Project</span>
              <span className="mt-3 block font-display text-3xl md:text-4xl">{previous.title}</span>
            </Link>
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="group border-t border-hairline px-6 py-10 text-right md:border-t-0 md:px-12 md:py-14"
            >
              <span className="font-mono-label text-muted-foreground">Next Project →</span>
              <span className="mt-3 block font-display text-3xl md:text-4xl">{next.title}</span>
            </Link>
          </div>
        </nav>
      </main>

      <footer className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6 px-6 py-10 md:px-12">
        <Link to="/" hash="work" className="editorial-link font-mono-label">
          ← Back to all projects
        </Link>
        <span className="font-mono-label text-muted-foreground">
          © {new Date().getFullYear()} Charis Panayides
        </span>
      </footer>
    </div>
  );
}
