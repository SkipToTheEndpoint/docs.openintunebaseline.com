---
title: Updating an existing deployment
description: How to bring an existing OIB deployment up to date, and how OIBIDs and the policy manifest help.
sidebar:
  order: 4
appliesTo: '4.0'
lastReviewed: 2026-10-19
---

The OIB is a starting point, and new releases will change policies, add new ones and deprecate others. There is no requirement to re-deploy the whole baseline whenever a new version is released, and you should never blindly overwrite policies you have customised.

:::note[Windows only, for now]
OIBID tracking and the `PolicyManifest.json` file currently exist for **Windows** (from v3.8) and the **BYOD** App Protection policies. Other platforms don't have a manifest yet.
:::

## What changed in a release

1. Read the platform's changelog ([Windows](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS/CHANGELOG.md), [macOS](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/MACOS/CHANGELOG.md), [Windows 365](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS365/CHANGELOG.md)). It lists every added, changed and removed policy and setting.
2. Compare the **policy version** in your tenant to the version in the repo. The `vX.Y` suffix in the policy name changes when the policy changes.
3. Review the change against any customisation you have made before updating anything.

## OIBIDs and the policy manifest

Every policy carries an OIBID in its `description` in the format `OIBID:<UUID>`. The platform's `PolicyManifest.json` (for example [`WINDOWS/PolicyManifest.json`](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS/PolicyManifest.json)) records, for each policy:

| Field | Meaning |
|---|---|
| `oibId` | The tracking GUID currently in the policy `description`. |
| `name` | The current policy name, including its version suffix. |
| `addedIn` | The platform version the policy was first added in. |
| `status` | `active` or `deprecated`. |
| `supersededBy` | Policies that replace this one. |
| `previousVersions` | Earlier versions of the policy, each with the OIB version and the OIBID it had then. |

A policy is identified by its name with the version suffix removed. When a policy's version changes, it gets a **new** OIBID and the old one is recorded in `previousVersions`. This means that an OIBID in your tenant that matches an entry in `previousVersions`, rather than the current `oibId`, is an out-of-date copy of that policy.

:::danger[Do not remove or edit the OIBID]
Removing or editing the `OIBID:` token in a description breaks version tracking for that policy.
:::

## Ways to update

There is no single required method. Depending on your tooling:

- **OIB Deployer** - the [OIB Deployer](https://deploy.openintunebaseline.com/) can check for existing OIB policies in your tenant and highlight missing or updated policies.
- **IntuneManagement** - the import has an **Update** option, which is a preview feature in that tool. See the [IntuneManagement](https://github.com/Micke-K/IntuneManagement) documentation.
- **TenuVault** - its [Existing Deployment](https://docs.tenuvault.com/baselines/quick-start/) workflow compares the OIB policies in your tenant with a selected OIB version, matching on the OIBID first, and can deploy missing or outdated policies. Some features, such as updating policies in place, require a paid plan.
- **Manually** - import the new version of a policy, move your assignments across, and retire the old one. You can also add the OIBID to an existing policy's `description` by hand, so tools can match it.

:::caution
Whichever method you use, test updates in a pilot group first, and re-apply any customisations you had made to the previous version.
:::

## Deprecated and removed policies

When a policy is `deprecated` or superseded, check the changelog for the reason and the replacement. Removing a policy from Intune does not always remove the settings it applied from devices, because some CSPs leave settings behind ("tattooing"). See the [FAQ](/faq/#ive-removed-setting-x-and-its-still-applying) for more.
