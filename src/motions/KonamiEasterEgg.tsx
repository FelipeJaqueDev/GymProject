import { useEffect } from "react";
import confetti from "canvas-confetti";

const SEQ = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function KonamiEasterEgg() {
  useEffect(() => {
    let i = 0;
    const fire = () => {
      const palette = ["#E53935", "#2979FF", "#00E676", "#FFEA00", "#F5F5F5"];
      const duration = 4000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 6,
          spread: 360,
          startVelocity: 45,
          ticks: 220,
          origin: { x: Math.random(), y: Math.random() * 0.6 },
          colors: palette,
          scalar: 1.4,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    };
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQ[i];
      if (e.key === expected || e.key.toLowerCase() === expected) {
        i++;
        if (i === SEQ.length) {
          fire();
          i = 0;
        }
      } else {
        i = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
