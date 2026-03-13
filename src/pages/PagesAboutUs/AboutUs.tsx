import React, { useEffect, useRef, useState } from 'react'; // 1. Importar useState
import GenericNavbar from '@/core/components/Navbar/GenericNavbar'
import { Typography } from '@mui/material'
import { CoreFitTheme } from '@/themes/CoreFitTheme'
import LeftPhoto from '../../assets/Images/Bg/left_photo3.jpg'
import RightPhoto from '../../assets/Images/Bg/right_photo.jpg'
import Footer from '@/components/Footer'
import { EncryptedText } from "@/components/ui/encrypted-text";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Importación de imagenes del Team
import CEO_Photo from '../../assets/Images/Bg/CEO.jpg'
import HOST_Photo from '../../assets/Images/Bg/hostess.jpg'
import spinning_tutor from '../../assets/Images/Bg/spinning.jpg'
import personal_trainer from '../../assets/Images/Bg/woman_personal_trainer.jpg'
import boxing_tutor from '../../assets/Images/Bg/boxing.jpg'

// Le decimos a GSAP: "Oye, habilita la herramienta de Scroll"
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {

    const { colors } = CoreFitTheme;

    const textRefAboutUs = useRef<HTMLHeadingElement>(null);
    const imageRefAboutUs = useRef<HTMLImageElement>(null);
    const imageRefMision = useRef<HTMLImageElement>(null);
    const textRefMision = useRef<HTMLHeadingElement>(null);
    const textRefTeamMembers = useRef<HTMLHeadingElement>(null);
    const refInteractiveGallery = useRef<HTMLObjectElement>(null);

    // 2. Estado para controlar qué miembro está seleccionado (inicia con el índice 0)
    const [activeMemberIndex, setActiveMemberIndex] = useState(0);

    const texts = {
        about_us_title: "Nosotros",
        about_us_description: `CoreFit es más que un gimnasio; somos una comunidad vibrante y dedicada al movimiento consciente y la salud integral.\n\nEn CoreFit, entendemos que la constancia necesita apoyo. Por eso, no solo te ofrecemos las herramientas de entrenamiento y el contenido de alta calidad para que te sientas fuerte y motivado, sino también una red de apoyo comprometida a celebrar cada paso de tu progreso.\n\nNuestro equipo está aquí para inspirarte, guiarte y asegurar que te sientas conectado en cada etapa de tu transformación. Únete a CoreFit y descubre el poder de una comunidad que se mueve contigo.`,
        our_mission_title: "Nuestra Misión",
        our_mission_description: "La misión de CoreFit es potenciar la salud y el bienestar integral de nuestra comunidad, ofreciendo un ambiente motivador y programas de entrenamiento de alta calidad enfocados en la fuerza, la estabilidad y la resistencia física. Buscamos inspirar a cada miembro a alcanzar su máximo potencial, transformando hábitos y logrando resultados duraderos."
    }

    // 3. Crear una estructura de datos completa (Foto + Info)
    const teamMembers = [
        {
            id: 1,
            name: "Leonardo Gonzalez", // Cambiar por nombre real
            role: "CEO CoreFit",
            description: "Líder visionario con más de 10 años de experiencia transformando vidas a través del fitness.",
            image: CEO_Photo
        },
        {
            id: 2,
            name: "Marcela Uribe",
            role: "Anfitriona",
            description: "Encargada de la mejor experiencia al cliente, asegurando que cada visita sea memorable.",
            image: HOST_Photo
        },
        {
            id: 3,
            name: "Felix Lopez",
            role: "Coach de Spinning",
            description: "Especialista en cardio de alta intensidad, te hará sudar y disfrutar cada pedaleada.",
            image: spinning_tutor
        },
        {
            id: 4,
            name: "Catalina Quiroz",
            role: "Personal Trainer",
            description: "Enfocada en la técnica perfecta y en ayudarte a superar tus propios límites físicos.",
            image: personal_trainer
        },
        {
            id: 5,
            name: "Samuel Mandela",
            role: "Coach de Boxeo",
            description: "Te enseñará disciplina, defensa y agilidad con entrenamientos dinámicos.",
            image: boxing_tutor
        }
    ];

    // Helper para obtener el miembro actual
    const currentMember = teamMembers[activeMemberIndex];

    useEffect(() => {

        // Usamos gsap.context para "agrupar" las animaciones.
        // Esto facilita la limpieza automática cuando sales de la página.
        const ctx = gsap.context(() => {

            if (textRefAboutUs.current && textRefMision.current && textRefTeamMembers.current) {

                gsap.fromTo(
                    textRefAboutUs.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2, ease: "expo.out" }
                )

                gsap.fromTo(
                    imageRefAboutUs.current,
                    { x: -100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 2, ease: "elastic" }
                )

                gsap.fromTo(
                    textRefMision.current,
                    { y: 100, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 2, ease: "expo.out",
                        scrollTrigger: {
                            trigger: textRefMision.current,
                            start: "top 95%",
                            // markers: true,
                            toggleActions: "play none none none"
                        }
                    }
                )

                gsap.fromTo(
                    imageRefMision.current,
                    { x: 100, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 2, ease: "elastic",
                        scrollTrigger: {
                            trigger: imageRefMision.current,
                            start: "top 50%",
                            // markers: true,
                            toggleActions: "play none none none"
                        }
                    }
                )

                gsap.fromTo(
                    textRefTeamMembers.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2, ease: "expo.out",
                        scrollTrigger: {
                            trigger: textRefTeamMembers.current,
                            start: "top 92%",
                            toggleActions: "play none none none"
                        }
                     }
                )

                gsap.fromTo(
                    refInteractiveGallery.current,
                    { y: 100, opacity: 0 },
                    { y: 0, opacity: 1, duration: 2, ease: "expo.out",
                        scrollTrigger: {
                            trigger: refInteractiveGallery.current,
                            start: "top 89%",
                            toggleActions: "play none none none"
                        }
                     }
                )
            }

        }); // Fin del context

        return () => ctx.revert(); // IMPORTANTE: Limpia todo si el componente se desmonta

    }, []);

    return (
        <>
            <section className="relative flex flex-col min-h-screen overflow-hidden" style={{ background: colors.background }}>
                <div className="z-50 relative">
                    <GenericNavbar />
                </div>

                {/* SECCIÓN 1: NOSOTROS */}
                <main className="pt-26 px-5">
                    <div className="grid grid-cols-5 grid-rows-1 gap-4 mt-2">
                        <div className="col-span-3 flex justify-center items-center px-20">
                            <img ref={imageRefAboutUs} src={LeftPhoto} alt="Nosotros" className="w-165 h-160 rounded-full object-cover" />
                        </div>
                        <div className="col-span-2 col-start-4 text-white pt-25">
                            <Typography variant="h2" className='text-white text-center' sx={{ fontWeight: 'bold' }}>
                                <EncryptedText
                                    text={texts.about_us_title}
                                    encryptedClassName="text-neutral-500"
                                    revealedClassName="dark:text-white text-white"
                                    revealDelayMs={60}
                                />
                            </Typography>
                            <p ref={textRefAboutUs} style={{ whiteSpace: 'pre-wrap', marginTop: 25, fontSize: 16 }}>
                                {texts.about_us_description}
                            </p>
                        </div>
                    </div>
                </main>

                {/* SECCIÓN 2: MISIÓN */}
                <main className="pt-26 px-5">
                    <div className="grid grid-cols-5 grid-rows-1 gap-4">
                        <div className="col-span-2 text-white text-center pt-25">
                            <Typography variant="h2" className='text-white text-center' sx={{ fontWeight: 'bold' }}>
                                <EncryptedText
                                    text={texts.our_mission_title}
                                    encryptedClassName="text-neutral-500"
                                    revealedClassName="dark:text-white text-white"
                                    revealDelayMs={60}
                                />
                            </Typography>
                            <p ref={textRefMision} style={{ whiteSpace: 'pre-wrap', marginTop: 25, fontSize: 16 }}>
                                {texts.our_mission_description}
                            </p>
                        </div>
                        <div className="col-span-3 col-start-4 flex justify-center items-center ">
                            <img ref={imageRefMision} src={RightPhoto} alt="Nuestra Misión" className="w-full h-150 rounded-full object-cover" />
                        </div>
                    </div>
                </main>

                {/* SECCIÓN 3: TEAM (Aquí está la modificación principal) */}
                <main className="pt-10 px-5 mb-15">
                    <div className="text-white text-center pt-25">
                        <Typography variant="h2" className='text-white text-center' sx={{ fontWeight: 'bold' }}>
                            <EncryptedText
                                text="CoreFit Team"
                                encryptedClassName="text-neutral-500"
                                revealedClassName="dark:text-white text-white"
                                revealDelayMs={60}
                            />
                        </Typography>
                        <p ref={textRefTeamMembers} style={{ whiteSpace: 'pre-wrap', marginTop: 14, fontSize: 16 }} className='px-80'>
                            En CoreFit, nuestro éxito se basa en las personas que nos guían...
                        </p>
                    </div>

                    {/* INTERFAZ DEL EQUIPO */}
                    <div ref={refInteractiveGallery} className="grid grid-cols-5 gap-8 mt-14 items-center">

                        {/* COLUMNA IZQUIERDA: FOTO GRANDE */}
                        <div className="col-span-2 flex justify-center items-center relative">
                            {/* Círculo decorativo (borde punteado similar a la imagen) */}
                            <div className="absolute w-[420px] h-[420px] rounded-full border-2 border-dashed border-gray-600 animate-spin-slow" style={{ animationDuration: '20s' }}></div>

                            {/* Imagen Principal dinámica */}
                            <img
                                src={currentMember.image}
                                alt={currentMember.name}
                                className="w-[400px] h-[400px] rounded-full object-cover z-10 transition-all duration-500 ease-in-out"
                            />
                        </div>

                        {/* COLUMNA DERECHA: TEXTO + MINIATURAS */}
                        <div className="col-span-3 text-white pl-10 flex flex-col justify-center">

                            {/* Información del Miembro */}
                            <div className="mb-10 animate-fade-in-up key={currentMember.id}"> {/* Key reinicia la animación al cambiar */}
                                <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                                    {currentMember.name}
                                </Typography>
                                <Typography variant="h6" className="text-gray-400 mb-4" sx={{ textTransform: 'uppercase', letterSpacing: 2 }}>
                                    {currentMember.role}
                                </Typography>
                                <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                                    {currentMember.description}
                                </p>
                            </div>

                            {/* Lista Horizontal de Miniaturas */}
                            <div className="flex flex-wrap gap-4 mt-4">
                                {teamMembers.map((member, index) => (
                                    <div
                                        key={member.id}
                                        onClick={() => setActiveMemberIndex(index)}
                                        className={`
                                            cursor-pointer rounded-full overflow-hidden border-2 transition-all duration-300
                                            ${activeMemberIndex === index
                                                ? 'w-20 h-20 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-110' // Estilo activo
                                                : 'w-16 h-16 border-transparent opacity-60 hover:opacity-100 hover:scale-105' // Estilo inactivo
                                            }
                                        `}
                                    >
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </main>
            </section>
            <Footer />
        </>
    )
}

export default AboutUs