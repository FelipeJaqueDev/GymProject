import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CoreFitTheme } from "@/themes/CoreFitTheme";

// CoreFit Gym — Golda Meir 216, Las Condes (a pasos del metro Manquehue, L1)
const COORDS: [number, number] = [-33.4083, -70.5717];
const ADDRESS = "Golda Meir 216, Las Condes";

export default function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { colors } = CoreFitTheme;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Canvas/div nuevo por montaje para evitar el error de Leaflet
    // "Map container is already initialized" en StrictMode (doble efecto).
    const mapEl = document.createElement("div");
    mapEl.style.cssText = "width:100%;height:100%;";
    container.appendChild(mapEl);

    const map = L.map(mapEl, {
      center: COORDS,
      zoom: 16,
      zoomControl: true,
      scrollWheelZoom: false, // evita secuestrar el scroll de la página (Lenis)
      attributionControl: true,
      fadeAnimation: true,
    });

    // Tiles oscuros premium (CARTO dark matter) — sin API key
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map);

    // Marcador custom con glow + pulso de marca
    const markerIcon = L.divIcon({
      className: "corefit-marker",
      html: `
        <span class="corefit-marker__pulse" style="--c:${colors.primary}"></span>
        <span class="corefit-marker__pin" style="--c:${colors.primary}">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="white" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
          </svg>
        </span>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 40],
      popupAnchor: [0, -38],
    });

    L.marker(COORDS, { icon: markerIcon })
      .addTo(map)
      .bindPopup(
        `<strong>CoreFit Gym</strong><br/>${ADDRESS}`,
        { className: "corefit-popup" }
      );

    // Leaflet a veces necesita recalcular el tamaño tras el montaje/animación
    const t = window.setTimeout(() => map.invalidateSize(), 250);

    return () => {
      window.clearTimeout(t);
      map.remove();
      mapEl.remove();
    };
  }, [colors.primary]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] min-h-[340px] rounded-3xl overflow-hidden border border-white/10"
        style={{ boxShadow: `0 40px 90px -40px ${colors.secondary}66` }}
      />
      {/* viñeta sutil para fundir el mapa con el fondo oscuro de la sección */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          boxShadow: "inset 0 0 80px 20px rgba(0,0,0,0.55)",
        }}
      />

      <style>{`
        .corefit-marker { position: relative; }
        .corefit-marker__pin {
          position: absolute;
          left: 50%;
          bottom: 4px;
          transform: translateX(-50%);
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--c);
          border-radius: 50% 50% 50% 0;
          rotate: -45deg;
          box-shadow: 0 6px 20px -4px var(--c), 0 0 0 4px rgba(255,255,255,0.12);
        }
        .corefit-marker__pin svg { rotate: 45deg; }
        .corefit-marker__pulse {
          position: absolute;
          left: 50%;
          bottom: 6px;
          transform: translateX(-50%);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: var(--c);
          opacity: 0.5;
          animation: corefit-marker-pulse 2s ease-out infinite;
        }
        @keyframes corefit-marker-pulse {
          0%   { transform: translateX(-50%) scale(0.6); opacity: 0.6; }
          70%  { transform: translateX(-50%) scale(2.4); opacity: 0; }
          100% { transform: translateX(-50%) scale(2.4); opacity: 0; }
        }
        /* Controles de zoom en estilo oscuro */
        .leaflet-control-zoom a {
          background: rgba(20,20,20,0.85) !important;
          color: #f5f5f5 !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          backdrop-filter: blur(6px);
        }
        .leaflet-control-zoom a:hover {
          background: rgba(40,40,40,0.95) !important;
        }
        .leaflet-bar { border: none !important; box-shadow: none !important; }
        /* Atribución discreta */
        .leaflet-control-attribution {
          background: rgba(0,0,0,0.5) !important;
          color: rgba(255,255,255,0.45) !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: rgba(255,255,255,0.6) !important; }
        /* Popup oscuro */
        .corefit-popup .leaflet-popup-content-wrapper {
          background: #1c1c1c;
          color: #f5f5f5;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
        }
        .corefit-popup .leaflet-popup-tip { background: #1c1c1c; }
        .corefit-popup .leaflet-popup-content { margin: 12px 16px; font-size: 13px; }
      `}</style>
    </>
  );
}
