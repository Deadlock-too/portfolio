import { boolean, date, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const games = pgTable('games', {
  id: integer('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  url: varchar('url', { length: 256 }).notNull(),
  logoPosition: integer('logo_position').notNull(),
  logoSize: integer('logo_size').notNull(),
})

export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  url: varchar('url', { length: 256 }).notNull(),
})

export const passions = pgTable('passions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  icon: varchar('icon', { length: 8 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  show: boolean('show').notNull().default(true),
  order: integer('order').notNull().default(0),
})

export const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  type: integer('type').notNull(),
  title: varchar('title', { length: 128 }).notNull(),
  institution: varchar('institution', { length: 128 }).notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
})

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
})

export const experienceTags = pgTable('experience_tags', {
  experienceId: integer('experience_id')
    .notNull()
    .references(() => experiences.id),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tags.id),
})

export const techList = pgTable('tech_list', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 16 }).notNull(),
  color: varchar('color', { length: 7 }).notNull(),
  order: integer('order').notNull().default(0),
})

export const projects = pgTable('projects', {
  id: varchar('id').primaryKey(),
  name: varchar('name', { length: 128 }).notNull(),
  description: varchar('description', { length: 1024 }).notNull(),
  url: varchar('url', { length: 256 }).notNull(),
  startDate: date('start_date').notNull(),
  content: varchar('content', { length: 8192 }).notNull(),
})

export const projectTags = pgTable('project_tags', {
  experienceId: varchar('project_id')
    .notNull()
    .references(() => projects.id),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tags.id),
})

export const blogPosts = pgTable('blog_posts', {
  id: varchar('id').primaryKey(),
  title: varchar('title', { length: 128 }).notNull(),
  description: varchar('description', { length: 256 }).notNull(),
  content: varchar('content', { length: 8192 }).notNull(),
  date: date('date').notNull(),
})

export const blogPostTags = pgTable('blog_post_tags', {
  postId: varchar('post_id')
    .notNull()
    .references(() => blogPosts.id),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tags.id),
})

/* Relations */
export const tagsRelations = relations(tags, ({ many }) => ({
  experienceTags: many(experienceTags),
  projectTags: many(projectTags),
  blogPostTags: many(blogPostTags),
}))

export const experiencesRelations = relations(experiences, ({ many }) => ({
  experienceTags: many(experienceTags),
}))

export const experienceTagsRelations = relations(experienceTags, ({ one }) => ({
  experience: one(experiences, { fields: [experienceTags.experienceId], references: [experiences.id] }),
  tag: one(tags, { fields: [experienceTags.tagId], references: [tags.id] }),
}))

export const projectsRelations = relations(projects, ({ many }) => ({
  projectTags: many(projectTags),
}))

export const projectTagsRelations = relations(projectTags, ({ one }) => ({
  project: one(projects, { fields: [projectTags.experienceId], references: [projects.id] }),
  tag: one(tags, { fields: [projectTags.tagId], references: [tags.id] }),
}))

export const blogPostsRelations = relations(blogPosts, ({ many }) => ({
  blogPostTags: many(blogPostTags),
}))

export const blogPostTagsRelations = relations(blogPostTags, ({ one }) => ({
  post: one(blogPosts, { fields: [blogPostTags.postId], references: [blogPosts.id] }),
  tag: one(tags, { fields: [blogPostTags.tagId], references: [tags.id] }),
}))
