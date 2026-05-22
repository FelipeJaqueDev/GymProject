# CLAUDE.md

Guía de contexto para agentes (Claude Code) y desarrolladores que trabajen en este repo. Lee esto **antes** de tocar código.

---

## 1. Qué es este proyecto

**CoreFit Gym** — Landing page premium + páginas internas (login, planes, contacto, nosotros) para un gimnasio chileno (Las Condes, Santiago).

Es un **proyecto personal / portfolio** orientado a experiencia visual premium: scroll-driven storytelling, animaciones físicas, kinetic typography, magnetic interactions.

- **Owner / brand:** CoreFit Gym (felipejaque.s97@gmail.com)
- **Dirección física referenciada:** Golda Meir 216, Las Condes
- **Idioma de la UI:** Español
- **Estado:** SPA, sin backend. Los formularios y CTAs hoy navegan o disparan UI; no hay API.

---

## 2. Stack

| Capa | Librería | Notas |
|---|---|---|
| Framework | React **19** + TypeScript ~5.9 | StrictMode activo |
| Build | Vite **7** | Plugin oficial de Tailwind |
| Routing | `react-router-dom` v7 | `BrowserRouter` |
| Styling | Tailwind CSS **v4** + `tw-animate-css` + `tailwindcss-animate` | Config nuevo (`@theme inline` en `index.css`) |
| UI primitives | shadcn/ui (Radix bajo el capó) | `components.json` config style `new-york` |
| UI rica | MUI v7 (`@mui/material`) | Sobre todo botones |
| Icons | `lucide-react`, `@tabler/icons-react`, `react-icons`, `@mui/icons-material` | Conviven los 4. Preferir lucide para nuevos componentes. |
| Animación | **GSAP** 3 (ScrollTrigger + Draggable) | Stack principal para scroll/parallax/drag |
| Animación | `framer-motion` (alias `motion`) | Carousels, navbar, micro-interacciones |
| Smooth scroll | **Lenis** | Sincronizado con GSAP ticker en `motions/SmoothScroll.tsx` |
| Física | **Matter.js** | Esferas en Services + explosión en CTA |
| 3D | **three** + **@react-three/fiber** + **@react-three/drei** | Solo `HeroParticles` por ahora |
| Confetti | `canvas-confetti` | Testimonials + CTA |
| Notifs | `notistack` | Solo en Contact y Plans (vía Wrapper) |
| Otros | `rough-notation`, `gsap` Draggable, `next-themes`, `sonner` | Disponibles, uso parcial |

> **Importante:** `gsap-trial` fue removido. Si ves importaciones a `gsap-trial`, reemplázalas por `gsap` (la versión free ya incluye SplitText desde 2025).

---

## 3. Cómo correr

```bash
npm install
npm run dev      # Vite en http://localhost:5173 (auto-abre browser)
npm run build    # tsc -b && vite build
npm run lint     # eslint .
npm run preview  # servir el build
```

No hay tests configurados.

---

## 4. Entry point y boot

**Atípico:** `index.html` carga `/src/routers/Routes.tsx` directamente (no hay `App.tsx`). El archivo `src/main.tsx` existe pero está **vacío** — no es el entry.

```
index.html
  └── <script src="/src/routers/Routes.tsx">
        └── ReactDOM.createRoot(...).render(
              <StrictMode>
                <BrowserRouter>
                  <ResetScroll />        ← scrolla a top en cambio de ruta
                  <Routes>...</Routes>
                </BrowserRouter>
              </StrictMode>
            )
```

`ResetScroll.tsx` (sí, el export se llama `ScrollToTop` pero el archivo se llama `ResetScroll`): hook que llama `window.scrollTo(0,0)` en cada cambio de `pathname`.

---

## 5. Estructura de carpetas

