import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Check,
  ShieldCheck,
  Sparkles,
  Award,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import confetti from "canvas-confetti";
import Marquee from "react-fast-marquee";
import GenericNavbar from "@/core/components/Navbar/GenericNavbar";
import CTAShaderBg from "@/components/CTAShaderBg";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { AuroraText } from "@/components/ui/aurora-text";
import MagneticButton from "@/motions/MagneticButton";
import MagneticCursor from "@/motions/MagneticCursor";

const schema = z.object({
  email: z.string().min(1, "Email requerido").email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

const QUOTES = [
  {
    quote: "Volver al gym después de 2 años fue lo mejor que hice. La comunidad cambia todo.",
    name: "Pedro Salgado",
    role: "Miembro · 34 años",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "Llegué sin hábito y hoy entreno 5 días. El equipo te empuja sin presionar.",
    name: "Camila Reyes",
    role: "Miembro · 28 años",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
  {
    quote: "La app PRO me cambió la cabeza. Sé exactamente qué hacer cada día.",
    name: "Diego Tapia",
    role: "Miembro · 41 años",
    avatar:
      "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=200&auto=format&fit=crop",
  },
];

const FLOATING_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=200&auto=format&fit=crop",
];

const MICRO_BADGES = ["1 clase gratis", "Cancela cuando quieras", "Sin contrato"];

const WELCOME_LANGS = [
  "Bienvenido",
  "Welcome",
  "환영",
  "ようこそ",
  "Willkommen",
  "Bienvenue",
  "Benvenuto",
];

function splitChars(text: string) {
  return text.split("").map((c, i) => (
    <span
      key={i}
      data-login-char
      className="inline-block"
      style={{ whiteSpace: c === " " ? "pre" : "normal" }}
    >
      {c}
    </span>
  ));
}

function TiltButton({
  children,
  variant = "light",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "light" | "dark";
  onClick?: () => void;
}) {
  const wrap = useRef<HTMLButtonElement>(null);
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
      xR(-py * 10);
      yR(px * 10);
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
    <button
      ref={wrap}
      type="button"
      onClick={onClick}
      data-magnetic
      className="flex-1 cursor-pointer"
      style={{ perspective: 800 }}
    >
      <div
        ref={inner}
        className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition will-change-transform ${
          variant === "light"
            ? "bg-white text-black hover:bg-white/90"
            : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </button>
  );
}

function FloatingField({
  label,
  type = "text",
  error,
  register,
  trailing,
  autoComplete,
  accentColor,
}: {
  label: string;
  type?: string;
  error?: string;
  register: ReturnType<ReturnType<typeof useForm<FormData>>["register"]>;
  trailing?: React.ReactNode;
  autoComplete?: string;
  accentColor: string;
}) {
  return (
    <div className="relative">
      <input
        {...register}
        type={type}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-white/[0.04] border border-white/10 text-white outline-none focus:bg-white/[0.07] transition placeholder-transparent text-sm"
      />
      <label className="pointer-events-none absolute left-4 top-3 text-white/40 text-xs uppercase tracking-[0.15em] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-[0.2em]">
        {label}
      </label>
      {trailing && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</span>
      )}
      <span
        className="pointer-events-none absolute left-3 right-3 bottom-1 h-[2px] rounded-full origin-center scale-x-0 peer-focus:scale-x-100 transition-transform duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
          boxShadow: `0 0 8px ${accentColor}`,
        }}
      />
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

function Login() {
  const { colors } = CoreFitTheme;
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [done, setDone] = useState(false);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const email = watch("email") ?? "";
  const password = watch("password") ?? "";
  const step = !email
    ? 0
    : !password || password.length < 6
      ? 1
      : 2;

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 900));
    console.info("login attempt:", data.email, "remember:", remember);
    setDone(true);
    const palette = ["#E53935", "#2979FF", "#00E676", "#FFEA00", "#F5F5F5"];
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: palette,
      scalar: 1.2,
      ticks: 220,
    });
    setTimeout(() => navigate("/"), 2000);
  };

  useLayoutEffect(() => {
    const chars = titleRef.current?.querySelectorAll("[data-login-char]");
    if (!chars) return;
    gsap.fromTo(
      chars,
      { yPercent: 120, opacity: 0, rotateX: -80, filter: "blur(12px)" },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.1,
        stagger: 0.03,
        ease: "expo.out",
        delay: 0.4,
      }
    );
  }, []);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    let base = 1247;
    el.textContent = base.toString();
    const id = setInterval(() => {
      const delta = Math.floor(Math.random() * 7) - 3;
      base = Math.max(1180, Math.min(1320, base + delta));
      gsap.to(
        { v: parseInt(el.textContent ?? "0", 10) },
        {
          v: base,
          duration: 0.8,
          ease: "power2.out",
          onUpdate() {
            if (el) el.textContent = Math.floor(this.targets()[0].v).toString();
          },
        }
      );
    }, 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setQuoteIdx((i) => (i + 1) % QUOTES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">
      <MagneticCursor />
      <GenericNavbar />

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] flex items-center justify-center"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(20,20,25,0.97), rgba(0,0,0,0.99))",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="text-center px-6"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.1 }}
                className="inline-flex w-24 h-24 rounded-full mb-6 items-center justify-center"
                style={{
                  background: colors.success,
                  boxShadow: `0 20px 60px -10px ${colors.success}`,
                }}
              >
                <Check size={48} strokeWidth={3} color="#000" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-3">
                ¡Bienvenido de vuelta!
              </h2>
              <p className="text-white/70 text-lg">Cargando tu sesión…</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-2 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden"
        >
          <div className="absolute inset-0">
            <CTAShaderBg />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {FLOATING_AVATARS.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt=""
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.4,
                y: [0, -20, 0],
              }}
              transition={{
                opacity: { delay: 1 + i * 0.15, duration: 1 },
                y: {
                  duration: 5 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                },
              }}
              className="absolute rounded-full object-cover border border-white/20"
              style={{
                width: 40 + (i % 3) * 14,
                height: 40 + (i % 3) * 14,
                top: `${15 + i * 14}%`,
                right: `${5 + (i % 2) * 65}%`,
                filter: "blur(0.5px)",
              }}
            />
          ))}

          <div className="relative z-10">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.3em] border border-white/15 backdrop-blur-md"
            >
              <Sparkles size={11} /> CoreFit
            </motion.span>
          </div>

          <div className="relative z-10 max-w-md">
            <h2
              ref={titleRef}
              className="text-4xl xl:text-6xl font-black tracking-tight leading-[1.02] mb-6 overflow-hidden"
            >
              <span className="block">{splitChars("Bienvenido")}</span>
              <span className="block">
                <AuroraText speed={1.5}>de vuelta.</AuroraText>
              </span>
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md mb-6"
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
              <span className="text-xs text-white/80">
                <span ref={counterRef} className="font-bold tabular-nums">1247</span> entrenando ahora mismo
              </span>
            </motion.div>

            <div className="relative h-32 mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={quoteIdx}
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <p className="text-white/85 text-base leading-relaxed mb-3 italic">
                    "{QUOTES[quoteIdx].quote}"
                  </p>
                  <div className="flex items-center gap-2">
                    <img
                      src={QUOTES[quoteIdx].avatar}
                      alt={QUOTES[quoteIdx].name}
                      className="w-8 h-8 rounded-full object-cover border"
                      style={{ borderColor: colors.warning }}
                    />
                    <div>
                      <p className="text-white text-xs font-bold">
                        {QUOTES[quoteIdx].name}
                      </p>
                      <p className="text-white/50 text-[10px] uppercase tracking-[0.2em]">
                        {QUOTES[quoteIdx].role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex gap-1.5">
              {QUOTES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuoteIdx(i)}
                  aria-label={`Quote ${i + 1}`}
                  className={`h-[2px] rounded-full transition-all cursor-pointer ${
                    i === quoteIdx ? "w-10 bg-white" : "w-5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="relative z-10 flex items-center justify-between text-xs text-white/55"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck size={14} /> Cifrado E2E
            </span>
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
              style={{ color: colors.warning }}
            >
              <Award size={13} /> Innova Chile 2024
            </span>
          </motion.div>
        </motion.div>

        <div className="relative flex items-center justify-center px-6 sm:px-10 py-24 lg:py-12">
          <div className="w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {MICRO_BADGES.map((b, i) => (
                  <motion.span
                    key={b}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="text-[10px] uppercase tracking-[0.25em] font-medium px-3 py-1 rounded-full border border-white/15 text-white/70 bg-white/[0.03] backdrop-blur-md"
                  >
                    ✓ {b}
                  </motion.span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
                Inicia sesión
              </h1>
              <p className="text-white/60 text-sm mb-8">
                ¿Nuevo aquí?{" "}
                <button
                  onClick={() => navigate("/contact")}
                  data-magnetic
                  className="cursor-pointer font-medium hover:underline transition"
                  style={{ color: colors.secondary }}
                >
                  Crear cuenta →
                </button>
              </p>

              <div className="flex items-center justify-between mb-6 px-1">
                {[
                  { label: "Email", n: 0 },
                  { label: "Clave", n: 1 },
                  { label: "Listo", n: 2 },
                ].map((s, i, arr) => (
                  <div key={s.n} className="flex items-center flex-1">
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{
                          scale: step === s.n ? 1.1 : 1,
                          backgroundColor:
                            step >= s.n ? colors.secondary : "rgba(255,255,255,0.1)",
                          color: step >= s.n ? "#000" : "rgba(255,255,255,0.4)",
                        }}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                      >
                        {step > s.n ? <Check size={12} strokeWidth={3} /> : s.n + 1}
                      </motion.span>
                      <span
                        className="text-[10px] uppercase tracking-[0.2em] font-medium"
                        style={{
                          color: step >= s.n ? "#fff" : "rgba(255,255,255,0.35)",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="flex-1 mx-2 h-px relative">
                        <div className="absolute inset-0 bg-white/10" />
                        <motion.div
                          initial={false}
                          animate={{ scaleX: step > s.n ? 1 : 0 }}
                          className="absolute inset-0 origin-left"
                          style={{ background: colors.secondary }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mb-6">
                <TiltButton variant="light">
                  <FcGoogle size={18} /> Google
                </TiltButton>
                <TiltButton variant="dark">
                  <FaApple size={16} /> Apple
                </TiltButton>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  o con email
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="relative rounded-2xl p-5 border border-white/10 bg-white/[0.015] backdrop-blur-md overflow-hidden"
              >
                <span
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: `conic-gradient(from var(--login-angle, 0deg), transparent 65%, ${colors.secondary}, transparent)`,
                    padding: 1,
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "login-beam 7s linear infinite",
                  }}
                  aria-hidden
                />
                <div className="relative space-y-4">
                  <FloatingField
                    label="Email"
                    type="email"
                    autoComplete="email"
                    register={register("email")}
                    error={errors.email?.message}
                    accentColor={colors.secondary}
                  />
                  <FloatingField
                    label="Contraseña"
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
                    register={register("password")}
                    error={errors.password?.message}
                    accentColor={colors.secondary}
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowPwd((v) => !v)}
                        data-magnetic
                        aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                        className="text-white/40 hover:text-white p-1 cursor-pointer"
                      >
                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                  />

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <button
                        type="button"
                        onClick={() => setRemember((v) => !v)}
                        role="switch"
                        aria-checked={remember}
                        className="relative w-10 h-6 rounded-full transition cursor-pointer"
                        style={{
                          background: remember ? colors.secondary : "rgba(255,255,255,0.1)",
                        }}
                      >
                        <span
                          className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform"
                          style={{
                            transform: remember ? "translateX(16px)" : "translateX(0)",
                          }}
                        />
                      </button>
                      <span className="text-xs text-white/70">Recordarme</span>
                    </label>
                    <a
                      href="#"
                      data-magnetic
                      className="text-xs hover:underline cursor-pointer"
                      style={{ color: colors.secondary }}
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>

                  <MagneticButton strength={0.3} fullWidth>
                    <button
                      type="submit"
                      data-magnetic
                      disabled={isSubmitting || done}
                      className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-base tracking-wide transition cursor-pointer disabled:cursor-default mt-2"
                      style={{
                        background: done ? colors.success : colors.secondary,
                        color: colors.text,
                        boxShadow: `0 14px 40px -10px ${done ? colors.success : colors.secondary}`,
                      }}
                    >
                      {done ? (
                        <>
                          <Check size={20} /> ¡Bienvenido!
                        </>
                      ) : isSubmitting ? (
                        <>
                          <Loader2 size={20} className="animate-spin" /> Iniciando…
                        </>
                      ) : (
                        <>
                          Iniciar sesión <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>

              <p className="text-[10px] text-white/40 text-center mt-6">
                Al iniciar sesión aceptas nuestros{" "}
                <a href="#" className="underline">Términos</a> y la{" "}
                <a href="#" className="underline">Política de privacidad</a>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-40">
        <Marquee gradient gradientColor="#000000" gradientWidth={120} speed={35}>
          {WELCOME_LANGS.map((w, i) => (
            <span
              key={i}
              className="mx-10 text-3xl md:text-5xl font-extrabold tracking-[0.2em] text-white/15"
            >
              {w} ·
            </span>
          ))}
        </Marquee>
      </div>

      <style>{`
        @property --login-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes login-beam {
          to { --login-angle: 360deg; }
        }
      `}</style>
    </div>
  );
}

export default Login;
