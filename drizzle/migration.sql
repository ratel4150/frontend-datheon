-- File: frontend-datheon/drizzle/migration.sql
-- Universidad Datheón — Schema
-- Corre esto directamente en la consola SQL de Neon

CREATE TABLE IF NOT EXISTS ud_courses (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  title       JSONB NOT NULL,
  description JSONB NOT NULL,
  icon        TEXT NOT NULL,
  color       TEXT NOT NULL,
  level       TEXT NOT NULL DEFAULT 'beginner',
  free        BOOLEAN NOT NULL DEFAULT true,
  published   BOOLEAN NOT NULL DEFAULT false,
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ud_modules (
  id        TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES ud_courses(id) ON DELETE CASCADE,
  title     JSONB NOT NULL,
  "order"   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ud_lessons (
  id           TEXT PRIMARY KEY,
  module_id    TEXT NOT NULL REFERENCES ud_modules(id) ON DELETE CASCADE,
  course_id    TEXT NOT NULL,
  title        JSONB NOT NULL,
  type         TEXT NOT NULL CHECK (type IN ('theory','lab','quiz','workshop','review')),
  "order"      INTEGER NOT NULL DEFAULT 0,
  content      JSONB NOT NULL DEFAULT '{}',
  starter_code TEXT,
  tests        JSONB,
  questions    JSONB
);

CREATE TABLE IF NOT EXISTS ud_user_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT NOT NULL,
  lesson_id    TEXT NOT NULL REFERENCES ud_lessons(id) ON DELETE CASCADE,
  course_id    TEXT NOT NULL,
  completed    BOOLEAN NOT NULL DEFAULT false,
  code         TEXT,
  score        INTEGER,
  completed_at TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS ud_certificates (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT NOT NULL,
  course_id    TEXT NOT NULL REFERENCES ud_courses(id),
  user_name    TEXT NOT NULL,
  user_email   TEXT NOT NULL,
  course_title JSONB NOT NULL,
  issued_at    TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_up_user     ON ud_user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_up_course   ON ud_user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_cert_user   ON ud_certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_lessons_mod ON ud_lessons(module_id);

-- Seed: cursos iniciales
INSERT INTO ud_courses (id, slug, title, description, icon, color, level, free, published, "order") VALUES
('javascript', 'javascript',
  '{"es":"JavaScript","en":"JavaScript","fr":"JavaScript"}',
  '{"es":"Aprende JavaScript desde cero hasta avanzado. Variables, funciones, DOM, async/await y más.","en":"Learn JavaScript from scratch to advanced. Variables, functions, DOM, async/await and more.","fr":"Apprenez JavaScript de zéro à avancé. Variables, fonctions, DOM, async/await et plus."}',
  '🟨', '#F7DF1E', 'beginner', true, true, 1),

('python', 'python',
  '{"es":"Python","en":"Python","fr":"Python"}',
  '{"es":"Domina Python: sintaxis, estructuras de datos, POO, manejo de archivos y automatización.","en":"Master Python: syntax, data structures, OOP, file handling and automation.","fr":"Maîtrisez Python : syntaxe, structures de données, POO, gestion de fichiers et automatisation."}',
  '🐍', '#3776AB', 'beginner', true, true, 2),

('frontend', 'frontend',
  '{"es":"Frontend con React","en":"Frontend with React","fr":"Frontend avec React"}',
  '{"es":"React, TypeScript, hooks, estado, routing y buenas prácticas para crear interfaces modernas.","en":"React, TypeScript, hooks, state, routing and best practices to create modern interfaces.","fr":"React, TypeScript, hooks, état, routing et bonnes pratiques pour créer des interfaces modernes."}',
  '⚛️', '#61DAFB', 'intermediate', true, true, 3),

('backend', 'backend',
  '{"es":"Backend con Node.js","en":"Backend with Node.js","fr":"Backend avec Node.js"}',
  '{"es":"Node.js, Express, REST APIs, autenticación JWT, bases de datos y despliegue en producción.","en":"Node.js, Express, REST APIs, JWT authentication, databases and production deployment.","fr":"Node.js, Express, APIs REST, authentification JWT, bases de données et déploiement en production."}',
  '🟢', '#68A063', 'intermediate', true, true, 4)

ON CONFLICT (id) DO NOTHING;