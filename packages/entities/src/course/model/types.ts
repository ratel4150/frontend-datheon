import type {
  courses, blocks, topics, lessons, subsections, subsectionProgress,
} from '@datheon/shared/api/db/schema'

export type Course = typeof courses.$inferSelect
export type CourseBlock = typeof blocks.$inferSelect
export type CourseTopic = typeof topics.$inferSelect
export type CourseLesson = typeof lessons.$inferSelect
export type CourseSubsection = typeof subsections.$inferSelect
export type SubsectionProgress = typeof subsectionProgress.$inferSelect
