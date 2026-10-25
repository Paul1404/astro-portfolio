import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.coerce.date(),
		tags: z.array(z.string()).default([]),
		// Concrete tech the project is built with, shown as badges.
		stack: z.array(z.string()).default([]),
		repoUrl: z.url().optional(),
		liveUrl: z.url().optional(),
		featured: z.boolean().default(false),
		featuredOrder: z.number().int().positive().optional(),
		// Optional badge for projects that aren't simply live; omit for the default case.
		status: z.enum(['wip', 'archived']).optional(),
		screenshot: z.object({
			image: z.enum(['fortuna', 'kontor2', 'kataster', 'rendant', 'sigil', 'diatrack']),
			alt: z.string().min(1),
		}).optional(),
		// Optional icon for uses outside the project showcase.
		icon: z.string().default('package'),
	}),
});

export const collections = {
	projects,
};
