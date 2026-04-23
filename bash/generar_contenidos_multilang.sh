#!/bin/bash

GROQ_API_KEY="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"
#!/bin/bash
if [ -z "$GROQ_API_KEY" ]; then
    echo "ERROR: Define GROQ_API_KEY"
    exit 1
fi

GROQ_URL="https://api.groq.com/openai/v1/chat/completions"
MODEL="llama-3.3-70b-versatile"
BASE="/c/datheon/frontend-datheon"

servicios=(
    "digital-transformation-systems"
    "enterprise-architecture-design"
    "operational-efficiency-systems"
    "solution-architecture-planning"
    "system-design-engineering"
    "workflow-reengineering"
)

# Plantilla final
read -r -d '' TEMPLATE << 'EOF'
'use client'

import { ServicePageTemplate } from '../Servicepagetemplate'
import type { PageContent } from '../Servicepagetemplate'

type Lang = 'es' | 'en' | 'fr'

const content: Record<Lang, Omit<PageContent, 'lang' | 'slug' | 'icon'>> = {
  es: __ES_JSON__,
  en: __EN_JSON__,
  fr: __FR_JSON__,
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

# Función para llamar a Groq con un prompt y obtener JSON
llamar_groq() {
    local prompt="$1"
    local prompt_escaped=$(printf '%s' "$prompt" | jq -R -s -c .)
    local response=$(curl -s -X POST "$GROQ_URL" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $GROQ_API_KEY" \
        -d "{
            \"model\": \"$MODEL\",
            \"messages\": [{\"role\": \"user\", \"content\": $prompt_escaped}],
            \"temperature\": 0.7,
            \"max_tokens\": 8000,
            \"response_format\": {\"type\": \"json_object\"}
        }")
    
    # Verificar errores
    if echo "$response" | jq -e '.error' >/dev/null 2>&1; then
        echo "ERROR API: $(echo "$response" | jq -r '.error.message')" >&2
        return 1
    fi
    
    local raw=$(echo "$response" | jq -r '.choices[0].message.content // ""')
    if [ -z "$raw" ] || [ "$raw" = "null" ]; then
        echo "ERROR: Respuesta vacía" >&2
        echo "$response" | jq . >&2
        return 1
    fi
    
    # Limpiar posibles marcadores markdown
    local clean=$(echo "$raw" | sed -E 's/```json\s*//g; s/```\s*//g')
    echo "$clean" | jq empty 2>/dev/null
    if [ $? -ne 0 ]; then
        echo "ERROR: JSON inválido" >&2
        echo "$clean" | head -c 500 >&2
        return 1
    fi
    echo "$clean"
}

# Generar JSON en español (prompt más corto pero completo)
generar_espanol() {
    local slug="$1"
    local nombre="$2"
    
    local prompt="Genera un objeto JSON para la página de servicio '$nombre' en español. El contenido debe ser muy detallado y persuasivo. Sigue esta estructura exacta (respeta los tipos y cantidades):

{
  \"badge\": \"string (máx 80 caracteres)\",
  \"breadcrumb\": {\"home\": \"Inicio\", \"services\": \"Servicios\", \"current\": \"string\"},
  \"hero\": {\"title\": \"string (8-12 palabras)\", \"titleAccent\": \"string (4-6 palabras)\", \"subtitle\": \"string (100-150 palabras)\", \"cta\": \"string\", \"ctaSub\": \"string\"},
  \"social\": \"string (120-150 caracteres)\",
  \"includes\": {\"title\": \"string\", \"items\": [{\"icon\": \"emoji\", \"title\": \"string (8-12 palabras)\", \"desc\": \"string (40-60 palabras)\"} // 10 items]},
  \"useCases\": {\"title\": \"string\", \"items\": [{\"icon\": \"emoji\", \"profile\": \"string\", \"pain\": \"string (25-35 palabras)\", \"solution\": \"string (30-40 palabras)\", \"result\": \"string (15-20 palabras)\"} // 6 items]},
  \"results\": {\"title\": \"string\", \"items\": [{\"value\": \"string\", \"label\": \"string\", \"sub\": \"string (15-20 palabras)\"} // 6 items]},
  \"pricing\": {\"title\": \"string\", \"subtitle\": \"string (20-30 palabras)\", \"tiers\": [{\"name\": \"string\", \"tagline\": \"string\", \"price\": \"string\", \"range\": \"string\", \"time\": \"string\", \"color\": \"#hex\", \"featured\": false, \"features\": [\"string (8-10 características)\"], \"cta\": \"string\"} // 4 tiers]},
  \"faq\": {\"title\": \"string\", \"items\": [{\"q\": \"string\", \"a\": \"string (50-80 palabras)\"} // 8 items]},
  \"form\": {\"title\": \"string\", \"subtitle\": \"string (30-40 palabras)\", \"name\": \"string\", \"email\": \"string\", \"company\": \"string\", \"useCase\": \"string\", \"submit\": \"string\", \"loading\": \"string\", \"success\": \"string\"},
  \"finalCta\": {\"title\": \"string (20-30 palabras)\", \"subtitle\": \"string (30-40 palabras)\", \"cta\": \"string\", \"note\": \"string (15-20 palabras)\"},
  \"sticky\": \"string\"
}

Requisitos: datos realistas (porcentajes, plazos), ejemplos de industrias (retail, salud, fintech, etc.). Adaptado al servicio '$nombre'. Devuelve solo JSON válido, sin markdown."

    llamar_groq "$prompt"
}

# Traducir JSON a otro idioma
traducir_json() {
    local json="$1"
    local target_lang="$2"
    local lang_name=""
    case "$target_lang" in
        en) lang_name="inglés" ;;
        fr) lang_name="francés" ;;
        *) return 1 ;;
    esac
    
    local prompt="Traduce el siguiente JSON al $lang_name. Mantén exactamente la misma estructura, solo traduce los valores de texto (las claves no se traducen). Devuelve solo el JSON traducido, sin markdown. JSON original:
