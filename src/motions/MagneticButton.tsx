import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  fullWidth?: boolean;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  fullWidth = false,
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xWrap = gsap.quickTo(wrap, "x", { duration: 0.55, ease: "power3.out" });
    const yWrap = gsap.quickTo(wrap, "y", { duration: 0.55, ease: "power3.out" });
    const xIn = gsap.quickTo(inner, "x", { duration: 0.55, ease: "power3.out" });
    const yIn = gsap.quickTo(inner, "y", { duration: 0.55, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      xWrap(relX * strength);
      yWrap(relY * strength);
      xIn(relX * strength * 0.4);
      yIn(relY * strength * 0.4);
    };
    const onLeave = () => {
      xWrap(0);
      yWrap(0);
      xIn(0);
      yIn(0);
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div
      ref={wrapRef}
      className={`${fullWidth ? "block w-full" : "inline-block"} will-change-transform ${className}`}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
