import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
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
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const contactPath = localizedPath("/contact", lang);

  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [videosMounted, setVideosMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

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

  const handleTimeUpdate = useCallback(
    (e: Event) => {
      const video = e.target as HTMLVideoElement;
      const index = videoRefs.current.indexOf(video);

      if (index !== 1) return;
      if (index !== activeIndexRef.current || transitioningRef.current) return;

      if (video.duration > 0 && video.currentTime >= video.duration - VIDEO_2_END_TRIM) {
        video.pause();
        advanceTo((index + 1) % slides.length);
      }
    },
    [advanceTo],
  );

  const handleEnded = useCallback(
    (e: Event) => {
      const video = e.target as HTMLVideoElement;
      const index = videoRefs.current.indexOf(video);

      if (index !== activeIndexRef.current || transitioningRef.current) return;
      if (index === 1) return;

      advanceTo((index + 1) % slides.length);
    },
    [advanceTo],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;

    let handle: number | null = null;
    let timeout: number | null = null;
    const mount = () => setVideosMounted(true);

    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      handle = w.requestIdleCallback(mount, { timeout: 2500 });
    } else {
      timeout = window.setTimeout(mount, 1500);
    }

    return () => {
      if (handle != null && typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(handle);
      if (timeout != null) window.clearTimeout(timeout);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!videosMounted || reducedMotion) return;

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
  }, [handleEnded, handleTimeUpdate, videosMounted, reducedMotion]);

  useEffect(() => {
    if (!videosMounted || reducedMotion) return;
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.currentTime = 0;
      firstVideo.play().catch(() => {});
    }
  }, [videosMounted, reducedMotion]);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const cues = t("hero.cues", { returnObjects: true }) as string[];

  return (
    <section id="hero" className="hero-section relative w-full overflow-x-hidden">
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
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
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

      <div className="hero-content-wrap relative z-20">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-text-col">
              <Reveal>
                <div className="hero-heading-block">
                  <span className="mono-label text-blue-light/90 tracking-[0.08em]">{t("hero.eyebrow")}</span>

                  {(() => {
                    const isDe = i18n.language === "de";
                    return (
                      <h1
                        className={`hero-title ${isDe ? "hero-title--de" : "hero-title--en"} max-w-full font-medium text-sand whitespace-pre-line [text-wrap:balance] md:max-w-[14ch] lg:max-w-[18ch] xl:max-w-[20ch] 2xl:max-w-[22ch]`}
                        style={{
                          lineHeight: 1.08,
                          letterSpacing: "-0.03em",
                          hyphens: "none",
                          wordBreak: "normal",
                          overflowWrap: "normal",
                          fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1, "ss01" 1',
                          fontKerning: "normal",
                          textRendering: "optimizeLegibility",
                          WebkitFontSmoothing: "antialiased",
                          MozOsxFontSmoothing: "grayscale",
                        }}
                        lang={isDe ? "de" : "en"}
                      >
                        {t("hero.title")}
                      </h1>
                    );
                  })()}
                </div>
              </Reveal>

              <Reveal delay={100}>
                <p className="hero-description max-w-2xl leading-relaxed text-sand/90">{t("hero.description")}</p>
              </Reveal>

              <Reveal delay={150}>
                <div className="hero-cta-row flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button asChild size="default" className="w-full font-mono text-sm tracking-wide sm:w-auto sm:h-12 sm:px-8 sm:text-base">
                    <Link to={contactPath}>{tc("buttons.discussRequirements")}</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="default"
                    className="w-full border-sand/25 font-mono text-sm tracking-wide text-sand/80 backdrop-blur-sm hover:border-sand/40 hover:text-sand sm:w-auto sm:h-12 sm:px-8 sm:text-base"
                  >
                    <Link to={localizedPath("/products", lang)}>{tc("buttons.exploreProducts")}</Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="hero-chips flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  {Array.isArray(cues) &&
                    cues.map((cue) => (
                      <span
                        key={cue}
                        className="hero-chip inline-flex w-full items-center gap-1.5 rounded-sm border border-sand/30 bg-background/40 font-mono uppercase tracking-widest text-sand/90 backdrop-blur-sm sm:w-auto"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue/80" />
                        {cue}
                      </span>
                    ))}
                </div>
              </Reveal>
            </div>

            {/* Funding logo, right side, desktop only */}
            <div className="hero-funding-col hidden lg:flex items-center justify-center lg:justify-end">
              <Reveal delay={300}>
                <div className="hero-funding-card rounded-2xl border border-white/[0.08] bg-white/[0.07] backdrop-blur-md">
                  <img
                    src={i18n.language === "de" ? existFundingHeroDe : existFundingHeroEn}
                    alt={
                      i18n.language === "de"
                        ? "Gefördert durch Bundesministerium für Wirtschaft und Energie, Europäische Union, EXIST"
                        : "Supported by Federal Ministry for Economic Affairs and Energy, European Union, EXIST"
                    }
                    className="h-auto w-full object-contain"
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
          background: "linear-gradient(to bottom, hsl(0 0% 0% / 0) 0%, hsl(var(--background)) 100%)",
        }}
      />
    </section>
  );
}
