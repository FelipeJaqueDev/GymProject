// import { useNavigate } from 'react-router-dom';
import loginBg from "../../assets/Images/Logo/login_background.jpeg";
import GenericNavbar from "../../core/components/Navbar/GenericNavbar";
import { Button } from "@/components/ui/button";
//import { happybodiesGymTheme } from '@/themes/happyBodiesGymTheme';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function Login() {

  // const items = [{id: 2, text: 'Nosotros'}, {id: 3, text: 'Planes'}, {id: 4, text: 'Contacto'}]
  // const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <GenericNavbar />
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Ingresa a tu cuenta</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link" className="cursor-pointer">Registrarse</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer">
          Iniciar Sesión
        </Button>
        <Button variant="outline" className="w-full cursor-pointer">
          Entra con Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  );
}

export default Login;
