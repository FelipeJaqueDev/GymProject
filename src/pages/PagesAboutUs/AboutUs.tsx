import { useLayoutEffect, useRef, useState } from "react";
import GenericNavbar from "@/core/components/Navbar/GenericNavbar";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import LeftPhoto from "../../assets/Images/Bg/left_photo3.jpg";
import RightPhoto from "../../assets/Images/Bg/right_photo.jpg";
import Footer from "@/components/Footer";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { AuroraText } from "@/components/ui/aurora-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import SmoothScroll from "@/motions/SmoothScroll";
import MagneticCursor from "@/motions/MagneticCursor";
import CTAShaderBg from "@/components/CTAShaderBg";
import { microConfetti, microConfettiFromElement } from "@/motions/microConfetti";
import {
  Sparkles,
  Quote,
  Heart,
  Users,
  Trophy,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Marquee from "react-fast-marquee";

import CEO_Photo from "../../assets/Images/Bg/CEO.jpg";
import HOST_Photo from "../../assets/Images/Bg/hostess.jpg";
import spinning_tutor from "../../assets/Images/Bg/spinning.jpg";
import personal_trainer from "../../assets/Images/Bg/woman_personal_trainer.jpg";
import boxing_tutor from "../../assets/Images/Bg/boxing.jpg";

gsap.registerPlugin(ScrollTrigger);

const teamMembers = [
  {
    id: 1,
    name: "Leonardo González",
    role: "CEO CoreFit",
    description:
      "Líder visionario con más de 10 años transformando vidas a través del fitness. Apasionado del entrenamiento funcional y la nutrición deportiva.",
    image: CEO_Photo,
  },
  {
    id: 2,
    name: "Marcela Uribe",
    role: "Anfitriona",
    description:
      "Encargada de que cada visita sea memorable. Tu primer contacto con CoreFit y la razón por la que la gente vuelve.",
    image: HOST_Photo,
  },
  {
    id: 3,
    name: "Felix López",
    role: "Coach de Spinning",
    description:
      "Especialista en cardio de alta intensidad. Te hará sudar, gritar y disfrutar cada pedaleada con la mejor música.",
    image: spinning_tutor,
  },
  {
    id: 4,
    name: "Catalina Quiroz",
    role: "Personal Trainer",
    description:
      "Enfocada en técnica impecable y en ayudarte a romper tus propios límites físicos sin lesiones.",
    image: personal_trainer,
  },
  {
    id: 5,
    name: "Samuel Mandela",
    role: "Coach de Boxeo",
    description:
      "Te enseñará disciplina, defensa y agilidad con entrenamientos dinámicos. 15 años en el ring.",
    image: boxing_tutor,
  },
];

const TIMELINE = [
  {
    year: "2014",
    title: "El garaje",
    description: "Empezamos con 3 entrenadores y 12 socios en un garaje de Las Condes.",
  },
  {
    year: "2017",
    title: "Primera sede",
    description: "Abrimos nuestra primera locación oficial. 200 miembros en 6 meses.",
  },
  {
    year: "2019",
    title: "Expansión",
    description: "Tres sedes activas. Lanzamos clases grupales temáticas.",
  },
  {
    year: "2022",
    title: "Pandemia & app",
    description: "Sobrevivimos. Lanzamos la app PRO. Comunidad online de 3.000 personas.",
  },
  {
    year: "2024",
    title: "Premium",
    description: "Plan premium con nutricionista y personal trainer. Spa & sauna.",
  },
  {
    year: "2026",
    title: "Hoy",
    description: "+500 miembros activos, +30 coaches, 4.9★ en Google.",
  },
];

const VALUES = [
  {
    Icon: Heart,
    title: "Constancia",
    desc: "Resultados duraderos vienen de hábitos sostenibles, no de esfuerzos heroicos puntuales.",
    color: "#E53935",
  },
  {
    Icon: Users,
    title: "Comunidad",
    desc: "Entrenar solo es difícil. Entrenar acompañado, además de divertido, te hace volver.",
    color: "#2979FF",
  },
  {
    Icon: Trophy,
    title: "Resultados",
    desc: "Medimos lo que importa: composición corporal, fuerza, energía y disfrute.",
    color: "#FFEA00",
  },
];

function ValueCard({ value, idx }: { value: typeof VALUES[number]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xRot = gsap.quickTo(inner, "rotateX", { duration: 0.6, ease: "power3.out" });
    const yRot = gsap.quickTo(inner, "rotateY", { duration: 0.6, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      xRot(-py * 12);
      yRot(px * 12);
    };
    const onLeave = () => {
      xRot(0);
      yRot(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="relative w-full"
    >
      <div
        ref={innerRef}
        className="relative rounded-3xl p-8 md:p-10 border border-white/10 backdrop-blur-md overflow-hidden will-change-transform"
        style={{
          background: `linear-gradient(160deg, ${value.color}11 0%, rgba(255,255,255,0.02) 60%)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(circle, ${value.color}33 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
        <div
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: `${value.color}22`, color: value.color, transform: "translateZ(40px)" }}
        >
          <value.Icon size={26} />
        </div>
        <h3
          className="relative text-2xl md:text-3xl font-extrabold mb-3 tracking-tight"
          style={{ transform: "translateZ(30px)" }}
        >
          {value.title}
        </h3>
        <p
          className="relative text-white/70 leading-relaxed text-sm md:text-base"
          style={{ transform: "translateZ(20px)" }}
        >
          {value.desc}
        </p>
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${value.color}66, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

function splitChars(text: string) {
  return text.split("").map((c, i) => (
    <span
      key={i}
      data-about-char
      className="inline-block"
      style={{ whiteSpace: c === " " ? "pre" : "normal" }}
    >
      {c}
    </span>
  ));
}

const AboutUs = () => {
  const { colors } = CoreFitTheme;
  const [activeIndex, setActiveIndex] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);

  const manifestoRef = useRef<HTMLElement>(null);
  const manifestoLinesRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<HTMLElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);

  const aboutImgRef = useRef<HTMLImageElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const missionImgRef = useRef<HTMLImageElement>(null);
  const missionTextRef = useRef<HTMLDivElement>(null);

  const ceoQuoteRef = useRef<HTMLDivElement>(null);

  const statsRef = useRef<HTMLDivElement>(null);

  const teamRef = useRef<HTMLElement>(null);

  const current = teamMembers[activeIndex];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = heroTitleRef.current?.querySelectorAll("[data-about-char]");
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.3 });

      if (chars) {
        tl.fromTo(
          chars,
          { yPercent: 120, opacity: 0, rotateX: -80, filter: "blur(12px)" },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.1,
            stagger: 0.025,
          }
        );
      }
      tl.fromTo(
        heroSubRef.current,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9 },
        "-=0.5"
      );
      tl.fromTo(
        heroScrollRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      );
      if (heroScrollRef.current) {
        gsap.to(heroScrollRef.current.querySelector("[data-dot]"), {
          y: 12,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "sine.inOut",
        });
      }

      const manifestoLines = manifestoLinesRef.current?.querySelectorAll("[data-manifesto-line]");
      if (manifestoLines) {
        gsap.fromTo(
          manifestoLines,
          { opacity: 0.15, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.6,
            ease: "expo.out",
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.8,
            },
          }
        );
      }

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const track = timelineTrackRef.current;
          const trigger = timelineRef.current;
          if (!track || !trigger) return;
          const total = track.scrollWidth - window.innerWidth + 200;
          gsap.to(track, {
            x: -total,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top top",
              end: () => `+=${total + 400}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        },
      });

      const revealUp = (el: HTMLElement | null) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      };
      revealUp(aboutTextRef.current);
      revealUp(missionTextRef.current);
      revealUp(ceoQuoteRef.current);

      [aboutImgRef.current, missionImgRef.current].forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.2, y: 50 },
          {
            scale: 1,
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      const statNums = statsRef.current?.querySelectorAll("[data-counter]");
      statNums?.forEach((el, idx) => {
        const target = parseInt((el as HTMLElement).dataset.target ?? "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = `${Math.floor(obj.v)}`;
          },
          onComplete: () => {
            const palettes = [
              ["#00E676", "#F5F5F5"],
              ["#2979FF", "#F5F5F5"],
              ["#FFEA00", "#F5F5F5"],
            ];
            microConfettiFromElement(el, {
              count: 8,
              spread: 45,
              scalar: 0.6,
              startVelocity: 18,
              ticks: 70,
              colors: palettes[idx % palettes.length],
            });
          },
        });
      });

      if (timelineRef.current) {
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: "top 65%",
          once: true,
          onEnter: () => {
            microConfetti({
              count: 22,
              spread: 70,
              scalar: 0.75,
              startVelocity: 28,
              ticks: 110,
              colors: ["#2979FF", "#00E676", "#FFEA00", "#E53935"],
              origin: { x: 0.5, y: 0.35 },
            });
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <MagneticCursor />
      <div className="bg-black text-white">
        <GenericNavbar />

        <section
          ref={heroRef}
          className="relative h-[100vh] flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <CTAShaderBg />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 50%, rgba(10,10,10,0.98) 100%)",
            }}
          />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 text-center px-6 max-w-5xl"
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.4em] border border-white/15 backdrop-blur-md mb-6"
              style={{ color: colors.warning }}
            >
              <Sparkles size={11} /> Nosotros
            </motion.span>
            <h1
              ref={heroTitleRef}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6 overflow-hidden"
            >
              <span className="block">{splitChars("Detrás de")}</span>
              <span className="block">
                <AuroraText speed={1.5}>CoreFit</AuroraText>
              </span>
            </h1>
            <p
              ref={heroSubRef}
              className="text-base md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed"
            >
              Una comunidad que entrena con propósito. Doce años transformando cuerpos y mentes en Las Condes.
            </p>
          </motion.div>

          <div
            ref={heroScrollRef}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
          >
            <span className="text-[10px] uppercase tracking-[0.4em]">Descubre</span>
            <div className="w-[26px] h-[42px] rounded-full border border-white/40 flex justify-center pt-2">
              <span data-dot className="block w-1 h-1 rounded-full bg-white" />
            </div>
          </div>
        </section>

        <section
          ref={manifestoRef}
          className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden"
        >
          <div className="relative max-w-5xl mx-auto">
            <Quote
              size={120}
              strokeWidth={1}
              className="absolute -top-8 -left-2 md:-left-8 text-white/5 pointer-events-none"
            />
            <div
              ref={manifestoLinesRef}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] space-y-2"
            >
              <p data-manifesto-line className="text-white">
                No vendemos abdominales.
              </p>
              <p data-manifesto-line className="text-white">
                No prometemos cambios en 30 días.
              </p>
              <p data-manifesto-line className="text-white/60">
                Vendemos algo más simple:
              </p>
              <p
                data-manifesto-line
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${colors.secondary}, ${colors.warning})`,
                }}
              >
                ganas de volver mañana.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={timelineRef}
          className="relative lg:h-screen overflow-hidden py-20 lg:py-0"
        >
          <div className="lg:h-screen lg:flex lg:items-center">
            <div className="w-full">
              <div className="text-center mb-12 lg:mb-16 px-6">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 mb-5"
                  style={{ color: colors.warning }}
                >
                  <Sparkles size={11} /> Nuestra historia
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Doce años en una línea
                </h2>
              </div>

              <div className="overflow-hidden py-8">
                <div
                  ref={timelineTrackRef}
                  className="flex gap-6 lg:gap-12 px-6 md:px-[10vw] will-change-transform"
                >
                  {TIMELINE.map((t, i) => (
                    <motion.div
                      key={t.year}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="relative shrink-0 w-[280px] md:w-[340px] rounded-3xl p-6 md:p-8 border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-md"
                    >
                      <div
                        className="absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap z-10"
                        style={{
                          background: colors.warning,
                          color: "#000",
                          boxShadow: `0 8px 20px -6px ${colors.warning}`,
                        }}
                      >
                        Hito
                      </div>
                      <div
                        className="text-5xl md:text-6xl font-black tabular-nums mb-3 tracking-tight"
                        style={{ color: colors.secondary }}
                      >
                        {t.year}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{t.title}</h3>
                      <p className="text-white/65 text-sm leading-relaxed">{t.description}</p>
                      {i < TIMELINE.length - 1 && (
                        <div
                          className="hidden lg:flex absolute top-1/2 -right-12 items-center"
                          style={{ color: colors.secondary }}
                        >
                          <ArrowRight size={28} strokeWidth={1.5} />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative pt-20 md:pt-32 pb-20 md:pb-32 px-6 md:px-12 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 20%, ${colors.secondary}22 0%, transparent 50%)`,
            }}
          />
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div
                className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl"
                style={{ boxShadow: `0 40px 80px -30px ${colors.secondary}55` }}
              >
                <img
                  ref={aboutImgRef}
                  src={LeftPhoto}
                  alt="Nosotros"
                  className="w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring" }}
                className="hidden md:block absolute -top-6 -right-6 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 bg-white/10"
              >
                <span className="text-xs uppercase tracking-[0.3em]">Desde 2014</span>
              </motion.div>
            </div>

            <div ref={aboutTextRef} className="order-1 lg:order-2">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 mb-5"
                style={{ color: colors.warning }}
              >
                <Sparkles size={11} /> Quiénes somos
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.05]">
                <EncryptedText
                  text="Nosotros"
                  encryptedClassName="text-neutral-500"
                  revealedClassName="text-white"
                  revealDelayMs={60}
                />
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4">
                CoreFit es más que un gimnasio; somos una comunidad vibrante y dedicada al movimiento consciente y la salud integral.
              </p>
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                Entendemos que la constancia necesita apoyo. Por eso, no solo te ofrecemos herramientas de entrenamiento y contenido de alta calidad para que te sientas fuerte y motivado, sino también una red de apoyo comprometida a celebrar cada paso de tu progreso.
              </p>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Nuestro equipo está aquí para inspirarte, guiarte y asegurar que te sientas conectado en cada etapa de tu transformación.
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 mb-5"
                style={{ color: colors.primary }}
              >
                <Sparkles size={11} /> Nuestros valores
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
                Tres pilares,
                <br />
                <span style={{ color: colors.warning }}>una sola misión.</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {VALUES.map((v, i) => (
                <ValueCard key={v.title} value={v} idx={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 15% 80%, ${colors.primary}22 0%, transparent 50%)`,
            }}
          />
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div ref={missionTextRef}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 mb-5"
                style={{ color: colors.primary }}
              >
                <Sparkles size={11} /> Nuestra causa
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-[1.05]">
                <EncryptedText
                  text="Misión"
                  encryptedClassName="text-neutral-500"
                  revealedClassName="text-white"
                  revealDelayMs={60}
                />
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                Potenciar la salud y el bienestar integral de nuestra comunidad, ofreciendo un ambiente motivador y programas de entrenamiento de alta calidad enfocados en fuerza, estabilidad y resistencia física. Buscamos inspirar a cada miembro a alcanzar su máximo potencial, transformando hábitos y logrando resultados duraderos.
              </p>
              <div
                ref={statsRef}
                className="mt-10 grid grid-cols-3 gap-4"
              >
                {[
                  { target: 500, label: "Miembros", suffix: "+", color: colors.success },
                  { target: 30, label: "Coaches", suffix: "+", color: colors.secondary },
                  { target: 12, label: "Años", suffix: "", color: colors.warning },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-4 border border-white/10 bg-white/[0.02]"
                  >
                    <div className="flex items-baseline gap-0.5">
                      <span
                        data-counter
                        data-target={s.target}
                        className="text-3xl md:text-4xl font-extrabold tabular-nums"
                        style={{ color: s.color }}
                      >
                        0
                      </span>
                      <span
                        className="text-xl md:text-2xl font-extrabold"
                        style={{ color: s.color }}
                      >
                        {s.suffix}
                      </span>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div
                className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl"
                style={{ boxShadow: `0 40px 80px -30px ${colors.primary}55` }}
              >
                <img
                  ref={missionImgRef}
                  src={RightPhoto}
                  alt="Nuestra Misión"
                  className="w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
          <div
            ref={ceoQuoteRef}
            className="relative max-w-5xl mx-auto grid md:grid-cols-5 gap-8 items-center"
          >
            <div className="md:col-span-2 flex justify-center md:justify-start">
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full pointer-events-none -m-4"
                  style={{
                    background: `radial-gradient(circle, ${colors.warning}44 0%, transparent 60%)`,
                    filter: "blur(30px)",
                  }}
                />
                <img
                  src={CEO_Photo}
                  alt="Leonardo González"
                  className="relative w-44 h-44 md:w-56 md:h-56 rounded-full object-cover border-2"
                  style={{ borderColor: `${colors.warning}88` }}
                />
                <div
                  className="absolute -bottom-2 right-0 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold"
                  style={{ background: colors.warning, color: "#000" }}
                >
                  CEO
                </div>
              </div>
            </div>
            <div className="md:col-span-3 relative">
              <Quote
                size={56}
                className="mb-4"
                style={{ color: `${colors.warning}` }}
              />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-6 text-white">
                Nadie llega a CoreFit perfecto. Lo nuestro es{" "}
                <span style={{ color: colors.warning }}>acompañarte mientras te conviertes</span> en quien quieres ser.
              </blockquote>
              <div>
                <p className="font-bold text-white">Leonardo González</p>
                <p className="text-sm text-white/50 uppercase tracking-[0.2em]">
                  CEO & Fundador
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={teamRef}
          className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        >
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 mb-5"
                style={{ color: colors.warning }}
              >
                <Sparkles size={11} /> El equipo
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
                <EncryptedText
                  text="CoreFit Team"
                  encryptedClassName="text-neutral-500"
                  revealedClassName="text-white"
                  revealDelayMs={60}
                />
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
                Nuestro éxito se basa en las personas que nos guían. Cada coach certificado, cada cara que ves al entrar — todos comprometidos con tu transformación.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center mb-16">
              <div className="lg:col-span-2 flex justify-center items-center relative">
                <div
                  className="absolute rounded-full border border-dashed border-white/15"
                  style={{
                    width: "min(420px, 90%)",
                    aspectRatio: 1,
                    animation: "rotate-slow 25s linear infinite",
                  }}
                />
                <div
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "70%",
                    aspectRatio: 1,
                    background: `radial-gradient(circle, ${colors.secondary}33 0%, transparent 65%)`,
                    filter: "blur(40px)",
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt={current.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] rounded-full object-cover z-10 border-2 border-white/20"
                  />
                </AnimatePresence>
              </div>

              <div className="lg:col-span-3 text-center lg:text-left lg:pl-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                      {current.name}
                    </h3>
                    <p
                      className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 font-semibold"
                      style={{ color: colors.warning }}
                    >
                      {current.role}
                    </p>
                    <p className="text-white/75 leading-relaxed max-w-xl mx-auto lg:mx-0 text-sm md:text-base">
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                  {teamMembers.map((m, i) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveIndex(i)}
                      data-magnetic
                      aria-label={m.name}
                      className={`relative rounded-full overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        activeIndex === i
                          ? "w-16 h-16 md:w-20 md:h-20 scale-110"
                          : "w-14 h-14 md:w-16 md:h-16 opacity-50 hover:opacity-100 hover:scale-105"
                      }`}
                      style={{
                        borderColor:
                          activeIndex === i ? colors.warning : "transparent",
                        boxShadow:
                          activeIndex === i ? `0 0 20px ${colors.warning}66` : "none",
                      }}
                    >
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <Marquee
                gradient
                gradientColor="#0A0A0A"
                gradientWidth={80}
                speed={30}
                className="py-4"
              >
                {[...teamMembers, ...teamMembers].map((m, i) => (
                  <div key={i} className="flex items-center gap-3 mx-6 opacity-70 hover:opacity-100 transition cursor-default">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                    <div className="text-left">
                      <p className="text-white text-sm font-semibold">{m.name}</p>
                      <p className="text-white/50 text-[10px] uppercase tracking-[0.2em]">
                        {m.role}
                      </p>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-32 px-6 md:px-12 text-center overflow-hidden">
          <div className="relative max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight leading-[1.05]">
              ¿Te sumas a la <AuroraText speed={1.5}>comunidad</AuroraText>?
            </h2>
            <p className="text-white/70 mb-10 text-base md:text-lg">
              Un mes de prueba, sin contratos largos. Solo entrenar.
            </p>
            <a
              href="/plans"
              data-magnetic
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-base tracking-wide cursor-pointer transition"
              style={{
                background: colors.secondary,
                color: colors.text,
                boxShadow: `0 14px 50px -10px ${colors.secondary}`,
              }}
            >
              Ver planes <ChevronDown className="rotate-[-90deg]" size={16} />
            </a>
          </div>
        </section>

        <Footer />
        <style>{`@keyframes rotate-slow{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </SmoothScroll>
  );
};

export default AboutUs;
