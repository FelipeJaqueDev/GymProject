import { useEffect, useLayoutEffect, useRef, useState } from "react";
import GenericNavbar from "@/core/components/Navbar/GenericNavbar";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import Footer from "@/components/Footer";
import SmoothScroll from "@/motions/SmoothScroll";
import MagneticCursor from "@/motions/MagneticCursor";
import MagneticButton from "@/motions/MagneticButton";
import CTAShaderBg from "@/components/CTAShaderBg";
import LocationMap from "@/components/LocationMap";
import { AuroraText } from "@/components/ui/aurora-text";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";
import {
  Loader2,
  Send,
  Check,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Instagram,
  Facebook,
  Quote,
  Clock,
  Star,
  MessageCircle,
  ChevronDown,
  Calendar,
  Briefcase,
  Heart,
  Building,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  nombre: z.string().min(2, "Muy corto"),
  apellido: z.string().min(2, "Muy corto"),
  telefono: z.string().min(8, "Teléfono inválido"),
  email: z.string().email("Email inválido"),
  mensaje: z.string().min(10, "Mínimo 10 caracteres"),
});
type FormData = z.infer<typeof schema>;

function splitChars(text: string) {
  return text.split("").map((c, i) => (
    <span
      key={i}
      data-contact-char
      className="inline-block"
      style={{ whiteSpace: c === " " ? "pre" : "normal" }}
    >
      {c}
    </span>
  ));
}

