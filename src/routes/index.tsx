import { createFileRoute, Link } from "@tanstack/react-router";
import { projects } from "@/lib/projects";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

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
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Nicosia",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(t);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CursorPreview({
  active,
  label,
}: {
  active: boolean;
  label: string;
}) {
  const x = useSpring(0, { stiffness: 220, damping: 28, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 28, mass: 0.4 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
      initial={false}
    >
      <motion.div
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.85,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex h-64 w-96 items-center justify-center overflow-hidden rounded-sm border border-hairline bg-accent shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]">
          <span className="font-mono-label text-muted-foreground">{label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Index() {
  const time = useCyprusTime();
  const [hovered, setHovered] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const hoveredProject = projects.find((p) => p.slug === hovered);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CursorPreview
        active={!!hoveredProject}
        label={hoveredProject?.websiteLabel ?? ""}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-hairline/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
          <Link to="/" className="font-display text-xl md:text-2xl">
            Charis<span className="italic"> Panayides</span>
          </Link>
          <div className="hidden items-center gap-8 md:flex">
            <span className="font-mono-label text-muted-foreground">
              Nicosia · CY
            </span>
            <span className="font-mono-label tabular-nums text-foreground">
              {time || "—"}
            </span>
            <span className="flex items-center gap-2 font-mono-label text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
              </span>
              Available 2026
            </span>
          </div>
          <div className="md:hidden font-mono-label tabular-nums text-muted-foreground">
            {time || "—"}
          </div>
        </div>
      </header>

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="mx-auto max-w-[1400px] px-6 pb-24 pt-20 md:px-12 md:pb-40 md:pt-36"
      >
        <div className="mb-10 flex items-baseline justify-between">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono-label text-muted-foreground"
          >
            Index — {String(projects.length).padStart(2, "0")} Projects
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden font-mono-label text-muted-foreground md:block"
          >
            © 2020 — 2026
          </motion.p>
        </div>

        <h1 className="font-display text-[13vw] leading-[0.92] tracking-tight md:text-[9vw]">
          {["Selected", "web design", "work."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`block ${i === 1 ? "italic" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid grid-cols-1 gap-8 border-t border-hairline pt-8 md:grid-cols-3 md:gap-12"
        >
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:col-span-2">
            An independent web designer based in Cyprus. Quiet interfaces,
            editorial rhythm, and websites that get out of the way of the work
            they carry.
          </p>
          <div className="flex items-end justify-start md:justify-end">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 font-mono-label"
            >
              <span className="h-px w-8 bg-foreground transition-all duration-500 group-hover:w-16" />
              Scroll to work
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Work list */}
      <main id="work" className="border-t border-hairline">
        {projects.map((p, i) => (
          <motion.article
            key={p.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(p.slug)}
            onMouseLeave={() => setHovered(null)}
            className="group relative border-b border-hairline transition-colors duration-500 hover:bg-accent/40"
          >
            <Link
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="block"
            >
              <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12 md:py-16">
                <div className="grid grid-cols-12 items-baseline gap-6 md:gap-8">
                  <div className="col-span-2 font-mono-label text-muted-foreground md:col-span-1">
                    {p.number}
                  </div>

                  <div className="col-span-10 md:col-span-6">
                    <h2 className="font-display text-4xl leading-[1.02] md:text-[5.5rem]">
                      <span className="relative inline-block">
                        {p.title}
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-700 ease-out group-hover:w-full" />
                      </span>
                    </h2>
                  </div>

                  <div className="col-span-6 hidden md:col-span-3 md:block">
                    <div className="font-mono-label text-muted-foreground">
                      Role
                    </div>
                    <div className="mt-2 text-sm">
                      {p.role.split(" / ")[0]}
                    </div>
                  </div>

                  <div className="col-span-6 flex items-baseline justify-end gap-6 md:col-span-2">
                    <span className="font-mono-label text-muted-foreground">
                      {p.year}
                    </span>
                    <span
                      aria-hidden
                      className="font-display text-2xl transition-transform duration-500 group-hover:translate-x-2"
                    >
                      →
                    </span>
                  </div>
                </div>

                {/* Mobile inline preview */}
                <div className="mt-6 md:hidden">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-accent">
                    <div className="absolute inset-0 flex items-center justify-center font-mono-label text-muted-foreground">
                      {p.websiteLabel}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </main>

      {/* Marquee */}
      <section className="overflow-hidden border-b border-hairline py-10">
        <div className="flex animate-[marquee_40s_linear_infinite] whitespace-nowrap gap-16 font-display text-6xl md:text-8xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              <span>Available for select projects</span>
              <span className="italic text-muted-foreground">— 2026 —</span>
              <span>Available for select projects</span>
              <span className="italic text-muted-foreground">— 2026 —</span>
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <footer className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="font-mono-label text-muted-foreground">
              (Contact)
            </div>
            <h3 className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl">
              Let&apos;s make something{" "}
              <span className="italic">quiet</span> and useful.
            </h3>
            <a
              href="mailto:hello@charispanayides.com"
              className="group mt-10 inline-flex items-baseline gap-3 font-display text-2xl md:text-3xl"
            >
              hello@charispanayides.com
              <span className="inline-block h-px w-10 translate-y-[-6px] bg-foreground transition-all duration-500 group-hover:w-20" />
            </a>
          </div>
          <div className="flex flex-col justify-between gap-8 md:col-span-4 md:items-end">
            <div>
              <div className="font-mono-label text-muted-foreground">
                Elsewhere
              </div>
              <ul className="mt-4 space-y-2 text-right font-display text-xl">
                <li><a href="#" className="hover:italic">Instagram</a></li>
                <li><a href="#" className="hover:italic">Are.na</a></li>
                <li><a href="#" className="hover:italic">Read.cv</a></li>
              </ul>
            </div>
            <div className="font-mono-label text-muted-foreground">
              © {new Date().getFullYear()} — Nicosia, CY
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
