import { useEffect, useRef } from "react";
import { CoreFitTheme } from "@/themes/CoreFitTheme";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { colors } = CoreFitTheme;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full pointer-events-none z-[60]"
      style={{ height: 2 }}
    >
      <div
        ref={ref}
        className="h-full origin-left will-change-transform"
        style={{
          background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary}, ${colors.warning})`,
          transform: "scaleX(0)",
          boxShadow: `0 0 10px ${colors.secondary}`,
        }}
      />
    </div>
  );
}
