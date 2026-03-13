import GenericNavbar from '@/core/components/Navbar/GenericNavbar';
import ShapeDivider from '@/core/components/ShapeDivider/ShapeDivider';
import { CoreFitTheme } from '@/themes/CoreFitTheme';
import { AuroraText } from "@/components/ui/aurora-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { Typography, Box } from '@mui/material'; // Añadí Card y CardContent
import BasicPlan from '@/core/components/BasicPlan';
import CoreFitPlan from '@/core/components/CoreFitPlan';
import PremiumPlan from '@/core/components/PremiumPlan';
import SocialProofCards from '@/core/components/SocialProofCards/SocialProofCards';
import Footer from '@/components/Footer';
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const Plans = () => {
  const titleRef = useRef(null);
  const { colors } = CoreFitTheme;

  const refCards = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const ctx = gsap.context(() => {

      if (titleRef.current && refCards.current) {
        gsap.fromTo(
          titleRef.current,
          { y: -100, opacity: 0 }, // Reduje -400 a -100 para que la animación sea más sutil y no venga "desde el cielo"
          { y: 0, opacity: 1, duration: 1.2, ease: "back.out" }
        )

        gsap.fromTo(
          refCards.current,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 2, ease: "elastic",
            onComplete: () => {// Importante: clearProps asegura que la animación de entrada no pelee con el Draggable después
              gsap.set(refCards.current, { clearProps: "transform" });
            }
          }
        )

        // --- 3. IMPLEMENTACIÓN DE DRAGGABLE ---
        Draggable.create(".draggable-card", {
          type: "x,y", // Permite mover en X e Y
          edgeResistance: 0.65, // Resistencia al llegar al borde
          //bounds: refCards.current, // (Opcional) Limita el movimiento al contenedor padre
          //inertia: true, // (Opcional) Requiere InertiaPlugin (de pago/club) o funcionará como drag normal
          zIndexBoost: true, // Pone la tarjeta que estás arrastrando por encima de las otras
          //revert: true, //la tarjeta regresa a su posicion original al soltarla
          //revertDuration: 0.5

          onDragEnd: function () {
            gsap.to(this.target, { // 'this.target' es el elemento que se soltó
              x: 0,
              y: 0,
              duration: 0.5, // Duración del retorno (0.5 segundos)
              ease: "power2.out", // Curva de animación
            });
          },

        });
      }

    }); // fin del context

    return () => ctx.revert(); //Limpia todo el componente si se desmonta.

  }, []);

  return (
    <>
      <section
        // 1. ELIMINADO 'justify-center'. Mantenemos flex-col y min-h-screen.
        className="relative flex flex-col min-h-screen text-white overflow-hidden"
        style={{ background: colors.background }}
      >
        {/* El Navbar se queda arriba. Z-index alto para asegurar que esté sobre todo */}
        <div className="z-50 relative">
          <GenericNavbar />
        </div>

        {/* 2. CONTENEDOR PRINCIPAL DE CONTENIDO:
         - flex-grow: Ocupa todo el espacio disponible debajo del navbar.
         - flex flex-col justify-center: Centra el contenido verticalmente DENTRO del espacio sobrante.
         - pt-24 (padding top): Empuja el contenido hacia abajo para respetar la altura del Navbar (ajusta el 24 según el alto de tu navbar).
         - pb-32: Espacio abajo para que el ShapeDivider no tape las tarjetas.
      */}
        <main className="flex-grow flex flex-col items-center justify-center z-10 pt-24 pb-32 px-4">

          {/* Bloque del Título */}
          <Box className="text-center mb-12">
            <Typography
              ref={titleRef}
              variant="h2"
              className="font-black text-white mb-2 text-4xl md:text-5xl lg:text-6xl"
            >
              Elige tu plan en <AuroraText speed={1.5}>CoreFit</AuroraText>
            </Typography>

            <div className="text-white/90 font-medium text-xl md:text-2xl h-8 mb-10">
              {/* Envolví el typing en un div con altura fija (h-8) para evitar saltos de layout */}
              <TypingAnimation
                words={["Sin costo de inscripción"]}
                typeSpeed={80}
              />
            </div>
          </Box>

          {/* 3. GRID RESPONSIVE MEJORADO:
           Usar grid-cols-6 con posiciones manuales es frágil. 
           Mejor usa flex-wrap o un grid responsivo automático.
        */}
          <div ref={refCards} className="flex flex-wrap justify-center gap-8 items-start w-full max-w-7xl mb-22">
            <div className="draggable-card cursor-grab active:cursor-grabbing">
              <BasicPlan />
            </div>
            {/* A menudo el plan del medio se destaca un poco (scale-105) */}
            <div className="draggable-card transform md:-translate-y-4 z-20 cursor-grab active:cursor-grabbing">
              <CoreFitPlan />
            </div>
            <div className="draggable-card cursor-grab active:cursor-grabbing">
              <PremiumPlan />
            </div>
          </div>

          {/* --- NUEVA SECCIÓN DE STATS --- */}
          <SocialProofCards />
        </main>

        <ShapeDivider
          position="bottom"
          shape="shapeZinkerMaskBoxTop"
          color={colors.textMuted}
          height="500px" // Reduje un poco la altura para que no invada la pantalla en laptops
        //className="z-0"
        />
      </section>
      <Footer />

    </>


  );
};

export default Plans;