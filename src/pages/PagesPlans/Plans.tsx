import { useLayoutEffect, useRef, useState } from "react";
import GenericNavbar from "@/core/components/Navbar/GenericNavbar";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { AuroraText } from "@/components/ui/aurora-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import PlanCard, { type PlanVariant } from "@/core/components/PlanCard";
import SocialProofCards from "@/core/components/SocialProofCards/SocialProofCards";
import Footer from "@/components/Footer";
import SmoothScroll from "@/motions/SmoothScroll";
import MagneticCursor from "@/motions/MagneticCursor";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Check, X, ChevronDown, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { microConfettiFromElement } from "@/motions/microConfetti";

gsap.registerPlugin(ScrollTrigger);

interface FeatureRow {
  feature: string;
  basic: string | boolean;
  core: string | boolean;
  premium: string | boolean;
}

const FEATURES: FeatureRow[] = [
  { feature: "Acceso a sedes", basic: "Todas", core: "VIP", premium: "VIP + privado" },
  { feature: "Clases grupales", basic: true, core: "Ilimitadas", premium: "Ilimitadas" },
  { feature: "Personal trainer", basic: false, core: false, premium: "2x semana" },
  { feature: "Evaluación nutricional", basic: false, core: "Mensual", premium: "Semanal" },
  { feature: "Spa & sauna", basic: false, core: true, premium: "Ilimitado" },
  { feature: "App de entrenamiento", basic: "Básica", core: "PRO", premium: "PRO" },
  { feature: "Toallas y bebidas", basic: false, core: false, premium: true },
  { feature: "Estacionamiento", basic: "General", core: "General", premium: "Reservado" },
];

