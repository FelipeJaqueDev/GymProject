import { CoreFitTheme } from '@/themes/CoreFitTheme';
import { Typography, Box, Card, CardContent } from '@mui/material'; // Añadí Card y CardContent
import { useEffect, useRef } from "react";
import GroupsIcon from '@mui/icons-material/Groups'; // Clientes
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Sucursales
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'; // Años/Tiempo
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const gymStatsData = [
    {
        id: 1,
        value: 500, // <<--- NECESITAS ESTE VALOR NUMÉRICO
        suffix: "+", // <<--- NECESITAS EL SUFIJO SEPARADO
        label: "Clientes Activos",
        icon: <GroupsIcon fontSize="large" />
    },
    {
        id: 2,
        value: 25,
        suffix: "+",
        label: "Sucursales en el país",
        icon: <LocationOnIcon fontSize="large" />
    },
    {
        id: 3,
        value: 30,
        suffix: "+",
        label: "Años de Trayectoria",
        icon: <AccessTimeFilledIcon fontSize="large" />
    },
];

const SocialProofCards = () => {

    const statsRef = useRef<HTMLDivElement | null>(null);
    const { colors } = CoreFitTheme;
    // CORRECCIÓN CLAVE: Definimos que contendrá un array de referencias a elementos HTML.
    const numbersRef = useRef<(HTMLElement | null)[]>([]);
    // Ahora 'el' dentro del forEach será un HTMLElement (o null)


    // 1. Mover gymStats dentro del componente o usar el array externo
    // Usaremos el array externo gymStatsData

    useEffect(() => {
        // --- Animación de APARICIÓN (Fade Up con Stagger) ---
        if (statsRef.current) {
            gsap.fromTo(
                statsRef.current.children, // <-- IMPORTANTE: Animamos los HIJOS (las Cards) no el Box padre
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2, // Para que aparezcan una por una
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 80%",
                    }
                }
            );
        }

        // --- LÓGICA DE INCREMENTO DE NÚMEROS ---
        numbersRef.current.forEach((el, index) => {
            if (!el) return;

            // Usamos gymStatsData
            const statData = gymStatsData[index];
            const counter = { val: 0 };

            gsap.to(counter, {
                val: statData.value, // Usamos 'value' numérico
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el, // Mejor disparar la animación por cada número individual
                    start: "top 85%", // Dispara un poco antes para que dé tiempo a contar
                    toggleActions: "play none none reverse",
                    // Asegúrate que el trigger se vea solo una vez si no quieres que se repita
                    once: true
                },
                onUpdate: () => {
                    // Usamos 'suffix' separado
                    el.textContent = Math.ceil(counter.val) + statData.suffix;
                }
            });
        });

        // --- IMPLEMENTACIÓN DE DRAGGABLE CORREGIDA ---
        Draggable.create(".draggable-card", {
            type: "x,y",
            zIndexBoost: true,

            // Al soltar, animamos la posición de vuelta a (0, 0)
            onDragEnd: function () {
                gsap.to(this.target, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });
            },
            // Puedes eliminar edgeResistance, bounds e inertia para simplificar, a menos que uses InertiaPlugin.
        });

        // Cleanup: Destruye los ScrollTriggers al desmontar el componente
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []); // Dependencias vacías

    return (
        <Box
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto"
        >
            {gymStatsData.map((stat, index) => ( // Usamos gymStatsData aquí también
                <div className="draggable-card cursor-grab active:cursor-grabbing">
                    <Card
                        key={stat.id}
                        sx={{
                            // ... estilos igual ...
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            textAlign: 'center',
                            transition: '0.3s',
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.06)',
                                transform: 'translateY(-5px)',
                                borderColor: colors.primary
                            }
                        }}
                    >
                        <CardContent sx={{ py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ color: colors.primary, mb: 1 }}>
                                {stat.icon}
                            </Box>

                            {/* 2. CORRECCIÓN CLAVE: ASIGNAR EL REF Y USAR EL VALOR INICIAL */}
                            <Typography
                                variant="h3"
                                sx={{ fontWeight: 900, letterSpacing: -1 }}
                                // 1. Añadimos component="span" (o "p", "h3", etc.) para decirle a MUI qué renderizar.
                                component="span"

                                // 2. Usamos la sintaxis ref correcta y el casting adecuado para TypeScript.
                                // Aunque Typography usa por defecto un <span> cuando es un valor corto.
                                ref={(el: HTMLSpanElement | null) => {
                                    // Asignamos la referencia al array
                                    numbersRef.current[index] = el;
                                }}
                            >
                                0{stat.suffix}
                            </Typography>

                            <Typography variant="body1" sx={{ color: colors.textMuted, fontWeight: 500, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: 1 }}>
                                {stat.label}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </Box>
    )
}

export default SocialProofCards
