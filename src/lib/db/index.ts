import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema'

// DB principal (RAG, contactos, etc)
const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle(sql, { schema })

// DB Universidad Datheón
const sqlUniversity = neon(process.env.UNIVERSITY_DATABASE_URL!)
export const dbU = drizzle(sqlUniversity, { schema })