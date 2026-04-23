#!/bin/bash

# Configuración
GROQ_API_KEY="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"
if [ -z "$GROQ_API_KEY" ]; then
    echo "ERROR: Define GROQ_API_KEY (export GROQ_API_KEY=tu_clave)"
    exit 1
fi

GROQ_URL="https://api.groq.com/openai/v1/chat/completions"
MODEL="llama-3.3-70b-versatile"   # ← mejor modelo

BASE="/c/datheon/frontend-datheon"
servicios=(
    "digital-transformation-systems"
    "enterprise-architecture-design"
    "operational-efficiency-systems"
    "solution-architecture-planning"
    "system-design-engineering"
    "workflow-reengineering"
)

# Plantilla para ServicePageContent.tsx (igual que antes)
read -r -d '' TEMPLATE << 'EOF'
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: __ES_JSON__,
  en: {} as any,
  fr: {} as any,
}

export function ServicePageContent({ lang }: { lang: string }) {
  const l = (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang
  const t: PageContent = {
    ...content[l],
    lang: l,
    slug: '__SLUG__',
    icon: <span style={{ fontSize: '12px' }}>☁️</span>,
  }
  return <ServicePageTemplate t={t} />
}
EOF

# Función para generar JSON con Groq
generar_json() {
    local slug="$1"
    local nombre="$2"
    
    # Prompt corto y específico
    prompt="Genera un objeto JSON para la página de servicio '$nombre'. Debe tener EXACTAMENTE esta estructura (sin campos adicionales, sin texto fuera del JSON):
{
  \"badge\": \"string corto\",
  \"breadcrumb\": {\"home\": \"Inicio\", \"services\": \"Servicios\", \"current\": \"string\"},
  \"hero\": {\"title\": \"string\", \"titleAccent\": \"string\", \"subtitle\": \"string\", \"cta\": \"string\", \"ctaSub\": \"string\"},
  \"social\": \"string\",
  \"includes\": {\"title\": \"string\", \"items\": [{\"icon\": \"emoji\", \"title\": \"string\", \"desc\": \"string\"}]},
  \"useCases\": {\"title\": \"string\", \"items\": [{\"icon\": \"emoji\", \"profile\": \"string\", \"pain\": \"string\", \"solution\": \"string\", \"result\": \"string\"}]},
  \"results\": {\"title\": \"string\", \"items\": [{\"value\": \"string\", \"label\": \"string\", \"sub\": \"string\"}]},
  \"pricing\": {\"title\": \"string\", \"subtitle\": \"string\", \"tiers\": [{\"name\": \"string\", \"tagline\": \"string\", \"price\": \"string\", \"range\": \"string\", \"time\": \"string\", \"color\": \"#hex\", \"featured\": false, \"features\": [\"string\"], \"cta\": \"string\"}]},
  \"faq\": {\"title\": \"string\", \"items\": [{\"q\": \"string\", \"a\": \"string\"}]},
  \"form\": {\"title\": \"string\", \"subtitle\": \"string\", \"name\": \"string\", \"email\": \"string\", \"company\": \"string\", \"useCase\": \"string\", \"submit\": \"string\", \"loading\": \"string\", \"success\": \"string\"},
  \"finalCta\": {\"title\": \"string\", \"subtitle\": \"string\", \"cta\": \"string\", \"note\": \"string\"},
  \"sticky\": \"string\"
}
Devuelve SOLO el JSON, sin explicaciones, sin backticks, sin markdown. Usa valores realistas y persuasivos para '$nombre'."

    # Escapar el prompt para JSON
    prompt_escaped=$(printf '%s' "$prompt" | jq -R -s -c .)
    
    response=$(curl -s -X POST "$GROQ_URL" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $GROQ_API_KEY" \
        -d "{
            \"model\": \"$MODEL\",
            \"messages\": [{\"role\": \"user\", \"content\": $prompt_escaped}],
            \"temperature\": 0.5,
            \"response_format\": {\"type\": \"json_object\"}
        }")
    
    # Extraer contenido
    raw=$(echo "$response" | jq -r '.choices[0].message.content // ""')
    if [ -z "$raw" ] || [ "$raw" = "null" ]; then
        echo "ERROR: Respuesta vacía de Groq" >&2
        return 1
    fi
    
    # Limpiar posibles backticks
    clean=$(echo "$raw" | sed -E 's/```json\s*//g; s/```\s*//g')
    # Validar JSON
    echo "$clean" | jq empty 2>/dev/null
    if [ $? -ne 0 ]; then
        echo "ERROR: JSON inválido para $slug" >&2
        echo "$clean" >&2
        return 1
    fi
    echo "$clean"
}

# Procesar cada servicio
for slug in "${servicios[@]}"; do
    echo "Generando para: $slug"
    nombre_legible=$(echo "$slug" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')
    
    json_es=$(generar_json "$slug" "$nombre_legible")
    if [ $? -ne 0 ]; then
        echo "Saltando $slug"
        continue
    fi
    
    json_compact=$(echo "$json_es" | jq -c .)
    ruta_carpeta="${BASE}/src/app/(lang)/[lang]/servicios/${slug}"
    archivo="${ruta_carpeta}/ServicePageContent.tsx"
    
    if [ ! -d "$ruta_carpeta" ]; then
        echo "ERROR: Carpeta no existe - $ruta_carpeta"
        continue
    fi
    
    contenido_final=$(echo "$TEMPLATE" | sed "s|__ES_JSON__|$json_compact|g" | sed "s|__SLUG__|$slug|g")
    echo "$contenido_final" > "$archivo"
    echo "✓ Escrito: $archivo"
done

echo "Completado."