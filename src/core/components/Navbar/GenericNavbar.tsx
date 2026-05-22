import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import gymLogo from "../../../assets/Images/Logo/MyLogo.png";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { Search, Menu, X, Dumbbell, Users, Phone, LogIn, Sparkles } from "lucide-react";
import CommandPalette from "./CommandPalette";

interface NavItem {
  label: string;
  path: string;
  megaMenu?: {
    title: string;
    description: string;
    items: { label: string; description: string; price?: string; href: string }[];
  };
}

const NAV: NavItem[] = [
  { label: "Inicio", path: "/" },
  { label: "Nosotros", path: "/aboutus" },
  {
    label: "Planes",
    path: "/plans",
    megaMenu: {
      title: "Elige tu plan",
      description: "Tres niveles. Cancela cuando quieras.",
      items: [
        {
          label: "Básico",
          description: "Acceso libre + 1 clase grupal/semana",
          price: "$19.990",
          href: "/plans",
        },
        {
          label: "CoreFit",
          description: "Acceso ilimitado · clases · evaluación inicial",
          price: "$24.990",
          href: "/plans",
        },
        {
          label: "Premium",
          description: "Todo + personal trainer + nutricionista",
          price: "$29.990",
          href: "/plans",
        },
      ],
    },
  },
  { label: "Contacto", path: "/contact" },
];

