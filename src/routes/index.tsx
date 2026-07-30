import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ScrollingPreview } from "@/components/ScrollingPreview";
import { VideoPreview } from "@/components/VideoPreview";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SiteFooter } from "@/components/SiteFooter";

const previewAssets: Record<string, string> = {
  aktina: `${import.meta.env.BASE_URL}projects/aktina.png`,
  "cy-omt": `${import.meta.env.BASE_URL}projects/cy-omt.png`,
  "mia-fora": `${import.meta.env.BASE_URL}projects/mia-fora.png`,
};

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
        }),
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
    <div id="top" className="relative z-10 min-h-screen text-foreground">
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
          <ThemeToggle />
        </div>
      </header>

      <section className="relative mx-auto min-h-[720px] max-w-[1400px] overflow-hidden px-6 pb-24 pt-16 md:min-h-[820px] md:px-12 md:pb-40 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mb-8 flex items-center gap-[5px] whitespace-nowrap font-mono-label text-muted-foreground"
        >
          <span>
            <span className="font-editorial not-italic normal-case tracking-normal text-sm text-foreground/70">
              Index
            </span>
            <span className="mx-2">—</span>
            {String(projects.length).padStart(2, "0")} Projects
          </span>
          {projects.map((project) => (
            <span
              key={project.slug}
              aria-hidden="true"
              className={`h-[7px] w-[7px] shrink-0 sm:h-2 sm:w-2 ${
                project.slug === "viiibe"
                  ? "outline outline-0 outline-offset-0 dark:outline-1 dark:outline-white/40"
                  : ""
              }`}
              style={{ backgroundColor: project.accent }}
            />
          ))}
        </motion.div>
        <h1 className="relative z-10 font-editorial text-[10vw] leading-[0.95] tracking-tight md:text-[7vw]">
          {["Selected", null, "work."].map((line, i) =>
            line === null ? (
              <span
                key="mid"
                className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
              >
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="block italic"
                >
                  web{" "}
                  <span className="inline-block bg-black px-[0.06em] text-white dark:bg-[#ebe8df] dark:text-[#171715]">
                    design
                  </span>
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
            ),
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-16 max-w-xl font-display text-xl italic leading-relaxed text-foreground/75 md:absolute md:bottom-24 md:left-12 md:mt-0 md:text-2xl"
        >
          I design and build clear, characterful websites for people and organisations with something meaningful to share.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mt-12 flex justify-end md:absolute md:bottom-24 md:right-12 md:mt-0"
        >
          <span
            className="font-display text-2xl leading-none tracking-tight md:text-3xl [writing-mode:vertical-rl] rotate-180"
            aria-label="Charis Panayides"
          >
            Charis Panayides
          </span>
        </motion.div>
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
                <div className="col-span-12 flex items-center gap-2 font-mono-label text-muted-foreground md:col-span-1">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 ${
                      p.slug === "viiibe"
                        ? "outline outline-0 outline-offset-0 dark:outline-1 dark:outline-white/40"
                        : ""
                    }`}
                    style={{ backgroundColor: p.accent }}
                  />
                  <span>{p.number}</span>
                </div>

                <div className="col-span-12 md:col-span-5">
                  <Link to="/projects/$slug" params={{ slug: p.slug }} className="block">
                    <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
                      {p.title}
                    </h2>
                    <p className="font-editorial italic mt-4 max-w-md text-base text-muted-foreground md:text-lg">
                      {p.description}
                    </p>
                  </Link>
                </div>

                <div className="col-span-12 md:col-span-6">
                  {p.slug === "viiibe" ? (
                    <VideoPreview
                      src={`${import.meta.env.BASE_URL}projects/viiibe-intro.mp4`}
                      poster={`${import.meta.env.BASE_URL}projects/viiibe-poster.jpg`}
                      title={p.title}
                      label={p.websiteLabel}
                    />
                  ) : previewAssets[p.slug] ? (
                    <ScrollingPreview
                      src={previewAssets[p.slug]}
                      alt={p.title}
                      href={p.website}
                      label={p.websiteLabel}
                    />
                  ) : (
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      className="relative block aspect-[16/10] w-full overflow-hidden rounded-[4px] border border-hairline/70 bg-accent"
                    >
                      <div className="absolute inset-0 flex items-center justify-center font-mono-label text-muted-foreground transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]">
                        {p.websiteLabel}
                      </div>
                      <div className="absolute inset-x-0 top-0 flex items-center gap-2 px-4 py-3">
                        <span className="h-2 w-2 rounded-full bg-hairline" />
                        <span className="h-2 w-2 rounded-full bg-hairline" />
                        <span className="h-2 w-2 rounded-full bg-hairline" />
                      </div>
                    </Link>
                  )}

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 text-sm">
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noreferrer"
                      className="project-action inline-flex min-h-11 items-center gap-2 transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-4"
                    >
                      <span className="project-action-label">View Website</span>
                      <span aria-hidden="true" className="project-action-arrow">
                        →
                      </span>
                    </a>
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      className="project-action inline-flex min-h-11 items-center gap-2 transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-4"
                    >
                      <span className="project-action-label">View Project</span>
                      <span aria-hidden="true" className="project-action-arrow">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </main>

      <SiteFooter />
    </div>
  );
}
