import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { getHiddenPlatformIds, getPlatforms } from './lib/platforms.mjs';

const hiddenPlatforms = getHiddenPlatformIds(await getPlatforms());

// Equivalent to Starlight's docsLoader(), plus exclusion of platforms that have no release yet.
const docsLoaderWithVisibility = glob({
	base: './src/content/docs',
	pattern: [
		'**/[^_]*.{md,mdx}',
		...hiddenPlatforms.map((id) => `!platforms/${id}/**`),
	],
});

export const collections = {
	docs: defineCollection({
		loader: docsLoaderWithVisibility,
		schema: docsSchema({
			extend: z.object({
				// OIB release this page was last verified against, e.g. "4.0". Checked by `npm run check:freshness`.
				appliesTo: z.string().optional(),
				lastReviewed: z.coerce.date().optional(),
			}),
		}),
	}),
};
