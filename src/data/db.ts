import * as schema from './schema'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { asc, desc, eq } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { ExperienceType } from '@/types'

const connection = neon(process.env.POSTGRES_URL!)
export const db = drizzle(connection, { schema })

const revalidationTime = 60 * 60 * 24

const internalGetMovies = async () => db.query.movies.findMany()
const internalGetGames = async () => db.query.games.findMany()
const internalGetPassions = async () =>
  db.query.passions.findMany({
    where: eq(schema.passions.show, true),
    orderBy: [asc(schema.passions.order)],
  })

const internalGetEducation = async () =>
  await db.query.experiences.findMany({
    orderBy: [asc(schema.experiences.startDate)],
    where: eq(schema.experiences.type, ExperienceType.education),
  })

const internalGetWorkExperience = async () =>
  await db.query.experiences.findMany({
    orderBy: [asc(schema.experiences.startDate)],
    where: eq(schema.experiences.type, ExperienceType.work),
    with: {
      experienceTags: {
        with: {
          tag: true,
        },
      },
    },
  })

const internalGetTechList = async () =>
  db.query.techList.findMany({
    orderBy: [asc(schema.techList.order)],
  })

const internalGetProjects = async () =>
  db.query.projects.findMany({
    orderBy: [desc(schema.projects.startDate)],
    with: {
      projectTags: {
        with: {
          tag: true,
        },
      },
    },
  })

const internalGetBlogPosts = async () =>
  db.query.blogPosts.findMany({
    orderBy: [desc(schema.blogPosts.date)],
    with: {
      blogPostTags: {
        with: {
          tag: true,
        },
      },
    },
  })

const internalGetBlogPost = async (id: string) =>
  db.query.blogPosts.findFirst({
    where: eq(schema.blogPosts.id, id),
    with: { blogPostTags: { with: { tag: true } } },
  })
const internalGetProject = async (id: string) =>
  db.query.projects.findFirst({
    where: eq(schema.projects.id, id),
    with: { projectTags: { with: { tag: true } } },
  })

export const getPassions = unstable_cache(internalGetPassions, ['passions'], { revalidate: revalidationTime })
export const getGames = unstable_cache(internalGetGames, ['games'], { revalidate: revalidationTime })
export const getMovies = unstable_cache(internalGetMovies, ['movies'], { revalidate: revalidationTime })
export const getEducation = unstable_cache(internalGetEducation, ['education'], { revalidate: revalidationTime })
export const getWorkExperience = unstable_cache(internalGetWorkExperience, ['workExperience'], {
  revalidate: revalidationTime,
})
export const getTechList = unstable_cache(internalGetTechList, ['techList'], { revalidate: revalidationTime })
export const getProjects = unstable_cache(internalGetProjects, ['projects'], { revalidate: revalidationTime })
export const getBlogPosts = unstable_cache(internalGetBlogPosts, ['blogPosts'], { revalidate: revalidationTime })

export const getBlogPost = (id: string) =>
  unstable_cache(internalGetBlogPost, [`blogPost-${id}`], { revalidate: revalidationTime })(id)
export const getProject = (id: string) =>
  unstable_cache(internalGetProject, [`project-${id}`], { revalidate: revalidationTime })(id)
