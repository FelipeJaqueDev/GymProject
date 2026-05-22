import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealKind = "mask" | "rise" | "blur" | "clip";

interface MotionSectionProps {
  children: ReactNode;
  delay?: number;
  reveal?: RevealKind;
}

const MotionBySection: React.FC<MotionSectionProps> = ({
  children,
  delay = 0,
  reveal = "rise",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      let from: gsap.TweenVars = {};
      let to: gsap.TweenVars = {};

      if (reveal === "mask") {
        from = { clipPath: "inset(0 0 100% 0)", y: 60 };
        to = { clipPath: "inset(0 0 0% 0)", y: 0 };
      } else if (reveal === "clip") {
        from = { clipPath: "inset(0 100% 0 0)" };
        to = { clipPath: "inset(0 0% 0 0)" };
      } else if (reveal === "blur") {
        from = { opacity: 0, filter: "blur(18px)", y: 50 };
        to = { opacity: 1, filter: "blur(0px)", y: 0 };
      } else {
        from = { opacity: 0, y: 70 };
        to = { opacity: 1, y: 0 };
      }

      gsap.fromTo(el, from, {
        ...to,
        duration: 1.2,
        delay,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, reveal]);

  return (
    <div ref={ref} style={{ willChange: "transform, opacity, filter, clip-path" }}>
      {children}
    </div>
  );
};

export default MotionBySection;
