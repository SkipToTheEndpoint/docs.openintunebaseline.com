---
title: Settings reference
description: Where to find the full list of settings configured by each OIB platform.
sidebar:
  order: 2
lastReviewed: 2026-10-19
---

Rather than duplicate every setting here, the settings configured by the baseline are documented in two places.

## Search the baseline

The [OIB baseline search on intunesettings.app](https://intunesettings.app/baseline/) is a searchable reference of the settings in the OIB, covering all published OIB platform releases. It is built by Lewis Barry (the [source is on GitHub](https://github.com/Lewis-Barry/IntuneSettingsCatalogViewer)) and enhanced by Roy Klooster, using data sourced from the Microsoft Graph API. It is not affiliated with Microsoft and is not maintained by the OIB.

[intunesettings.app](https://intunesettings.app/) also documents Intune settings more widely.

## Complete settings output per platform

Each platform folder in the repo contains a `SETTINGSOUTPUT.md` listing the settings of every policy:

- [Windows](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS/SETTINGSOUTPUT.md)
- [macOS](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/MACOS/SETTINGSOUTPUT.md)
- [Windows 365](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS365/SETTINGSOUTPUT.md)

## Policy tracking data

Each platform's `PolicyManifest.json` lists every policy with its OIBID, the version it was added in, its status and its previous versions. See [Updating an existing deployment](/getting-started/updating/).

## Release history

See [Releases](/reference/releases/) for the versions of each platform.
