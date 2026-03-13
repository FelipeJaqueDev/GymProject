// import React from "react";
// import gsap from "gsap";
import { CoreFitTheme } from "@/themes/CoreFitTheme";

const Location = () => {

  const { colors } = CoreFitTheme;

  return (
    <section className="w-full bg-black text-white py-16 px-8 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Texto descriptivo */}
      <div className="md:w-1/2 flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-red-500" style={{ color:colors.primary }}>Ubicación</h2>
        <p className="text-gray-300 leading-relaxed">
          Ven a visitarnos en nuestro gimnasio CoreFit, ubicado a pasos del metro Manquehue (L1).
          Contamos con amplios espacios, estacionamiento y fácil acceso por avenida apoquindo.
        </p>
        <p className="text-gray-400 italic">
          📍 Dirección: Golda Meir 216, 7550081 Las Condes, Región Metropolitana
        </p>
      </div>

      {/* Mapa */}
      <div className="md:w-1/2 w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2800.416776128494!2d-70.58943437573285!3d-33.416059631103074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2scl!4v1763047160251!5m2!1sen!2scl"
        width="700"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy=""
        ></iframe>
      </div>
    </section>
  );
};

export default Location;