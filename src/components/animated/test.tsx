import { happybodiesGymTheme } from "../themes/happyBodiesGymTheme";


export default function test() {
  return (
    <section className="py-20 text-center"
      style={{ backgroundColor: happybodiesGymTheme.colors.DARK_GRAY_1, color: happybodiesGymTheme.colors.THIRD,}}>
      <h2 className="text-3xl font-bold mb-6">👉 ¿Listo para empezar tu transformación? ⚡🏆</h2>
      <p className="mb-8 text-lg">Únete hoy y vive la experiencia fitness más completa.</p>
      <a
        href="#contacto"
        className="px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        style={{ backgroundColor: happybodiesGymTheme.colors.SEVENTH, color: happybodiesGymTheme.colors.THIRD,}}>
        Únete ahora
      </a>
    </section>
  );
}