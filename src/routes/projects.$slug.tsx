import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/lib/projects";
import { ScrollingPreview } from "@/components/ScrollingPreview";
import { projectPreviews } from "@/lib/project-previews";

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
  const preview = projectPreviews[project.slug];

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

      <main id="main-content" tabIndex={-1}>
        {/* Title block */}
        <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-12 md:px-12 md:pb-24 md:pt-20">
          <div className="font-mono-label mb-8 text-muted-foreground">
            Project {project.number} / {project.year}
          </div>
          <h1 className="font-display text-[11vw] leading-[0.95] md:text-[7vw]">{project.title}</h1>
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

        {/* Website preview */}
        {preview ? (
          <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-28">
            <div className="font-mono-label mb-6 text-muted-foreground">Website preview — 01</div>
            <ScrollingPreview
              src={preview}
              alt={`${project.title} website`}
              href={project.website}
              label={project.websiteLabel}
              duration={12}
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Hover to explore the full page or open the live website.
            </p>
          </section>
        ) : null}

        {/* Project focus */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="font-mono-label text-muted-foreground">Project focus — 02</div>
                <h2 className="mt-4 max-w-sm font-display text-3xl leading-tight md:text-5xl">
                  Clarity first, with character intact.
                </h2>
              </div>
              <ol className="grid gap-px border border-hairline bg-hairline md:col-span-8 md:grid-cols-2">
                {project.focus.map((item, focusIndex) => (
                  <li key={item} className="min-h-40 bg-background p-6 md:p-8">
                    <span className="font-mono-label text-muted-foreground">
                      {String(focusIndex + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-8 max-w-sm text-base leading-relaxed">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-32">
            <p className="max-w-3xl font-display text-3xl leading-tight md:text-5xl">
              {project.closing}
            </p>
          </div>
        </section>
      </main>

      {/* Next */}
      <section className="border-t border-hairline">
        <Link to="/projects/$slug" params={{ slug: next.slug }} className="group block">
          <div className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 py-10 md:px-12 md:py-14">
            <div>
              <div className="font-mono-label text-muted-foreground">Next — {next.number}</div>
              <div className="mt-2 font-display text-3xl md:text-5xl">{next.title}</div>
            </div>
            <div className="font-mono-label transition-opacity group-hover:opacity-60">→</div>
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
