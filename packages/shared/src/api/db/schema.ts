// File: frontend-datheon/packages/shared/src/api/db/schema.ts
import { pgTable, text, integer, boolean, timestamp, uuid, jsonb } from 'drizzle-orm/pg-core'

export const courses = pgTable('ud_courses', {
  id:          text('id').primaryKey(),
  slug:        text('slug').notNull().unique(),
  title:       jsonb('title').notNull(),
  description: jsonb('description').notNull(),
  icon:        text('icon').notNull(),
  color:       text('color').notNull(),
  level:       text('level').notNull().default('beginner'),
  free:        boolean('free').notNull().default(true),
  published:   boolean('published').notNull().default(false),
  order:       integer('order').notNull().default(0),
  createdAt:   timestamp('created_at').defaultNow(),
})

export const blocks = pgTable('ud_blocks', {
  id:       text('id').primaryKey(),
  courseId: text('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  title:    jsonb('title').notNull(),
  order:    integer('order').notNull().default(0),
})

export const topics = pgTable('ud_topics', {
  id:      text('id').primaryKey(),
  blockId: text('block_id').notNull().references(() => blocks.id, { onDelete: 'cascade' }),
  title:   jsonb('title').notNull(),
  order:   integer('order').notNull().default(0),
})

export const lessons = pgTable('ud_lessons', {
  id:      text('id').primaryKey(),
  topicId: text('topic_id').notNull().references(() => topics.id, { onDelete: 'cascade' }),
  title:   jsonb('title').notNull(),
  order:   integer('order').notNull().default(0),
})

export const subsections = pgTable('ud_subsections', {
  id:        text('id').primaryKey(),
  lessonId:  text('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  courseId:  text('course_id').notNull(),
  title:     jsonb('title').notNull(),
  order:     integer('order').notNull().default(0),
  theory:    jsonb('theory').notNull().default({}),
  evalType:  text('eval_type').notNull().default('quiz'),
  evalData:  jsonb('eval_data').notNull().default({}),
  hint:      jsonb('hint').notNull().default({}),
  createdAt: timestamp('created_at').defaultNow(),
})

export const subsectionProgress = pgTable('ud_subsection_progress', {
  id:           uuid('id').primaryKey().defaultRandom(),
  userId:       text('user_id').notNull(),
  subsectionId: text('subsection_id').notNull().references(() => subsections.id, { onDelete: 'cascade' }),
  courseId:     text('course_id').notNull(),
  completed:    boolean('completed').notNull().default(false),
  code:         text('code'),
  score:        integer('score'),
  completedAt:  timestamp('completed_at'),
  updatedAt:    timestamp('updated_at').defaultNow(),
})

export const certificates = pgTable('ud_certificates', {
  id:          uuid('id').primaryKey().defaultRandom(),
  userId:      text('user_id').notNull(),
  courseId:    text('course_id').notNull().references(() => courses.id),
  userName:    text('user_name').notNull(),
  userEmail:   text('user_email').notNull(),
  courseTitle: jsonb('course_title').notNull(),
  issuedAt:    timestamp('issued_at').defaultNow(),
})