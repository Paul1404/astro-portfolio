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
		focus: ['Cloud', 'Linux', 'Containers', 'Networking', 'Automation'],
		skills: [
			{
				icon: 'lucide:cloud',
				title: 'Cloud infrastructure',
				body: 'I run production workloads on Railway and Hetzner: deployments, databases, and the networking glue that keeps them online.',
			},
			{
				icon: 'lucide:box',
				title: 'Virtualization and containers',
				body: 'Docker and container-first deployments, with a background in VMware vSphere and Proxmox from years of hands-on lab work.',
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
		focus: ['Cloud', 'Linux', 'Container', 'Netzwerke', 'Automatisierung'],
		skills: [
			{
				icon: 'lucide:cloud',
				title: 'Cloud-Infrastruktur',
				body: 'Ich betreibe produktive Workloads auf Railway und Hetzner: Deployments, Datenbanken und das Netzwerk-Klebeband, das alles online hält.',
			},
			{
				icon: 'lucide:box',
				title: 'Virtualisierung und Container',
				body: 'Docker und container-first Deployments, mit einem Hintergrund in VMware vSphere und Proxmox aus Jahren praktischer Lab-Arbeit.',
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

		// Shared CTAs
		'cta.github': 'GitHub',
		'cta.contact': 'Contact',
		'cta.viewProjects': 'View projects',
		'cta.seeAll': 'See all projects',

		// Home
		'home.meta.title': 'Paul Dresch | Systems engineer',
		'home.meta.desc':
			'Systems engineer working with cloud infrastructure, Linux, and automation. A selection of projects and tools I have built.',
		'home.hero.eyebrow': 'Systems engineer',
		'home.hero.titleLead': 'I build and run ',
		'home.hero.titleHighlight': 'infrastructure',
		'home.hero.titleTail': ', and the tools around it.',
		'home.hero.subtitle':
			'Mostly cloud now, on Railway and Hetzner, with a background in Linux, networking, and virtualization. Most of what I make started as a problem I needed to solve.',
		'home.featured.eyebrow': 'Selected work',
		'home.featured.title': 'Projects',

		// Projects
		'projects.meta.title': 'Projects | Paul Dresch',
		'projects.meta.desc':
			'Software I have designed and built: cloud apps, self-hosted tools, automation, and infrastructure projects.',
		'projects.hero.eyebrow': 'Projects',
		'projects.hero.title': 'A selection of my work',
		'projects.hero.tagline':
			'Cloud apps, self-hosted services, command line tools, and automation. Most of it is open source, and most of it started as a problem I had.',

		// Project card / detail
		'project.code': 'Code',
		'project.live': 'Live',
		'project.allProjects': 'All projects',
		'project.liveDemo': 'Live demo',
		'project.viewCode': 'View code',
		'status.wip': 'In progress',
		'status.archived': 'Archived',

		// About
		'about.meta.title': 'About | Paul Dresch',
		'about.meta.desc': 'Systems engineer who builds and ships real software.',
		'about.hero.eyebrow': 'About',
		'about.hero.title': 'Systems engineer, mostly in the cloud',
		'about.hero.tagline':
			'I work close to infrastructure and turn it into tools that solve a specific problem. Here is the short version.',
		'about.bodyP1':
			'I am a systems engineer with a long-standing interest in Linux, infrastructure, and networking. These days most of what I run lives in the cloud, on Railway and Hetzner, but it grew out of years of hands-on work with real hardware. That is where I learned how systems actually behave, and it still shapes how I build.',
		'about.bodyP2':
			'Most of what I make comes from a real need: a club that wanted its member letters automated, a mail server that needed proper monitoring, a pile of Dependabot pull requests that needed taming. I tend to work on the unglamorous problems, and I try to solve them in a way other people can reuse.',
		'about.skillsTitle': 'What I work with',
		'about.imageLabel': 'Cloud and Linux infrastructure',

		// Contact CTA
		'contact.title': 'Get in touch',
		'contact.body':
			'Happy to talk about cloud infrastructure, automation, or a project you have in mind.',
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

		// Shared CTAs
		'cta.github': 'GitHub',
		'cta.contact': 'Kontakt',
		'cta.viewProjects': 'Projekte ansehen',
		'cta.seeAll': 'Alle Projekte ansehen',

		// Home
		'home.meta.title': 'Paul Dresch | Systems Engineer',
		'home.meta.desc':
			'Systems Engineer mit Fokus auf Cloud-Infrastruktur, Linux und Automatisierung. Eine Auswahl an Projekten und Tools, die ich gebaut habe.',
		'home.hero.eyebrow': 'Systems Engineer',
		'home.hero.titleLead': 'Ich baue und betreibe ',
		'home.hero.titleHighlight': 'Infrastruktur',
		'home.hero.titleTail': ', und die Tools drumherum.',
		'home.hero.subtitle':
			'Heute meist in der Cloud, auf Railway und Hetzner, mit einem Hintergrund in Linux, Netzwerken und Virtualisierung. Das meiste, was ich baue, begann als ein Problem, das ich lösen musste.',
		'home.featured.eyebrow': 'Ausgewählte Arbeiten',
		'home.featured.title': 'Projekte',

		// Projects
		'projects.meta.title': 'Projekte | Paul Dresch',
		'projects.meta.desc':
			'Software, die ich entworfen und gebaut habe: Cloud-Anwendungen, selbst gehostete Tools, Automatisierung und Infrastruktur-Projekte.',
		'projects.hero.eyebrow': 'Projekte',
		'projects.hero.title': 'Eine Auswahl meiner Arbeit',
		'projects.hero.tagline':
			'Cloud-Anwendungen, selbst gehostete Dienste, Kommandozeilen-Tools und Automatisierung. Das meiste ist Open Source und begann als ein Problem, das ich selbst hatte.',

		// Project card / detail
		'project.code': 'Code',
		'project.live': 'Live',
		'project.allProjects': 'Alle Projekte',
		'project.liveDemo': 'Live-Demo',
		'project.viewCode': 'Code ansehen',
		'status.wip': 'In Arbeit',
		'status.archived': 'Archiviert',

		// About
		'about.meta.title': 'Über mich | Paul Dresch',
		'about.meta.desc': 'Systems Engineer, der echte Software baut und ausliefert.',
		'about.hero.eyebrow': 'Über mich',
		'about.hero.title': 'Systems Engineer, heute meist in der Cloud',
		'about.hero.tagline':
			'Ich arbeite nah an Infrastruktur und mache daraus Tools, die ein konkretes Problem lösen. Hier ist die kurze Version.',
		'about.bodyP1':
			'Ich bin Systems Engineer mit einem langjährigen Interesse an Linux, Infrastruktur und Netzwerken. Heute läuft das meiste, was ich betreibe, in der Cloud auf Railway und Hetzner, doch das ist aus Jahren praktischer Arbeit mit echter Hardware gewachsen. Dort habe ich gelernt, wie Systeme sich wirklich verhalten, und das prägt bis heute, wie ich baue.',
		'about.bodyP2':
			'Das meiste, was ich baue, entsteht aus einem echten Bedarf: ein Verein, der seine Mitglieder-Serienbriefe automatisieren wollte, ein Mailserver, der ordentliches Monitoring brauchte, ein Berg an Dependabot-Pull-Requests, der gebändigt werden wollte. Ich arbeite eher an den unspektakulären Problemen und versuche, sie so zu lösen, dass andere die Lösung weiterverwenden können.',
		'about.skillsTitle': 'Womit ich arbeite',
		'about.imageLabel': 'Cloud- und Linux-Infrastruktur',

		// Contact CTA
		'contact.title': 'Kontakt aufnehmen',
		'contact.body':
			'Ich spreche gerne über Cloud-Infrastruktur, Automatisierung oder ein Projekt, das Sie im Kopf haben.',
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

		// Privacy
		'privacy.meta.title': 'Datenschutz | Paul Dresch',
		'privacy.meta.desc': 'Datenschutzerklärung und Impressum',
		'privacy.eyebrow': 'Rechtliches',
		'privacy.title': 'Datenschutzerklärung',
	},
} as const;
