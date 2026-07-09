import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Charis Panayides — Selected Web Design Work" },
      {
        name: "description",
        content:
          "Selected web design and WordPress projects by Charis Panayides — editorial, minimal, thoughtfully built.",
      },
      { property: "og:title", content: "Charis Panayides — Selected Web Design Work" },
      {
        property: "og:description",
        content: "Selected web design and WordPress projects by Charis Panayides.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 py-8 md:px-12 md:py-10">
        <Link to="/" className="font-display text-xl md:text-2xl">
          Charis Panayides
        </Link>
        <div className="font-mono-label text-muted-foreground">
          Web Design — Cyprus
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-16 md:px-12 md:pb-40 md:pt-32">
        <p className="font-mono-label mb-8 text-muted-foreground">
          Index — {String(projects.length).padStart(2, "0")} Projects
        </p>
        <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight md:text-[9vw]">
          Selected
          <br />
          <span className="italic">web design</span> work.
        </h1>
      </section>

      <main className="border-t border-hairline">
        {projects.map((p) => (
          <article
            key={p.slug}
            className="group border-b border-hairline"
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="block"
            >
              <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12 md:py-16">
                <div className="grid grid-cols-12 items-start gap-6 md:gap-8">
                  <div className="col-span-12 md:col-span-1 font-mono-label text-muted-foreground">
                    {p.number}
                  </div>

                  <div className="col-span-12 md:col-span-5">
                    <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
                      {p.title}
                    </h2>
                    <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
                      {p.description}
                    </p>
                  </div>

                  <div className="col-span-12 md:col-span-6">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-accent">
                      <div className="absolute inset-0 flex items-center justify-center font-mono-label text-muted-foreground">
                        {p.websiteLabel}
                      </div>
                      <div className="absolute inset-x-0 top-0 flex items-center gap-2 px-4 py-3">
                        <span className="h-2 w-2 rounded-full bg-hairline" />
                        <span className="h-2 w-2 rounded-full bg-hairline" />
                        <span className="h-2 w-2 rounded-full bg-hairline" />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
                      <div>
                        <div className="font-mono-label text-muted-foreground">Role</div>
                        <div className="mt-1">{p.role.split(" / ")[0]}</div>
                      </div>
                      <div>
                        <div className="font-mono-label text-muted-foreground">Year</div>
                        <div className="mt-1">{p.year}</div>
                      </div>
                      <div className="col-span-2 flex items-end justify-end gap-6 md:col-span-2">
                        <span className="border-b border-foreground pb-0.5 text-sm transition-opacity group-hover:opacity-60">
                          View Project →
                        </span>
                        <a
                          href={p.website}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          Visit Website ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </main>

      <footer className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-16 md:flex-row md:items-end md:justify-between md:px-12 md:py-24">
        <div>
          <div className="font-mono-label text-muted-foreground">Contact</div>
          <div className="mt-2 font-display text-3xl md:text-5xl">
            Let&apos;s make something quiet and useful.
          </div>
        </div>
        <div className="font-mono-label text-muted-foreground">
          © {new Date().getFullYear()} Charis Panayides
        </div>
      </footer>
    </div>
  );
}
