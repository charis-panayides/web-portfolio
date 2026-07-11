import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { motion } from "motion/react";
import { useEffect, useState } from "react";


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

function useCyprusTime() {
  const [time, setTime] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Nicosia",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Index() {
  const time = useCyprusTime();

  return (
    <div className="relative z-10 min-h-screen text-foreground">
      <header className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 py-8 md:px-12 md:py-10">
        <Link to="/" className="font-display text-xl md:text-2xl">
          Charis Panayides
        </Link>
        <div className="flex items-center gap-6 font-mono-label text-muted-foreground">
          <span className="hidden sm:inline">Web Design — Cyprus</span>
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
            </span>
            <span className="tabular-nums">Nicosia {time || "—"}</span>
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-16 md:px-12 md:pb-40 md:pt-32">
        <p className="font-mono-label mb-8 text-muted-foreground">
          <span className="font-editorial not-italic normal-case tracking-normal text-sm text-foreground/70">Index</span>
          <span className="mx-2">—</span>
          {String(projects.length).padStart(2, "0")} Projects
        </p>
        <h1 className="font-editorial text-[13vw] leading-[0.95] tracking-tight md:text-[9vw]">
          {["Selected", null, "work."].map((line, i) =>
            line === null ? (
              <span key="mid" className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="block italic"
                >
                  web design
                </motion.span>
              </span>
            ) : (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: i === 0 ? 0.05 : 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            )
          )}
        </h1>
      </section>

      <main className="border-t border-hairline">
        {projects.map((p, idx) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group border-b border-hairline transition-colors duration-500 hover:bg-accent/30"
          >
            <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12 md:py-16">
              <div className="grid grid-cols-12 items-start gap-6 md:gap-8">
                <div className="col-span-12 md:col-span-1 font-mono-label text-muted-foreground">
                  {p.number}
                </div>

                <div className="col-span-12 md:col-span-5">
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="block"
                  >
                    <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
                      <span className="relative inline-block">
                        {p.title}
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-700 ease-out group-hover:w-full" />
                      </span>
                    </h2>
                    <p className="font-editorial italic mt-4 max-w-md text-base text-muted-foreground md:text-lg">
                      {p.description}
                    </p>
                  </Link>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-accent">
                    <LiveSitePreview url={p.website} label={p.websiteLabel} variant="desktop" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center gap-2 bg-gradient-to-b from-background/80 to-transparent px-4 py-3">
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
                      <Link
                        to="/projects/$slug"
                        params={{ slug: p.slug }}
                        className="inline-flex items-center gap-2 border-b border-foreground pb-0.5 text-sm"
                      >
                        View Project
                        <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </Link>
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                      >
                        Visit Website ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </motion.article>
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
