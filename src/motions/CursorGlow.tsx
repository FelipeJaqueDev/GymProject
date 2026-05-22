import { useEffect, useRef } from "react";

export default function CursorGlow({
  color = "#2979FF",
  size = 360,
  intensity = 0.55,
}: {
  color?: string;
  size?: number;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const loop = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      el.style.transform = `translate3d(${cx - size / 2}px, ${cy - size / 2}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: MouseEvent) => {
      const parent = el.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const parent = el.parentElement;
    if (parent) parent.addEventListener("mousemove", onMove);
    loop();
    return () => {
      if (parent) parent.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute top-0 left-0 will-change-transform"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}${Math.round(intensity * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
        filter: "blur(20px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
