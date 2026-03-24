import { useEffect, useRef, useState, useCallback } from "react";
import { Reveal } from "@/components/Reveal";

const slides = [
  { video: "/videos/hero-slide-1.mp4", poster: "/videos/hero-slide-1-poster.jpg" },
  { video: "/videos/hero-slide-2.mp4", poster: "/videos/hero-slide-2-poster.jpg" },
  { video: "/videos/hero-slide-3.mp4", poster: "/videos/hero-slide-3-poster.jpg" },
];

const SCENE_DURATION = 8000;
const FADE_DURATION = 1800;

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sceneTimerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (sceneTimerRef.current) {
      window.clearTimeout(sceneTimerRef.current);
      sceneTimerRef.current = null;
    }
    if (fadeTimerRef.current) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  const playVideo = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  const pauseInactiveVideos = useCallback((keepIndexes: number[]) => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (!keepIndexes.includes(index)) {
        video.pause();
      }
    });
  }, []);

  const startTransition = useCallback(() => {
    if (slides.length <= 1 || prefersReducedMotion) return;

    const upcomingIndex = (activeIndex + 1) % slides.length;
    setNextIndex(upcomingIndex);
    setTransitioning(true);

    playVideo(upcomingIndex);

    fadeTimerRef.current = window.setTimeout(() => {
      setActiveIndex(upcomingIndex);
      setNextIndex(null);
      setTransitioning(false);
      pauseInactiveVideos([upcomingIndex]);
    }, FADE_DURATION);
  }, [activeIndex, pauseInactiveVideos, playVideo, prefersReducedMotion]);

  useEffect(() => {
    clearTimers();

    playVideo(activeIndex);
    pauseInactiveVideos(nextIndex !== null ? [activeIndex, nextIndex] : [activeIndex]);

    if (!prefersReducedMotion && slides.length > 1) {
      sceneTimerRef.current = window.setTimeout(() => {
        startTransition();
      }, SCENE_DURATION);
    }

    return clearTimers;
  }, [activeIndex, nextIndex, prefersReducedMotion, startTransition, clearTimers, playVideo, pauseInactiveVideos]);

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] max-h-[1100px] overflow-hidden">
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;
        const isNext = i === nextIndex;
        const isVisible = isActive || isNext;
        const shouldLoad = isVisible || i === (activeIndex + 1) % slides.length;

        return (
          <div
            key={slide.video}
            className="absolute inset-0 h-full w-full"
            style={{
              opacity: isActive || (isNext && transitioning) ? 1 : 0,
              zIndex: isNext ? 2 : isActive ? 1 : 0,
              transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
            aria-hidden={!isActive}
          >
            <img
              src={slide.poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />

            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={shouldLoad ? slide.video : undefined}
              poster={slide.poster}
              muted
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              loop={slides.length === 1}
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            />
          </div>
        );
      })}

      <div
        className="absolute inset-0 z-10"
        style={{
          background: [
            "linear-gradient(to bottom, hsl(0 0% 0% / 0.68) 0%, hsl(0 0% 0% / 0.34) 34%, hsl(0 0% 0% / 0.18) 58%, hsl(0 0% 0% / 0.72) 100%)",
            "linear-gradient(to right, hsl(0 0% 0% / 0.58) 0%, hsl(0 0% 0% / 0.18) 42%, hsl(0 0% 0% / 0) 72%)",
          ].join(", "),
        }}
      />

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 140px 42px hsl(0 0% 0% / 0.28)",
        }}
      />

      <div className="relative z-20 flex h-full flex-col justify-end px-6 pb-14 pt-20 md:pb-24 md:pt-40">
        <div className="container max-w-6xl">
          <div className="max-w-3xl space-y-5">
            <Reveal>
              <div className="space-y-4">
                <span className="mono-label text-blue-light/90 tracking-[0.08em]">
                  THERMAL VACUUM SYSTEMS FOR AEROSPACE. ENGINEERED IN GERMANY.
                </span>

                <h1 className="text-3xl font-medium leading-[1.04] tracking-tight text-sand md:text-5xl lg:text-[3.5rem]">
                  Thermal Vacuum Systems for Aerospace Qualification
                </h1>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="max-w-2xl text-sm leading-relaxed text-sand/72 md:text-base">
                Deepvac develops modular and custom thermal vacuum systems for aerospace qualification, thermal cycling, and space environment simulation — combining high vacuum, precise thermal control, and engineering-led automation.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-wrap gap-3 pt-1">
                {["MODULAR PLATFORMS", "CUSTOM TVAC SYSTEMS", "CONTROL & AUTOMATION", "RETROFIT & SERVICE"].map(
                  (cue) => (
                    <span
                      key={cue}
                      className="inline-flex items-center gap-1.5 rounded-sm border border-sand/20 bg-background/30 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-sand/75 backdrop-blur-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue/70" />
                      {cue}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, hsl(0 0% 0% / 0) 0%, hsl(var(--background)) 100%)",
        }}
      />
    </section>
  );
}
