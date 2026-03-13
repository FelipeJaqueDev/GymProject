import React, { forwardRef, useLayoutEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Dumbbell, Bike, Activity, BoomBox, PersonStanding, LandPlot, HandFist } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { CoreFitTheme } from "@/themes/CoreFitTheme"
import { AuroraText } from "./ui/aurora-text"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";



gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);


interface CircleProps {
  className?: string
  children?: React.ReactNode
  borderColor?: string // ✅ nuevo prop
}



const Circle = forwardRef<HTMLDivElement, CircleProps & { gradientBorder?: string }>(

  ({ className, children, borderColor = "#00FF88", gradientBorder }, ref) => {

    if (gradientBorder) {

      // 🔥 versión con borde gradiente

      return (

        <div

          ref={ref}

          className={cn(

            "relative z-10 flex size-12 items-center justify-center rounded-full p-[2px]",

            className

          )}

        >

          <div

            className="absolute inset-0 rounded-full"

            style={{

              background: gradientBorder,

            }}

          />

          <div className="relative flex size-full items-center justify-center rounded-full bg-black p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]">

            {children}

          </div>

        </div>

      )

    }



    // 🟢 versión con borde sólido normal

    return (

      <div

        ref={ref}

        style={{ borderColor }}

        className={cn(

          "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-black p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",

          className

        )}

      >

        {children}

      </div>

    )

  }

)

Circle.displayName = "Circle"



export default function Services() {



  const sectionRef = useRef<HTMLElement>(null);

  const containerRef = useRef<HTMLDivElement>(null)

  const div1Ref = useRef<HTMLDivElement>(null)

  const div2Ref = useRef<HTMLDivElement>(null)

  const div3Ref = useRef<HTMLDivElement>(null)

  const div4Ref = useRef<HTMLDivElement>(null)

  const div5Ref = useRef<HTMLDivElement>(null)

  const div6Ref = useRef<HTMLDivElement>(null)

  const div7Ref = useRef<HTMLDivElement>(null)

  const cardRef = useRef<HTMLDivElement>(null)

  const { colors } = CoreFitTheme;



  useLayoutEffect(() => {



    const ctx = gsap.context(() => {



      if (cardRef.current) {



        gsap.fromTo(

          cardRef.current,

          { y: 200, autoAlpha: 0, rotate: 180 },

          {
            y: 0, autoAlpha: 1, duration: 2, ease: "back.out(1.7)", rotate: 0,

            scrollTrigger: {

              trigger: cardRef.current,

              start: "top 80%",

              end: "bottom center",

              toggleActions: "play none none reverse"

            }

          });


        Draggable.create(".draggable-card", {
          type: "x,y",
          edgeResistance: 0.65,
          zIndexBoost: true,

          onDragEnd: function () {
            gsap.to(this.target, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          },
        });
      }

    }, sectionRef); //Scope al sectionRef

    return () => ctx.revert();

  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center justify-center bg-black px-10 overflow-hidden">
      {/* <div className="absolute inset-0 -z-10">
        <Particles />
      </div> */}
      <div className="grid grid-cols-5 grid-rows-5 gap-4 w-full max-w-7xl">
        {/* IZQUIERDA - animación */}
        <div className="col-span-3 row-span-5">
          <div
            className="relative flex h-[300px] w-full items-center justify-center overflow-hidden p-10"
            ref={containerRef}
          >
            <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div1Ref} borderColor={colors.text}><Dumbbell style={{ color: colors.text }} /></Circle>
                <Circle ref={div5Ref} borderColor={colors.success}><Bike style={{ color: colors.success }} /></Circle>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div2Ref} borderColor={colors.secondary}><Activity style={{ color: colors.secondary }} /></Circle>
                <Circle ref={div4Ref} borderColor={colors.text} className="size-16" gradientBorder="linear-gradient(205deg, #2979FF, #9E9E9E, #E53935, #00E676, #FFEA00, #F5F5F5, #1C1C1C)"><PersonStanding style={{ color: colors.text }} /></Circle>
                <Circle ref={div6Ref} borderColor={colors.primary}><BoomBox style={{ color: colors.primary }} /></Circle>
              </div>
              <div className="flex flex-row items-center justify-between">
                <Circle ref={div3Ref} borderColor={colors.warning}><HandFist style={{ color: colors.warning }} /></Circle>
                <Circle ref={div7Ref} borderColor={colors.textMuted}><LandPlot style={{ color: colors.textMuted }} /></Circle>
              </div>
            </div>
            {/* Líneas animadas */}
            <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div4Ref} curvature={-75} endYOffset={-10} />
            <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} />
            <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div4Ref} curvature={75} endYOffset={10} />
            <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div4Ref} curvature={-75} endYOffset={-10} reverse />
            <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} reverse />
            <AnimatedBeam containerRef={containerRef} fromRef={div7Ref} toRef={div4Ref} curvature={75} endYOffset={10} reverse />
          </div>
        </div>
        {/* DERECHA - título y card */}
        <div ref={cardRef} className="col-span-2 row-span-5 col-start-4 flex flex-col gap-6 draggable-card cursor-grab active:cursor-grabbing">
          <Card
            className="text-white border-neutral-700 shadow-xl rounded-2xl transition-transform hover:scale-[1.02]"
            style={{ background: '#000000' }}>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Nuestros <AuroraText speed={1.5}>Servicios</AuroraText>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-neutral-300">
              <div className="flex items-center gap-3">
                <Dumbbell style={{ color: colors.text }} /> Entrenamiento Personalizado con seguimiento constante.
              </div>
              <div className="flex items-center gap-3">
                <Activity style={{ color: colors.secondary }} /> Evaluaciones físicas y planes adaptados a tus objetivos.
              </div>
              <div className="flex items-center gap-3">
                <Bike style={{ color: colors.success }} /> Clases grupales de alta energía.
              </div>
              <div className="flex items-center gap-3">
                <HandFist style={{ color: colors.warning }} /> Programas de fuerza y musculación.
              </div>
              <div className="flex items-center gap-3">
                <BoomBox style={{ color: colors.primary }} /> Ambiente motivador con música y energía constante.
              </div>
              <div className="flex items-center gap-3">
                <LandPlot style={{ color: colors.textMuted }} /> Asesorías de nutrición y suplementación deportiva.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

  )

}