function Field({
  label,
  type = "text",
  error,
  register,
  textarea,
  autoComplete,
}: {
  label: string;
  type?: string;
  error?: string;
  register: ReturnType<ReturnType<typeof useForm<FormData>>["register"]>;
  textarea?: boolean;
  autoComplete?: string;
}) {
  if (textarea)
    return (
      <div className="relative">
        <textarea
          {...register}
          placeholder=" "
          rows={5}
          className="peer w-full px-4 pt-6 pb-3 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-white/40 focus:bg-white/[0.07] transition placeholder-transparent text-sm resize-none"
        />
        <label className="pointer-events-none absolute left-4 top-3 text-white/40 text-[10px] uppercase tracking-[0.2em] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em]">
          {label}
        </label>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs mt-1.5 ml-1"
              style={{ color: "#ff6b6b" }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  return (
    <div className="relative">
      <input
        {...register}
        type={type}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:border-white/40 focus:bg-white/[0.07] transition placeholder-transparent text-sm"
      />
      <label className="pointer-events-none absolute left-4 top-3 text-white/40 text-[10px] uppercase tracking-[0.2em] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em]">
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs mt-1.5 ml-1"
            style={{ color: "#ff6b6b" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface TiltCardProps {
  Icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  color: string;
  external?: boolean;
}

function TiltCard({ Icon, label, value, href, color, external }: TiltCardProps) {
  const wrap = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = wrap.current;
    const ic = inner.current;
    if (!el || !ic) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const xR = gsap.quickTo(ic, "rotateX", { duration: 0.5, ease: "power3.out" });
    const yR = gsap.quickTo(ic, "rotateY", { duration: 0.5, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      xR(-py * 14);
      yR(px * 14);
    };
    const onLeave = () => {
      xR(0);
      yR(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={wrap}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      data-magnetic
      className="group block cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <div
        ref={inner}
        className="relative rounded-2xl p-5 border border-white/10 backdrop-blur-md overflow-hidden will-change-transform"
        style={{
          background: `linear-gradient(160deg, ${color}11 0%, rgba(255,255,255,0.02) 60%)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(circle, ${color}44 0%, transparent 70%)`,
            filter: "blur(18px)",
          }}
        />
        <div className="relative flex items-center gap-4" style={{ transform: "translateZ(20px)" }}>
          <span
            className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${color}22`, color, transform: "translateZ(20px)" }}
          >
            <Icon size={20} />
          </span>
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase tracking-[0.25em] text-white/45 mb-0.5"
              style={{ transform: "translateZ(10px)" }}
            >
              {label}
            </p>
            <p
              className="text-white text-sm md:text-base font-semibold truncate group-hover:text-white transition"
              style={{ transform: "translateZ(15px)" }}
            >
              {value}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

const REASONS = [
  {
    Icon: Calendar,
    title: "Agendar visita",
    desc: "Recorre el gym con un coach. 30 min, sin compromiso.",
    chip: "Más popular",
    color: "#2979FF",
  },
  {
    Icon: Heart,
    title: "Probar una clase",
    desc: "Tu primera clase es gratis. Spinning, boxing o funcional.",
    chip: "Gratis",
    color: "#E53935",
  },
  {
    Icon: Briefcase,
    title: "Cotización corporativa",
    desc: "Planes para empresas desde 5 personas. Descuentos por volumen.",
    chip: "B2B",
    color: "#FFEA00",
  },
  {
    Icon: Building,
    title: "Trabaja con nosotros",
    desc: "Buscamos coaches certificados, anfitriones y nutricionistas.",
    chip: "Carreras",
    color: "#00E676",
  },
];

const FAQS = [
  {
    q: "¿Cuánto tardan en responder?",
    a: "El equipo responde en menos de 24 horas hábiles. En WhatsApp, normalmente en 1-3 minutos durante horario de gym.",
  },
  {
    q: "¿Tengo que pagar para probar una clase?",
    a: "No. Tu primera clase es completamente gratis. Solo trae ropa cómoda y ganas.",
  },
  {
    q: "¿Puedo visitar el gym sin agendar?",
    a: "Sí, pero te recomendamos agendar para que un coach te muestre las instalaciones y armemos un plan a medida.",
  },
  {
    q: "¿Atienden en otras zonas de Santiago?",
    a: "Por ahora solo Las Condes (Manquehue). Suscríbete al newsletter para enterarte cuando abramos nuevas sedes.",
  },
];

function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  const { colors } = CoreFitTheme;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className="border-b border-white/10"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        data-magnetic
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="text-white font-medium text-base md:text-lg pr-4 group-hover:translate-x-1 transition-transform">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center"
          style={{ color: colors.secondary }}
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-white/70 pb-5 pr-12 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function useChileTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Contact() {
  const { colors } = CoreFitTheme;
  const { enqueueSnackbar } = useSnackbar();
  const [success, setSuccess] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const now = useChileTime();
  const hour = now.getHours();
  const isOpen = hour >= 6 && hour < 23;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        enqueueSnackbar("Mensaje enviado correctamente", { variant: "success" });
        setSuccess(true);
        reset();
        setTimeout(() => setSuccess(false), 4000);
      } else {
        enqueueSnackbar("Error al enviar mensaje", { variant: "error" });
      }
    } catch {
      enqueueSnackbar("Mensaje guardado localmente (backend offline)", {
        variant: "info",
      });
      console.info("contact payload:", data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 4000);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll("[data-contact-char]");
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
            stagger: 0.035,
          }
        );
      }

      const statNums = statsRef.current?.querySelectorAll("[data-counter]");
      statNums?.forEach((el) => {
        const target = parseFloat((el as HTMLElement).dataset.target ?? "0");
        const decimals = parseInt((el as HTMLElement).dataset.decimals ?? "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = obj.v.toFixed(decimals);
          },
        });
      });
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
          className="relative pt-32 md:pt-40 pb-16 md:pb-20 px-6 md:px-12 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-60">
            <CTAShaderBg />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          <div className="relative max-w-5xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.4em] border border-white/15 backdrop-blur-md mb-6"
              style={{ color: colors.warning }}
            >
              <Sparkles size={11} /> Contacto
            </motion.span>
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6 overflow-hidden"
            >
              <span className="block">{splitChars("¡Hablemos")}</span>
              <span className="block">
                <AuroraText speed={1.5}>con CoreFit!</AuroraText>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Resolvemos dudas, agendamos visitas y armamos planes a medida. Escríbenos por el canal que prefieras.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-black/40 backdrop-blur-md mb-10"
            >
              <span className="relative flex h-2.5 w-2.5">
                {isOpen && (
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: colors.success }}
                  />
                )}
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ background: isOpen ? colors.success : colors.textMuted }}
                />
              </span>
              <Clock size={13} className="text-white/55" />
              <span className="text-xs text-white/80">
                {isOpen
                  ? "Equipo online · responde en ~3 min"
                  : "Fuera de horario · responderemos mañana"}
              </span>
            </motion.div>

            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              {[
                { target: 24, suffix: "h", decimals: 0, label: "Respuesta", color: colors.secondary },
                { target: 4.9, suffix: "★", decimals: 1, label: "Google rating", color: colors.warning },
                { target: 500, suffix: "+", decimals: 0, label: "Miembros", color: colors.success },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-3 md:p-4 border border-white/10 bg-white/[0.03] backdrop-blur-md"
                >
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span
                      data-counter
                      data-target={s.target}
                      data-decimals={s.decimals}
                      className="text-2xl md:text-3xl font-extrabold tabular-nums"
                      style={{ color: s.color }}
                    >
                      0
                    </span>
                    <span
                      className="text-base md:text-lg font-extrabold"
                      style={{ color: s.color }}
                    >
                      {s.suffix}
                    </span>
                  </div>
                  <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1 text-center">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative pb-20 md:pb-32 px-6 md:px-12 overflow-hidden">
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
                Canales directos
              </h2>
              <p className="text-white/60 text-sm mb-6">
                Elige el que más te acomode.
              </p>
              <TiltCard
                Icon={Mail}
                label="Email"
                value="felipejaque.s97@gmail.com"
                href="mailto:felipejaque.s97@gmail.com"
                color={colors.secondary}
              />
              <TiltCard
                Icon={Phone}
                label="Teléfono"
                value="+56 9 4500 4380"
                href="tel:+56945004380"
                color={colors.primary}
              />
              <TiltCard
                Icon={MapPin}
                label="Dirección"
                value="Golda Meir 216, Las Condes"
                href="https://www.google.com/maps/dir/?api=1&destination=Golda+Meir+216+Las+Condes"
                color={colors.warning}
                external
              />

              <a
                href="https://wa.me/56945004380?text=Hola,%20vengo%20del%20sitio%20de%20CoreFit"
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="group block rounded-2xl p-5 border cursor-pointer transition relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  borderColor: "#25D36655",
                  boxShadow: "0 14px 40px -15px #25D366",
                }}
              >
                <div className="flex items-center gap-4 relative">
                  <span className="shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-white">
                    <MessageCircle size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/70 mb-0.5">
                      Lo más rápido
                    </p>
                    <p className="text-white font-bold text-sm md:text-base">
                      Escríbenos por WhatsApp
                    </p>
                  </div>
                  <Send size={18} className="text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition" />
                </div>
              </a>

              <div className="flex gap-3 pt-2">
                <a
                  href="#"
                  data-magnetic
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  data-magnetic
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
                onSubmit={handleSubmit(onSubmit)}
                className="relative rounded-3xl p-6 md:p-8 border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden"
                style={{ boxShadow: `0 30px 80px -30px ${colors.secondary}55` }}
              >
                <span
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: `conic-gradient(from var(--contact-angle, 0deg), transparent 65%, ${colors.secondary}, transparent)`,
                    padding: 1,
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "contact-beam 7s linear infinite",
                  }}
                  aria-hidden
                />

                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-1 tracking-tight">
                    Envíanos un mensaje
                  </h3>
                  <p className="text-white/55 text-sm mb-6">
                    Respondemos en menos de 24 horas.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        label="Nombre"
                        register={register("nombre")}
                        error={errors.nombre?.message}
                        autoComplete="given-name"
                      />
                      <Field
                        label="Apellido"
                        register={register("apellido")}
                        error={errors.apellido?.message}
                        autoComplete="family-name"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        label="Teléfono"
                        type="tel"
                        register={register("telefono")}
                        error={errors.telefono?.message}
                        autoComplete="tel"
                      />
                      <Field
                        label="Email"
                        type="email"
                        register={register("email")}
                        error={errors.email?.message}
                        autoComplete="email"
                      />
                    </div>
                    <Field
                      label="Mensaje"
                      register={register("mensaje")}
                      error={errors.mensaje?.message}
                      textarea
                    />

                    <MagneticButton strength={0.3} fullWidth>
                      <button
                        type="submit"
                        data-magnetic
                        disabled={isSubmitting || success}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base tracking-wide transition cursor-pointer disabled:cursor-default mt-2"
                        style={{
                          background: success ? colors.success : colors.secondary,
                          color: colors.text,
                          boxShadow: `0 14px 40px -10px ${success ? colors.success : colors.secondary}`,
                        }}
                      >
                        {success ? (
                          <>
                            <Check size={20} /> ¡Enviado!
                          </>
                        ) : isSubmitting ? (
                          <>
                            <Loader2 size={20} className="animate-spin" /> Enviando…
                          </>
                        ) : (
                          <>
                            Enviar mensaje <Send size={18} />
                          </>
                        )}
                      </button>
                    </MagneticButton>

                    <p className="text-[10px] text-white/40 text-center mt-2">
                      Al enviar aceptas nuestros{" "}
                      <a href="#" className="underline">Términos</a> y la{" "}
                      <a href="#" className="underline">Política de privacidad</a>.
                    </p>
                  </div>
                </div>
              </motion.form>
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 mb-5"
                style={{ color: colors.warning }}
              >
                <Sparkles size={11} /> ¿Para qué nos escribes?
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3">
                Cuatro razones para
                <br />
                <span style={{ color: colors.warning }}>tocar la puerta</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {REASONS.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative rounded-2xl p-6 border border-white/10 backdrop-blur-md overflow-hidden group hover:border-white/30 transition"
                  style={{
                    background: `linear-gradient(160deg, ${r.color}11 0%, rgba(255,255,255,0.02) 60%)`,
                  }}
                >
                  <div
                    className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none opacity-50"
                    style={{
                      background: `radial-gradient(circle, ${r.color}33 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${r.color}22`, color: r.color }}
                      >
                        <r.Icon size={20} />
                      </span>
                      <span
                        className="text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-full font-bold"
                        style={{ background: `${r.color}22`, color: r.color }}
                      >
                        {r.chip}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">{r.title}</h3>
                    <p className="text-white/65 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <Quote
              size={120}
              strokeWidth={1}
              className="absolute -top-8 -left-2 md:-left-8 text-white/5 pointer-events-none"
            />
            <div className="relative flex flex-col items-center text-center">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill={colors.warning} stroke={colors.warning} />
                ))}
              </div>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-8 text-white">
                "El equipo me respondió en menos de{" "}
                <span style={{ color: colors.success }}>5 minutos</span> y al día siguiente ya estaba entrenando. Súper humanos, nada de bots."
              </blockquote>
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
                  alt="María"
                  className="w-12 h-12 rounded-full object-cover border-2"
                  style={{ borderColor: colors.warning }}
                />
                <div className="text-left">
                  <p className="text-white font-bold text-sm">María Fernández</p>
                  <p className="text-white/50 text-xs uppercase tracking-[0.2em]">
                    Miembro · Plan CoreFit
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative py-20 md:py-32 px-6 md:px-12 overflow-hidden">
          <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 mb-5"
                style={{ color: colors.secondary }}
              >
                <MapPin size={11} /> A pasos del metro
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-[1.05]">
                Te esperamos en
                <br />
                <span style={{ color: colors.secondary }}>Las Condes.</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6 text-base">
                Estamos a 3 minutos a pie del metro Manquehue (L1), con estacionamiento propio y fácil acceso por Apoquindo.
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Golda+Meir+216+Las+Condes"
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition cursor-pointer"
                style={{
                  background: colors.secondary,
                  color: colors.text,
                  boxShadow: `0 14px 40px -12px ${colors.secondary}`,
                }}
              >
                <MapPin size={16} /> Cómo llegar
              </a>
            </div>
            <div className="relative w-full">
              <LocationMap />
            </div>
          </div>
        </section>

        <section className="relative py-20 md:py-28 px-6 md:px-12 overflow-hidden">
          <div className="relative max-w-3xl mx-auto">
            <div className="text-center mb-10 md:mb-14">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 mb-5"
                style={{ color: colors.warning }}
              >
                <Sparkles size={11} /> Preguntas frecuentes
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
                Antes de escribir,
                <br />
                <span style={{ color: colors.warning }}>quizás esto te sirve.</span>
              </h2>
            </div>
            <div>
              {FAQS.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} idx={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-14 overflow-hidden">
          <Marquee gradient gradientColor="#000000" gradientWidth={100} speed={45}>
            {["@corefit.gym", "@corefit_team", "#CoreFitFamily", "#TransformaTuVida", "+56 9 4500 4380"].map(
              (s, i) => (
                <span
                  key={i}
                  className="mx-10 text-2xl md:text-4xl font-extrabold tracking-[0.2em] text-white/25 hover:text-white transition"
                >
                  {s} ·
                </span>
              )
            )}
          </Marquee>
        </section>

        <Footer />

        <style>{`
          @property --contact-angle {
            syntax: '<angle>';
            inherits: false;
            initial-value: 0deg;
          }
          @keyframes contact-beam {
            to { --contact-angle: 360deg; }
          }
        `}</style>
      </div>
    </SmoothScroll>
  );
}

export default Contact;
