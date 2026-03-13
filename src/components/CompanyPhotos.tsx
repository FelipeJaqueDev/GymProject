import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img2 from "../assets/Images/Bg/img2.jpg";
import img3 from "../assets/Images/Bg/img3.jpg";
import img4 from "../assets/Images/Bg/img4.jpg";
import img5 from "../assets/Images/Bg/img5.jpg";
import img6 from "../assets/Images/Bg/img6.jpg";

const images = [
  {
    src: img2,
    alt: "Área de pesas del gimnasio",
  },
  {
    src: img3,
    alt: "Zona de cardio moderna",
  },
  {
    src: img4,
    alt: "Clases grupales en acción",
  },
  {
    src: img5,
    alt: "Sala de entrenamiento funcional",
  },
  {
    src: img6,
    alt: "Zona de estiramiento del gimnasio",
  },
];

export default function CompanyPhotos() {
const [index, setIndex] = useState(0);

   // Avanzar automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [index]);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative py-0 bg-gray-50">
      <div className="max-w-8xl mx-auto px-0 text-center">
        {/* <h2 className="text-3xl font-bold mb-10">Nuestro Gimnasio ✨</h2> */}

        <div className="overflow-hidden rounded-m shadow-lg">
          <AnimatePresence mode="wait">m run 
            <motion.img
              key={index}
              src={images[index].src}
              alt={images[index].alt}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full h-[621px] object-cover"
            />
          </AnimatePresence>

          {/* Flecha Izquierda */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white cursor-pointer text-gray-800 p-3 rounded-full shadow-md transition"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Flecha Derecha */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white cursor-pointer text-gray-800 p-3 rounded-full shadow-md transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicadores (puntitos abajo) */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === index ? "bg-blue-500 scale-125" : "bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}