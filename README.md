# docs.openintunebaseline.com

Source for the [OpenIntuneBaseline](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline) documentation site, built with [Starlight](https://starlight.astro.build) (Astro) and hosted on Cloudflare Pages.

The baseline itself (policies, changelogs, `releases.json`, `PolicyManifest.json`) lives in the main repo. This repo only contains prose and the site tooling.

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # production build + internal link validation
npm run check:freshness
```

Node 22 or newer is required.

## Release-aware visibility

The build reads `releases.json` from the main OIB repo (`main` branch) and decides which platforms are published:

| State | Rule | Result |
|---|---|---|
| Public | `status: available` and at least one non-beta release | Published |
| Beta | Has releases, but only prerelease/beta | Published with a **Beta** badge |
| Hidden | No releases | Pages under `src/content/docs/platforms/<id>/` are **excluded from the build** (no page, sidebar entry, search result or sitemap entry) |

Platform `<id>` folders must match the `id` in `releases.json` (`windows`, `windows365`, `macos`, `ios`, `android`, `byod`). A platform appears automatically as soon as a release is listed for it.

The link validator fails the build if a public page links to a hidden one. Hidden content is still visible in this public Git repo - it is unpublished, not secret.

### Environment variables

| Variable | Purpose |
|---|---|
| `OIB_RELEASES_PATH` | Read `releases.json` from a local file, e.g. `C:\Git\OpenIntuneBaseline\releases.json` |
| `OIB_RELEASES_URL` | Override the URL `releases.json` is fetched from |
| `OIB_SHOW_HIDDEN=true` | Build hidden platforms too (badged **Unreleased**). Use for Cloudflare preview deployments and local drafting |

The build fails if `releases.json` cannot be read, so it can never publish unreleased platforms by accident.

## Versioned pages

Each platform is versioned independently. Pages that are version-sensitive carry frontmatter:

```yaml
appliesTo: '4.0'        # OIB release the page was verified against
lastReviewed: 2026-10-19
```

`npm run check:freshness` warns when `appliesTo` is behind the latest release in `releases.json` (`--strict` makes it fail). When a platform ships a new major version, copy the version-sensitive pages to `platforms/<id>/archive/vX/` before updating the originals; the `archive` folders are skipped by the freshness check.

## Deployment (Cloudflare Pages)

Use the Cloudflare Pages Git integration:

- Build command: `npm run build`, output directory: `dist`, Node 22
- Custom domain: `docs.openintunebaseline.com`
- Preview environment variable: `OIB_SHOW_HIDDEN=true` (leave unset for production)
- Create a deploy hook and store it as the `CLOUDFLARE_PAGES_DEPLOY_HOOK` repo secret. `.github/workflows/rebuild.yml` triggers it nightly so release changes in the main repo are picked up.

## Authoring notes

- GitHub-style alerts (`> [!NOTE]`) and Starlight asides (`:::note`) both work.
- Prefer relative site links (`/faq/`) so the validator can check them.
