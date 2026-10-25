// Central translation dictionary for the whole site.
// Flat string keys are resolved with the `t()` helper in ./utils.ts.
// Structured values (arrays / objects) are read directly off `ui[lang]`.

export const languages = {
	en: 'English',
	de: 'Deutsch',
} as const;

export const defaultLang = 'en';
export type Lang = keyof typeof languages;

// Structured content (skill cards, focus chips) kept separate from flat strings.
export const content = {
	en: {
		focus: ['Applications', 'Data', 'Integrations', 'Cloud', 'Automation'],
		skills: [
			{
				icon: 'lucide:cloud',
				title: 'Cloud infrastructure',
				body: 'I run production workloads on Railway and Hetzner: deployments, databases, and the networking glue that keeps them online.',
			},
			{
				icon: 'lucide:box',
				title: 'Applications and data',
				body: 'TypeScript, React, TanStack Start, and PostgreSQL. I connect interfaces, validated APIs, and domain logic into applications that people can use.',
			},
			{
				icon: 'lucide:terminal',
				title: 'Linux and automation',
				body: 'Red Hat Certified System Administrator (EX200). I manage Linux servers and automate the repetitive parts with Ansible, Bash, and Python.',
			},
			{
				icon: 'lucide:network',
				title: 'Networking',
				body: 'Comfortable from DNS and mail security up to datacenter switching, with a focus on reliable, well-understood setups.',
			},
		],
	},
	de: {
		focus: ['Anwendungen', 'Daten', 'Schnittstellen', 'Cloud', 'Automatisierung'],
		skills: [
			{
				icon: 'lucide:cloud',
				title: 'Cloud-Infrastruktur',
				body: 'Ich betreibe produktive Workloads auf Railway und Hetzner: Deployments, Datenbanken und das Netzwerk-Klebeband, das alles online hält.',
			},
			{
				icon: 'lucide:box',
				title: 'Anwendungen und Daten',
				body: 'TypeScript, React, TanStack Start und PostgreSQL. Ich verbinde Oberflächen, validierte APIs und Fachlogik zu Anwendungen, die Menschen nutzen können.',
			},
			{
				icon: 'lucide:terminal',
				title: 'Linux und Automatisierung',
				body: 'Red Hat Certified System Administrator (EX200). Ich verwalte Linux-Server und automatisiere die wiederkehrenden Teile mit Ansible, Bash und Python.',
			},
			{
				icon: 'lucide:network',
				title: 'Netzwerke',
				body: 'Zu Hause von DNS und Mail-Security bis hin zu Datacenter-Switching, mit Fokus auf zuverlässige, gut verstandene Setups.',
			},
		],
	},
} as const;

