import { defineConfig } from 'drizzle-kit'

if (
  !process.env.POSTGRES_HOST ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD ||
  !process.env.POSTGRES_DATABASE
) {
  let missingEnvVars = []
  if (!process.env.POSTGRES_HOST) missingEnvVars.push('POSTGRES_HOST')
  if (!process.env.POSTGRES_USER) missingEnvVars.push('POSTGRES_USER')
  if (!process.env.POSTGRES_PASSWORD) missingEnvVars.push('POSTGRES_PASSWORD')
  if (!process.env.POSTGRES_DATABASE) missingEnvVars.push('POSTGRES_DATABASE')

  throw new Error(`Please provide all required environment variables, ${missingEnvVars.join(', ')} are missing`)
}

export default defineConfig({
  schema: './src/data/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
})
