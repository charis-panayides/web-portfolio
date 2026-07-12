import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  href: string;
  label?: string;
  /** Container height in px. Defaults to responsive md/base. */
  className?: string;
  /** Scroll duration in seconds. */
  duration?: number;
};

/**
 * Fixed-height website preview. On hover, slowly scrolls the full-page
 * screenshot from top to bottom. Respects prefers-reduced-motion and
 * disables the effect on touch / small screens.
 */
export function ScrollingPreview({
  src,
  alt,
  href,
  label,
  className,
  duration = 9,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqHover = window.matchMedia("(hover: hover) and (min-width: 768px)");
    const update = () => setEnabled(mqHover.matches && !mqMotion.matches);
    update();
    mqMotion.addEventListener("change", update);
    mqHover.addEventListener("change", update);
    return () => {
      mqMotion.removeEventListener("change", update);
      mqHover.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const compute = () => {
      const c = containerRef.current;
      const i = imgRef.current;
      if (!c || !i) return;
      setOffset(Math.max(0, i.offsetHeight - c.offsetHeight));
    };
    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    if (imgRef.current) ro.observe(imgRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  const translate = enabled && hovering ? -offset : 0;
  const transitionDur = enabled && hovering ? duration : Math.min(1.2, duration / 6);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={cn(
        "group/preview relative block overflow-hidden rounded-[4px] border border-hairline/70 bg-background",
        className,
      )}
      aria-label={`Open ${alt} in a new tab`}
    >
      <div ref={containerRef} className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          className="block w-full select-none will-change-transform"
          style={{
            transform: `translate3d(0, ${translate}px, 0)`,
            transition: `transform ${transitionDur}s cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
          draggable={false}
        />
      </div>
      {label ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-2 border-b border-hairline/60 bg-background/80 px-4 py-3 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-hairline" />
          <span className="h-2 w-2 rounded-full bg-hairline" />
          <span className="h-2 w-2 rounded-full bg-hairline" />
          <span className="ml-3 font-mono-label text-muted-foreground">{label}</span>
        </div>
      ) : null}
    </a>
  );
}
