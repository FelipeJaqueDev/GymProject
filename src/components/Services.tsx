import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { AuroraText } from "@/components/ui/aurora-text";
import CursorGlow from "@/motions/CursorGlow";
import {
  Dumbbell,
  Bike,
  Activity,
  BoomBox,
  PersonStanding,
  LandPlot,
  HandFist,
  ArrowUpRight,
  X,
  Sparkles,
} from "lucide-react";

import personalTrainerImg from "../assets/Images/Bg/woman_personal_trainer.jpg";
import spinningImg from "../assets/Images/Bg/spinning.jpg";
import pesasImg from "../assets/Images/Bg/img2.jpg";
import cardioImg from "../assets/Images/Bg/img3.jpg";
import classesImg from "../assets/Images/Bg/img4.jpg";
import functionalImg from "../assets/Images/Bg/img5.jpg";
import nutritionImg from "../assets/Images/Bg/img6.jpg";

gsap.registerPlugin(ScrollTrigger);

interface ServiceData {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  highlights: string[];
  Icon: typeof Dumbbell;
  color: string;
  image: string;
  glyph: string;
  hero?: boolean;
  wide?: boolean;
}

const SERVICES: ServiceData[] = [
  {
    id: "personal",
    number: "01",
    title: "Personal Training",
    short: "Coach 1-on-1",
    description:
      "Un entrenador asignado a tus objetivos. Disponibilidad flexible, comunicación directa por app y ajustes en tiempo real.",
    highlights: ["Coach exclusivo", "App de seguimiento", "Resultados garantizados"],
    Icon: PersonStanding,
    color: "#F5F5F5",
    image: personalTrainerImg,
    glyph: "💪",
    hero: true,
  },
  {
    id: "cycling",
    number: "02",
    title: "Cycling Indoor",
    short: "Cardio explosivo",
    description:
      "Clases de cycling con música de alta energía. Quema entre 500-800 calorías por sesión.",
    highlights: ["Clases diarias", "Música en vivo", "Métricas reales"],
    Icon: Bike,
    color: "#00E676",
    image: spinningImg,
    glyph: "🚴",
  },
  {
    id: "classes",
    number: "03",
    title: "Clases Grupales",
    short: "Energía en grupo",
    description:
      "HIIT, ritmos latinos, body combat, yoga, pilates. Sesiones de 45 min con instructores certificados.",
    highlights: ["+30 clases/semana", "Niveles variados", "Comunidad activa"],
    Icon: BoomBox,
    color: "#E53935",
    image: classesImg,
    glyph: "🎵",
  },
  {
    id: "strength",
    number: "04",
    title: "Programas de Fuerza",
    short: "Powerlifting & Strongman",
    description:
      "Para quienes buscan ir más allá. Programas de fuerza pura: squat, bench, deadlift. Equipo de competencia.",
    highlights: ["Equipo IPF", "Coach especializado", "Competencias internas"],
    Icon: HandFist,
    color: "#FFEA00",
    image: pesasImg,
    glyph: "🥇",
    wide: true,
  },
  {
    id: "functional",
    number: "05",
    title: "Funcional",
    short: "Movimiento real",
    description:
      "Movilidad, equilibrio, core. Entrenamiento que se traslada a tu vida diaria sin lesiones.",
    highlights: ["Sin máquinas", "Trabajo en parejas", "Test bimensual"],
    Icon: Activity,
    color: "#2979FF",
    image: functionalImg,
    glyph: "🤸",
  },
  {
    id: "nutrition",
    number: "06",
    title: "Nutrición Deportiva",
    short: "Plan alimenticio",
    description:
      "Asesoría personalizada. Macros calculados según tu objetivo, recetas y suplementación segura.",
    highlights: ["Nutricionista", "Macros + recetas", "Suplementos seguros"],
    Icon: LandPlot,
    color: "#9E9E9E",
    image: nutritionImg,
    glyph: "🥗",
  },
  {
    id: "cardio",
    number: "07",
    title: "Evaluación Física",
    short: "Análisis InBody",
    description:
      "Evaluación completa de composición corporal, movilidad y resistencia. Plan basado en datos.",
    highlights: ["Test InBody", "Análisis postural", "Reporte detallado"],
    Icon: Dumbbell,
    color: "#2979FF",
    image: cardioImg,
    glyph: "📈",
  },
];

interface BentoCardProps {
  service: ServiceData;
  onOpen: (s: ServiceData) => void;
  className?: string;
  layoutId: string;
}

