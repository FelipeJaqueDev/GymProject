import { AnimatedTestimonials } from "./ui/animated-testimonials";
import confetti from "canvas-confetti"
import ShapeDivider from '@/core/components/ShapeDivider/ShapeDivider';
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { TypingAnimation } from "@/components/ui/typing-animation"
import { useEffect, useRef } from "react";
import { LineShadowText } from "@/components/ui/line-shadow-text"


export default function Testimonials() {

  const sectionRef = useRef<HTMLDivElement | null>(null)
  const hasPlayed = useRef(false) // evita que se repita el confetti cada vez que se entra/sale
  const { colors } = CoreFitTheme;

  const handleClick = () => {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ["#0A0A0A", "#E53935", "#2979FF", "#FFEA00", "#9E9E9E"]
    const frame = () => {
      if (Date.now() > end) return
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      })
      requestAnimationFrame(frame)
    }
    frame()
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasPlayed.current) {
          handleClick()
          hasPlayed.current = true // lo ejecuta solo una vez
        }
      },
      { threshold: 0.90 } // se activa cuando el 50% del componente es visible
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])


  const testimonials = [
    {
      quote:
        "Nunca pensé que podría volver a sentirme tan bien conmigo mismo. En solo tres meses noté un cambio increíble en mi energía y mi cuerpo. ¡Gracias por motivarme cada día!",
      name: "Carlos Gonzalez",
      designation: "Carlos Gonzalez, 29 años",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Llegué sin saber por dónde empezar, y hoy entrenar es parte de mi rutina. Bajé peso, gané fuerza y, sobre todo, confianza. ¡El mejor equipo!",
      name: "Sandra Nuñez",
      designation: "Sandra Nuñez, 39 años",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "El ambiente del gimnasio me impulsó a superarme. Pasé de no poder correr ni 5 minutos a completar mi primera media maratón. ¡Increíble experiencia!",
      name: "Sebastián Lopez",
      designation: "Sebastián Lopez, 18 años",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Más que un gimnasio, es una comunidad. Los entrenadores me ayudaron a transformar no solo mi cuerpo, sino también mi mentalidad. Me siento renovado.",
      name: "Christian Araya",
      designation: "Christian Araya, 40 años",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Ver los resultados semana a semana fue lo más motivador. Gané masa muscular, mejoré mi postura y ahora tengo más energía para todo.",
      name: "Claudio Salinas",
      designation: "Claudia Salinas, 32 años",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    /* AGREGADO: className="relative" 
       Esto es vital para que el absolute del Divider sepa donde ubicarse.
       También agregué "overflow-hidden" por si el SVG es muy grande.
    */
    <section ref={sectionRef} className="relative w-full overflow-hidden">
      <div className="relative">
      </div>
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="col-span-2 row-span-5 flex flex-col h-full items-center justify-center">
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-4 text-center"
            style={{ color: colors.text }}>
            Historias de <LineShadowText className="italic" shadowColor="#ffffff">transformación</LineShadowText>
          </h1>
          <p
            className="mb-8 text-center"
            style={{ color: colors.text }}>
            <TypingAnimation
              words={["Cambiamos vidas, para mejor🔥"]} typeSpeed={120}
            />
          </p>
        </div>
        <div className="col-span-3 row-span-5 col-start-3">
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </div>
      <ShapeDivider
        position="bottom"
        shape="shapeZinkerMaskBoxTop"
        color={colors.text}
        height="150px"
      />
    </section>
  );
}