import { createFileRoute, Link } from "@tanstack/react-router";
import { ScrollingPreview } from "@/components/ScrollingPreview";
import { projectPreviews } from "@/lib/project-previews";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charis Panayides — Selected Web Design Work" },
      {
        name: "description",
        content:
          "Independent web designer and developer in Cyprus creating thoughtful WordPress websites.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative z-10 min-h-screen text-foreground">
      <header className="mx-auto flex max-w-[1400px] items-baseline justify-between gap-6 px-6 py-8 md:px-12 md:py-10">
        <Link to="/" className="font-display text-xl md:text-2xl">
          Charis Panayides
        </Link>
        <nav aria-label="Primary navigation" className="flex gap-5 font-mono-label">
          <a href="#work" className="editorial-link">
            Work
          </a>
          <a href="#contact" className="editorial-link">
            Contact
          </a>
        </nav>
      </header>

      <section className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-16 md:px-12 md:pb-40 md:pt-28">
        <p className="mb-8 font-mono-label text-muted-foreground">
          Index <span className="mx-2">—</span>
          {String(projects.length).padStart(2, "0")} Projects
        </p>
        <h1 className="font-editorial text-[16vw] leading-[0.9] tracking-tight sm:text-[12vw] md:text-[7vw]">
          <span className="block">Selected</span>
          <span className="block italic">web design</span>
          <span className="block">work.</span>
        </h1>
        <p className="mt-12 max-w-xl text-base leading-relaxed text-muted-foreground md:mt-16 md:text-lg">
          Independent web designer and developer based in Cyprus, creating thoughtful WordPress
          websites for educational, cultural and professional organisations.
        </p>
      </section>

      <main id="main-content" className="border-t border-hairline">
        <div id="work" className="scroll-mt-4" />
        {projects.map((project) => (
          <article
            key={project.slug}
            className="group border-b border-hairline transition-colors duration-300 hover:bg-accent/25"
          >
            <div className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 md:py-20">
              <div className="grid grid-cols-12 items-start gap-6 md:gap-8">
                <div className="col-span-12 font-mono-label text-muted-foreground md:col-span-1">
                  {project.number}
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Link to="/projects/$slug" params={{ slug: project.slug }} className="block">
                    <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
                      {project.title}
                    </h2>
                    <p className="mt-5 max-w-md font-editorial text-base leading-relaxed text-muted-foreground md:text-lg">
                      {project.description}
                    </p>
                  </Link>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <ScrollingPreview
                    src={projectPreviews[project.slug]}
                    alt={project.imageAlt}
                    href={project.website}
                    label={project.websiteLabel}
                  />
                  <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-[minmax(0,2fr)_auto]">
                    <div>
                      <dt className="font-mono-label text-muted-foreground">Role</dt>
                      <dd className="mt-1 max-w-xl leading-relaxed">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="font-mono-label text-muted-foreground">Year</dt>
                      <dd className="mt-1">{project.year}</dd>
                    </div>
                  </dl>
                  <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="editorial-link inline-flex min-h-11 items-center gap-2"
                    >
                      View Project <span aria-hidden="true">→</span>
                    </Link>
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noreferrer"
                      className="editorial-link inline-flex min-h-11 items-center gap-2 text-muted-foreground"
                      aria-label={`Visit ${project.title} website (opens in a new tab)`}
                    >
                      Visit Website <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </main>

      <footer id="contact" className="scroll-mt-4">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
          <p className="font-mono-label text-muted-foreground">Contact</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl leading-tight md:text-6xl">
            Let&apos;s make something quiet and useful.
          </h2>
          <p className="mt-5 text-base text-muted-foreground md:text-lg">
            Available for freelance projects and selected opportunities.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            <a
              className="editorial-link inline-flex min-h-11 items-center"
              href="mailto:harris_panayides@outlook.com"
            >
              Email me →
            </a>
            <a
              className="editorial-link inline-flex min-h-11 items-center"
              href="https://www.linkedin.com/in/charis-panayides-a57ba8254/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
          <p className="mt-20 font-mono-label text-muted-foreground">
            © {new Date().getFullYear()} Charis Panayides
          </p>
        </div>
      </footer>
    </div>
  );
}
