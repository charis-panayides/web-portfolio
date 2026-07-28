import { useRef } from "react";

type Props = {
  src: string;
  poster: string;
  title: string;
  label: string;
};

export function VideoPreview({ src, poster, title, label }: Props) {
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

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div
      className="group/video relative block overflow-hidden rounded-[4px] border border-hairline/70 bg-background"
      onMouseEnter={play}
      onMouseLeave={reset}
    >
      <div className="flex items-center gap-2 border-b border-hairline/60 bg-background px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-hairline" />
        <span className="h-2 w-2 rounded-full bg-hairline" />
        <span className="h-2 w-2 rounded-full bg-hairline" />
        <span className="ml-3 font-mono-label text-muted-foreground">{label}</span>
      </div>
      <button
        type="button"
        onClick={toggle}
        className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden"
        aria-label={`Play or pause ${title} website preview`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-4 right-4 border border-white/50 bg-black/55 px-3 py-2 font-mono-label text-white opacity-100 transition-opacity group-hover/video:opacity-0">
          Hover to play
        </span>
      </button>
    </div>
  );
}
