import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, LayoutGrid, Users, Phone, LogIn, Dumbbell } from "lucide-react";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        const target = e.target as HTMLElement | null;
        if (target && /input|textarea/i.test(target.tagName)) return;
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-start justify-center p-4 pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-white/10"
            style={{
              background: "rgba(20,20,22,0.95)",
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7)",
            }}
          >
            <Command className="text-white" loop>
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                <Search size={16} className="text-white/40" />
                <Command.Input
                  placeholder="Busca planes, servicios o navega…"
                  className="flex-1 bg-transparent outline-none text-sm placeholder-white/30"
                  autoFocus
                />
                <kbd className="text-[10px] px-2 py-1 rounded bg-white/10 text-white/50">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-[60vh] overflow-y-auto py-2">
                <Command.Empty className="px-4 py-6 text-center text-sm text-white/50">
                  Sin resultados.
                </Command.Empty>

                <Command.Group heading="Navegación" className="px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  <Command.Item
                    onSelect={() => go("/")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/10 transition"
                  >
                    <LayoutGrid size={16} /> Ir al inicio
                  </Command.Item>
                  <Command.Item
                    onSelect={() => go("/plans")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/10 transition"
                  >
                    <Dumbbell size={16} /> Ver Planes
                  </Command.Item>
                  <Command.Item
                    onSelect={() => go("/aboutus")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/10 transition"
                  >
                    <Users size={16} /> Nosotros
                  </Command.Item>
                  <Command.Item
                    onSelect={() => go("/contact")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/10 transition"
                  >
                    <Phone size={16} /> Contacto
                  </Command.Item>
                  <Command.Item
                    onSelect={() => go("/login")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/10 transition"
                  >
                    <LogIn size={16} /> Iniciar Sesión
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Planes" className="px-2 pt-3 pb-1 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  <Command.Item
                    onSelect={() => go("/plans")}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/10 transition"
                  >
                    <span>Plan Básico</span>
                    <span className="text-white/40">$19.990</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => go("/plans")}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/10 transition"
                  >
                    <span>CoreFit · Popular</span>
                    <span className="text-white/40">$24.990</span>
                  </Command.Item>
                  <Command.Item
                    onSelect={() => go("/plans")}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-white/10 transition"
                  >
                    <span>Plan Premium</span>
                    <span className="text-white/40">$29.990</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
              <div className="border-t border-white/10 px-4 py-2 text-[10px] text-white/40 flex justify-between">
                <span>↑↓ navegar · ↵ seleccionar</span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">⌘</kbd> +{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">K</kbd>
                </span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
