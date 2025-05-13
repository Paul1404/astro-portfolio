import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import cookieconsent from "@jop-software/astro-cookieconsent";

export default defineConfig({
  site: 'https://pd-portfolio.net/',
  integrations: [
    sitemap(),
    robotsTxt(),
    cookieconsent({
      guiOptions: {
        consentModal: {
          layout: 'cloud',
          position: 'bottom center',
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          position: "right",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: {
          readOnly: true,
        },
        functionality: {},
      },
      language: {
        default: "de",
        autoDetect: "browser",
        translations: {
          de: {
            consentModal: {
              title: "Datenschutz und Cookie-Richtlinie",
              description: "Diese Seite wird über Cloudflare bereitgestellt, das Cookies für Performance und Sicherheit nutzen kann. Mit der Nutzung unserer Website stimmen Sie der Verwendung dieser Cookies zu. Details in unserer Datenschutzerklärung.",
              closeIconLabel: "",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              showPreferencesBtn: "Einstellungen verwalten",
              footer: "<a href=\"https://pd-portfolio.net/privacy-policy/\">Datenschutz</a>\n<a href=\"https://pd-portfolio.net/privacy-policy/#impressum\">Impressum</a>",
            },
            preferencesModal: {
              title: "Präferenzen für die Zustimmung",
              closeIconLabel: "Modal schließen",
              acceptAllBtn: "Alle akzeptieren",
              acceptNecessaryBtn: "Alle ablehnen",
              savePreferencesBtn: "Einstellungen speichern",
              serviceCounterLabel: "Dienstleistungen",
              sections: [
                {
                  title: "Verwendung von Cookies",
                  description: "Diese Seite wird über Cloudflare bereitgestellt, das Cookies für Performance und Sicherheit nutzen kann. Mit der Nutzung unserer Website stimmen Sie der Verwendung dieser Cookies zu. Details in unserer Datenschutzerklärung.",
                },
                {
                  title: "Streng Notwendige Cookies <span class=\"pm__badge\">Immer Aktiviert</span>",
                  description: "Zwingend notwendige Cookies sind unerlässlich für den Betrieb unserer Website. Ohne diese Cookies würde unsere Website nicht richtig funktionieren. Diese Cookies ermöglichen grundlegende Funktionen wie Seitennavigation und Zugriff auf sichere Bereiche der Website. Sie können in unseren Systemen nicht deaktiviert werden und werden in der Regel nur als Reaktion auf Aktionen gesetzt, die einer Anfrage nach Diensten entsprechen, wie z.B. das Festlegen Ihrer Datenschutzeinstellungen, das Einloggen oder das Ausfüllen von Formularen.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Funktionalitäts Cookies",
                  description: "Funktionalitäts-Cookies ermöglichen es unserer Website, sich an Informationen zu erinnern, die die Art und Weise beeinflussen, wie sich die Website verhält oder aussieht, wie z.B. Ihre bevorzugte Sprache oder die Region, in der Sie sich befinden. Diese Cookies sorgen dafür, dass Ihre Präferenzen bei zukünftigen Besuchen beibehalten werden, um Ihnen eine personalisierte und verbesserte Benutzererfahrung zu bieten.",
                  linkedCategory: "functionality",
                },
                {
                  title: "Weitere Informationen",
                  description: "Falls Sie Fragen oder Bedenken bezüglich unserer Cookie-Richtlinien haben, können Sie uns gerne per E-Mail kontaktieren: <a href=\"mailto:contact@pd-portfolio.net\">contact@pd-portfolio.net</a>\n\n",
                },
              ],
            },
          },
          en: {
            consentModal: {
              title: "Privacy and cookie policy",
              description: "This site is powered by Cloudflare, which may use cookies for performance and security. By using our website, you consent to the use of these cookies. Details in our privacy policy.",
              closeIconLabel: "",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage preferences",
              footer: "<a href=\"https://pd-portfolio.net/privacy-policy/\">Privacy Policy</a>\n<a href=\"https://pd-portfolio.net/privacy-policy/#impressum\">Terms and conditions</a>",
            },
            preferencesModal: {
              title: "Consent Preferences Center",
              closeIconLabel: "Close modal",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
              serviceCounterLabel: "Service|Services",
              sections: [
                {
                  title: "Cookie Usage",
                  description: "This site is powered by Cloudflare, which may use cookies for performance and security. By using our website, you consent to the use of these cookies. Details in our privacy policy.",
                },
                {
                  title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                  description: "Essential cookies are crucial for the operation of our website. Without these cookies, our website would not function properly. These cookies enable basic functions such as page navigation and access to secure areas of the website. They cannot be disabled in our systems and are usually set in response to actions taken by you, such as setting your privacy preferences, logging in, or filling out forms.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Functionality Cookies",
                  description: "Functionality cookies allow a website to remember information that changes the way the website behaves or looks, like your preferred language or the region you are in. These cookies ensure that your preferences are retained for future visits, providing you with a personalized and improved user experience.",
                  linkedCategory: "functionality",
                },
                {
                  title: "More information",
                  description: "If you have any questions or concerns regarding our cookie policies, please feel free to contact us via email at <a href=\"mailto:contact@pd-portfolio.net\">contact@pd-portfolio.net</a>",
                },
              ],
            },
          },
        },
      },
    }),
  ],
  markdown: {
    // Use Shiki for syntax highlighting
    syntaxHighlight: 'shiki',
    // Shiki config
    shikiConfig: {
      wrap: true, // Enable word wrap in code blocks
      langAlias: {
        cjs: "javascript",
        shell: "bash",
      },
      // No need for defaultColor or custom transformers unless you want them
    },
    gfm: true,
    smartypants: true,
  },
});
