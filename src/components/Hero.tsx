import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { AuroraText } from "@/components/ui/aurora-text";
import background2 from "../assets/Images/Bg/background2.jpg"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function Hero() {

  const { colors } = CoreFitTheme;
  const navigate = useNavigate();

  const textRefLeft = useRef<HTMLHeadingElement>(null);
  const textRefRight = useRef<HTMLHeadingElement>(null)
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLHeadingElement>(null);


  const goToPlans = () => {
    navigate("/plans")
  }


  useEffect(() => {
    const tl = gsap.timeline();

    if (textRefLeft.current && textRefRight.current && textRef2.current && buttonRef.current) {
      tl.fromTo(
        textRefLeft.current,
        { x: -400, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "expo.out" }
      )
        .fromTo(
          textRef2.current,
          { x: 300, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "expo.out" },
          "-=0.5" // solapa un poco con el anterior
        )
        .fromTo(
          textRefRight.current,
          { y: -300, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }
        )
        .fromTo(
          buttonRef.current,
          { y: 70, opacity: 0 }, // 👈 nace desde abajo
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
          },
          "-=0.3"
        );
    }
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center h-[100vh] bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${background2})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-6">
        <div className="flex items-center gap-3">
          <h1
            ref={textRefLeft}
            className="text-5xl md:text-6xl font-extrabold mb-4"
          >
            Transforma tu cuerpo,
          </h1>
          <h1
            ref={textRefRight}
            className="text-5xl md:text-6xl font-extrabold mb-4"
          >
            <AuroraText speed={1.5}>mejora tu vida</AuroraText>
          </h1>
        </div>
        <p
          ref={textRef2}
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          Entrena con nuestros instructores altamente capacitados y alcanza tus metas junto a nosotros.
        </p>
        <div ref={buttonRef} >
          <Button
            style={{ backgroundColor: colors.secondary, color: colors.text, borderRadius: 20 }}
            variant="contained"
            onClick={goToPlans}
          >
            Ver Planes
          </Button>
        </div>

        {/* <a
          ref={textRef3}
          className="hover:bg-blue-700 py-3 px-6 rounded-full text-lg font-semibold transition"
          style={{ backgroundColor: colors.secondary, color: colors.text, }}
        >
          Ver Planes
        </a> */}
      </div>
    </section>
  )
}

export default Hero