export const ui = {
	en: {
		// Navigation
		'nav.home': 'Home',
		'nav.projects': 'Projects',
		'nav.about': 'About',
		'nav.terminal': 'Terminal',
		'nav.email': 'Email',
		'nav.github': 'GitHub',
		'a11y.menu': 'Menu',
		'a11y.toggleTheme': 'Toggle dark theme',
		'a11y.switchLang': 'Switch language',
		'a11y.terminalInput': 'Terminal input',

		// Footer
		'footer.builtWith': 'Built in Untereuerheim with Astro and Tailwind.',
		'footer.legal': 'Legal Notice',
		'footer.analytics': 'Analytics settings',

		// Shared CTAs
		'cta.github': 'GitHub',
		'cta.contact': 'Contact',
		'cta.viewProjects': 'View projects',
		'cta.seeAll': 'See all projects',

		// Home
		'home.meta.title': "Paul Dresch | Software, cloud & automation",
		'home.meta.desc':
			"Applications for personal finance, club administration, infrastructure operations, and resale. Designed, built, and maintained by Paul Dresch.",
		'home.hero.eyebrow': "Software, cloud & automation",
		'home.hero.titleLead': "I turn everyday work into ",
		'home.hero.titleHighlight': "useful software",
		'home.hero.titleTail': ".",
		'home.hero.subtitle':
			"From personal finance and club administration to infrastructure inventories and resale. I build the application, connect the data, and keep it running.",
		'home.featured.eyebrow': 'Selected work',
		'home.featured.title': 'Projects',

		// Projects
		'projects.meta.title': 'Projects | Paul Dresch',
		'projects.meta.desc':
			'Software I have designed and built: cloud apps, self-hosted tools, automation, and infrastructure projects.',
		'projects.hero.eyebrow': 'Projects',
		'projects.hero.title': 'A selection of my work',
		'projects.hero.tagline':
			"Applications, infrastructure tools, and automation built around real workflows. Explore the problem, the implementation, and the source where it is public.",

		// Project card / detail
		'project.code': 'Code',
		'project.details': 'Project details',
		'project.fullScreenshot': 'Open full screenshot',
		'project.screenshotCaption': 'Application screenshot with fictional demo data.',
		'project.live': 'Live',
		'project.allProjects': 'All projects',
		'project.liveDemo': 'Visit website',
		'project.viewCode': 'View code',
		'status.wip': 'In progress',
		'status.archived': 'Archived',

		// About
		'about.meta.title': 'About | Paul Dresch',
		'about.meta.desc': "I design, build, and operate applications that bring complex workflows into one place.",
		'about.hero.eyebrow': 'About',
		'about.hero.title': "From a real problem to a working application",
		'about.hero.tagline':
			"I work across software, data, integrations, and operations. The projects here show how those pieces fit together.",
		'about.bodyP1':
			"I build applications around work that deserves better tools: managing club members, checking cash records, understanding personal finances, or connecting infrastructure to its owners and costs. I take a project from its data model and interface through integrations, deployment, and maintenance.",
		'about.bodyP2':
			"My background in Linux, networking, and virtualization informs how I build software. I care about clear ownership of data, recoverable changes, and records that people can check later. Recent work includes Fortuna, Kontor2, Kataster, Rendant, Remise, and DiaTrack.",
		'about.skillsTitle': 'What I work with',
		'about.imageLabel': "Software, data, and operations",

		// Contact CTA
		'contact.title': 'Get in touch',
		'contact.body':
			"Happy to talk about a useful application, a complex workflow, or the infrastructure behind it.",
		'contact.send': 'Send a message',

		// 404
		'notfound.meta.title': 'Not Found | Paul Dresch',
		'notfound.meta.desc': '404. This page was not found.',
		'notfound.eyebrow': 'Error 404',
		'notfound.title': 'This page does not exist',
		'notfound.body': 'The link is broken or the page has moved. Let us get you back on track.',
		'notfound.back': 'Back to home',

		// Terminal
		'terminal.meta.title': 'Terminal | Paul Dresch',
		'terminal.meta.desc': 'A small web terminal that runs in your browser. Type help to start.',
		'terminal.eyebrow': 'Gimmick',
		'terminal.title': 'Web terminal',
		'terminal.tagline':
			'A small shell that runs entirely in your browser. Type a command and press enter. Start with help.',
		'terminal.hint': 'Tip: try help, ls, about, or whoami.',
		'terminal.inputPlaceholder': 'Type a command',

		// Privacy
		'privacy.meta.title': 'Privacy Policy | Paul Dresch',
		'privacy.meta.desc': 'Privacy Policy and Legal Notice',
		'privacy.eyebrow': 'Legal',
		'privacy.title': 'Privacy Policy',
	},
	de: {
		// Navigation
		'nav.home': 'Start',
		'nav.projects': 'Projekte',
		'nav.about': 'Über mich',
		'nav.terminal': 'Terminal',
		'nav.email': 'E-Mail',
		'nav.github': 'GitHub',
		'a11y.menu': 'Menü',
		'a11y.toggleTheme': 'Dunkles Design umschalten',
		'a11y.switchLang': 'Sprache wechseln',
		'a11y.terminalInput': 'Terminal-Eingabe',

		// Footer
		'footer.builtWith': 'Gebaut in Untereuerheim mit Astro und Tailwind.',
		'footer.legal': 'Impressum',
		'footer.analytics': 'Analyse-Einstellungen',

		// Shared CTAs
		'cta.github': 'GitHub',
		'cta.contact': 'Kontakt',
		'cta.viewProjects': 'Projekte ansehen',
		'cta.seeAll': 'Alle Projekte ansehen',

		// Home
		'home.meta.title': "Paul Dresch | Software, Cloud & Automatisierung",
		'home.meta.desc':
			"Anwendungen für persönliche Finanzen, Vereinsverwaltung, Infrastruktur und Wiederverkauf. Entworfen, gebaut und gepflegt von Paul Dresch.",
		'home.hero.eyebrow': "Software, Cloud & Automatisierung",
		'home.hero.titleLead': "Ich mache aus alltäglicher Arbeit ",
		'home.hero.titleHighlight': "brauchbare Software",
		'home.hero.titleTail': ".",
		'home.hero.subtitle':
			"Von persönlichen Finanzen und Vereinsverwaltung bis zu Infrastruktur-Inventaren und Wiederverkauf. Ich baue die Anwendung, verbinde die Daten und halte sie am Laufen.",
		'home.featured.eyebrow': 'Ausgewählte Arbeiten',
		'home.featured.title': 'Projekte',

		// Projects
		'projects.meta.title': 'Projekte | Paul Dresch',
		'projects.meta.desc':
			'Software, die ich entworfen und gebaut habe: Cloud-Anwendungen, selbst gehostete Tools, Automatisierung und Infrastruktur-Projekte.',
		'projects.hero.eyebrow': 'Projekte',
		'projects.hero.title': 'Eine Auswahl meiner Arbeit',
		'projects.hero.tagline':
			"Anwendungen, Infrastruktur-Tools und Automatisierung für konkrete Arbeitsabläufe. Hier stehen das Problem, die Umsetzung und, soweit öffentlich, der Quellcode.",

		// Project card / detail
		'project.code': 'Code',
		'project.details': 'Zum Projekt',
		'project.fullScreenshot': 'Screenshot in voller Größe öffnen',
		'project.screenshotCaption': 'Anwendungsansicht mit fiktiven Beispieldaten.',
		'project.live': 'Live',
		'project.allProjects': 'Alle Projekte',
		'project.liveDemo': 'Website öffnen',
		'project.viewCode': 'Code ansehen',
		'status.wip': 'In Arbeit',
		'status.archived': 'Archiviert',

		// About
		'about.meta.title': 'Über mich | Paul Dresch',
		'about.meta.desc': "Ich entwerfe, baue und betreibe Anwendungen, die komplexe Arbeitsabläufe zusammenbringen.",
		'about.hero.eyebrow': 'Über mich',
		'about.hero.title': "Vom konkreten Problem zur funktionierenden Anwendung",
		'about.hero.tagline':
			"Ich verbinde Software, Daten, Schnittstellen und Betrieb. Die Projekte hier zeigen, wie diese Teile zusammenspielen.",
		'about.bodyP1':
			"Ich baue Anwendungen für Aufgaben, die bessere Werkzeuge brauchen: Vereinsmitglieder verwalten, Kassenprotokolle prüfen, persönliche Finanzen verstehen oder Infrastruktur mit Verantwortlichen und Kosten verbinden. Ich begleite ein Projekt vom Datenmodell und der Oberfläche über Schnittstellen bis zu Deployment und Wartung.",
		'about.bodyP2':
			"Mein Hintergrund in Linux, Netzwerken und Virtualisierung prägt, wie ich Software baue. Mir sind klare Datenverantwortung, wiederherstellbare Änderungen und später prüfbare Vorgänge wichtig. Zu meinen jüngeren Arbeiten gehören Fortuna, Kontor2, Kataster, Rendant, Remise und DiaTrack.",
		'about.skillsTitle': 'Womit ich arbeite',
		'about.imageLabel': "Software, Daten und Betrieb",

		// Contact CTA
		'contact.title': 'Kontakt aufnehmen',
		'contact.body':
			"Ich spreche gerne über eine nützliche Anwendung, einen komplexen Arbeitsablauf oder die Infrastruktur dahinter.",
		'contact.send': 'Nachricht senden',

		// 404
		'notfound.meta.title': 'Nicht gefunden | Paul Dresch',
		'notfound.meta.desc': '404. Diese Seite wurde nicht gefunden.',
		'notfound.eyebrow': 'Fehler 404',
		'notfound.title': 'Diese Seite existiert nicht',
		'notfound.body':
			'Der Link ist defekt oder die Seite wurde verschoben. Wir bringen Sie zurück auf den richtigen Weg.',
		'notfound.back': 'Zurück zur Startseite',

		// Terminal
		'terminal.meta.title': 'Terminal | Paul Dresch',
		'terminal.meta.desc':
			'Ein kleines Web-Terminal, das in deinem Browser läuft. Tippe help, um zu starten.',
		'terminal.eyebrow': 'Spielerei',
		'terminal.title': 'Web-Terminal',
		'terminal.tagline':
			'Eine kleine Shell, die komplett in deinem Browser läuft. Tippe einen Befehl und drücke Enter. Starte mit help.',
		'terminal.hint': 'Tipp: probiere help, ls, about oder whoami.',
		'terminal.inputPlaceholder': 'Befehl eingeben',

		// Privacy
		'privacy.meta.title': 'Datenschutz | Paul Dresch',
		'privacy.meta.desc': 'Datenschutzerklärung und Impressum',
		'privacy.eyebrow': 'Rechtliches',
		'privacy.title': 'Datenschutz',
	},
} as const;
