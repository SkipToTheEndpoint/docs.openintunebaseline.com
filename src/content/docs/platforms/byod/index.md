---
title: BYOD App Protection overview
description: Intended use-case, prerequisites and scope of the OpenIntuneBaseline BYOD App Protection policies.
sidebar:
  label: Overview
  order: 1
appliesTo: '2.0'
lastReviewed: 2026-11-03
---

The BYOD baseline is a pair of Intune **App Protection policies**, one for Android and one for iOS/iPadOS, designed to protect corporate data in Microsoft apps on personal (unmanaged) devices. It does not enrol or manage the device itself.

| Policy | Platform |
|---|---|
| `Android - OIB - App Protection - U - BYOD L2+ - v2.0` | Android |
| `iOS - OIB - App Protection - U - BYOD L2+ - v2.0` | iOS/iPadOS |

The policies are named **BYOD L2+** because they primarily follow **Level 2 - Enterprise enhanced data protection** of Microsoft's [Data protection framework using app protection policies](https://learn.microsoft.com/en-us/intune/app-management/protection/data-protection-framework), with a small number of settings raised to Level 3 and a few Level 2 settings intentionally left unconfigured. See [included settings](/platforms/byod/included-settings/) for the deviations.

## Prerequisites

### Assignment filter

The v2.0 policies target **all app types**, so without a filter they would also apply to managed devices. Create a *Managed apps* [assignment filter](https://learn.microsoft.com/en-us/intune/fundamentals/filters/overview) for each platform (Android and iOS/iPadOS) with the following rule:

```text
(app.deviceManagementType -eq "Unmanaged")
```

Assign each policy to your target users or groups, and set the matching filter to **Include filtered devices in assignment**.

:::caution
Without this filter, the App Protection policies apply to all devices, including managed devices, which is unlikely to be the intended behaviour for BYOD scenarios.
:::

### Conditional Access

- A Conditional Access policy that requires an **app protection policy** for iOS and Android devices. See [Require an app protection policy with Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-all-users-device-compliance).
- Legacy authentication blocked. See [Block legacy authentication with Conditional Access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication).

### Minimum OS and patch version

Level 2 of the framework recommends **Min OS version** (iOS and Android) and **Min patch version** (Android) conditional launch requirements. These are not configured in the OIB policies because they need updating every month. Use [IntuneComplianceMaintainer](https://github.com/SkipToTheEndpoint/IntuneComplianceMaintainer) to set and maintain them automatically on the deployed App Protection policies.

## Where next

- [Importing the baseline](/getting-started/importing/)
- [Included settings](/platforms/byod/included-settings/)
- [Updating an existing deployment](/getting-started/updating/), if you are moving from v1
