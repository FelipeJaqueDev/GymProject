import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import confetti from "canvas-confetti";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { Star, Quote, ArrowLeftRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  name: string;
  age: number;
  rating: number;
  avatar: string;
  stat: { value: string; label: string };
  before: string;
  after: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Nunca pensé que podría volver a sentirme tan bien conmigo mismo. En solo tres meses noté un cambio increíble en mi energía y mi cuerpo.",
    name: "Carlos González",
    age: 29,
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop",
    stat: { value: "-12kg", label: "en 3 meses" },
    before:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=900&auto=format&fit=crop",
  },
  {
    quote:
      "Llegué sin saber por dónde empezar, y hoy entrenar es parte de mi rutina. Bajé peso, gané fuerza y, sobre todo, confianza.",
    name: "Sandra Núñez",
    age: 39,
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    stat: { value: "+8kg", label: "masa muscular" },
    before:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=900&auto=format&fit=crop",
  },
  {
    quote:
      "El ambiente del gimnasio me impulsó a superarme. Pasé de no poder correr 5 minutos a completar mi primera media maratón.",
    name: "Sebastián López",
    age: 18,
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=400&auto=format&fit=crop",
    stat: { value: "21km", label: "media maratón" },
    before:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=900&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=900&auto=format&fit=crop",
  },
  {
    quote:
      "Más que un gimnasio, es una comunidad. Los entrenadores me ayudaron a transformar no solo mi cuerpo, sino también mi mentalidad.",
    name: "Christian Araya",
    age: 40,
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=400&auto=format&fit=crop",
    stat: { value: "-15kg", label: "y sin volver" },
    before:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=900&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=900&auto=format&fit=crop",
  },
  {
    quote:
      "Ver los resultados semana a semana fue lo más motivador. Gané masa muscular, mejoré mi postura y ahora tengo más energía para todo.",
    name: "Claudia Salinas",
    age: 32,
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=400&auto=format&fit=crop",
    stat: { value: "+6kg", label: "fuerza pura" },
    before:
      "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=900&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b6?q=80&w=900&auto=format&fit=crop",
  },
];

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const setFromEvent = (clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full overflow-hidden rounded-xl select-none cursor-ew-resize"
      onMouseMove={(e) => e.buttons === 1 && setFromEvent(e.clientX)}
      onTouchMove={(e) => setFromEvent(e.touches[0].clientX)}
      onClick={(e) => setFromEvent(e.clientX)}
    >
      <img src={after} alt="después" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={before} alt="antes" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${(100 / pos) * 100}%` }} />
      </div>
      <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.3em] bg-black/60 text-white px-2 py-1 rounded">
        Antes
      </span>
      <span className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.3em] bg-white/90 text-black px-2 py-1 rounded">
        Ahora
      </span>
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `calc(${pos}% - 1px)` }}>
        <div className="w-[2px] h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-black p-2 rounded-full shadow-xl">
          <ArrowLeftRight size={14} />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);
  const { colors } = CoreFitTheme;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const fireConfetti = () => {
      const end = Date.now() + 2400;
      const palette = ["#E53935", "#2979FF", "#FFEA00", "#00E676", "#F5F5F5"];
      const frame = () => {
        if (Date.now() > end) return;
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 60,
          startVelocity: 55,
          origin: { x: 0, y: 0.55 },
          colors: palette,
          scalar: 0.9,
          ticks: 180,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 60,
          startVelocity: 55,
          origin: { x: 1, y: 0.55 },
          colors: palette,
          scalar: 0.9,
          ticks: 180,
        });
        requestAnimationFrame(frame);
      };
      frame();
    };

    const ctx = gsap.context(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasPlayed.current) {
            fireConfetti();
            hasPlayed.current = true;
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(section);

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const cards = track.querySelectorAll("[data-testimonial-card]");
          const cardWidth = (cards[0] as HTMLElement)?.offsetWidth ?? 0;
          const gap = 32;
          const totalDistance = (cardWidth + gap) * (cards.length - 1);

          gsap.to(track, {
            x: -totalDistance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalDistance + 200}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, idx) => {
            const stat = (card as HTMLElement).querySelector("[data-stat-value]");
            if (!stat) return;
            gsap.fromTo(
              stat,
              { scale: 0.6, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(2)",
                delay: idx * 0.05,
                scrollTrigger: {
                  trigger: section,
                  start: "top top",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });
        },
      });

      return () => observer.disconnect();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-black py-16 overflow-hidden">
      <div className="lg:h-screen lg:flex lg:items-center">
        <div className="w-full">
          <div ref={titleRef} className="text-center mb-10 px-6 relative">
            <Quote
              className="absolute left-1/2 -translate-x-1/2 -top-8 text-white/5 pointer-events-none"
              size={240}
              strokeWidth={1}
            />
            <h1
              className="relative text-4xl md:text-6xl font-extrabold tracking-tight"
              style={{ color: colors.text }}
            >
              Historias de{" "}
              <LineShadowText className="italic" shadowColor="#ffffff">
                transformación
              </LineShadowText>
            </h1>
            <p className="relative mt-3 text-white/70">
              <TypingAnimation words={["Cambiamos vidas, para mejor 🔥"]} typeSpeed={120} />
            </p>
          </div>

          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-8 px-[10vw] lg:px-[15vw] will-change-transform"
            >
              {testimonials.map((t, i) => (
                <article
                  key={i}
                  data-testimonial-card
                  className="relative shrink-0 w-[85vw] sm:w-[70vw] lg:w-[60vw] max-w-4xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
                >
                  <div className="grid lg:grid-cols-2 gap-6 p-6 lg:p-10">
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-5">
                          <img
                            src={t.avatar}
                            alt={t.name}
                            className="w-14 h-14 rounded-full object-cover border-2"
                            style={{ borderColor: colors.secondary }}
                          />
                          <div>
                            <p className="text-white font-bold text-lg leading-tight">
                              {t.name}
                            </p>
                            <p className="text-white/50 text-sm">{t.age} años</p>
                          </div>
                        </div>
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: t.rating }).map((_, k) => (
                            <Star
                              key={k}
                              size={18}
                              fill={colors.warning}
                              stroke={colors.warning}
                            />
                          ))}
                        </div>
                        <Quote
                          className="mb-3"
                          size={28}
                          style={{ color: colors.secondary }}
                        />
                        <p className="text-white/85 text-lg leading-relaxed mb-6">
                          {t.quote}
                        </p>
                      </div>
                      <div
                        className="relative inline-flex flex-col items-start p-5 rounded-2xl border"
                        style={{
                          borderColor: `${colors.success}33`,
                          background: `${colors.success}10`,
                        }}
                      >
                        <span className="text-xs uppercase tracking-[0.3em] text-white/60 mb-1">
                          Resultado
                        </span>
                        <span
                          data-stat-value
                          data-stat-target={t.stat.value}
                          className="text-5xl font-extrabold tabular-nums"
                          style={{ color: colors.success }}
                        >
                          {t.stat.value}
                        </span>
                        <span className="text-white/70 text-sm mt-1">{t.stat.label}</span>
                      </div>
                    </div>
                    <div className="relative h-72 lg:h-auto">
                      <BeforeAfter before={t.before} after={t.after} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
