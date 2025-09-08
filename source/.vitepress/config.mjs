import { defineConfig } from 'vitepress'
import { version } from '../../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PostgreSQL Collection",
  description: `Le site 5432.fr est une plateforme francophone dédiée à PostgreSQL, 
    l’un des systèmes de gestion de bases de données relationnelles les plus avancés.`,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Ressources', items: [
        { text: 'Outils', link: '/outils', activeMatch: '^/outils/' },
        { text: 'Articles', link: '/articles/', activeMatch: '^/articles/' },
        { text: 'Extensions', link: '/extensions', activeMatch: '^/extensions/' },
        { text: 'Livres', link: '/livres', activeMatch: '^/livres/' },
        { text: 'Logiciels', link: '/logiciels', activeMatch: '^/logiciels/' },
        { text: 'Programmation', link: '/programmation', activeMatch: '^/programmation/' },
        { text: 'Services', link: '/services', activeMatch: '^/services/' },        
      ]}, 
      { text: 'Documentation', items: [
        { text: 'PostgreSQL 17', link: 'https://docs.postgresql.fr/17/' },
        { text: 'PostgreSQL 16', link: 'https://docs.postgresql.fr/16/' },
        { text: 'PostgreSQL 15', link: 'https://docs.postgresql.fr/15/' },
        { text: 'PostgreSQL 14', link: 'https://docs.postgresql.fr/14/' },
        { text: 'PostgreSQL 13', link: 'https://docs.postgresql.fr/13/' }
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
            { text: 'Windows', link: '/installation/pg-17-windows' }
          ]}          
      ]}      
    ],

    sidebar: [
      {
        text: 'Articles',
        items: [
          { text: 'Generalité', link: '/articles/generalite' },
          { text: 'Indexes', link: '/articles/indexes' },
          { text: 'Maintenance', link: '/articles/maintenance' },
          { text: 'Replication', link: '/articles/replication' },
          { text: 'Sauvegarde', link: '/articles/sauvegarde' },
          { text: 'Types', link: '/articles/types' },
        ]
      },
      {
        text: 'Programmation',
        items: [
          { text: 'Langage C', link: '/programmation/c' },
          { text: 'Java', link: '/programmation/java' },
          { text: 'PHP', link: '/programmation/php' },
          { text: 'Python', link: '/programmation/python' },
          { text: 'PLpgSQL', link: '/programmation/plpgsql' },
        ]        
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/5432-fr/5432.fr' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/groups/13044096/' }
    ],
    footer: {
      message: 'Released under <a href="http://creativecommons.org/licenses/by-sa/4.0/deed.fr">CC BY-SA 4.0</a>.',
      copyright: `Copyright © 2016-${new Date().getUTCFullYear()} Christophe Chauvet` 
    },
    search: {
      provider: 'local',
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }        
  },
  sitemap: {
    hostname: 'https://5432.fr'
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
      'script',
      { async: '', src: 'https://scripts.simpleanalyticscdn.com/latest.js' }
    ],
  ],
	transformPageData(pageData) {
		const canonicalUrl =
			`https://5432.fr/${pageData.relativePath}`.replace(/\.md$/, "");

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
	},  
})

