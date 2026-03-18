import { useEffect, useRef, useState, useCallback } from "react";
import { Reveal } from "@/components/Reveal";

const slides = [
  { video: "/videos/hero-slide-1.mp4", poster: "/videos/hero-slide-1-poster.jpg" },
  { video: "/videos/hero-slide-2.mp4", poster: "/videos/hero-slide-2-poster.jpg" },
  { video: "/videos/hero-slide-3.mp4", poster: "/videos/hero-slide-3-poster.jpg" },
];

const SCENE_DURATION = 8000; // ms per scene
const FADE_DURATION = 1800; // ms crossfade

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scheduleNext = useCallback(() => {
    if (prefersReducedMotion) return;
    timerRef.current = setTimeout(() => {
      const next = (activeIndex + 1) % slides.length;
      setNextIndex(next);
      setTransitioning(true);

      // Start playing the next video before it becomes visible
      const nextVideo = videoRefs.current[next];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
      }

      // After crossfade completes, swap active
      setTimeout(() => {
        setActiveIndex(next);
        setNextIndex(null);
        setTransitioning(false);
      }, FADE_DURATION);
    }, SCENE_DURATION);
  }, [activeIndex, prefersReducedMotion]);

  useEffect(() => {
    scheduleNext();
    return () => clearTimeout(timerRef.current);
  }, [scheduleNext]);

  // Start playing the first video on mount
  useEffect(() => {
    const first = videoRefs.current[0];
    if (first) {
      first.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[600px] max-h-[1100px] overflow-hidden">
      {/* Video layers */}
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;
        const isNext = i === nextIndex;
        const visible = isActive || isNext;

        return (
          <div
            key={i}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: isNext && transitioning ? 1 : isActive ? 1 : 0,
              zIndex: isNext ? 2 : isActive ? 1 : 0,
              transition: isNext
                ? `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            aria-hidden={!isActive}
          >
            {/* Poster fallback — always behind the video */}
            <img
              src={slide.poster}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              src={visible || i === (activeIndex + 1) % slides.length ? slide.video : undefined}
              poster={slide.poster}
              muted
              playsInline
              loop={slides.length === 1}
              preload={i === 0 ? "auto" : "metadata"}
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />
          </div>
        );
      })}

      {/* Cinematic gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: [
            "linear-gradient(to bottom, hsl(0 0% 0% / 0.55) 0%, hsl(0 0% 0% / 0.25) 40%, hsl(0 0% 0% / 0.15) 60%, hsl(0 0% 0% / 0.6) 100%)",
            "linear-gradient(to right, hsl(0 0% 0% / 0.45) 0%, hsl(0 0% 0% / 0) 60%)",
          ].join(", "),
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 120px 40px hsl(0 0% 0% / 0.3)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex items-end h-full pb-20 md:pb-28 pt-32 md:pt-40 px-6">
        <div className="container max-w-6xl">
          <div className="max-w-2xl space-y-6">
            <Reveal>
              <div className="space-y-4">
                <span className="mono-label text-blue-light/90 tracking-[0.08em]">
                  PRECISION VACUUM ENGINEERING. MADE IN GERMANY.
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-sand leading-[1.08]">
                  Thermal Vacuum&nbsp; Systems for Aerospace Qualification
                </h1>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-sm md:text-base text-sand/70 leading-relaxed max-w-lg">
                Deepvac develops modular and custom thermal vacuum systems for
                the qualification, validation, and environmental simulation of
                aerospace hardware. Our platforms combine high-vacuum
                performance, precise thermal control, and application-specific
                integration for reliable test execution in research,
                institutional, and commercial space programs.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex flex-wrap gap-3 pt-2">
                {["MODULAR SYSTEMS", "CUSTOM ENGINEERING", "AEROSPACE APPLICATIONS", "SERVICE & RETROFIT"].map(
                  (cue) => (
                    <span
                      key={cue}
                      className="inline-flex items-center gap-1.5 rounded-sm border border-sand/15 bg-background/30 backdrop-blur-sm px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-sand/60"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue/60" />
                      {cue}
                    </span>
                  )
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Bottom edge fade into page background */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, hsl(0 0% 0% / 0) 0%, hsl(var(--background)) 100%)",
        }}
      />
    </section>
  );
}
