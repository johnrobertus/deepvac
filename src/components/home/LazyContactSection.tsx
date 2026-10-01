import { useEffect, useRef, useState } from "react";
import { lazyWithPreload } from "@/lib/lazyWithPreload";
import { scrollToHashWhenReady } from "@/lib/scroll";

const ContactSection = lazyWithPreload(() =>
  import("./ContactSection").then((m) => ({ default: m.ContactSection })),
);

const targetsContact = () => window.location.hash === "#contact";

/**
 * Homepage contact island: the form and map load once the section is within
 * ~800px of the viewport or the URL hash targets #contact. The placeholder
 * keeps the id and reserves a similar height so nothing shifts.
 */
export function LazyContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [load, setLoad] = useState(targetsContact);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (load) return;
    const onHash = () => targetsContact() && setLoad(true);
    window.addEventListener("hashchange", onHash);
    const el = ref.current;
    const observer = el
      ? new IntersectionObserver(([e]) => e.isIntersecting && setLoad(true), { rootMargin: "800px 0px" })
      : undefined;
    if (el && observer) observer.observe(el);
    return () => {
      window.removeEventListener("hashchange", onHash);
      observer?.disconnect();
    };
  }, [load]);

  useEffect(() => {
    if (!load) return;
    let cancelled = false;
    ContactSection.preload().then(
      () => {
        if (cancelled) return;
        setReady(true);
        if (targetsContact()) requestAnimationFrame(() => scrollToHashWhenReady("#contact"));
      },
      () => undefined,
    );
    return () => {
      cancelled = true;
    };
  }, [load]);

  if (ready) return <ContactSection />;

  return (
    <section
      ref={ref}
      id="contact"
      aria-busy="true"
      className="py-20 md:py-28 px-6 bg-surface/30 min-h-[4120px] md:min-h-[3000px] lg:min-h-[2200px]"
    />
  );
}
