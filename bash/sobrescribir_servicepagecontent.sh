#!/bin/bash

# Rutas de los archivos ServicePageContent.tsx (relativas a la raíz del proyecto)
archivos=(
  "src/app/(lang)/[lang]/servicios/digital-transformation-systems/ServicePageContent.tsx"
  "src/app/(lang)/[lang]/servicios/enterprise-architecture-design/ServicePageContent.tsx"
  "src/app/(lang)/[lang]/servicios/operational-efficiency-systems/ServicePageContent.tsx"
  "src/app/(lang)/[lang]/servicios/solution-architecture-planning/ServicePageContent.tsx"
  "src/app/(lang)/[lang]/servicios/system-design-engineering/ServicePageContent.tsx"
  "src/app/(lang)/[lang]/servicios/workflow-reengineering/ServicePageContent.tsx"
)

# Plantilla del contenido (corregida: añadí coma y llave de cierre)
read -r -d '' TEMPLATE << 'EOF'
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: {} as any,
  en: {} as any,
  fr: {} as any,
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: '__FOLDER_NAME__',
    icon: <span style={{ fontSize: '12px' }}>☁️</span>,
  }
  return <ServicePageTemplate t={t} />
}
EOF

# Recorrer cada ruta y sobrescribir ServicePageContent.tsx
for ruta in "${archivos[@]}"; do
  # Verificar si el directorio padre existe
  if [ ! -d "$(dirname "$ruta")" ]; then
    echo "ERROR: No existe el directorio $(dirname "$ruta") - omitiendo"
    continue
  fi

  # Extraer el nombre de la carpeta (slug)
  folder_name=$(basename "$(dirname "$ruta")")

  # Escribir el contenido reemplazando el marcador __FOLDER_NAME__
  echo "$TEMPLATE" | sed "s/__FOLDER_NAME__/$folder_name/g" > "$ruta"

  echo "Sobrescrito: $ruta"
done

echo "¡Proceso completado!"