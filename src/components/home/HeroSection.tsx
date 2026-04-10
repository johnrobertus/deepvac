import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import existFundingHeroEn from "@/assets/exist-funding-hero-en.jpg";
import existFundingHeroDe from "@/assets/exist-funding-hero-de.png";

const slides = [
  { video: "/videos/hero-slide-1.mp4", poster: "/videos/hero-slide-1-poster.jpg" },
  { video: "/videos/hero-slide-2.mp4", poster: "/videos/hero-slide-2-poster.jpg" },
  { video: "/videos/hero-slide-3.mp4", poster: "/videos/hero-slide-3-poster.jpg" },
];

const FADE_DURATION = 1800;
const VIDEO_2_END_TRIM = 1;

export function HeroSection() {
  const { t, i18n } = useTranslation("home");
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const fadeTimerRef = useRef<number | null>(null);
  const transitioningRef = useRef(false);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    transitioningRef.current = transitioning;
  }, [activeIndex, transitioning]);

  const advanceTo = useCallback((upcoming: number) => {
    if (transitioningRef.current) return;

    const upcomingVideo = videoRefs.current[upcoming];
    if (upcomingVideo) {
      upcomingVideo.currentTime = 0;
      upcomingVideo.play().catch(() => {});
    }

    setNextIndex(upcoming);
    setTransitioning(true);

    fadeTimerRef.current = window.setTimeout(() => {
      setActiveIndex(upcoming);
      setNextIndex(null);
      setTransitioning(false);

      videoRefs.current.forEach((v, i) => {
        if (!v) return;
        if (i !== upcoming) v.pause();
      });
    }, FADE_DURATION);
  }, []);

  // Single timeupdate handler — never removed, checks every tick
  const handleTimeUpdate = useCallback((e: Event) => {
    const video = e.target as HTMLVideoElement;
    const index = videoRefs.current.indexOf(video);
    if (index !== 1) return; // only video 2 needs trimming
    if (index !== activeIndexRef.current || transitioningRef.current) return;
    if (video.duration > 0 && video.currentTime >= video.duration - VIDEO_2_END_TRIM) {
      video.pause(); // prevent any further frames from rendering
      advanceTo((index + 1) % slides.length);
    }
  }, [advanceTo]);

  const handleEnded = useCallback((e: Event) => {
    const video = e.target as HTMLVideoElement;
    const index = videoRefs.current.indexOf(video);
    if (index !== activeIndexRef.current || transitioningRef.current) return;
    if (index === 1) return; // video 2 handled by timeupdate
    advanceTo((index + 1) % slides.length);
  }, [advanceTo]);

  // Attach persistent listeners once
  useEffect(() => {
    const videos = videoRefs.current;
    videos.forEach((video) => {
      if (!video) return;
      video.addEventListener("ended", handleEnded);
      video.addEventListener("timeupdate", handleTimeUpdate);
    });
    return () => {
      videos.forEach((video) => {
        if (!video) return;
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      });
    };
  }, [handleEnded, handleTimeUpdate]);

  // Play first video on mount
  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.currentTime = 0;
      firstVideo.play().catch(() => {});
    }
  }, []);

  // Cleanup fade timer
  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const cues = t("hero.cues", { returnObjects: true }) as string[];

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] max-h-[1100px] overflow-hidden">
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;
        const isNext = i === nextIndex;
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
              ref={(el) => { videoRefs.current[i] = el; }}
              src={slide.video}
              poster={slide.poster}
              muted
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
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
        style={{ boxShadow: "inset 0 0 140px 42px hsl(0 0% 0% / 0.28)" }}
      />

      <div className="relative z-20 flex h-full flex-col justify-end px-4 pb-12 pt-16 sm:px-6 md:pb-24 md:pt-40">
        <div className="container max-w-6xl">
          <div className="flex items-end md:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-5">
              <Reveal>
                <div className="space-y-4">
                  <span className="mono-label text-blue-light/90 tracking-[0.08em]">
                    {t("hero.eyebrow")}
                  </span>
                  <h1 className="text-[1.7rem] font-medium leading-[1.04] tracking-tight text-sand sm:text-3xl md:text-5xl lg:text-[3.5rem]">
                    {t("hero.title")}
                  </h1>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <p className="max-w-2xl text-sm leading-relaxed text-sand/72 md:text-base">
                  {t("hero.description")}
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="flex flex-wrap gap-3 pt-1">
                  {Array.isArray(cues) &&
                    cues.map((cue) => (
                      <span
                        key={cue}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-sand/20 bg-background/30 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-sand/75 backdrop-blur-sm"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue/70" />
                        {cue}
                      </span>
                    ))}
                </div>
              </Reveal>
            </div>

            {/* Funding logo — right side, desktop only */}
            <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-[35%] max-w-[420px]">
              <Reveal delay={300}>
                <div className="rounded-2xl bg-white/[0.07] backdrop-blur-md border border-white/[0.08] px-7 py-5">
                  <img
                    src={i18n.language === "de" ? existFundingHeroDe : existFundingHeroEn}
                    alt={i18n.language === "de"
                      ? "Gefördert durch Bundesministerium für Wirtschaft und Energie, Europäische Union, EXIST"
                      : "Supported by Federal Ministry for Economic Affairs and Energy, European Union, EXIST"
                    }
                    className="w-full h-auto object-contain brightness-[0.85] invert"
                    loading="eager"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, hsl(0 0% 0% / 0) 0%, hsl(var(--background)) 100%)",
        }}
      />
    </section>
  );
}