function BentoCard({ service, onOpen, className = "", layoutId }: BentoCardProps) {
  const wrap = useRef<HTMLButtonElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const el = wrap.current;
    const ic = inner.current;
    const im = imgRef.current;
    if (!el || !ic) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const xR = gsap.quickTo(ic, "rotateX", { duration: 0.55, ease: "power3.out" });
    const yR = gsap.quickTo(ic, "rotateY", { duration: 0.55, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      xR(-py * 8);
      yR(px * 8);
      if (im) gsap.to(im, { scale: 1.08, duration: 0.6, ease: "power2.out" });
    };
    const onLeave = () => {
      xR(0);
      yR(0);
      if (im) gsap.to(im, { scale: 1, duration: 0.7, ease: "power3.out" });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const isHero = service.hero;
  const Icon = service.Icon;

  return (
    <motion.button
      ref={wrap}
      onClick={() => onOpen(service)}
      data-magnetic
      layoutId={layoutId}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-black text-left cursor-pointer focus:outline-none ${className}`}
      style={{ perspective: 1200 }}
    >
      <div
        ref={inner}
        className="relative w-full h-full will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.img
          ref={imgRef}
          layoutId={`${layoutId}-img`}
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ filter: "saturate(1.05)" }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `linear-gradient(160deg, ${service.color}22 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.85) 100%)`,
          }}
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-3xl pointer-events-none" />

        <div
          className={`relative h-full flex flex-col justify-between ${
            isHero ? "p-6 md:p-10" : "p-5 md:p-6"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="flex items-start justify-between" style={{ transform: "translateZ(20px)" }}>
            <span
              className={`font-black tabular-nums tracking-tighter ${
                isHero ? "text-7xl md:text-9xl" : "text-4xl md:text-5xl"
              }`}
              style={{ color: service.color, opacity: 0.85 }}
            >
              {service.number}
            </span>
            <span
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/15"
              style={{ background: `${service.color}33`, color: service.color }}
            >
              <Icon size={isHero ? 20 : 16} />
            </span>
          </div>

          <div style={{ transform: "translateZ(15px)" }}>
            <p
              className="text-[10px] uppercase tracking-[0.3em] mb-2 font-semibold"
              style={{ color: service.color }}
            >
              {service.short}
            </p>
            <h3
              className={`font-extrabold text-white tracking-tight ${
                isHero
                  ? "text-3xl md:text-5xl mb-3"
                  : "text-lg md:text-xl mb-1.5"
              }`}
            >
              {isHero ? (
                <>
                  {service.title.split(" ")[0]}{" "}
                  <AuroraText speed={1.5}>
                    {service.title.split(" ").slice(1).join(" ")}
                  </AuroraText>
                </>
              ) : (
                service.title
              )}
            </h3>

            {isHero && (
              <div className="flex flex-wrap gap-2 mb-4">
                {service.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] px-3 py-1 rounded-full border backdrop-blur-md"
                    style={{
                      borderColor: `${service.color}55`,
                      color: service.color,
                      background: `${service.color}10`,
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}

            <div
              className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-[0.25em] font-medium opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-500"
            >
              <span>Saber más</span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ServiceData | null>(null);
  const { colors } = CoreFitTheme;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = gridRef.current?.querySelectorAll("[data-bento-card]");
      if (cards && cards.length) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: { each: 0.08, from: "start" },
            ease: "expo.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <LayoutGroup>
      <section
        ref={sectionRef}
        className="relative bg-black px-4 md:px-8 lg:px-12 py-20 md:py-28 overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <CursorGlow color={colors.secondary} size={500} intensity={0.32} />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at center, black 30%, transparent 80%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 mb-5"
              style={{ color: colors.warning }}
            >
              <Sparkles size={11} /> Servicios
            </motion.span>
            <h2
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]"
            >
              Todo lo que necesitas
              <br />
              <span style={{ color: colors.text }}>
                bajo un mismo <AuroraText speed={1.5}>techo.</AuroraText>
              </span>
            </h2>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
            style={{ gridAutoRows: "minmax(200px, auto)" }}
          >
            <div
              data-bento-card
              className="sm:col-span-2 lg:col-span-4 relative rounded-3xl border border-white/10 overflow-hidden p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8"
              style={{
                background: `linear-gradient(110deg, ${colors.secondary}18 0%, rgba(0,0,0,0.55) 50%, ${colors.primary}11 100%)`,
                minHeight: "auto",
              }}
            >
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full pointer-events-none opacity-60"
                style={{
                  background: `radial-gradient(circle, ${colors.secondary}55 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />
              <div
                className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full pointer-events-none opacity-50"
                style={{
                  background: `radial-gradient(circle, ${colors.primary}44 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />

              <div className="relative flex-1">
                <span
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
                  style={{ color: colors.secondary }}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: colors.success }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2 w-2"
                      style={{ background: colors.success }}
                    />
                  </span>
                  Comunidad activa
                </span>
                <p className="text-white/70 text-sm md:text-base max-w-xl">
                  Más de quinientos miembros entrenando con propósito cada
                  semana. Sumamos socios nuevos esta semana.
                </p>
              </div>

              <div className="relative flex items-baseline gap-2 md:gap-3 shrink-0">
                <span className="text-6xl md:text-8xl lg:text-9xl font-black tabular-nums tracking-tight text-white leading-none">
                  +500
                </span>
                <div className="flex flex-col">
                  <span
                    className="text-xs uppercase tracking-[0.25em] font-semibold"
                    style={{ color: colors.success }}
                  >
                    Miembros
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                    Activos / semana
                  </span>
                </div>
              </div>
            </div>

            <div
              data-bento-card
              className="sm:col-span-2 lg:col-span-2 lg:row-span-2"
              style={{ minHeight: "100%" }}
            >
              <BentoCard
                service={SERVICES[0]}
                onOpen={setActive}
                layoutId={`bento-${SERVICES[0].id}`}
                className="h-full"
              />
            </div>

            <div data-bento-card>
              <BentoCard
                service={SERVICES[1]}
                onOpen={setActive}
                layoutId={`bento-${SERVICES[1].id}`}
                className="h-full"
              />
            </div>

            <div data-bento-card>
              <BentoCard
                service={SERVICES[2]}
                onOpen={setActive}
                layoutId={`bento-${SERVICES[2].id}`}
                className="h-full"
              />
            </div>

            <div data-bento-card className="sm:col-span-2 lg:col-span-2">
              <BentoCard
                service={SERVICES[3]}
                onOpen={setActive}
                layoutId={`bento-${SERVICES[3].id}`}
                className="h-full"
              />
            </div>

            <div data-bento-card>
              <BentoCard
                service={SERVICES[4]}
                onOpen={setActive}
                layoutId={`bento-${SERVICES[4].id}`}
                className="h-full"
              />
            </div>

            <div data-bento-card>
              <BentoCard
                service={SERVICES[5]}
                onOpen={setActive}
                layoutId={`bento-${SERVICES[5].id}`}
                className="h-full"
              />
            </div>

            <div data-bento-card className="sm:col-span-2 lg:col-span-2">
              <BentoCard
                service={SERVICES[6]}
                onOpen={setActive}
                layoutId={`bento-${SERVICES[6].id}`}
                className="h-full"
              />
            </div>
          </div>
        </div>

        {createPortal(
          <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setActive(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-black"
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                style={{
                  boxShadow: `0 50px 120px -30px ${active.color}88`,
                }}
              >
                <button
                  onClick={() => setActive(null)}
                  data-magnetic
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition cursor-pointer flex items-center justify-center"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
                <motion.img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-[40vh] md:h-[50vh] object-cover"
                />
                <div
                  className="absolute top-0 left-0 right-0 h-[40vh] md:h-[50vh] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.95) 100%)",
                  }}
                />
                <div className="absolute top-1/3 left-6 md:left-10 z-10">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2"
                    style={{ color: active.color }}
                  >
                    {active.number} · {active.short}
                  </p>
                  <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                    {active.title}
                  </h3>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative p-6 md:p-10 -mt-10 md:-mt-16 z-10"
                >
                  <p className="text-white/85 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                    {active.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {active.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-3 py-1.5 rounded-full border"
                        style={{
                          borderColor: `${active.color}55`,
                          color: active.color,
                          background: `${active.color}10`,
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setActive(null)}
                    data-magnetic
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold cursor-pointer transition"
                    style={{
                      background: active.color,
                      color: "#000",
                      boxShadow: `0 14px 40px -10px ${active.color}`,
                    }}
                  >
                    Quiero este plan <ArrowUpRight size={16} />
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
          document.body
        )}
      </section>
    </LayoutGroup>
  );
}
