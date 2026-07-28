import { useEffect, useRef, useState } from "react";

type PreviewProps = {
  src: string;
  alt: string;
  duration?: number;
};

type VideoPreviewProps = {
  src: string;
  alt: string;
};

function MovingScreenshot({ src, alt, duration = 12 }: PreviewProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !imageRef.current) return;
      setOffset(
        Math.max(0, imageRef.current.offsetHeight - viewportRef.current.offsetHeight),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (imageRef.current) observer.observe(imageRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={viewportRef} className="device-scroll group relative h-full overflow-hidden">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="block w-full select-none"
        style={{ "--scroll-offset": `${-offset}px`, "--scroll-time": `${duration}s` } as React.CSSProperties}
        draggable={false}
      />
      <span className="device-hint" aria-hidden="true">
        Hover to explore
      </span>
    </div>
  );
}

export function LaptopPreview({ src, alt }: PreviewProps) {
  return (
    <figure className="laptop">
      <div className="laptop-screen">
        <div className="laptop-camera" />
        <MovingScreenshot src={src} alt={alt} duration={14} />
      </div>
      <div className="laptop-base">
        <div className="laptop-notch" />
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}

export function PhonePreview({ src, alt }: PreviewProps) {
  return (
    <figure className="phone">
      <div className="phone-speaker" />
      <MovingScreenshot src={src} alt={alt} duration={16} />
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}

export function LaptopVideoPreview({ src, alt }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    void videoRef.current?.play();
  };

  const reset = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <figure
      className="laptop video-preview"
      onMouseEnter={play}
      onMouseLeave={reset}
      onFocus={play}
      onBlur={reset}
      tabIndex={0}
    >
      <div className="laptop-screen">
        <div className="laptop-camera" />
        <div className="device-video-shell">
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            className="device-video"
            aria-label={alt}
          />
          <span className="device-hint video-hint" aria-hidden="true">
            Hover to play
          </span>
        </div>
      </div>
      <div className="laptop-base">
        <div className="laptop-notch" />
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}

export function PhoneVideoPreview({ src, alt }: VideoPreviewProps) {
  return (
    <figure className="phone phone-video-preview">
      <div className="phone-speaker" />
      <div className="device-video-shell">
        <video
          src={src}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="device-video"
          aria-label={alt}
        />
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
