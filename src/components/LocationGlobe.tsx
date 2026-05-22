import { useEffect, useRef } from "react";
import createGlobe from "cobe";

const SIZE = 500;

export default function LocationGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: SIZE * 2,
      height: SIZE * 2,
      phi: 0,
      theta: 0.25,
      dark: 0,
      diffuse: 1.5,
      mapSamples: 18000,
      mapBrightness: 12,
      baseColor: [0.5, 0.55, 0.65],
      markerColor: [1, 0.2, 0.2],
      glowColor: [0.16, 0.47, 1],
      markers: [{ location: [-33.4161, -70.5894], size: 0.12 }],
      onRender: (state: Record<string, number>) => {
        state.phi = phiRef.current;
        phiRef.current += 0.0035;
      },
    } as Parameters<typeof createGlobe>[1]);

    const t = window.setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    }, 100);

    return () => {
      window.clearTimeout(t);
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: SIZE,
        height: SIZE,
        maxWidth: "100%",
        aspectRatio: "1 / 1",
        opacity: 0,
        transition: "opacity 0.8s ease",
        display: "block",
      }}
    />
  );
}
