// import { motion } from "framer-motion";
import { CoreFitTheme } from "@/themes/CoreFitTheme";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";
import gymLogo from "../assets/Images/Logo/MyLogo.png"

export default function Footer() {

  const { colors } = CoreFitTheme;

  return (
    // <motion.footer
    //   initial={{ opacity: 0, y: 20 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.5 }}
    //   className="w-full text-black border-t border-white/10 mt-0 py-10 px-6 md:px-20"
    //   style = {{ backgroundColor: colors.textMuted }}
    // >
    <>
      <div className="w-full text-black mt-0 py-10 px-6 md:px-20" style = {{ backgroundColor: colors.textMuted }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Logo + lema */}
          <div>
            <img src={gymLogo} alt="GymApp Logo" className="w-28 mb-3" />
            <p className="text-sm text-white/70" style={{ color: colors.surface }}>
              Transforma tu cuerpo, mejora tu vida.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[${happybodiesGymTheme.colors.YELLOW}]" style={{ color: colors.surface }}>
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#hero" className="hover:text-[${happybodiesGymTheme.colors.YELLOW}]" style={{ color: colors.surface }}>Inicio</a></li>
              <li><a href="#services" className="hover:text-[${happybodiesGymTheme.colors.YELLOW}]" style={{ color: colors.surface }}>Servicios</a></li>
              <li><a href="#classes" className="hover:text-[${happybodiesGymTheme.colors.YELLOW}]" style={{ color: colors.surface }}>Clases</a></li>
              <li><a href="#contact" className="hover:text-[${happybodiesGymTheme.colors.YELLOW}]" style={{ color: colors.surface }}>Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[${happybodiesGymTheme.colors.YELLOW}]" style={{ color: colors.surface }}>
              Contáctanos
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2" style={{ color: colors.surface }}>
                <Phone size={16} /> +56 9 45004380
              </li>
              <li className="flex items-center gap-2" style={{ color: colors.surface }}>
                <Mail size={16} /> felipejaque.s97@gmail.com
              </li>
              <li className="flex items-center gap-2" style={{ color: colors.surface }}>
                📍 Golda Meir 216, Las Condes, Región Metropolitana
              </li>
            </ul>

            {/* Redes sociales */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-[${happybodiesGymTheme.colors.YELLOW}]">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[${happybodiesGymTheme.colors.YELLOW}]">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/50 mt-8" style={{ color: colors.surface }}>
          © {new Date().getFullYear()} JaqueApps. Todos los derechos reservados.
          {/* <SpinningText>learn more • earn more • grow more •</SpinningText> */}

        </p>

      </div>

    </>

    // </motion.footer>
  );
}