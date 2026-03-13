import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // opcional para animaciones suaves
import { useNavigate } from "react-router-dom";
import gymLogo from "../../../assets/Images/Logo/MyLogo.png"
import { CoreFitTheme } from "@/themes/CoreFitTheme";

export default function GenericNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { colors } = CoreFitTheme;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goLogin = () => {
    navigate("/login")
  }

  const goLanding = () => {
    navigate("/")
  }

  const goContact = () => {
    navigate("/contact")
  }

  const goPlans = () => {
    navigate("/plans")
  }

    const goAboutUs = () => {
    navigate("/aboutus")
  }

  return (
    <motion.nav
      initial={false}
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
      animate={{ height: scrolled ? 70 : 100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="z-50 flex items-center justify-between px-8"
    >
      {/* overlay absoluto que animamos */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: 0,                 // top:0; right:0; bottom:0; left:0;
          background: "rgba(0,0,0,0.95)",
          pointerEvents: "none",    // no interfiere con clicks
          backdropFilter: scrolled ? "blur(6px)" : "none",
        }}
      />

      {/* contenido del nav arriba de la overlay */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <img src={gymLogo} alt="Logo CoreFit" className="h-16 w-auto cursor-pointer" onClick={goLanding} />
        <ul className="flex gap-6">
          <li className="cursor-pointer" style={{ color: colors.text }} onClick={goLogin}>Iniciar Sesión</li>
          <li className="cursor-pointer hover:text-gray-400" style={{ color: colors.text }} onClick={goAboutUs} >Nosotros</li>
          <li className="cursor-pointer hover:text-gray-400" style={{ color: colors.text }} onClick={goPlans} >Planes</li>
          <li className="cursor-pointer hover:text-gray-400" style={{ color: colors.text }} onClick={goContact}>Contacto</li>
        </ul>
      </div>
    </motion.nav>

  );
}