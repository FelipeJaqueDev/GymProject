import CompanyPhotos from "../../components/CompanyPhotos"
import CTA from "../../components/CTA"
import Footer from "../../components/Footer"
import Hero from "../../components/Hero"
import Location from "../../components/Location"
import Services from "../../components/Services"
import Testimonials from "../../components/Testimonials"
import GenericNavbar from "../../core/components/Navbar/GenericNavbar"
import MotionBySection from "../../motions/MotionBySection"
import { motion } from "framer-motion";
// import "../../types/model-viewer";


function Landing() {
  // const items = [{id: 1, text: 'Iniciar Sesión'}, {id: 2, text: 'Nosotros'}, {id: 3, text: 'Planes'}, {id: 4, text: 'Contacto'}]
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="font-sans text-gray-900 bg-white"
  >
    <div className="font-sans text-gray-900 bg-black">
      <GenericNavbar />

      <MotionBySection>
          <Hero />
      </MotionBySection>

      <MotionBySection>
          <Services />
      </MotionBySection>

      <MotionBySection delay={0.2}>
          <CompanyPhotos />
      </MotionBySection>

      <MotionBySection delay={0.3}>
          <Testimonials />
      </MotionBySection>

      {/* <MotionBySection delay={0.3}> */}
          <CTA />
      {/* </MotionBySection> */}

      <MotionBySection delay={0.3}>
          <Location />
      </MotionBySection>

      <Footer />
    </div>
    </motion.div>
  )
  
}

export default Landing