$json"

    llamar_groq "$prompt"
}

# Bucle principal
for slug in "${servicios[@]}"; do
    echo "========================================="
    echo "Procesando: $slug"
    nombre_legible=$(echo "$slug" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1')
    
    echo "  Generando español..."
    json_es=$(generar_espanol "$slug" "$nombre_legible")
    if [ $? -ne 0 ] || [ -z "$json_es" ]; then
        echo "  ERROR: Falló generación en español, omitiendo servicio"
        continue
    fi
    echo "  Español generado (tamaño: $(echo -n "$json_es" | wc -c) bytes)"
    
    echo "  Traduciendo a inglés..."
    json_en=$(traducir_json "$json_es" "en")
    if [ $? -ne 0 ] || [ -z "$json_en" ]; then
        echo "  ERROR: Falló traducción a inglés, omitiendo servicio"
        continue
    fi
    
    echo "  Traduciendo a francés..."
    json_fr=$(traducir_json "$json_es" "fr")
    if [ $? -ne 0 ] || [ -z "$json_fr" ]; then
        echo "  ERROR: Falló traducción a francés, omitiendo servicio"
        continue
    fi
    
    # Compactar
    json_es_compact=$(echo "$json_es" | jq -c .)
    json_en_compact=$(echo "$json_en" | jq -c .)
    json_fr_compact=$(echo "$json_fr" | jq -c .)
    
    ruta_carpeta="${BASE}/src/app/(lang)/[lang]/servicios/${slug}"
    archivo="${ruta_carpeta}/ServicePageContent.tsx"
    
    if [ ! -d "$ruta_carpeta" ]; then
        echo "ERROR: Carpeta no existe - $ruta_carpeta"
        continue
    fi
    
    contenido_final=$(echo "$TEMPLATE" \
        | sed "s|__ES_JSON__|$json_es_compact|g" \
        | sed "s|__EN_JSON__|$json_en_compact|g" \
        | sed "s|__FR_JSON__|$json_fr_compact|g" \
        | sed "s|__SLUG__|$slug|g")
    
    echo "$contenido_final" > "$archivo"
    echo "✓ Escrito: $archivo"
done

echo "========================================="
echo "Proceso completado."