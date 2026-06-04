import { ui, content, defaultLang, type Lang } from './ui';

/** Read the active locale from the URL. Non-prefixed paths are the default locale. */
export function getLangFromUrl(url: URL): Lang {
	const [, seg] = url.pathname.split('/');
	if (seg in ui) return seg as Lang;
	return defaultLang;
}

/** Returns a `t(key)` function bound to a locale, falling back to the default language. */
export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}

/** Structured (non-string) content like skill cards and focus chips. */
export function getContent(lang: Lang) {
	return content[lang];
}

/**
 * Localizes an absolute, default-language path for the given locale.
 * Example: localizePath('/projects/', 'de') -> '/de/projects/'
 */
export function localizePath(path: string, lang: Lang): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	if (lang === defaultLang) return clean;
	if (clean === '/') return `/${lang}/`;
	return `/${lang}${clean}`;
}

/** Strips a leading locale segment from a path, returning the default-language path. */
export function stripLangFromPath(path: string): string {
	const [, seg, ...rest] = path.split('/');
	if (seg in ui && seg !== defaultLang) {
		return '/' + rest.join('/');
	}
	return path;
}
