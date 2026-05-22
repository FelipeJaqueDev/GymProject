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

// Iconos
//import StarsIcon from '@mui/icons-material/Stars';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'; // Icono de "destello" para lujo
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import { CoreFitTheme } from '@/themes/CoreFitTheme';

const benefitsList = [
    "Todo lo incluido en Plan CoreFit",
    "Entrenador personal 2 veces/sem",
    "Acceso ilimitado a zona de Spa/Sauna",
    "Suscripción a nutrición premium",
    "Toallas y bebidas isotónicas gratis",
    "Estacionamiento exclusivo reservado",
];

const PremiumPlan = () => {
    const { colors } = CoreFitTheme;
    // Usamos el color warning (amarillo) como base para el Dorado
    const goldColor = colors.warning; 

    return (
        <Card 
            sx={{ 
                maxWidth: 360, // Igual de ancho que el básico
                width: '100%',
                borderRadius: 4, 
                // Fondo oscuro pero con un tinte muy sutil dorado/negro
                background: `linear-gradient(145deg, ${colors.surface} 0%, #1a1a00 100%)`,
                border: `1px solid ${goldColor}40`, // Borde dorado muy sutil (transparencia 40)
                position: 'relative',
                transition: '0.3s',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    // El brillo al hover es dorado
                    boxShadow: `0 10px 30px -10px ${goldColor}30`, 
                    borderColor: goldColor
                }
            }}
        >
            <CardContent sx={{ textAlign: "center", pt: 4 }}>
                
                {/* Encabezado con Icono de Premium */}
                <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
                    <Typography variant="h6" component="span" sx={{ fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: goldColor }}>
                        Plan Premium
                    </Typography>
                    <WorkspacePremiumIcon sx={{ color: goldColor, fontSize: 24 }} />
                </Box>

                {/* Precio */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 1 }}>
                    <Typography component="span" variant="h5" sx={{ color: colors.text, mr: 0.5 }}>$</Typography>
                    <Typography component="span" variant="h3" sx={{ fontWeight: 'bold', color: 'white' }}>
                        29.990
                    </Typography>
                </Box>
                <Typography sx={{ color: colors.textMuted, mb: 3, fontSize: '0.875rem' }}>
                    Facturado mensualmente
                </Typography>

                <Typography variant="body2" sx={{ color: colors.textMuted, mb: 2, fontStyle: 'italic' }}>
                    Para deportistas que buscan el máximo rendimiento y comodidad.
                </Typography>
            </CardContent>

            <Divider variant="middle" sx={{ borderColor: `${goldColor}30` }} />

            <CardContent>
                <List dense sx={{ py: 1 }}>
                    {benefitsList.map((benefit, index) => (
                        <ListItem key={index} disableGutters sx={{ py: 0.75 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                {/* Usamos destellos en lugar de checks para dar sensación de "Magia/Lujo" */}
                                <AutoAwesomeIcon 
                                    sx={{ color: goldColor, fontSize: 18 }} 
                                />
                            </ListItemIcon>
                            <ListItemText 
                                primary={benefit} 
                                primaryTypographyProps={{ 
                                    variant: 'body2', 
                                    fontWeight: index === 0 ? 700 : 400, // El primer beneficio en negrita
                                    color: index === 0 ? goldColor : colors.text // El primer beneficio en dorado
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>

            <CardActions sx={{ p: 3, pt: 1 }}>
                <Button 
                    variant="outlined" 
                    size="large" 
                    fullWidth
                    sx={{ 
                        borderRadius: 3,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        borderWidth: 2,
                        borderColor: goldColor,
                        color: goldColor,
                        '&:hover': {
                            borderWidth: 2,
                            borderColor: goldColor,
                            backgroundColor: `${goldColor}15`, // Fondo dorado transparente suave
                            boxShadow: `0 0 15px ${goldColor}40`
                        }
                    }}
                >
                    ¡SUSCRIBIRME!
                </Button>
            </CardActions>
        </Card>
    )
}

export default PremiumPlan