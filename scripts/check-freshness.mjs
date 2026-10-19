// Warns when a platform page's `appliesTo` version is behind the latest release in releases.json.
// Usage: node scripts/check-freshness.mjs [--strict]
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPlatforms } from '../src/lib/platforms.mjs';

const strict = process.argv.includes('--strict');
const root = fileURLToPath(new URL('../src/content/docs/platforms/', import.meta.url));
const platforms = new Map((await getPlatforms()).map((p) => [p.id, p]));

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) {
			// Archived version folders are expected to be behind.
			if (entry.name !== 'archive') yield* walk(path);
		} else if (/\.mdx?$/.test(entry.name)) {
			yield path;
		}
	}
}

let stale = 0;
for await (const file of walk(root)) {
	const platformId = relative(root, file).split(sep)[0];
	const platform = platforms.get(platformId);
	const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(await readFile(file, 'utf8'))?.[1] ?? '';
	const appliesTo = /^appliesTo:\s*['"]?([\w.]+)['"]?\s*$/m.exec(frontmatter)?.[1];

	if (!platform?.latestVersion || !appliesTo) continue;
	if (appliesTo !== platform.latestVersion) {
		stale++;
		console.warn(`STALE  ${relative(process.cwd(), file)}: appliesTo ${appliesTo}, latest is ${platform.latestVersion}`);
	}
}

console.log(stale === 0 ? 'All versioned pages are up to date.' : `${stale} page(s) behind the latest release.`);
if (strict && stale > 0) process.exit(1);
