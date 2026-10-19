---
title: Versioning and release channels
description: How OIB versions, release channels and policy tracking work.
sidebar:
  order: 3
lastReviewed: 2026-10-19
---

Each platform has its own folder in the repo, with its own README, changelog, baseline JSON and supporting information, and each platform is versioned independently.

## Version numbers

Version numbers primarily follow the format `Major.Minor`, occasionally using `Major.Minor.Patch` if something fits in the "bug fix" category.

There are two levels of version:

- **Platform version** - the release of the baseline for a platform, for example Windows v4.0. Platform releases are tagged in the repo (for example `windows-v4.0`) and described in the platform's changelog.
- **Policy version** - the `vX.Y` suffix at the end of every policy name, for example `Win - OIB - SC - Microsoft Store - U - Configuration - v3.3`. A policy's version only changes when that policy changes, so a platform release can contain policies with many different versions. See the [naming convention](/getting-started/naming-convention/).

## Release channels

Every release is assigned a channel:

| Channel | Meaning |
|---|---|
| `stable` | Tested, fully-functioning release. |
| `unstable` | Outdated, possibly non-functional release. |
| `beta` | Testing release, waiting for community input. |

Beta releases are published from a pre-release branch (for example `ios-v1.0-beta`) rather than a tag. Treat them as exactly that: test thoroughly and expect changes before the first stable release.

:::caution
Do not deploy `unstable` or `beta` releases to production tenants without thorough review and testing. `unstable` releases may no longer work as intended with current Intune and operating system versions.
:::

## Where release information lives

The release history of every platform is published in machine-readable form in [`releases.json`](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/releases.json). The [releases reference](/reference/releases/) on this site is generated from it, and so is the list of platforms shown in the navigation.

A platform that is in development and has no release yet is not published on this site until a release is listed for it.

## Policy tracking (OIBIDs)

From Windows v3.8, every policy has a tracking GUID, the **OIBID**, appended to its `description` in the format `OIBID:<UUID>`. It is tracked in the platform's `PolicyManifest.json` and lets tools reliably identify existing OIB policies without depending on the policy name.

:::danger[Do not remove or edit the OIBID]
Removing or editing the `OIBID:` token breaks version tracking for that policy.
:::

See [Updating an existing deployment](/getting-started/updating/) for how this is used.
