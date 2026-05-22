import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import LocationGlobe from "./LocationGlobe";

gsap.registerPlugin(ScrollTrigger);

function useChileTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const Location = () => {
  const { colors } = CoreFitTheme;
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const now = useChileTime();
  const hour = now.getHours();
  const isOpen = hour >= 6 && hour < 23;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        textRef.current?.querySelectorAll("[data-loc-item]") ?? [],
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        globeRef.current,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const waLink =
    "https://wa.me/56945004380?text=Hola,%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20CoreFit";
  const callLink = "tel:+56945004380";
  const directionsLink =
    "https://www.google.com/maps/dir/?api=1&destination=Golda+Meir+216+Las+Condes+Santiago";

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-white py-24 px-8 md:px-20 grid md:grid-cols-2 gap-16 items-center"
    >
      <div className="flex flex-col gap-5" ref={textRef}>
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
          style={{ color: colors.primary }}
        >
          <span className="inline-flex items-center gap-3">
            <MapPin size={36} /> Ubicación
          </span>
        </h2>
        <p
          data-loc-item
          className="text-gray-300 leading-relaxed text-lg max-w-lg"
        >
          Ven a visitarnos en CoreFit, a pasos del metro Manquehue (L1). Amplios
          espacios, estacionamiento y fácil acceso por avenida Apoquindo.
        </p>
        <p data-loc-item className="text-gray-400 italic">
          📍 Golda Meir 216, 7550081 Las Condes, RM
        </p>

        <div
          data-loc-item
          className="flex items-center gap-2 mt-2"
        >
          <span
            className="relative flex h-3 w-3"
            aria-hidden="true"
          >
            {isOpen && (
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: colors.success }}
              />
            )}
            <span
              className="relative inline-flex rounded-full h-3 w-3"
              style={{ background: isOpen ? colors.success : colors.textMuted }}
            />
          </span>
          <Clock size={16} className="text-white/60" />
          <span className="text-sm text-white/80">
            {isOpen ? `Abierto hasta las 23:00` : "Cerrado · Abrimos a las 06:00"}
          </span>
        </div>

        <div data-loc-item className="flex flex-wrap gap-3 mt-4">
          <a
            href={waLink}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition cursor-pointer"
            style={{
              background: "#25D366",
              color: "#000",
              boxShadow: "0 10px 30px -10px #25D366",
            }}
          >
            <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
              <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.7 5.4 2.1 7.7L.8 31.2l7.7-2c2.2 1.2 4.7 1.9 7.5 1.9 8.4 0 15.2-6.8 15.2-15.2C31.2 7.6 24.4.8 16 .8zm0 27.8c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.6 1.2 1.2-4.5-.3-.5c-1.3-2-2-4.4-2-6.8 0-7.1 5.7-12.8 12.8-12.8s12.8 5.7 12.8 12.8c.1 7.1-5.6 12.7-12.7 12.7zm7-9.6c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2s-1 1.3-1.2 1.5c-.2.3-.4.3-.8.1s-1.6-.6-3.1-1.9c-1.1-1-1.9-2.3-2.2-2.7-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.7.1-.3.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.7-.9-.7h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1c0 1.8 1.3 3.6 1.5 3.9.2.3 2.6 4.1 6.3 5.7.9.4 1.6.6 2.1.8.9.3 1.7.2 2.4.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.7-.5z" />
            </svg>
            WhatsApp
          </a>
          <a
            href={callLink}
            data-magnetic
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold border border-white/15 hover:bg-white/5 transition cursor-pointer"
            style={{ color: colors.text }}
          >
            <Phone size={16} /> Llamar
          </a>
          <a
            href={directionsLink}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition cursor-pointer"
            style={{
              background: colors.secondary,
              color: colors.text,
              boxShadow: `0 10px 30px -10px ${colors.secondary}`,
            }}
          >
            <Navigation size={16} /> Cómo llegar
          </a>
        </div>
      </div>

      <div
        ref={globeRef}
        className="relative flex items-center justify-center will-change-transform"
      >
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "70%",
            aspectRatio: 1,
            background: `radial-gradient(circle, ${colors.secondary}55 0%, transparent 60%)`,
            filter: "blur(40px)",
          }}
        />
        <LocationGlobe />
      </div>
    </section>
  );
};

export default Location;
