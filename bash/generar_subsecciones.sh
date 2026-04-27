#!/bin/bash
# Script para generar subsecciones con Ollama (primeras 3 lecciones)

MODEL="llama3:latest"
OUTPUT_FILE="subsecciones.sql"

# Verificar Ollama
if ! command -v ollama &> /dev/null; then
    echo "Error: Ollama no está instalado"
    exit 1
fi

# Lecciones manuales (primeras 3)
LESSONS=(
    "js-b1-t2-l1"
    "js-b1-t2-l2"
    "js-b1-t3-l1"
)

> "$OUTPUT_FILE"
echo "-- Subsecciones generadas con $MODEL" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

COUNT=0
for lesson in "${LESSONS[@]}"; do
    COUNT=$((COUNT+1))
    echo "[$COUNT/3] Procesando $lesson ..."

    PROMPT="Genera 5 subsecciones para la leccion '$lesson' del curso 'javascript'. Cada subseccion debe tener:
- id: '${lesson}-s1' ... '${lesson}-s5'
- lesson_id: '$lesson'
- course_id: 'javascript'
- title: {\"es\": \"Titulo\"}
- order: 1..5
- theory: {\"es\": \"<h2>...</h2><p>...</p>\"} bien detallada, con ejemplos y explicaciones claras, usando etiquetas HTML como <h1>, <h2>, <p>, <ul>, <li>, <code>, etc. minimo 1000 caracteres.
- eval_type: quiz, cloze, flashcard, drag_drop, lab, challenge, timeline, decision (variar)
- eval_data: JSON segun tipo
- hint: {\"es\": \"solucion\"} con solucion completa, explicaciones claras y codigo de ejemplo si aplica, minimo 500 caracteres.
Devuelve SOLO las sentencias INSERT ON CONFLICT (id) DO NOTHING;"

    ollama run "$MODEL" "$PROMPT" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "Finalizado. Resultado en $OUTPUT_FILE"
