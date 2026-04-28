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

  useEffect(() => {
    const firstVideo = videoRefs.current[0];
    if (firstVideo) {
      firstVideo.currentTime = 0;
      firstVideo.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) window.clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const cues = t("hero.cues", { returnObjects: true }) as string[];

  return (
    <section className="relative w-full h-[100svh] min-h-[560px] max-h-[960px] overflow-hidden">
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

      <div className="relative z-20 flex h-full flex-col justify-end pb-10 pt-14 sm:pb-12 md:pb-24 md:pt-40">
        <div className="container-wide">
          <div className="flex flex-col gap-8 md:items-end md:justify-between lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 2xl:gap-20 3xl:gap-28">
            <div className="max-w-[56rem] space-y-3 sm:space-y-5 lg:col-span-7">
              <Reveal>
                <div className="space-y-3 sm:space-y-4">
                  <span className="mono-label text-blue-light/90 tracking-[0.08em]">{t("hero.eyebrow")}</span>

                  <h1
                    className="max-w-[15ch] font-medium text-sand [text-wrap:balance] md:max-w-[14ch] lg:max-w-[15ch] xl:max-w-[16ch]"
                    style={{
                      fontSize: "clamp(1.7rem, 4.6vw, 5.25rem)",
                      lineHeight: 1.0,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {t("hero.title")}
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <p className="max-w-2xl text-sm leading-relaxed text-sand/72 md:text-base">{t("hero.description")}</p>
              </Reveal>

              <Reveal delay={150}>
                <div className="flex flex-wrap gap-2 pt-1 sm:gap-3 sm:pt-2">
                  <Button asChild size="default" className="font-mono text-xs tracking-wide sm:h-12 sm:px-8 sm:text-base">
                    <Link to={contactPath}>{tc("buttons.discussRequirements")}</Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="default"
                    className="border-sand/25 font-mono text-xs tracking-wide text-sand/80 backdrop-blur-sm hover:border-sand/40 hover:text-sand sm:h-12 sm:px-8 sm:text-base"
                  >
                    <Link to={localizedPath("/products", lang)}>{tc("buttons.exploreProducts")}</Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="flex flex-wrap gap-2 pt-1 sm:gap-3">
                  {Array.isArray(cues) &&
                    cues.map((cue) => (
                      <span
                        key={cue}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-sand/20 bg-background/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-sand/75 backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-[11px]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue/70" />
                        {cue}
                      </span>
                    ))}
                </div>
              </Reveal>
            </div>

            {/* Funding logo, right side, desktop only */}
            <div className="hidden lg:col-span-5 lg:flex items-center justify-center lg:justify-end">
              <Reveal delay={300}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.07] px-8 py-6 backdrop-blur-md w-full max-w-[470px] 3xl:max-w-[520px]">
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