```
src/
├── routers/
│   └── Routes.tsx              ← entry real + tabla de rutas
├── pages/
│   ├── PagesLanding/Landing.tsx
│   ├── PagesLogin/Login.tsx
│   ├── PagesContact/
│   │   ├── Contact.tsx
│   │   └── ContactWrapper.tsx   ← SnackbarProvider wrapper (USADO en Routes)
│   ├── PagesPlans/
│   │   ├── Plans.tsx            ← USADO en Routes directamente
│   │   └── PlansWrapper.tsx     ← SnackbarProvider wrapper (NO USADO actualmente)
│   └── PagesAboutUs/
│       ├── AboutUs.tsx          ← USADO en Routes
│       └── AboutUsWrapper.tsx   ← VACÍO, sin uso
│
├── components/                 ← componentes de la landing (1 por sección)
│   ├── Hero.tsx
│   ├── HeroParticles.tsx       ← R3F (Canvas con field de puntos)
│   ├── Services.tsx
│   ├── CompanyPhotos.tsx
│   ├── Testimonials.tsx
│   ├── CTA.tsx
│   ├── Location.tsx
│   ├── Footer.tsx
│   ├── animated/test.tsx       ← ⚠️ Roto: importa theme inexistente
│   └── ui/                     ← shadcn/ui + magicui/eldoraui/aceternity primitives
│       ├── button.tsx, card.tsx, input.tsx, label.tsx, separator.tsx, textarea.tsx,
│       ├── alert-dialog.tsx, field.tsx, sonner.tsx,
│       ├── animated-beam.tsx        ← SVG path con gradient en movimiento
│       ├── animated-testimonials.tsx ← stack 3D de cards
│       ├── aurora-text.tsx          ← gradiente animado para palabras
│       ├── confetti.tsx
│       ├── cool-mode.tsx            ← partículas vanilla (legacy, reemplazado por Matter.js en CTA)
│       ├── encrypted-text.tsx, hyper-text.tsx, typing-animation.tsx, line-shadow-text.tsx
│       ├── magic-card.tsx, shine-border.tsx, orbiting-circles.tsx
│       ├── particles.tsx, spinning-text.tsx, highlighter.tsx
│
├── core/
│   └── components/
│       ├── Navbar/GenericNavbar.tsx
│       ├── BasicPlan.tsx        ← Plan $19.990 (3 variantes de plan card)
│       ├── CoreFitPlan.tsx      ← Plan $24.990, "MÁS POPULAR"
│       ├── PremiumPlan.tsx      ← Plan $29.990
│       ├── ShapeDivider/ShapeDivider.tsx  ← divisor SVG (15+ formas)
│       └── SocialProofCards/SocialProofCards.tsx  ← stats con GSAP count-up
│
├── motions/                    ← capa de animación global (NUEVA, post-overhaul)
│   ├── SmoothScroll.tsx        ← Lenis + GSAP ticker
│   ├── MagneticCursor.tsx      ← cursor custom (mix-blend-difference)
│   ├── MagneticButton.tsx      ← wrapper magnético reutilizable
│   └── MotionBySection.tsx     ← reveals GSAP (modos: rise|mask|blur|clip)
│
├── themes/
│   ├── CoreFitTheme.tsx        ← ✅ fuente de verdad de colores
│   └── defaultTheme.tsx        ← ⚠️ sin uso, candidato a borrar
│
├── lib/utils.ts                ← cn() — clsx + tailwind-merge (patrón shadcn)
├── assets/                     ← imágenes locales (ver §10)
├── types/model-viewer.d.ts     ← declaración para <model-viewer> (no usada hoy)
├── index.css                   ← Tailwind v4 + @theme inline + keyframes globales
├── App.css                     ← (residual; revisar antes de tocar)
├── ResetScroll.tsx             ← scroll-to-top on route change
└── main.tsx                    ← VACÍO. No editar — no es entry.
```

---

## 6. Rutas

Definidas en `src/routers/Routes.tsx`:

