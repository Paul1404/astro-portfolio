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

/**
 * All projects for a locale, most mature and impressive first.
 *
 * Featured projects lead the list, then everything else. Within each tier the
 * explicit featuredOrder curates the showcase; dates order the remaining work.
 */
export async function getProjects(lang: Lang): Promise<Project[]> {
	const all = await getCollection('projects');
	return all
		.filter((entry) => langOf(entry) === lang && entry.data.status !== 'archived')
		.sort((a, b) => {
			if (a.data.featured !== b.data.featured) {
				return a.data.featured ? -1 : 1;
			}
			if (a.data.featured && b.data.featured) {
				const order = (a.data.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
					(b.data.featuredOrder ?? Number.MAX_SAFE_INTEGER);
				if (order !== 0) return order;
			}
			return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
		});
}
