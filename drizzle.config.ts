import type { Config } from 'drizzle-kit'

export default {
  schema:  './packages/shared/src/api/db/schema.ts',
  out:     './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.UNIVERSITY_DATABASE_URL!,
  },
} satisfies Config