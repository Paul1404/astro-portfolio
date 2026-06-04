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
		repoUrl: z.string().url().optional(),
		liveUrl: z.string().url().optional(),
		featured: z.boolean().default(false),
		status: z.enum(['shipped', 'wip', 'archived']).default('shipped'),
		// lucide icon name used for the card accent and image-less placeholder.
		icon: z.string().default('package'),
	}),
});

export const collections = {
	projects,
};