export default function GenericNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { colors } = CoreFitTheme;
  const progressRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const lastY = useRef(0);

  const hour = new Date().getHours();
  const isOpen = hour >= 6 && hour < 23;

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current && y > 200;
      const goingUp = y < lastY.current;
      if (goingDown && !openMega && !mobileOpen) setHidden(true);
      if (goingUp || y < 100) setHidden(false);
      setScrolled(y > 30);
      lastY.current = y;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? y / max : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMega, mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMega(null);
  }, [location.pathname]);

  const handleEnter = (label: string, hasMega: boolean) => {
    setHovered(label);
    if (hasMega) {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      setOpenMega(label);
    }
  };
  const handleLeave = () => {
    setHovered(null);
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 150);
  };

  const isLanding = location.pathname === "/";

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          y: hidden ? -120 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
        className="px-3 md:px-6 pt-3 md:pt-5 pointer-events-none"
      >
        <motion.div
          initial={false}
          animate={{
            maxWidth: scrolled ? "1100px" : "1400px",
            borderRadius: scrolled ? 999 : 16,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto pointer-events-auto"
          style={{
            background: scrolled
              ? "rgba(10,10,12,0.78)"
              : "linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.25) 100%)",
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(8px)",
            WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(8px)",
            border: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
            boxShadow: scrolled
              ? "0 18px 60px -20px rgba(0,0,0,0.5)"
              : "0 8px 30px -10px rgba(0,0,0,0.3)",
          }}
        >
          <div
            ref={progressRef}
            className="absolute bottom-0 left-0 h-[2px] origin-left pointer-events-none rounded-full"
            style={{
              width: "100%",
              background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary}, ${colors.warning})`,
              transform: "scaleX(0)",
              opacity: scrolled ? 1 : 0,
              transition: "opacity 0.4s",
              boxShadow: `0 0 10px ${colors.secondary}`,
            }}
          />

          <div className="flex items-center justify-between px-3 md:px-5 py-2 md:py-2.5">
            <motion.button
              onClick={() => navigate("/")}
              data-magnetic
              aria-label="Inicio"
              className="relative flex items-center gap-2 cursor-pointer rounded-full"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <img
                src={gymLogo}
                alt="CoreFit"
                className="h-10 md:h-11 w-auto"
              />
            </motion.button>

            <ul className="hidden md:flex items-center gap-1">
              {NAV.map((item) => {
                const isActive =
                  item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);
                const isHover = hovered === item.label;
                return (
                  <li
                    key={item.label}
                    data-magnetic
                    onMouseEnter={() => handleEnter(item.label, !!item.megaMenu)}
                    onMouseLeave={handleLeave}
                    onClick={() => navigate(item.path)}
                    className="relative cursor-pointer px-3.5 lg:px-4 py-1.5 text-[13px] font-medium tracking-wide"
                    style={{ color: colors.text }}
                  >
                    {(isHover || isActive) && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: isActive
                            ? `${colors.secondary}22`
                            : "rgba(255,255,255,0.07)",
                          border: isActive ? `1px solid ${colors.secondary}44` : "none",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative inline-flex items-center gap-1.5">
                      {item.label}
                      {item.megaMenu && (
                        <span className="opacity-50 text-[9px]">▾</span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="hidden md:flex items-center gap-2">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: isOpen ? `${colors.success}44` : "rgba(255,255,255,0.1)",
                  background: isOpen ? `${colors.success}11` : "rgba(255,255,255,0.03)",
                }}
                title={isOpen ? "Estamos abiertos" : "Cerrado"}
              >
                <span className="relative flex h-1.5 w-1.5">
                  {isOpen && (
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: colors.success }}
                    />
                  )}
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ background: isOpen ? colors.success : colors.textMuted }}
                  />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium hidden lg:inline">
                  {isOpen ? "Abierto" : "Cerrado"}
                </span>
              </div>

              <button
                onClick={() => {
                  document.dispatchEvent(
                    new KeyboardEvent("keydown", {
                      key: "k",
                      metaKey: true,
                      ctrlKey: true,
                      bubbles: true,
                    })
                  );
                }}
                data-magnetic
                aria-label="Buscar"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-[11px] text-white/65 hover:text-white hover:border-white/25 transition cursor-pointer"
              >
                <Search size={12} />
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/55 text-[9px] font-mono">
                  ⌘K
                </kbd>
              </button>

              <button
                onClick={() => navigate("/plans")}
                data-magnetic
                className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[12px] tracking-wide cursor-pointer overflow-hidden group"
                style={{
                  background: colors.secondary,
                  color: colors.text,
                  boxShadow: `0 10px 30px -8px ${colors.secondary}99`,
                }}
              >
                <span
                  className="absolute inset-0 rounded-full pointer-events-none opacity-80"
                  style={{
                    background: `conic-gradient(from var(--nav-cta-angle, 0deg), transparent 70%, ${colors.warning}, transparent)`,
                    padding: 1.5,
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    animation: "nav-cta-beam 5s linear infinite",
                  }}
                />
                <Sparkles size={12} className="relative" />
                <span className="relative">Únete</span>
              </button>
            </div>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              data-magnetic
              aria-label="Menú"
              className="md:hidden text-white p-2 rounded-full hover:bg-white/10 cursor-pointer relative"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {openMega === "Planes" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => {
                if (closeTimer.current) window.clearTimeout(closeTimer.current);
                setOpenMega("Planes");
              }}
              onMouseLeave={handleLeave}
              className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[min(900px,90vw)] rounded-2xl border border-white/10 overflow-hidden"
              style={{
                background: "rgba(15,15,18,0.95)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {NAV.find((n) => n.label === "Planes")?.megaMenu?.items.map((it) => (
                  <button
                    key={it.label}
                    onClick={() => {
                      navigate(it.href);
                      setOpenMega(null);
                    }}
                    data-magnetic
                    className="text-left p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/30 transition cursor-pointer group"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <h4 className="text-white font-bold">{it.label}</h4>
                      {it.price && (
                        <span
                          className="text-xs tabular-nums"
                          style={{ color: colors.success }}
                        >
                          {it.price}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {it.description}
                    </p>
                    <span className="inline-block mt-3 text-xs text-white/40 group-hover:text-white/80 transition">
                      Ver detalles →
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 50px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 50px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 50px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{ background: colors.background }}
          >
            <div className="flex flex-col h-full p-8 pt-28">
              {[
                { label: "Inicio", path: "/", Icon: Sparkles },
                { label: "Nosotros", path: "/aboutus", Icon: Users },
                { label: "Planes", path: "/plans", Icon: Dumbbell },
                { label: "Contacto", path: "/contact", Icon: Phone },
                { label: "Iniciar Sesión", path: "/login", Icon: LogIn },
              ].map((it, i) => (
                <motion.button
                  key={it.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                  onClick={() => navigate(it.path)}
                  className="flex items-center gap-4 py-5 border-b border-white/10 text-3xl font-bold text-left text-white"
                >
                  <it.Icon size={24} className="text-white/40" />
                  {it.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                onClick={() => navigate("/plans")}
                className="mt-10 flex items-center justify-center gap-2 py-4 rounded-full font-bold text-base cursor-pointer"
                style={{
                  background: colors.secondary,
                  color: colors.text,
                  boxShadow: `0 14px 40px -10px ${colors.secondary}`,
                }}
              >
                <Sparkles size={16} /> Únete ahora
              </motion.button>

              <div
                className="mt-auto inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: isOpen ? `${colors.success}44` : "rgba(255,255,255,0.1)",
                  background: isOpen ? `${colors.success}11` : "rgba(255,255,255,0.03)",
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  {isOpen && (
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: colors.success }}
                    />
                  )}
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ background: isOpen ? colors.success : colors.textMuted }}
                  />
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium">
                  {isOpen ? "Equipo online" : "Fuera de horario"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette />

      <style>{`
        @property --nav-cta-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes nav-cta-beam {
          to { --nav-cta-angle: 360deg; }
        }
      `}</style>

      {isLanding && <div aria-hidden style={{ height: 0 }} />}
    </>
  );
}