| Path | Componente | Wrapper | Layout |
|---|---|---|---|
| `/` | `Landing` | — | `SmoothScroll` + `MagneticCursor` + `GenericNavbar` (manual) + secciones + `Footer` (manual) |
| `/login` | `Login` | — | Navbar manual, sin Footer |
| `/contact` | `ContactWrapper` → `Contact` | `SnackbarProvider` (notistack) | Navbar + Footer manual |
| `/plans` | `Plans` (sin wrapper) | — | Navbar + Footer manual; GSAP Draggable en las cards |
| `/aboutus` | `AboutUs` | — | Navbar + Footer manual; GSAP ScrollTrigger |

**Convención de layout:** No existe componente `<Layout>` compartido. Cada página **importa y monta Navbar/Footer por su cuenta**. Si agregas una página nueva, sigue el mismo patrón.

**Patrón `*Wrapper.tsx`:** Existe únicamente para envolver con `SnackbarProvider` de notistack (toasts) en pantallas con formularios. `ContactWrapper` está usado; `PlansWrapper` no se está usando (Routes monta `Plans` raw); `AboutUsWrapper` está vacío (legacy).

---

## 7. Tema y diseño

### Fuente única de colores: `src/themes/CoreFitTheme.tsx`

```ts
colors: {
  background: '#0A0A0A',  // fondo casi negro
  surface:    '#1C1C1C',  // gris muy oscuro (cards)
  primary:    '#E53935',  // rojo CTA / energía
  secondary:  '#2979FF',  // azul confianza / accent principal
  success:    '#00E676',  // verde vitalidad
  warning:    '#FFEA00',  // amarillo intensidad
  text:       '#F5F5F5',  // off-white
  textMuted:  '#9E9E9E',
}
titles.companyName: "CoreFit Gym"
```

**Cómo se aplica:** mezcla de Tailwind utilities + inline `style={{ color: colors.text }}`. Cuando tengas que pickear un color, **importa `CoreFitTheme`**, no hardcodees hex.

### Tailwind v4

- Sin `tailwind.config.ts` significativo (existe pero es minimal). La config vive **dentro de `src/index.css`** usando `@theme inline { ... }`.
- Hay keyframes globales definidos ahí: `aurora`, `orbit`, `blink-cursor`, `shine`, `line-shadow`.
- Convención dark: `@custom-variant dark (&:is(.dark *))`.
- Variables CSS estilo shadcn (`--primary`, `--background`, etc.) duplican el esquema de colores en formato `oklch`. Aún así para colores de marca **usa `CoreFitTheme`**, no las CSS vars (más predecible).

### shadcn/ui

`components.json` define style `new-york`, aliases `@/components`, `@/ui`, `@/lib`, `@/hooks`, y registries extra: `@magicui`, `@eldoraui`, `@aceternity`. Los componentes en `src/components/ui/` mezclan los 4 orígenes.

### Iconos

Conviven 4 librerías (`lucide-react`, `@tabler/icons-react`, `react-icons`, `@mui/icons-material`). **Para componentes nuevos: usar `lucide-react`** (es el más consistente con el look actual).

---

## 8. Capa de animación

### Estructura

```
GSAP (core)               → scroll, parallax, drag, splitText kinético
  └── ScrollTrigger       → entry reveals + scrub
  └── Draggable           → Plans cards, decoración
Lenis                     → smooth scroll global (sincronizado con GSAP ticker)
framer-motion             → page-load fades, navbar, AnimatePresence en carousel
Matter.js                 → física real (Services balls, CTA explosion)
@react-three/fiber        → Hero particle field
canvas-confetti           → Testimonials entry + CTA on-click
```

### Reglas de oro

