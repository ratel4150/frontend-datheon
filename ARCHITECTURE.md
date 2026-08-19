# Arquitectura

Monolito con **npm workspaces** organizado en capas **Feature-Sliced Design (FSD)**.
Sigue siendo una única app Next.js desplegable — los workspaces existen para
imponer límites de dependencia reales entre capas, no para partir el sitio en
varios servicios.

## Capas (de arriba hacia abajo)

```
src/app/            → capa "app" de FSD (rutas Next.js App Router, layouts,
                       providers, middleware). Compone widgets/features, no
                       contiene lógica de negocio reutilizable.

packages/widgets/    → @datheon/widgets   bloques de UI compuestos y reusables
packages/features/   → @datheon/features  interacciones de usuario con lógica propia
packages/entities/   → @datheon/entities  modelos/tipos de dominio (curso, certificado…)
packages/shared/     → @datheon/shared    infraestructura sin conocimiento de negocio
                       (tema MUI, cliente Drizzle/Neon, utilidades de tracking)
```

Regla de dependencia (estricta, de una sola dirección):

```
app → widgets → features → entities → shared
```

Cada capa solo puede importar de sí misma (dentro del mismo slice) o de capas
estrictamente inferiores. Nunca al revés, y nunca cruzando lateralmente a otro
slice de su misma capa (esa composición solo ocurre en `src/app`).

Esto se aplica en dos niveles:

1. **Estructural** — cada paquete solo expone su API pública vía el campo
   `exports` de su `package.json` (un subpath por slice, p. ej.
   `@datheon/widgets/footer`). No es posible importar un archivo interno
   (`.../ui/Footer.tsx`) saltándose el `index.ts` del slice.
2. **Lint** — `eslint.config.mjs` usa `eslint-plugin-boundaries` para prohibir
   en tiempo de lint cualquier import que viole la jerarquía anterior.

## Slices existentes

| Capa     | Slice                    | Qué es |
|----------|---------------------------|--------|
| shared   | `ui/theme`                | Tema MUI + fuentes |
| shared   | `lib/tracking`            | Detección de dispositivo (UA parser) |
| shared   | `api/db`                  | Cliente Drizzle/Neon + schema de tablas |
| entities | `course`, `certificate`, `user-progress` | Tipos de dominio derivados del schema |
| features | `language-switcher`, `chat-widget`, `achievements-counter`, `cookie-consent`, `analytics-tracking` | Interacciones con estado propio |
| widgets  | `header`, `footer`, `hero`, `testimonials`, `work-process`, `why-choose-us`, `our-services`, `our-team`, `our-specialized-sectors`, `universidad-dashboard`, `curso-client`, `subseccion-player`, `certificado-view` | Bloques de UI compuestos |

Las páginas de servicios (`src/app/(lang)/[lang]/servicios/**/ServicePageContent.tsx`)
y de sectores permanecen en la capa `app`: son contenido específico de una
sola ruta, sin reuso real, así que extraerlas a `widgets` violaría FSD
("no abstraigas lo que no se reutiliza").

## Añadir un nuevo slice

1. Crear `packages/<capa>/src/<slice>/{ui,model}` según aplique.
2. Exponer su API pública en `packages/<capa>/src/<slice>/index.ts`.
3. Registrar el subpath en `packages/<capa>/package.json` → `exports`.
4. Si el slice es nuevo dentro de `widgets`/`features`/`entities`,
   `eslint-plugin-boundaries` lo reconoce automáticamente por su ruta
   (`packages/<capa>/src/*`), sin configuración adicional.
5. Consumir siempre vía el nombre del paquete (`@datheon/widgets/mi-slice`),
   nunca con rutas relativas que crucen de `packages/` a `src/` o viceversa.

## Comandos

```bash
npm install       # enlaza los workspaces (symlinks en node_modules/@datheon/*)
npm run dev        # next dev (transpila los paquetes vía transpilePackages)
npm run build       # build de producción — valida toda la app y los paquetes
npm run lint        # incluye la regla de fronteras FSD
```
