import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const grow = () =>
      gsap.to(ring, { scale: 1.8, opacity: 0.5, duration: 0.35, ease: "power3.out" });
    const shrink = () =>
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });

    window.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll<HTMLElement>(
      "a, button, [data-magnetic], [role='button'], .cursor-pointer"
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    const mo = new MutationObserver(() => {
      document
        .querySelectorAll<HTMLElement>(
          "a, button, [data-magnetic], [role='button'], .cursor-pointer"
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", grow);
          el.addEventListener("mouseleave", shrink);
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.9)",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          background: "#ffffff",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
