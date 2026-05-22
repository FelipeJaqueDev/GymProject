import CompanyPhotos from "../../components/CompanyPhotos";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Location from "../../components/Location";
import Services from "../../components/Services";
import Testimonials from "../../components/Testimonials";
import GenericNavbar from "../../core/components/Navbar/GenericNavbar";
import MotionBySection from "../../motions/MotionBySection";
import SmoothScroll from "../../motions/SmoothScroll";
import MagneticCursor from "../../motions/MagneticCursor";
import ScrollProgress from "../../motions/ScrollProgress";
import KonamiEasterEgg from "../../motions/KonamiEasterEgg";
import { motion } from "framer-motion";

function Landing() {
  return (
    <SmoothScroll>
      <MagneticCursor />
      <ScrollProgress />
      <KonamiEasterEgg />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="font-sans text-gray-900 bg-white"
      >
        <div className="font-sans text-gray-900 bg-black">
          <GenericNavbar />

          <Hero />

          <MotionBySection reveal="blur">
            <Services />
          </MotionBySection>

          <MotionBySection reveal="mask">
            <CompanyPhotos />
          </MotionBySection>

          <Testimonials />

          <CTA />

          <MotionBySection reveal="mask">
            <Location />
          </MotionBySection>

          <Footer />
        </div>
      </motion.div>
    </SmoothScroll>
  );
}

export default Landing;
