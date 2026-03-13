import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip'; // Para la etiqueta "Más Popular"

// Iconos
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Sugerencia: Icono más "Gym" para los items

import { CoreFitTheme } from '@/themes/CoreFitTheme';

const benefitsList = [
    "Acceso a todas las sedes (VIP)",
    "Invitado gratis los fines de semana",
    "Evaluación nutricional mensual",
    "Duchas, casilleros y sauna",
    "App de entrenamiento PRO",
    "Acceso total de 5:00 AM a 12:00 PM",
];

const CoreFitPlan = () => {
    const { colors } = CoreFitTheme;

    return (
        <Card
            sx={{
                maxWidth: 380, // Un poco más ancha que la básica
                width: '100%',
                borderRadius: 5,
                position: 'relative',
                overflow: 'visible', // IMPORTANTE: Permite que la etiqueta "Más Popular" sobresalga
                // Fondo: Gradiente sutil desde rojo muy oscuro a tu color surface
                background: `linear-gradient(180deg, rgba(229, 57, 53, 0.15) 0%, ${colors.surface} 100%)`,
                // Borde: Color primario sólido
                border: `2px solid ${colors.primary}`,
                // Sombra: Glow rojo permanente
                boxShadow: `0 0 25px -5px ${colors.primary}66`, 
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.03)', // Crece un poquito más que las otras
                    boxShadow: `0 0 40px -5px ${colors.primary}99`, // El brillo se intensifica
                }
            }}
        >
            {/* ETIQUETA FLOTANTE "MÁS POPULAR" */}
            <Box
                sx={{
                    position: 'absolute',
                    top: -16, // Sube la etiqueta para que quede mitad adentro mitad afuera
                    left: 0,
                    right: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 10
                }}
            >
                <Chip 
                    label="MÁS POPULAR" 
                    sx={{
                        backgroundColor: colors.primary,
                        color: 'white',
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        height: 32,
                        border: `4px solid ${colors.background}` // Crea un "borde" falso del color del fondo de la página para separarlo visualmente
                    }}
                />
            </Box>

            <CardContent sx={{ textAlign: "center", pt: 5, pb: 1 }}>
                
                <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={1}>
                    <Typography variant="h5" component="span" sx={{ fontWeight: 800, textTransform: 'uppercase', color: 'white', letterSpacing: 1 }}>
                        Plan CoreFit
                    </Typography>
                    <FlagCircleIcon sx={{ color: colors.primary, fontSize: 28 }} />
                </Box>

                <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 'bold', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 2 }}>
                    Recomendado
                </Typography>

                {/* Precio Destacado */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                    <Typography component="span" variant="h5" sx={{ color: colors.text, mr: 0.5 }}>$</Typography>
                    <Typography component="span" variant="h2" sx={{ fontWeight: 900, color: 'white' }}>
                        24.990
                    </Typography>
                </Box>
                <Typography component="p" variant="body1" sx={{ color: colors.textMuted, mb: 2 }}>
                    Facturado mensualmente
                </Typography>
            </CardContent>

            <Divider sx={{ borderColor: `${colors.primary}40`, mx: 3 }} />

            <CardContent>
                <List dense>
                    {benefitsList.map((benefit, index) => (
                        <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                {/* Usamos el color primario también en los iconos para reforzar la marca */}
                                <FitnessCenterIcon sx={{ color: colors.primary, fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText 
                                primary={benefit} 
                                primaryTypographyProps={{ 
                                    variant: 'body2', 
                                    color: 'white', // Texto más brillante que en el plan básico
                                    fontWeight: 500 
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>

            <CardActions sx={{ p: 3, pt: 1 }}>
                <Button 
                    variant="contained" 
                    size="large" 
                    fullWidth
                    sx={{ 
                        borderRadius: '9999px',
                        fontWeight: 'bold',
                        fontSize: '1.1rem', // Texto un poco más grande
                        py: 1.8,
                        backgroundColor: colors.primary,
                        color: 'white',
                        boxShadow: `0 0 20px ${colors.primary}80`, // El botón también brilla
                        '&:hover': {
                            backgroundColor: '#ff5252', // Un rojo un poco más claro al hover
                            boxShadow: `0 0 30px ${colors.primary}`,
                        }
                    }}
                >
                    ¡Lo Quiero!
                </Button>
            </CardActions>
        </Card>
    )
}

export default CoreFitPlan;