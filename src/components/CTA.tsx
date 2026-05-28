import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AuroraText } from "./ui/aurora-text";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import Matter from "matter-js";
import MagneticButton from "../motions/MagneticButton";
import CTAShaderBg from "./CTAShaderBg";
import { Check, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type CTAState = "idle" | "loading" | "success";

function useCountdown(targetSeconds: number) {
  const [s, setS] = useState(targetSeconds);
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v > 0 ? v - 1 : v)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return { h, m, sec, raw: s };
}

export default function CTA() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const { colors } = CoreFitTheme;
  const [btnState, setBtnState] = useState<CTAState>("idle");
  const { h, m, sec, raw } = useCountdown(23 * 3600 + 45 * 60 + 12);

  const explode = () => {
    const zone = physicsRef.current;
    if (!zone) return;
    const { Engine, Runner, World, Bodies, Body } = Matter;
    const engine = Engine.create();
    engine.gravity.y = 1.1;
    // permite que los cuerpos "duerman" al quedar en reposo, para luego
    // congelarlos sin un corte brusco
    engine.enableSleeping = true;

    const w = zone.clientWidth;
    const ht = zone.clientHeight;
    World.add(engine.world, [
      Bodies.rectangle(w / 2, ht + 30, w * 2, 60, { isStatic: true }),
      Bodies.rectangle(-30, ht / 2, 60, ht * 2, { isStatic: true }),
      Bodies.rectangle(w + 30, ht / 2, 60, ht * 2, { isStatic: true }),
    ]);

    const r = buttonRef.current?.getBoundingClientRect();
    const zr = zone.getBoundingClientRect();
    const cx = r ? r.left + r.width / 2 - zr.left : w / 2;
    const cy = r ? r.top + r.height / 2 - zr.top : ht / 2;

    const palette = [colors.primary, colors.secondary, colors.success, colors.warning, "#FFFFFF"];
    const pieces: { body: Matter.Body; el: HTMLDivElement; isSquare: boolean }[] = [];
    for (let i = 0; i < 38; i++) {
      const size = 8 + Math.random() * 16;
      const isSquare = Math.random() > 0.5;
      const body = isSquare
        ? Bodies.rectangle(cx, cy, size, size, { restitution: 0.6, friction: 0.05, density: 0.001 })
        : Bodies.circle(cx, cy, size / 2, { restitution: 0.7, friction: 0.02, density: 0.001 });
      const angle = Math.random() * Math.PI * 2;
      const force = 0.09 + Math.random() * 0.06;
      Body.applyForce(body, body.position, {
        x: Math.cos(angle) * force,
        y: Math.sin(angle) * force - 0.08,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);
      World.add(engine.world, body);
      const el = document.createElement("div");
      const color = palette[i % palette.length];
      el.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${color};border-radius:${isSquare ? "2px" : "50%"};pointer-events:none;box-shadow:0 0 10px ${color}55;will-change:transform;transform:translate(-9999px,-9999px);`;
      zone.appendChild(el);
      pieces.push({ body, el, isSquare });
    }
    const runner = Runner.create();
    Runner.run(runner, engine);
    let raf = 0;
    const tick = () => {
      pieces.forEach(({ body, el, isSquare }) => {
        const off = isSquare
          ? (body.bounds.max.x - body.bounds.min.x) / 2
          : (body.circleRadius ?? 0);
        el.style.transform = `translate3d(${body.position.x - off}px, ${body.position.y - off}px, 0) rotate(${body.angle}rad)`;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    setTimeout(() => {
      // las figuras ya reposaron: detenemos el motor pero las dejamos
      // congeladas en su posición final (no se eliminan del DOM)
      cancelAnimationFrame(raf);
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
    }, 6500);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { x: 0.5, y: 0.6 },
      colors: palette,
      scalar: 1.1,
      ticks: 200,
    });
  };

  const triggerRipple = () => {
    const el = rippleRef.current;
    const btn = buttonRef.current;
    if (!el || !btn) return;
    const r = btn.getBoundingClientRect();
    const sectionRect = sectionRef.current?.getBoundingClientRect();
    if (!sectionRect) return;
    const x = r.left + r.width / 2 - sectionRect.left;
    const y = r.top + r.height / 2 - sectionRect.top;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.opacity = "1";
    gsap.fromTo(
      el,
      { scale: 0, opacity: 0.6 },
      { scale: 40, opacity: 0, duration: 1.2, ease: "expo.out" }
    );
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { backgroundPosition: "0% 0%" },
        {
          backgroundPosition: "0% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(explode, 400);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    if (btnState !== "idle") return;
    triggerRipple();
    explode();
    setBtnState("loading");
    setTimeout(() => {
      setBtnState("success");
      setTimeout(() => navigate("/plans"), 700);
    }, 900);
  };

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      className="relative py-28 text-center overflow-hidden"
      style={{ color: colors.text }}
    >
      <div className="absolute inset-0">
        <CTAShaderBg />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div
        ref={physicsRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
      />
      <div
        ref={rippleRef}
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 20,
          height: 20,
          marginLeft: -10,
          marginTop: -10,
          background: "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
          zIndex: 6,
          opacity: 0,
          mixBlendMode: "screen",
        }}
      />

      <div className="relative" style={{ zIndex: 10 }}>
        {raw > 0 && (
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-md">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">
              Promo termina en
            </span>
            <span className="font-mono tabular-nums text-white text-sm">
              {pad(h)}:{pad(m)}:{pad(sec)}
            </span>
          </div>
        )}
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          ¿Listo para empezar tu <AuroraText speed={1.5}>transformación</AuroraText>?
        </h2>
        <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
          Da el primer paso. Únete a una comunidad que entrena con propósito.
        </p>

        <MagneticButton strength={0.5}>
          <button
            ref={buttonRef}
            onClick={handleClick}
            data-magnetic
            disabled={btnState !== "idle"}
            className="relative inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-bold text-base tracking-wide cursor-pointer overflow-hidden disabled:cursor-default group"
            style={{
              background: colors.secondary,
              color: colors.text,
              boxShadow: `0 14px 50px -10px ${colors.secondary}`,
              minWidth: 220,
            }}
          >
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `conic-gradient(from var(--angle, 0deg), transparent 70%, ${colors.warning}, transparent)`,
                padding: 2,
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                animation: "border-beam 4s linear infinite",
              }}
            />
            <span className="relative inline-flex items-center gap-2">
              {btnState === "idle" && <>Únete ahora ⚡</>}
              {btnState === "loading" && (
                <>
                  <Loader2 className="animate-spin" size={18} /> Procesando…
                </>
              )}
              {btnState === "success" && (
                <>
                  <Check size={18} /> ¡Bienvenido!
                </>
              )}
            </span>
          </button>
        </MagneticButton>

        <p className="mt-6 text-xs text-white/40 tracking-wide">
          Sin contratos largos. Cancela cuando quieras.
        </p>
      </div>

      <style>{`
        @property --angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes border-beam {
          to { --angle: 360deg; }
        }
      `}</style>
    </section>
  );
}
