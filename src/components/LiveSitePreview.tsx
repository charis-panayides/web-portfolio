import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  label: string;
  variant?: "desktop" | "mobile";
};

export function LiveSitePreview({ url, label, variant = "desktop" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loaded]);

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-accent">
        <div className="font-mono-label text-muted-foreground">
          Preview unavailable
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="border-b border-foreground pb-0.5 text-sm"
        >
          Visit {label} ↗
        </a>
      </div>
    );
  }

  if (variant === "mobile") {
    // Render iframe at 390px width, scale down to fit container (~320px)
    const scale = 320 / 390;
    return (
      <>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center font-mono-label text-muted-foreground">
            Loading {label}…
          </div>
        )}
        <div
          className="absolute left-1/2 top-0 origin-top"
          style={{
            width: 390,
            height: 390 * (19 / 9),
            transform: `translateX(-50%) scale(${scale})`,
          }}
          onMouseEnter={() => setInteractive(true)}
          onMouseLeave={() => setInteractive(false)}
        >
          <iframe
            src={url}
            title={label}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => setLoaded(true)}
            className="h-full w-full border-0 bg-background"
            style={{ pointerEvents: interactive ? "auto" : "none" }}
          />
        </div>
      </>
    );
  }

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setInteractive(true)}
      onMouseLeave={() => setInteractive(false)}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center font-mono-label text-muted-foreground">
          Loading {label}…
        </div>
      )}
      <iframe
        src={url}
        title={label}
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        onLoad={() => setLoaded(true)}
        className="h-full w-full border-0 bg-background"
        style={{ pointerEvents: interactive ? "auto" : "none" }}
      />
      <div
        className={`pointer-events-none absolute bottom-3 right-3 rounded-full bg-foreground/80 px-2.5 py-1 font-mono-label text-[10px] text-background backdrop-blur transition-opacity duration-300 ${
          interactive ? "opacity-0" : "opacity-100"
        }`}
      >
        Hover to interact ↗
      </div>
    </div>
  );
}
