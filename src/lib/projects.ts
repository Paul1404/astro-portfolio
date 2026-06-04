import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Project = CollectionEntry<'projects'>;

/** The slug without its leading locale segment, e.g. "en/diatrack" -> "diatrack". */
export function slugOf(entry: Project): string {
	return entry.id.split('/').slice(1).join('/');
}

/** The locale a project entry belongs to, derived from its folder. */
export function langOf(entry: Project): string {
	return entry.id.split('/')[0];
}

/** All projects for a locale, newest first. */
export async function getProjects(lang: Lang): Promise<Project[]> {
	const all = await getCollection('projects');
	return all
		.filter((entry) => langOf(entry) === lang)
		.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