1. **Smooth scroll global**: `SmoothScroll` envuelve la Landing. Si añades una página con scroll-driven animations, **envuélvela también en `<SmoothScroll>`** para que ScrollTrigger se sincronice correctamente con Lenis.
2. **ScrollTrigger update**: ya está cableado en `SmoothScroll.tsx` con `lenis.on("scroll", ScrollTrigger.update)` y `gsap.ticker.add(raf)`. No dupliques.
3. **Cursor magnético**: `MagneticCursor` busca selectores `a, button, [data-magnetic], [role='button'], .cursor-pointer` y agranda el anillo al hover. Si quieres que un elemento custom dispare el efecto, ponle `data-magnetic`.
4. **Botón magnético**: usar `<MagneticButton strength={0.4}>...</MagneticButton>`. Strength típico: 0.3–0.5.
5. **Reveals por sección**: usar `<MotionBySection reveal="mask|blur|clip|rise" delay={0.1}>`. Es un wrapper que aplica un `gsap.fromTo` con ScrollTrigger una sola vez al entrar.
6. **`gsap.context(...)` + `ctx.revert()` en cleanup**: patrón obligatorio en `useLayoutEffect` para evitar memory leaks. Ver `Hero.tsx`, `Services.tsx`, `CTA.tsx`.
7. **`useLayoutEffect` para GSAP**, **`useEffect` está OK para framer/Matter.js**: porque GSAP necesita los refs antes del paint.

### Mapa de animaciones por sección de la Landing

| Sección | Animaciones |
|---|---|
| `Hero` | SplitText (char-by-char) + parallax bg/text + scroll indicator + R3F particles + `MagneticButton` |
| `Services` | Círculos: entry elástico stagger desde centro + hover magnético individual / Card: rise + scale / Fondo: 14 esferas Matter.js (gravedad + colisiones) / Beams animados |
| `CompanyPhotos` | Carrusel 3D rotateY + blur (framer) + Ken Burns continuo (GSAP) |
| `Testimonials` | Stack 3D (framer) + confetti al entrar + scroll-pin del título en desktop |
| `CTA` | Matter.js explosion (35 cuerpos) al entrar al viewport y en click + confetti |
| `Location` | clip-path reveal título + mask reveal mapa + stagger texto |
| `Footer` | stagger reveal con blur |
| `Navbar` | Animated underline en hover + spring scale del logo + backdrop-blur on-scroll |

---

## 9. Componentes core (`src/core/components/`)

### Plan cards (3 variantes)

- `BasicPlan` → $19.990/mes, 6 beneficios, botón rojo "¡CONTRATAR!".
- `CoreFitPlan` → $24.990/mes, badge "MÁS POPULAR", borde rojo + glow, "¡Lo Quiero!".
- `PremiumPlan` → $29.990/mes, esquema dorado/warning, "¡SUSCRIBIRME!".

Se montan en `Plans.tsx` con GSAP Draggable.

### `ShapeDivider`

Divisor SVG entre secciones. **15+ formas** disponibles (`wave1`, `wave2`, `wave3`, `curve`, `tilt`, `mountains`, `zigzag`, `steps`, `pyramids`, `valley`, `bubbles`, `zinkerTop`, `zinkerBottom`, `shapeZinkerMaskBoxTop`, `tilt25DegreeLeft`, …).

Props: `shape`, `color`, `height`, `position: "top"|"bottom"`, `flipX`, `flipY`. Lo usa `Testimonials` y `Plans` para transicionar entre fondos blanco/negro.

> ⚠️ Tiene un error de TS pre-existente (`TS7053`) — indexación con string sin index signature. No bloquea el dev server.

### `SocialProofCards`

Stats animados (500+ clientes, 25+ locaciones, 30+ años) con GSAP ScrollTrigger count-up. Usado en `Plans.tsx`.

---

## 10. Assets

- `src/assets/Images/Bg/` — ~21 fotos de fondo del gimnasio y equipo (background2.jpg es el del Hero; img2..img6 son los del carrusel).
- `src/assets/Images/Logo/` — `MyLogo.png` (logo activo), gym_logo*, login_background.jpeg.
- `src/assets/icons/dumbbell.svg`.
- `src/assets/user_default.jpg`, `react.svg`.
- `public/` — vacío. Excepción: `index.html` referencia `/logos/MyLogo.png` como favicon, así que **si falta el favicon, copiar `MyLogo.png` a `public/logos/`**.

---

## 11. Convenciones de código

