import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { CoolMode } from "@/components/ui/cool-mode"
import { useEffect, useRef } from "react"
import { AuroraText } from "./ui/aurora-text";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CTA() {

  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { colors } = CoreFitTheme;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting && buttonRef.current) {
          // 🔥 Simulamos click para activar CoolMode
          buttonRef.current.dispatchEvent(new MouseEvent("mousedown"))

          // ⏱️ Luego de 3 segundos, lo desactivamos
          setTimeout(() => {
            buttonRef.current?.dispatchEvent(new MouseEvent("mouseup"))
          }, 3000)
        }
      },
      { threshold: 0.5 } // cuando la mitad del CTA esté visible
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const goToPlans = () => {
    navigate("/plans");
  }


  return (
    <section ref={sectionRef} className="py-20 text-center"
      style={{ backgroundColor: colors.text, color: colors.surface, }}>
      <h2
        className="text-3xl font-bold mb-6">
        👉 ¿Listo para empezar tu <AuroraText speed={1.5}>transformación</AuroraText> ? ⚡🏆
      </h2>
      <CoolMode>
        <Button
          variant="contained"
          className="cursor-pointer"
          style={{ background: colors.secondary, color: colors.text, borderRadius: 20 }}
          onClick={goToPlans}
        >
          Únete ahora
        </Button>
      </CoolMode>
    </section>
  );
}