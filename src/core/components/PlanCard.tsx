import { useRef } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { microConfettiFromElement } from "@/motions/microConfetti";

export type PlanVariant = "basic" | "core" | "premium";

interface PlanCardProps {
  variant: PlanVariant;
  monthly: boolean;
}

const PLANS: Record<
  PlanVariant,
  {
    name: string;
    subtitle: string;
    priceMonthly: number;
    benefits: string[];
    accent: string;
    icon: typeof Sparkles;
    cta: string;
    badge?: string;
  }
> = {
  basic: {
    name: "Básico",
    subtitle: "Empieza tu transformación",
    priceMonthly: 19990,
    benefits: [
      "Acceso a todas las sedes",
      "Máquinas última generación",
      "Duchas y casilleros",
      "App de entrenamiento",
      "Sin costo de inscripción",
      "Horario 6:00 a 23:00",
    ],
    accent: "#E53935",
    icon: Zap,
    cta: "Empezar",
  },
  core: {
    name: "CoreFit",
    subtitle: "El plan favorito",
    priceMonthly: 24990,
    benefits: [
      "Acceso VIP a todas las sedes",
      "Invitado gratis los fines de semana",
      "Evaluación nutricional mensual",
      "Sauna + duchas + casilleros",
      "App PRO de entrenamiento",
      "Horario extendido 5:00 a 24:00",
    ],
    accent: "#2979FF",
    icon: Sparkles,
    cta: "Quiero este",
    badge: "Más popular",
  },
  premium: {
    name: "Premium",
    subtitle: "Para deportistas serios",
    priceMonthly: 29990,
    benefits: [
      "Todo lo del plan CoreFit",
      "Personal trainer 2x/semana",
      "Spa & sauna ilimitado",
      "Nutricionista premium",
      "Toallas y bebidas isotónicas",
      "Estacionamiento reservado",
    ],
    accent: "#FFEA00",
    icon: Crown,
    cta: "Suscribirme",
  },
};

function formatPrice(n: number) {
  return n.toLocaleString("es-CL");
}

export default function PlanCard({ variant, monthly }: PlanCardProps) {
  const { colors } = CoreFitTheme;
  const plan = PLANS[variant];
  const Icon = plan.icon;
  const isPopular = variant === "core";
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar?.() ?? { enqueueSnackbar: () => {} };
  const ctaRef = useRef<HTMLButtonElement>(null);

  const price = monthly
    ? plan.priceMonthly
    : Math.round(plan.priceMonthly * 12 * 0.85);
  const cycle = monthly ? "mes" : "año";

  const handleClick = () => {
    enqueueSnackbar?.(`Plan ${plan.name} seleccionado`, { variant: "success" });
    microConfettiFromElement(ctaRef.current, {
      count: 25,
      colors: [plan.accent, "#F5F5F5", "#FFEA00"],
      spread: 70,
      scalar: 0.8,
      startVelocity: 28,
    });
    setTimeout(() => navigate("/contact"), 700);
  };

  return (
    <motion.div
      data-magnetic
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full max-w-[360px] rounded-3xl flex flex-col"
      style={{
        background: isPopular
          ? `linear-gradient(180deg, ${plan.accent}22 0%, ${colors.surface} 80%)`
          : `linear-gradient(180deg, ${colors.surface} 0%, ${colors.background} 100%)`,
        border: `1px solid ${isPopular ? plan.accent : "rgba(255,255,255,0.08)"}`,
        boxShadow: isPopular
          ? `0 30px 80px -30px ${plan.accent}, 0 0 0 1px ${plan.accent}33`
          : "0 20px 60px -30px rgba(0,0,0,0.6)",
      }}
    >
      {plan.badge && (
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold z-10 whitespace-nowrap"
          style={{
            background: plan.accent,
            color: "#000",
            boxShadow: `0 8px 20px -6px ${plan.accent}`,
          }}
        >
          ★ {plan.badge}
        </div>
      )}

      {isPopular && (
        <span
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `conic-gradient(from var(--plan-angle, 0deg), transparent 70%, ${plan.accent}, transparent)`,
            padding: 1,
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            animation: "plan-beam 6s linear infinite",
          }}
          aria-hidden
        />
      )}

      <div className="relative p-8 flex flex-col gap-1">
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ background: `${plan.accent}1f`, color: plan.accent }}
          >
            <Icon size={20} />
          </div>
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-bold"
            style={{ color: plan.accent }}
          >
            Plan
          </span>
        </div>
        <h3 className="text-3xl font-extrabold text-white tracking-tight">
          {plan.name}
        </h3>
        <p className="text-sm text-white/60">{plan.subtitle}</p>
      </div>

      <div className="relative px-8 mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-white/70 text-xl">$</span>
          <motion.span
            key={`${variant}-${monthly}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl md:text-6xl font-extrabold text-white tabular-nums tracking-tight"
          >
            {formatPrice(price)}
          </motion.span>
          <span className="text-white/50 text-sm ml-1">CLP / {cycle}</span>
        </div>
        {!monthly && (
          <p className="text-xs mt-2" style={{ color: "#00E676" }}>
            Ahorras ${formatPrice(plan.priceMonthly * 12 - price)} al año
          </p>
        )}
      </div>

      <div className="relative px-8 flex-1">
        <ul className="space-y-3">
          {plan.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-white/85">
              <span
                className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: `${plan.accent}22`, color: plan.accent }}
              >
                <Check size={12} strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative p-8 pt-6">
        <button
          ref={ctaRef}
          onClick={handleClick}
          data-magnetic
          className="w-full py-3.5 rounded-full font-bold tracking-wide cursor-pointer transition relative overflow-hidden group"
          style={{
            background: isPopular ? plan.accent : "transparent",
            color: isPopular ? "#000" : plan.accent,
            border: isPopular ? "none" : `2px solid ${plan.accent}55`,
            boxShadow: isPopular ? `0 14px 40px -10px ${plan.accent}` : "none",
          }}
        >
          <span className="relative z-10">{plan.cta} →</span>
          {!isPopular && (
            <span
              className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              style={{ background: `${plan.accent}15` }}
            />
          )}
        </button>
      </div>

      <style>{`
        @property --plan-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes plan-beam {
          to { --plan-angle: 360deg; }
        }
      `}</style>
    </motion.div>
  );
}
