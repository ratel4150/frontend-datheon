#!/bin/bash
# Script simple para generar subsecciones (primeras 3 lecciones)

MODEL="llama3:latest"
OUTPUT="subsecciones_simple.sql"

# Verificar que Ollama existe
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama no está instalado. Instálalo desde https://ollama.com"
    exit 1
fi

# Verificar que el modelo está descargado
if ! ollama list | grep -q "$MODEL"; then
    echo "❌ Modelo $MODEL no encontrado. Descargando..."
    ollama pull "$MODEL"
fi

# Extraer IDs de lección desde el texto usando sed (sin -P)
LESSON_IDS=$(cat <<'TEXT' | sed -n "s/.*'\(js-[^']*-l[12]\)'.*/\1/p"
-- js-b1-t2
('js-b1-t2-l1', 'js-b1-t2', '{"en": "Introduction to Operators and Expressions", "es": "Introducción a Operadores y Expresiones"}', 1),
('js-b1-t2-l2', 'js-b1-t2', '{"en": "Deep dive into Operators", "es": "Profundizando en Operadores"}', 2),
-- js-b1-t3
('js-b1-t3-l1', 'js-b1-t3', '{"en": "Introduction to Control Flow", "es": "Introducción al Flujo de Control"}', 1),
('js-b1-t3-l2', 'js-b1-t3', '{"en": "Deep dive into Loops and Conditionals", "es": "Profundizando en Bucles y Condicionales"}', 2),
-- js-b2-t1
('js-b2-t1-l1', 'js-b2-t1', '{"en": "Introduction to Arrays", "es": "Introducción a Arreglos"}', 1),
('js-b2-t1-l2', 'js-b2-t1', '{"en": "Deep dive into Array Methods", "es": "Profundizando en Métodos de Arreglos"}', 2)
TEXT
)

# Tomar las primeras 3 líneas (IDs únicos)
LESSONS=($(echo "$LESSON_IDS" | head -3))
echo "Lecciones a procesar: ${LESSONS[@]}"

# Vaciar archivo de salida
> "$OUTPUT"
echo "-- Subsecciones para primeras 3 lecciones" >> "$OUTPUT"
echo "-- Generado con $MODEL" >> "$OUTPUT"
echo "" >> "$OUTPUT"

COUNT=0
for lesson in "${LESSONS[@]}"; do
    COUNT=$((COUNT+1))
    echo "[$COUNT/3] Procesando $lesson ..."
    
    PROMPT="Genera 5 subsecciones para la lección '$lesson' del curso 'javascript'. 
Formato: cada subsección es un INSERT INTO ud_subsections (id, lesson_id, course_id, title, order, theory, eval_type, eval_data, hint).
Detalles:
- id: '${lesson}-s1' ... '${lesson}-s5'
- lesson_id: '$lesson'
- course_id: 'javascript'
- title: JSON con 'es' (ej: '{\"es\": \"Título\"}')
- order: 1..5
- theory: JSON con HTML hiper detallado minimo 1000 caracteres, con ejemplos y explicaciones claras (ej: '{\"es\": \"<p>Teoría...</p>\"}'),html con etiquetas como <p>, <h1>, <h2>, <ul>, <li>, <code>, etc.
- eval_type: quiz, cloze, flashcard, drag_drop, lab (variar)
- eval_data: JSON según tipo; si lab, incluye 'tests' (mínimo 4)
- hint: JSON con solución completa hiper detallada (ej: '{\"es\": \"<p>Solución...</p>\"}') minimo 500 caracteres, con explicaciones claras y código de ejemplo si aplica.
Devuelve SOLO las sentencias INSERT, cada una terminando con 'ON CONFLICT (id) DO NOTHING;'"

    # Llamar a Ollama y guardar
    response=$(ollama run "$MODEL" "$PROMPT")
    echo "$response" | grep -i "^INSERT INTO" >> "$OUTPUT"
    echo "" >> "$OUTPUT"
    
    sleep 1
done

echo "✅ Archivo generado: $OUTPUT"