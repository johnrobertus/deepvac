import { useEffect, useLayoutEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isInitialLoad } from "@/lib/revealState";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shownInstantly = useRef(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !isInitialLoad()) return;
    const r = el.getBoundingClientRect();
    const inView = r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
    if (!inView) return;
    shownInstantly.current = true;
    el.classList.add("visible", "reveal-instant");
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("reveal-instant")));
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || shownInstantly.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={cn("reveal", className)}>
      {children}
    </div>
  );
}
