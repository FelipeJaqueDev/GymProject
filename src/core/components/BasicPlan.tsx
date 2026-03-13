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
import VerifiedIcon from '@mui/icons-material/Verified';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CoreFitTheme } from '@/themes/CoreFitTheme';

const benefitsList = [
    "Acceso a todas las sedes",
    "Máquinas de última generación",
    "Duchas y casilleros incluidos",
    "App de entrenamiento",
    "Sin costo de inscripción",
    "Acceso de 6:00 AM a 11:00 PM",
];

const BasicPlan = () => {
    // Extraemos colores para facilitar el uso en sx
    const { colors } = CoreFitTheme;

    return (
        <Card
            elevation={0} // Quitamos la elevación por defecto para usar bordes
            sx={{
                maxWidth: 360,
                width: '100%',
                borderRadius: 4,
                // 1. FONDO OSCURO
                backgroundColor: colors.surface,
                transition: 'all 0.3s ease-in-out',
                border: '1px solid',
                // Borde sutil inicial que combina con el fondo
                borderColor: 'rgba(255,255,255,0.05)',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    // Sombra con un tinte rojo sutil
                    boxShadow: `0 12px 24px -10px ${colors.primary}40`, // el 40 al final es transparencia hex
                    // 5. HOVER CON COLOR PRIMARIO
                    borderColor: colors.primary
                }
            }}
        >
            <CardContent sx={{ textAlign: "center", pb: 0, pt: 4 }}>

                <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={2}>
                    {/* 2. TIPOGRAFÍA MUTED PARA EL SUBTÍTULO */}
                    <Typography variant="h6" component="span" sx={{ fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: colors.textMuted, fontSize: '1rem' }}>
                        Plan Básico
                    </Typography>
                    {/* Icono de verificado sutil */}
                    <VerifiedIcon sx={{ color: colors.textMuted, fontSize: 20 }} />
                </Box>

                {/* Precio */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 1 }}>
                    <Typography component="span" variant="h5" sx={{ color: colors.text, mr: 0.5 }}>
                        $
                    </Typography>
                    {/* 2. TIPOGRAFÍA PRINCIPAL BLANCA PARA EL PRECIO */}
                    <Typography component="span" variant="h2" sx={{ fontWeight: 800, color: colors.text, letterSpacing: -1 }}>
                        19.990
                    </Typography>
                </Box>
                <Typography component="p" variant="body1" sx={{ color: colors.textMuted, mb: 3, fontWeight: 500 }}>
                    Facturado mensualmente
                </Typography>

                <Typography variant="body2" sx={{ color: colors.textMuted, mb: 3, px: 2 }}>
                    Comienza tu transformación hoy con acceso total a nuestra red nacional.
                </Typography>
            </CardContent>

            {/* Divider más sutil para modo oscuro */}
            <Divider variant="middle" sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

            <CardContent>
                <List dense sx={{ py: 1 }}>
                    {benefitsList.map((benefit, index) => (
                        <ListItem key={index} disableGutters sx={{ py: 0.75 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                {/* 3. ICONOS EN COLOR SUCCESS (VERDE) */}
                                <CheckCircleIcon
                                    sx={{ color: colors.success, fontSize: 22 }}
                                />
                            </ListItemIcon>
                            {/* Texto de beneficios en blanco */}
                            <ListItemText
                                primary={benefit}
                                primaryTypographyProps={{ variant: 'body2', fontWeight: 400, color: colors.text }}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>

            <CardActions sx={{ p: 3, pt: 1 }}>
                {/* 4. BOTÓN DE ACCIÓN PRIMARIO (ROJO) */}
                <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                        borderRadius: '9999px', // Botón completamente redondeado (estilo moderno)
                        fontWeight: 700,
                        fontSize: '1rem',
                        textTransform: 'none',
                        py: 1.5,
                        backgroundColor: colors.primary,
                        color: colors.text,
                        boxShadow: `0 4px 14px 0 ${colors.primary}66`, // Sombra roja brillante
                        '&:hover': {
                            backgroundColor: colors.primary, // Mantener el color base
                            filter: 'brightness(1.1)', // Hacerlo un poco más brillante al pasar el mouse
                            boxShadow: `0 6px 20px ${colors.primary}88`,
                        }
                    }}
                >
                    ¡CONTRATAR!
                </Button>
            </CardActions>
        </Card>
    )
}

export default BasicPlan;