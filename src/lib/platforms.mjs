import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const DEFAULT_RELEASES_URL =
	'https://raw.githubusercontent.com/SkipToTheEndpoint/OpenIntuneBaseline/main/releases.json';

/**
 * Loads a JSON file from the main OpenIntuneBaseline repo. `relativePath` is relative to the repo root.
 *
 * Resolution is anchored on where releases.json comes from, so releases.json and the policy manifests
 * always come from the same place:
 *  1. OIB_RELEASES_PATH - local releases.json (local development against a clone)
 *  2. OIB_RELEASES_URL  - override URL of releases.json
 *  3. The default raw.githubusercontent.com URL on the main branch
 *
 * Returns null on a missing file (HTTP 404 or ENOENT) if `optional` is set; any other failure throws.
 */
async function loadRepoJson(relativePath, { optional = false } = {}) {
	const localPath = process.env.OIB_RELEASES_PATH;
	if (localPath) {
		try {
			return JSON.parse(await readFile(join(dirname(localPath), relativePath), 'utf8'));
		} catch (error) {
			if (optional && error.code === 'ENOENT') return null;
			throw error;
		}
	}

	const releasesUrl = process.env.OIB_RELEASES_URL || DEFAULT_RELEASES_URL;
	const url = new URL(relativePath, releasesUrl).href;
	const response = await fetch(url);
	if (optional && response.status === 404) return null;
	if (!response.ok) {
		throw new Error(`Unable to load ${relativePath} from ${url} (HTTP ${response.status})`);
	}
	return response.json();
}

/** The build fails if releases.json can't be read, so unreleased platforms are never published by accident. */
const loadReleases = () => loadRepoJson('releases.json');

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
			folder: platform.folder,
			visibility,
			badge: badgeByVisibility[visibility],
			latestVersion: latestGA(platform.releases ?? [])?.version,
			releases: platform.releases ?? [],
		};
	});
}

/**
 * Loads `<folder>/PolicyManifest.json` for a platform id. Returns null if the platform has no manifest
 * (OIBID tracking doesn't exist for every platform yet).
 */
export async function getPolicyManifest(platformId) {
	const platform = (await getPlatforms()).find((p) => p.id === platformId);
	if (!platform?.folder) {
		throw new Error(`Unknown platform "${platformId}" (not found in releases.json)`);
	}
	return loadRepoJson(`${platform.folder}/PolicyManifest.json`, { optional: true });
}

/** Platform content folders (under src/content/docs/platforms) that must not be built. */
export function getHiddenPlatformIds(platforms) {
	return platforms.filter((p) => p.visibility === 'hidden').map((p) => p.id);
}
