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
		// Optional badge for projects that aren't simply live; omit for the default case.
		status: z.enum(['wip', 'archived']).optional(),
		// lucide icon name used for the card accent and image-less placeholder.
		icon: z.string().default('package'),
	}),
});

export const collections = {
	projects,
};
