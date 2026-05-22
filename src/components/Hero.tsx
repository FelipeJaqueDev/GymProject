import { CoreFitTheme } from "@/themes/CoreFitTheme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { AuroraText } from "@/components/ui/aurora-text";
import background2 from "../assets/Images/Bg/background2.jpg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MagneticButton from "../motions/MagneticButton";
import HeroParticles from "./HeroParticles";
import HeroShader from "./HeroShader";

gsap.registerPlugin(ScrollTrigger);

function splitChars(text: string) {
  return text.split("").map((c, i) => (
    <span
      key={i}
      data-hero-char
      className="inline-block"
      style={{ whiteSpace: c === " " ? "pre" : "normal" }}
    >
      {c}
    </span>
  ));
}

function Hero() {
  const { colors } = CoreFitTheme;
  const navigate = useNavigate();

  const sectionRef = useRef<HTMLElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const maskRef = useRef<SVGSVGElement>(null);

  const goToPlans = () => navigate("/plans");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (maskRef.current) {
        const path = maskRef.current.querySelector("path");
        if (path) {
          gsap.fromTo(
            path,
            { attr: { d: "M0,0 C300,0 700,0 1000,0 L1000,1000 L0,1000 Z" } },
            {
              attr: { d: "M0,1000 C300,1100 700,900 1000,1000 L1000,1000 L0,1000 Z" },
              duration: 1.4,
              ease: "expo.inOut",
              onComplete: () => {
                if (maskRef.current) maskRef.current.style.display = "none";
              },
            }
          );
        }
      }

      const leftChars = titleLeftRef.current?.querySelectorAll("[data-hero-char]");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.6 });

      if (leftChars) {
        tl.fromTo(
          leftChars,
          { yPercent: 120, opacity: 0, rotateX: -80, filter: "blur(12px)" },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.035,
          }
        );
      }
      if (titleRightRef.current) {
        tl.fromTo(
          titleRightRef.current,
          { yPercent: 100, opacity: 0, filter: "blur(14px)" },
          { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 1.1 },
          "-=0.7"
        );
      }
      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { y: 40, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
          "-=0.5"
        );
      }
      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { y: 60, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.6)" },
          "-=0.4"
        );
      }
      if (counterRef.current) {
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: 500,
            duration: 1.6,
            ease: "expo.out",
            onUpdate: () => {
              if (counterRef.current)
                counterRef.current.textContent = `+${Math.floor(obj.val)}`;
            },
          },
          "-=0.6"
        );
      }
      if (scrollHintRef.current) {
        tl.fromTo(
          scrollHintRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        );
        gsap.to(scrollHintRef.current.querySelector("[data-dot]"), {
          y: 14,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "sine.inOut",
        });
      }

      if (sectionRef.current && titleWrapRef.current) {
        const tilt = titleWrapRef.current;
        const onMove = (e: MouseEvent) => {
          const rect = tilt.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(tilt, {
            rotateY: px * 10,
            rotateX: -py * 10,
            duration: 0.6,
            ease: "power3.out",
          });
        };
        const onLeave = () => {
          gsap.to(tilt, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1,0.5)" });
        };
        sectionRef.current.addEventListener("mousemove", onMove);
        sectionRef.current.addEventListener("mouseleave", onLeave);

        gsap.to(bgWrapRef.current, {
          yPercent: 20,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(overlayRef.current, {
          opacity: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(titleWrapRef.current, {
          yPercent: -50,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(subRef.current, {
          yPercent: -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-center justify-center min-h-[100vh] py-20 md:py-24 overflow-hidden text-white"
    >
      <div ref={bgWrapRef} className="absolute inset-0 will-change-transform">
        <HeroShader src={background2} />
      </div>
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 60%, rgba(10,10,10,0.95) 100%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none opacity-60">
        <HeroParticles />
      </div>

      <svg
        ref={maskRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C300,0 700,0 1000,0 L1000,1000 L0,1000 Z" fill="#0A0A0A" />
      </svg>

      <div
        ref={titleWrapRef}
        className="relative z-10 text-center px-6 max-w-5xl will-change-transform"
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <h1
            ref={titleLeftRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight overflow-hidden"
            style={{ perspective: 800 }}
          >
            {splitChars("Transforma tu cuerpo,")}
          </h1>
          <h1
            ref={titleRightRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight"
          >
            <AuroraText speed={1.5}>mejora tu vida</AuroraText>
          </h1>
        </div>
        <p
          ref={subRef}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/85"
        >
          Entrena con instructores altamente capacitados y alcanza tus metas junto a nosotros.
        </p>

        <div className="flex flex-col items-center gap-4 mb-2">
          <div className="text-sm uppercase tracking-[0.4em] text-white/70 flex items-center gap-2">
            <span
              ref={counterRef}
              className="text-xl font-bold tabular-nums"
              style={{ color: colors.warning }}
            >
              +0
            </span>
            vidas transformadas
          </div>
        </div>

        <div ref={buttonRef} className="mt-4">
          <MagneticButton strength={0.4}>
            <Button
              data-magnetic
              sx={{
                backgroundColor: colors.secondary,
                color: colors.text,
                borderRadius: "999px",
                px: 5,
                py: 1.6,
                fontWeight: 700,
                letterSpacing: 0.5,
                fontSize: "1rem",
                textTransform: "none",
                boxShadow: `0 10px 40px -10px ${colors.secondary}`,
                "&:hover": {
                  backgroundColor: colors.secondary,
                  boxShadow: `0 16px 60px -10px ${colors.secondary}`,
                },
              }}
              variant="contained"
              onClick={goToPlans}
            >
              Ver Planes →
            </Button>
          </MagneticButton>
        </div>
      </div>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[26px] h-[42px] rounded-full border border-white/40 flex justify-center pt-2">
          <span data-dot className="block w-1 h-1 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
