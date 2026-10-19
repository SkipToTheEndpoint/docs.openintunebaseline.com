import { readFile } from 'node:fs/promises';

const DEFAULT_RELEASES_URL =
	'https://raw.githubusercontent.com/SkipToTheEndpoint/OpenIntuneBaseline/main/releases.json';

/**
 * Loads releases.json from the main OpenIntuneBaseline repo.
 *
 * Resolution order:
 *  1. OIB_RELEASES_PATH - local file (local development against a clone)
 *  2. OIB_RELEASES_URL  - override URL
 *  3. The default raw.githubusercontent.com URL on the main branch
 *
 * The build fails if none can be read, so unreleased platforms are never published by accident.
 */
async function loadReleases() {
	const localPath = process.env.OIB_RELEASES_PATH;
	if (localPath) {
		return JSON.parse(await readFile(localPath, 'utf8'));
	}

	const url = process.env.OIB_RELEASES_URL || DEFAULT_RELEASES_URL;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Unable to load releases.json from ${url} (HTTP ${response.status})`);
	}
	return response.json();
}

/**
 * Visibility states:
 *  - public:  status is "available" with at least one non-beta release
 *  - beta:    has releases, but only prereleases/beta (shown with a Beta badge)
 *  - hidden:  no releases at all - excluded from the build entirely
 *  - preview: would be hidden, but OIB_SHOW_HIDDEN=true (preview deployments and local dev)
 */
function getVisibility(platform, showHidden) {
	const releases = platform.releases ?? [];
	if (releases.length === 0) {
		return showHidden ? 'preview' : 'hidden';
	}
	const hasGA = releases.some((r) => !r.prerelease && r.channel !== 'beta');
	if (platform.status === 'available' && hasGA) {
		return 'public';
	}
	return 'beta';
}

function latestGA(releases) {
	return [...releases]
		.filter((r) => !r.prerelease && r.channel !== 'beta')
		.sort((a, b) => String(b.releaseDate).localeCompare(String(a.releaseDate)))[0];
}

const badgeByVisibility = {
	beta: { text: 'Beta', variant: 'caution' },
	preview: { text: 'Unreleased', variant: 'danger' },
};

export async function getPlatforms() {
	const manifest = await loadReleases();
	const showHidden = process.env.OIB_SHOW_HIDDEN === 'true';

	return manifest.platforms.map((platform) => {
		const visibility = getVisibility(platform, showHidden);
		return {
			id: platform.id,
			name: platform.name,
			visibility,
			badge: badgeByVisibility[visibility],
			latestVersion: latestGA(platform.releases ?? [])?.version,
			releases: platform.releases ?? [],
		};
	});
}

/** Platform content folders (under src/content/docs/platforms) that must not be built. */
export function getHiddenPlatformIds(platforms) {
	return platforms.filter((p) => p.visibility === 'hidden').map((p) => p.id);
}
