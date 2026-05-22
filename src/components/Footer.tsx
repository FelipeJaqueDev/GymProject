import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { Instagram, Facebook, Phone, Mail, ArrowUp, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Marquee from "react-fast-marquee";
import gymLogo from "../assets/Images/Logo/MyLogo.png";
import { microConfettiFromElement } from "@/motions/microConfetti";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  email: z.string().email("Email inválido"),
});
type FormData = z.infer<typeof schema>;

export default function Footer() {
  const { colors } = CoreFitTheme;
  const footerRef = useRef<HTMLElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const newsletterBtnRef = useRef<HTMLButtonElement>(null);
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 700));
    console.info("Newsletter signup:", data.email);
    setSubscribed(true);
    microConfettiFromElement(newsletterBtnRef.current, {
      count: 14,
      colors: ["#00E676", "#2979FF", "#F5F5F5"],
      spread: 60,
      scalar: 0.7,
      startVelocity: 25,
    });
    reset();
    setTimeout(() => setSubscribed(false), 4000);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = footerRef.current?.querySelectorAll("[data-footer-item]");
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
      if (outlineRef.current) {
        gsap.to(outlineRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={footerRef}
      className="relative w-full pt-20 pb-12 px-6 md:px-20 overflow-hidden"
      style={{ background: colors.background, color: colors.text }}
    >
      <div className="border-t border-white/5 mb-12" />

      <Marquee
        gradient
        gradientColor="#0A0A0A"
        gradientWidth={120}
        speed={40}
        className="mb-16"
      >
        {["TRANSFORMA", "MEJORA", "SUPERA", "ENTRENA", "VIVE"].map((w) => (
          <span
            key={w}
            className="mx-8 text-3xl font-extrabold tracking-[0.3em] text-white/30 hover:text-white transition"
          >
            {w} ·
          </span>
        ))}
      </Marquee>

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 z-10">
        <div data-footer-item className="md:col-span-4">
          <img src={gymLogo} alt="CoreFit Logo" className="w-28 mb-4" />
          <p className="text-sm text-white/60 max-w-xs leading-relaxed mb-6">
            Transforma tu cuerpo, mejora tu vida. Una comunidad que entrena con
            propósito.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <label className="block text-xs uppercase tracking-[0.3em] text-white/50">
              Suscríbete
            </label>
            <div className="flex items-stretch gap-0 rounded-full border border-white/15 bg-white/5 backdrop-blur-md overflow-hidden focus-within:border-white/40 transition">
              <input
                type="email"
                placeholder="tu@email.com"
                {...register("email")}
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/30 outline-none"
              />
              <button
                ref={newsletterBtnRef}
                type="submit"
                data-magnetic
                disabled={isSubmitting || subscribed}
                className="px-5 text-sm font-semibold cursor-pointer transition disabled:opacity-70"
                style={{
                  background: subscribed ? colors.success : colors.secondary,
                  color: colors.text,
                }}
              >
                {subscribed ? (
                  <span className="inline-flex items-center gap-1">
                    <Check size={14} /> Listo
                  </span>
                ) : isSubmitting ? (
                  "..."
                ) : (
                  "Unirme"
                )}
              </button>
            </div>
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </form>
        </div>

        <div data-footer-item className="md:col-span-3">
          <h3 className="text-sm uppercase tracking-[0.3em] mb-4 text-white/50">
            Navegación
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { l: "Inicio", h: "#hero" },
              { l: "Servicios", h: "#services" },
              { l: "Planes", h: "/plans" },
              { l: "Nosotros", h: "/aboutus" },
              { l: "Contacto", h: "/contact" },
            ].map((it) => (
              <li key={it.l}>
                <a
                  href={it.h}
                  data-magnetic
                  className="text-white/80 hover:text-white transition cursor-pointer inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-white group-hover:w-4 transition-all" />
                  {it.l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div data-footer-item className="md:col-span-3">
          <h3 className="text-sm uppercase tracking-[0.3em] mb-4 text-white/50">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-white/80">
              <Phone size={14} /> +56 9 4500 4380
            </li>
            <li className="flex items-center gap-2 text-white/80">
              <Mail size={14} /> felipejaque.s97@gmail.com
            </li>
            <li className="flex items-start gap-2 text-white/80">
              📍 Golda Meir 216, Las Condes
            </li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a
              href="#"
              data-magnetic
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer"
            >
              <Instagram size={16} />
            </a>
            <a
              href="#"
              data-magnetic
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div data-footer-item className="md:col-span-2 flex md:justify-end items-start">
          <button
            onClick={scrollTop}
            data-magnetic
            aria-label="Volver arriba"
            className="group inline-flex flex-col items-center gap-2 px-4 py-3 rounded-2xl border border-white/15 hover:border-white/40 transition cursor-pointer"
          >
            <ArrowUp
              size={20}
              className="transition-transform group-hover:-translate-y-1"
            />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
              Volver
            </span>
          </button>
        </div>
      </div>

      <div
        ref={outlineRef}
        className="relative mt-16 pointer-events-none select-none overflow-hidden will-change-transform"
        aria-hidden="true"
      >
        <h2
          className="font-extrabold tracking-tighter leading-none text-center whitespace-nowrap"
          style={{
            fontSize: "clamp(80px, 18vw, 280px)",
            WebkitTextStroke: "1px rgba(255,255,255,0.18)",
            color: "transparent",
          }}
        >
          COREFIT
        </h2>
      </div>

      <p className="relative text-center text-xs text-white/35 mt-10">
        © {new Date().getFullYear()} JaqueApps. Todos los derechos reservados ·
        Hecho en Chile
      </p>
    </footer>
  );
}
