#!/bin/bash

# Rutas relativas a la raíz del proyecto (donde está la carpeta src/)
archivos=(
  "src/app/(lang)/[lang]/servicios/digital-transformation-systems/page.tsx"
  "src/app/(lang)/[lang]/servicios/enterprise-architecture-design/page.tsx"
  "src/app/(lang)/[lang]/servicios/operational-efficiency-systems/page.tsx"
  "src/app/(lang)/[lang]/servicios/solution-architecture-planning/page.tsx"
  "src/app/(lang)/[lang]/servicios/system-design-engineering/page.tsx"
  "src/app/(lang)/[lang]/servicios/workflow-reengineering/page.tsx"
)

# Contenido plantilla (usamos marcador __FOLDER_NAME__)
read -r -d '' TEMPLATE << 'EOF'
import type { Metadata } from 'next'
import { ServicePageContent } from './ServicePageContent'

type Props = { params: Promise<{ lang: string }> }
type Lang = 'es' | 'en' | 'fr'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  return {
    title: 'Datheón · Servicio',
    alternates: {
      canonical: `https://datheon.io/${lang}/servicios/__FOLDER_NAME__`,
      languages: {
        es: 'https://datheon.io/es/servicios/__FOLDER_NAME__',
        en: 'https://datheon.io/en/servicios/__FOLDER_NAME__',
        fr: 'https://datheon.io/fr/servicios/__FOLDER_NAME__',
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  return <ServicePageContent lang={l}/>
}
EOF

# Recorrer cada ruta y sobrescribir page.tsx
for ruta in "${archivos[@]}"; do
  # Verificar si el directorio padre existe
  if [ ! -d "$(dirname "$ruta")" ]; then
    echo "ERROR: No existe el directorio $(dirname "$ruta") - omitiendo"
    continue
  fi

  # Extraer el nombre de la carpeta (último segmento antes de page.tsx)
  folder_name=$(basename "$(dirname "$ruta")")

  # Escribir el contenido reemplazando el marcador
  echo "$TEMPLATE" | sed "s/__FOLDER_NAME__/$folder_name/g" > "$ruta"

  echo "Sobrescrito: $ruta"
done

echo "¡Proceso completado!"