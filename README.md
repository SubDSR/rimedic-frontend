# Rimedic — Sitio Web

Landing page de **Rimedic**, centro de medicina estética en Miraflores, Lima,
dirigido por el Dr. Brayan Rivera Serna. Proyecto migrado desde un export de
Figma Make a una base **Vite + React + TypeScript** limpia, modular y lista
para producción.

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Levanta el servidor de desarrollo en `http://localhost:5173`.

## Build de producción

```bash
npm run build
npm run preview
```

## Tests

```bash
npm run test        # modo watch
npm run test:run    # una sola corrida (CI)
```

## Linting y formato

```bash
npm run lint
npm run lint:fix
npm run format
```

## Estructura del proyecto

```
rimedic/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── .eslintrc.json
├── .prettierrc
└── src/
    ├── main.tsx
    ├── App.tsx                      # Composición de secciones y páginas
    ├── vite-env.d.ts
    ├── test-setup.ts
    ├── test/
    │   └── App.test.tsx
    ├── components/
    │   ├── layout/                  # Header, Footer, WhatsAppFloat, FinancingBar
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── WhatsAppFloat.tsx
    │   │   └── FinancingBar.tsx     # Franja de financiamiento (deshabilitada, ver App.tsx)
    │   ├── sections/                # Secciones de la página de inicio
    │   │   ├── HeroSection.tsx
    │   │   ├── QuickContactSection.tsx
    │   │   ├── DoctorSection.tsx
    │   │   ├── TestimonialsSection.tsx
    │   │   ├── BlogSection.tsx
    │   │   └── SedesSection.tsx
    │   ├── pages/                   # Vistas de sub-rutas (SPA por estado)
    │   │   ├── ServicesView.tsx
    │   │   ├── TermsPage.tsx
    │   │   └── PrivacyPage.tsx
    │   ├── ui/                      # Piezas reutilizables
    │   │   ├── RevealDiv.tsx
    │   │   ├── GoldLabel.tsx
    │   │   ├── BeforeAfterImage.tsx
    │   │   └── LegalAccordion.tsx
    │   └── figma/
    │       └── ImageWithFallback.tsx
    ├── hooks/
    │   └── useInView.ts             # Hook para animaciones reveal-on-scroll
    ├── data/
    │   ├── constants.ts             # Datos estáticos (servicios, equipo, sedes, etc.)
    │   └── whatsapp.ts              # Helper de enlaces a WhatsApp
    ├── types/
    │   └── index.ts                 # Tipos e interfaces compartidos
    ├── assets/
    │   └── images/
    │       ├── logo.png
    │       ├── hero-promo-placeholder.jpg   # Banner del Hero (reemplazar con arte final)
    │       ├── financing-bar-placeholder.png
    │       └── promos/                      # Banners del carrusel de promociones
    │           ├── corporal-360.jpg
    │           ├── cuidado-post-tratamiento.jpg
    │           └── limpieza-facial.jpg
    └── styles/
        ├── index.css
        ├── tailwind.css
        └── theme.css
```

## Cómo actualizar promociones

El Hero y el carrusel de promociones (`PromoHighlightsSection`) no arman el
banner con texto/CSS: cada tarjeta es una **imagen ya diseñada** (arte
completo con título, precio, badge, etc. incluidos en el archivo) que solo
se envuelve en un `<a>` hacia WhatsApp. Esto evita descuadres cuando el
diseñador entrega piezas nuevas y mantiene el código libre de textos o
precios inventados.

Para lanzar o cambiar una promo:

1. Reemplaza el archivo de imagen correspondiente en
   `src/assets/images/promos/` (o agrega uno nuevo con un nombre descriptivo).
2. Si es una promo nueva, agrégala al arreglo `PROMOTIONS` en
   `src/data/constants.ts` con tres campos:
   - `img`: el `import` de la imagen.
   - `alt`: texto alternativo descriptivo (accesibilidad/SEO, no se muestra).
   - `msg`: el mensaje de WhatsApp que se prellena al hacer clic.
3. Para el banner principal (Hero), reemplaza
   `src/assets/images/hero-promo-placeholder.jpg` con el arte final — el
   componente `HeroSection` no requiere cambios.

No hace falta tocar componentes ni estilos: el carrusel (flechas, dots,
scroll-snap) funciona igual con 3, 4 o 5 promociones porque el ancho de cada
tarjeta es proporcional al contenedor, no fijo por cantidad de items.

La franja de financiamiento (`FinancingBar`) sigue el mismo patrón pero está
comentada en `App.tsx` hasta que el cliente confirme las entidades bancarias
y condiciones reales — no se debe inventar "12 cuotas sin interés" ni logos
de bancos sin convenio confirmado.

## Resumen de la migración

Este proyecto fue migrado desde un export de Figma Make aplicando la skill
`figma-to-clean-react`. Cambios principales:

**Eliminado:**
- 48 componentes `shadcn/ui` sin usar (el diseño original no los importaba)
- ~35 dependencias no utilizadas (`@mui/*`, `@emotion/*`, todos los `@radix-ui/*`,
  `recharts`, `react-hook-form`, `react-router`, `react-dnd`, `motion`, etc.)
- Archivos propios de Figma Make: `pnpm-workspace.yaml`, `ATTRIBUTIONS.md`,
  `default_shadcn_theme.css`, `guidelines/Guidelines.md`, `postcss.config.mjs`
- `figmaAssetResolver()` de `vite.config.ts`
- CSS vacíos (`fonts.css`, `globals.css`)
- Imágenes sin usar (`image-1.png`, `image-2.png`)

**Reestructurado:**
- El `App.tsx` monolítico (1283 líneas) se dividió en 17 componentes
  granulares organizados por responsabilidad (`layout`, `sections`, `pages`, `ui`)
- Los datos estáticos (tratamientos, equipo, testimonios, sedes, blog) se
  extrajeron a `data/constants.ts`
- El hook `useInView` se extrajo a `hooks/`
- Los tipos se centralizaron en `types/index.ts`
- Se creó un componente `LegalAccordion` reutilizable para unificar la lógica
  duplicada entre `TermsPage` y `PrivacyPage`

**Agregado:**
- `tsconfig.json` / `tsconfig.node.json` (no existían en el export original)
- ESLint + Prettier
- Vitest + Testing Library, con un test de humo para `App`
- `react` y `react-dom` movidos de `peerDependencies` a `dependencies`

**Preservado exactamente:**
- Todas las clases de Tailwind y estilos inline
- La estructura visual y el comportamiento de cada sección
- La paleta de marca (azul navy `#0A1628`, azul `#2E5BA8`, dorado `#C9A96E`, etc.)
