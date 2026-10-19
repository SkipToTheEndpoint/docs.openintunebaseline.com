---
title: macOS overview
description: Intended use-case, licensing and scope of the OpenIntuneBaseline for macOS.
sidebar:
  label: Overview
  order: 1
appliesTo: '1.0'
lastReviewed: 2026-10-19
---

Developed in collaboration with [IntuneMacAdmins](https://www.intunemacadmins.com/).

:::note[v2.0 Beta]
A v2.0 beta of the macOS baseline is available on the [`macos-v2.0-beta`](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/tree/macos-v2.0-beta) branch. It is not yet documented here, and these pages describe the current v1.0 release.
:::

The baseline has been designed and tested on the following scenario.

## Intended use-case

### Device

- macOS 14.6 or above on Apple Silicon
- Enrolled into Apple Business Manager
- ADE deployment with the following configured:
  - Management settings:
    - Enroll with user affinity
    - Setup Assistant with modern authentication
    - Await final configuration: Yes
    - Locked configuration: Yes
  - Setup Assistant:
    - FileVault: Show
    - Touch ID: Show
- M365 Apps deployed via VPP

### User

- Cloud-only or hybrid identity with Entra ID as IdP
- MFA configured via Conditional Access

### Licensing

Either:

- M365 Business Premium, M365 E5/A5, or M365 E3/A3 + MDE P1/P2

**or**:

- Entra ID P1 or P2
- Office 365 E3/E5, A3/A5 or F3
- Intune P1
- Defender for Business or Endpoint P1/P2

:::important
Successful application of the baseline outside of this configuration cannot be guaranteed.
:::

## Where next

- [Importing the baseline](/getting-started/importing/)
- [Included settings](/platforms/macos/included-settings/)
- [Settings guidance](/platforms/macos/settings-guidance/), including the post-import configuration that is required

Please also visit [IntuneMacAdmins](https://www.intunemacadmins.com/) for additional information on macOS management with Intune.
