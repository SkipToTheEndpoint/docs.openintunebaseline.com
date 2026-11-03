// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightGithubAlerts from 'starlight-github-alerts';
import { getPlatforms } from './src/lib/platforms.mjs';

const platforms = await getPlatforms();

// One sidebar group per platform that is visible (public, beta, or preview). Hidden platforms are omitted.
const platformGroups = platforms
	.filter((p) => p.visibility !== 'hidden')
	.map((p) => ({
		label: p.name,
		badge: p.badge,
		collapsed: true,
		items: [{ autogenerate: { directory: `platforms/${p.id}` } }],
	}));

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.openintunebaseline.com',
	integrations: [
		starlight({
			title: 'OpenIntuneBaseline',
			description:
				'Documentation for the OpenIntuneBaseline - a community-driven, known-good security baseline for Microsoft Intune.',
			favicon: '/favicon.svg',
			logo: { src: './src/assets/logo.svg', alt: '' },
			customCss: ['./src/styles/oib.css'],
			components: { SocialIcons: './src/components/SocialIcons.astro' },
			head: [
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#0078d4' } },
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/favicon.svg' } },
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content:
							'https://repository-images.githubusercontent.com/493403016/52215ef7-95a7-4b8c-98b0-3dd33f0144e3',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content:
							'https://repository-images.githubusercontent.com/493403016/52215ef7-95a7-4b8c-98b0-3dd33f0144e3',
					},
				},
			],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/SkipToTheEndpoint/OpenIntuneBaseline',
				},
				{ icon: 'blueSky', label: 'Bluesky', href: 'https://bsky.app/profile/skiptotheendpoint.co.uk' },
			],
			editLink: {
				baseUrl: 'https://github.com/SkipToTheEndpoint/docs.openintunebaseline.com/edit/main/',
			},
			lastUpdated: true,
			plugins: [
				starlightGithubAlerts(),
				starlightLinksValidator({ errorOnRelativeLinks: false }),
			],
			sidebar: [
				{ label: 'Getting started', items: [{ autogenerate: { directory: 'getting-started' } }] },
				{ label: 'Platforms', items: platformGroups },
				{ label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
				{ label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
				{ label: 'FAQ', slug: 'faq' },
				{ label: 'Contributing', slug: 'contributing' },
			],
		}),
	],
});
