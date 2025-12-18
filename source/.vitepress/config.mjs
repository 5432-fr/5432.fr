import { defineConfig } from 'vitepress'
import llmstxt from 'vitepress-plugin-llms'
import { version } from '../../package.json'

const currentDate = new Date();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PostgreSQL",
  titleTemplate: ':title',
  description: `Le site 5432.fr est une plateforme francophone dédiée à PostgreSQL,
    l’un des systèmes de gestion de bases de données relationnelles les plus avancés.`,
  srcExclude: ['public/**/*.md'],
  ignoreDeadLinks: [
    /^https?:\/\/localhost:*/,
  ],
  metaChunk: true,
  vite: {
    plugins: [llmstxt()]
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Ressources', items: [
        { text: 'Clients', link: '/clients', activeMatch: '^/clients/' },
        { text: 'Articles', link: '/articles/', activeMatch: '^/articles/' },
        { text: 'Extensions', link: '/extensions', activeMatch: '^/extensions/' },
        { text: 'Livres', link: '/livres', activeMatch: '^/livres/' },
        { text: 'Logiciels', link: '/logiciels', activeMatch: '^/logiciels/' },
        { text: 'Programmation', link: '/programmation', activeMatch: '^/programmation/' },
        { text: 'Services', link: '/services', activeMatch: '^/services/' },
      ]},
      { text: 'Documentation', items: [
        { text: 'PostgreSQL 18', link: 'https://docs.postgresql.fr/18/' },
        { text: 'PostgreSQL 17', link: 'https://docs.postgresql.fr/17/' },
        { text: 'PostgreSQL 16', link: 'https://docs.postgresql.fr/16/' },
        { text: 'PostgreSQL 15', link: 'https://docs.postgresql.fr/15/' },
        { text: 'PostgreSQL 14', link: 'https://docs.postgresql.fr/14/' }
      ]},
      { text: 'Liens', items: [
        { text: 'PostgreSQLFr', link: 'https://www.postgresql.fr/' },
        { text: 'Documentation', link: 'https://docs.postgresql.fr/' },
        { text: 'Forum', link: 'https://forums.postgresql.fr/' },
        { text: 'Planete PG', link: 'https://planete.postgresql.fr/' },
      ]},
      {
        text: `PG ${version}`,
        items: [
          { text: 'Téléchargement', items: [
            { text: 'Windows', link: 'https://www.postgresql.org/download/windows/' },
            { text: 'Mac OS', link: 'https://www.postgresql.org/download/macosx/' },
            { text: 'Linux', link: 'https://www.postgresql.org/download/linux/' },
          ]},
          { text: 'Installation', items: [
            { text: 'Windows', link: '/installation/pg-18-windows' },
            { text: 'Driver ODBC', link: '/installation/odbc-windows' }
          ]}
      ]}
    ],

    sidebar: [
      {
        text: 'Articles',
        items: [
          { text: 'Coût', link: '/articles/cout' },
          { text: 'Generalité', link: '/articles/generalite' },
          { text: 'Indexes', link: '/articles/indexes' },
          { text: 'Maintenance', link: '/articles/maintenance' },
          { text: 'Langage de procédures', link: '/articles/plangages' },
          { text: 'Replication', link: '/articles/replication' },
          { text: 'Sauvegarde', link: '/articles/sauvegarde' },
          { text: 'Types', link: '/articles/types' },
          { text: 'Fonctions',
            items: [
              { text: 'generate_series', link: '/articles/fonction-gs' },
            ],
          },
          { text: 'IvorySQL', link: '/articles/ivorysql' },
        ]
      },
      {
        text: 'Programmation',
        items: [
          { text: 'Langage C', link: '/programmation/c' },
          { text: 'C# Dotnet', link: '/programmation/csharp' },
          { text: 'Rust', link: '/programmation/rust' },
          { text: 'Java', link: '/programmation/java' },
          { text: 'PHP', link: '/programmation/php' },
          { text: 'Python', link: '/programmation/python' },
          { text: 'PLpgSQL', link: '/programmation/plpgsql' },
          { text: 'Powershell', link: '/programmation/powershell' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/ypY23QFEcn'},
      { icon: 'linkedin', link: 'https://www.linkedin.com/groups/13044096/' },
      { icon: 'twitter', link: 'https://x.com/5432Fr'},
      { icon: 'github', link: 'https://github.com/5432-fr/5432.fr' }
    ],
    footer: {
      message: 'Publier sous <a href="http://creativecommons.org/licenses/by-sa/4.0/deed.fr">CC BY-SA 4.0</a>.',
      copyright: `Copyright © 2016-${new Date().getUTCFullYear()} Christophe CHAUVET`
    },
    outline: {
      label: "Sommaire"
    },
    docFooter: {
      prev: false,
      next: false
    },
    search: {
      provider: 'local',
    },
    lastUpdated: {
      text: 'Mise à jour le',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    }
  },
  sitemap: {
    hostname: 'https://5432.fr'
  },
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  },
  cleanUrls: true,
  outDir: '../dist',
  lastUpdated: true,
  lang: 'fr-FR',
  head: [
    [
      'link',
      { rel: 'icon', type: 'image/png', href: '/postgresql-200x200.png' }
    ],
    [
      'link',
      { rel: 'apple-touch-icon', type: 'image/png', sizes:"200x200", href: '/postgresql-200x200.png' }
    ],
    [
      'script',
      { async: '', src: 'https://scripts.simpleanalyticscdn.com/latest.js' }
    ],
  ],
	transformPageData(pageData) {
    // Canonical url for index must be root
		const canonicalUrl = "https://5432.fr/" + pageData.relativePath.replace(/\.md$/, "").replace(/^index$/, "");

    let updtDate = new Date();
    // If no commit for a page (dev in progress), lastUpdated == NaN
    if (!isNaN(pageData.lastUpdated)) {
      updtDate = new Date(pageData.lastUpdated);
    }

		pageData.frontmatter.head ??= [];
		pageData.frontmatter.head.push([
			"link",
			{ rel: "canonical", href: canonicalUrl },
		]);
		pageData.frontmatter.head.push([
			"meta",
			{ property: "og:url", content: canonicalUrl },
		]);
    pageData.frontmatter.head.push([
			"meta",
			{ property: "og:image", content: 'https://5432.fr/postgresql-200x200.png' },
		]);
    pageData.frontmatter.head.push([
			"meta",
			{ name: "twitter:card", content: 'summary' },
		]);
    pageData.frontmatter.head.push([
			"meta",
			{ name: "twitter:site", content: '@5432Fr' },
		]);
    pageData.frontmatter.head.push([
			"meta",
			{ name: "twitter:image", content: 'https://5432.fr/postgresql-200x200.png' },
    ]);

    if (pageData.filePath === "index.md") {
      pageData.frontmatter.head.push([
        'script',
        {
          id: 'application-json',
          type: 'application/ld+json',
        },
        `{"@context":"https://schema.org", "@type":"WebSite", "name":"${pageData.title}", "url": "https://5432.fr/", "datePublished": "${currentDate.toISOString()}", "dateModified": "${updtDate.toISOString()}"}`,
      ]);
    } else {
      pageData.frontmatter.head.push([
        'script',
        {
          id: 'application-json',
          type: 'application/ld+json',
        },
        `{"@context":"https://schema.org", "@type":"Article", "name":"${pageData.title}", "datePublished": "${currentDate.toISOString()}", "dateModified": "${updtDate.toISOString()}"}`,
      ]);
    }
	},
})