const FAQS = [
  {
    q: "¿Hay contrato de permanencia?",
    a: "No. Todos nuestros planes son mes a mes. Cancela cuando quieras desde la app o llamando a recepción.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Sí, puedes hacer upgrade o downgrade en cualquier momento. El cobro se prorratea automáticamente.",
  },
  {
    q: "¿Tienen prueba gratis?",
    a: "Ofrecemos una clase de prueba gratuita y un pase de día. Visita la sede más cercana con tu cédula.",
  },
  {
    q: "¿Qué incluye el plan anual?",
    a: "15% de descuento sobre el precio mensual, prioridad en clases populares y un regalo de bienvenida (camiseta + shaker).",
  },
  {
    q: "¿Cómo pago?",
    a: "Aceptamos tarjetas de débito y crédito (Visa, Mastercard, Amex), transferencia bancaria y MercadoPago.",
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

function Cell({ value, accent }: { value: string | boolean; accent: string }) {
  if (value === true)
    return (
      <span
        className="inline-flex w-7 h-7 rounded-full items-center justify-center"
        style={{ background: `${accent}22`, color: accent }}
      >
        <Check size={14} strokeWidth={3} />
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex w-7 h-7 rounded-full items-center justify-center text-white/30">
        <X size={14} />
      </span>
    );
  return <span className="text-sm text-white/90 font-medium">{value}</span>;
}

const Plans = () => {
  const { colors } = CoreFitTheme;
  const [monthly, setMonthly] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 80, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "expo.out",
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const variants: PlanVariant[] = ["basic", "core", "premium"];

  return (
    <SmoothScroll>
      <MagneticCursor />
      <div className="bg-black text-white">
        <GenericNavbar />

        <section
          ref={sectionRef}
          className="relative min-h-screen overflow-hidden pt-32 pb-20 px-4 md:px-8"
          style={{ background: colors.background }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `
                radial-gradient(circle at 15% 20%, ${colors.secondary}33 0%, transparent 40%),
                radial-gradient(circle at 85% 80%, ${colors.primary}33 0%, transparent 45%),
                radial-gradient(circle at 50% 100%, ${colors.warning}22 0%, transparent 50%)
              `,
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(ellipse 80% 60% at center, black 30%, transparent 80%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.3em] border border-white/15 mb-6"
                style={{ color: colors.warning }}
              >
                <Sparkles size={12} />
                Planes 2026
              </motion.span>
              <h1
                ref={titleRef}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-[1.05]"
              >
                Elige tu plan en <AuroraText speed={1.5}>CoreFit</AuroraText>
              </h1>
              <div className="text-white/70 text-base md:text-xl h-7 md:h-8 mb-2">
                <TypingAnimation
                  words={["Sin contratos largos · Cancela cuando quieras"]}
                  typeSpeed={60}
                />
              </div>
            </div>

            <div className="flex justify-center mb-12 md:mb-16">
              <LayoutGroup>
                <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
                  {[
                    { id: "monthly", label: "Mensual", v: true },
                    { id: "yearly", label: "Anual", v: false, badge: "-15%" },
                  ].map((opt) => {
                    const isActive = monthly === opt.v;
                    return (
                      <button
                        key={opt.id}
                        onClick={(e) => {
                          if (monthly && !opt.v) {
                            microConfettiFromElement(e.currentTarget, {
                              count: 18,
                              colors: ["#00E676", "#FFEA00", "#F5F5F5"],
                              spread: 70,
                              scalar: 0.7,
                            });
                          }
                          setMonthly(opt.v);
                        }}
                        data-magnetic
                        className={`relative px-5 md:px-7 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition ${
                          isActive ? "text-black" : "text-white/70 hover:text-white"
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="plan-toggle"
                            className="absolute inset-0 rounded-full"
                            style={{ background: colors.text }}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative inline-flex items-center gap-2">
                          {opt.label}
                          {opt.badge && (
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{
                                background: isActive ? "#000" : colors.success,
                                color: isActive ? colors.success : "#000",
                              }}
                            >
                              {opt.badge}
                            </span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch place-items-center mb-24 pt-8">
              {variants.map((v, i) => (
                <motion.div
                  key={v}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-full flex justify-center ${
                    v === "core" ? "md:col-span-2 lg:col-span-1 lg:-translate-y-4" : ""
                  }`}
                >
                  <PlanCard variant={v} monthly={monthly} />
                </motion.div>
              ))}
            </div>

            <div className="mb-24">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="text-3xl md:text-4xl font-extrabold text-center mb-2 tracking-tight"
              >
                Compara los planes
              </motion.h2>
              <p className="text-white/50 text-center mb-10 text-sm">
                Encuentra el que se ajusta a tu objetivo
              </p>

              <div className="hidden md:block overflow-hidden rounded-3xl border border-white/10 backdrop-blur-md bg-white/[0.02]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-5 text-white/60 text-sm uppercase tracking-[0.2em] font-medium">
                        Beneficio
                      </th>
                      <th className="p-5 text-center text-white text-base font-bold">
                        Básico
                      </th>
                      <th
                        className="p-5 text-center text-base font-bold"
                        style={{ color: colors.secondary }}
                      >
                        CoreFit ★
                      </th>
                      <th
                        className="p-5 text-center text-base font-bold"
                        style={{ color: colors.warning }}
                      >
                        Premium
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEATURES.map((row, idx) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-white/5 ${
                          idx % 2 === 1 ? "bg-white/[0.015]" : ""
                        }`}
                      >
                        <td className="p-5 text-white/85 text-sm">{row.feature}</td>
                        <td className="p-5 text-center">
                          <Cell value={row.basic} accent={colors.primary} />
                        </td>
                        <td className="p-5 text-center">
                          <Cell value={row.core} accent={colors.secondary} />
                        </td>
                        <td className="p-5 text-center">
                          <Cell value={row.premium} accent={colors.warning} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden space-y-4">
                {variants.map((v) => (
                  <div
                    key={v}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-5"
                  >
                    <h3
                      className="text-lg font-bold mb-4"
                      style={{
                        color:
                          v === "basic"
                            ? colors.primary
                            : v === "core"
                              ? colors.secondary
                              : colors.warning,
                      }}
                    >
                      {v === "basic" ? "Básico" : v === "core" ? "CoreFit ★" : "Premium"}
                    </h3>
                    <ul className="space-y-3">
                      {FEATURES.map((row) => (
                        <li
                          key={row.feature}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-white/70">{row.feature}</span>
                          <Cell
                            value={row[v as "basic" | "core" | "premium"]}
                            accent={
                              v === "basic"
                                ? colors.primary
                                : v === "core"
                                  ? colors.secondary
                                  : colors.warning
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-24 flex justify-center">
              <SocialProofCards />
            </div>

            <div className="max-w-3xl mx-auto mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="text-3xl md:text-4xl font-extrabold text-center mb-2 tracking-tight"
              >
                Preguntas frecuentes
              </motion.h2>
              <p className="text-white/50 text-center mb-10 text-sm">
                Lo que la gente nos pregunta antes de unirse
              </p>
              <div>
                {FAQS.map((f, i) => (
                  <FaqItem key={f.q} q={f.q} a={f.a} idx={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default Plans;
