import type { certificates } from '@datheon/shared/api/db/schema'

export type Certificate = typeof certificates.$inferSelect