- **Path alias:** `@/` → `src/`. Usar siempre `@/components/...` en imports nuevos (no rutas relativas largas).
- **`cn(...)`**: helper en `src/lib/utils.ts` — Tailwind merge + clsx. Usarlo para clases condicionales.
- **`forwardRef` para componentes con refs**: ver `Circle` en `Services.tsx`.
- **Mixto inline-style + Tailwind**: aceptable. Para colores de marca → inline `style={{ color: colors.X }}`; para layout/spacing → Tailwind.
- **Idioma**: copy en español, código y comentarios en mezcla ES/EN. No se exige uniformidad.
- **No hay tests**: si añades lógica no-trivial, considera mover a una util pura.

---

## 12. Gotchas y cosas que evitar

1. **No edites `src/main.tsx`** — está vacío y no es el entry. El entry es `src/routers/Routes.tsx`.
2. **No agregues `<Layout>` global sin avisar**: hoy cada página monta su Navbar/Footer manualmente. Cambiar esto rompe layouts.
3. **No re-instales `gsap-trial`** — fue removido a propósito; GSAP free ya incluye SplitText desde 2025.
4. **`animated/test.tsx`** importa `../themes/happyBodiesGymTheme` que no existe (error TS pre-existente). No es un componente productivo — bórralo si toca tocar esa carpeta.
5. **Errores TS pre-existentes en `src/components/ui/*` y `src/core/components/*`** (verbatimModuleSyntax + unused React imports). No corregir a menos que el usuario lo pida — son ruido conocido.
6. **`PlansWrapper.tsx` y `AboutUsWrapper.tsx` no se usan en `Routes.tsx`**. Si quieres toasts en esas pantallas, usa el wrapper (e.g. cambia `<Plans />` por `<PlansWrapper />` en Routes).
7. **`defaultTheme.tsx`** no se usa en ningún lado. Candidato a borrar.
8. **Tailwind v4**: la config vive en `index.css` (`@theme inline`), no en `tailwind.config.ts`. Si necesitas añadir tokens, edita el CSS.
9. **`bg-cover` con parallax**: el Hero hace transform del background div, no del section. Si replicas el efecto, separa el fondo en su propio div con `will-change-transform`.
10. **Matter.js + responsive**: Services y CTA reseteanlos walls en `resize`. Si copias el patrón, no te olvides del listener (ver `Services.tsx` línea ~210).

---

## 13. Workflow típico

**Agregar una sección nueva a la Landing:**
1. Crear `src/components/MiSeccion.tsx`.
2. Si necesitas reveal de entrada → envuelve en `<MotionBySection reveal="blur">` en `Landing.tsx`.
3. Si necesitas animación interna → `useLayoutEffect` + `gsap.context()` + `ctx.revert()` en cleanup.
4. Para botones CTA → `<MagneticButton>` + `data-magnetic`.
5. Colores → `import { CoreFitTheme } from "@/themes/CoreFitTheme"`.

**Agregar una página nueva:**
1. Crear `src/pages/PagesX/X.tsx`.
2. Montar Navbar y Footer **dentro** del componente (patrón existente).
3. Añadir `<Route path="/x" element={<X />} />` en `src/routers/Routes.tsx`.
4. Si tiene formulario → crear `XWrapper.tsx` con `SnackbarProvider` y referenciar el wrapper en Routes.

---

## 14. Comandos rápidos para Claude

- **¿Dónde se monta la app?** → `src/routers/Routes.tsx`
- **¿Dónde están los colores?** → `src/themes/CoreFitTheme.tsx`
- **¿Dónde están las animaciones globales?** → `src/motions/`
- **¿Cómo se agrega un effect magnético?** → `data-magnetic` o envolver en `<MagneticButton>`
- **¿Por qué hay 2 archivos `*.tsx` por página?** → Wrapper para `SnackbarProvider` (notistack). Solo Contact lo usa hoy.
- **Type check del proyecto:** `npx tsc --noEmit -p tsconfig.app.json` (hay ~15 errores pre-existentes documentados en §12).
