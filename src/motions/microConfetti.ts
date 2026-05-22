import confetti from "canvas-confetti";

interface MicroConfettiOpts {
  origin?: { x: number; y: number };
  colors?: string[];
  count?: number;
  spread?: number;
  scalar?: number;
  startVelocity?: number;
  ticks?: number;
}

const DEFAULT_COLORS = ["#2979FF", "#00E676", "#FFEA00", "#E53935"];

export function microConfetti({
  origin = { x: 0.5, y: 0.6 },
  colors = DEFAULT_COLORS,
  count = 15,
  spread = 55,
  scalar = 0.75,
  startVelocity = 22,
  ticks = 90,
}: MicroConfettiOpts = {}) {
  confetti({
    particleCount: count,
    spread,
    startVelocity,
    ticks,
    scalar,
    origin,
    colors,
    disableForReducedMotion: true,
  });
}

export function microConfettiFromElement(
  el: Element | null,
  opts: MicroConfettiOpts = {}
) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  const x = (r.left + r.width / 2) / window.innerWidth;
  const y = (r.top + r.height / 2) / window.innerHeight;
  microConfetti({ ...opts, origin: { x, y } });
}
