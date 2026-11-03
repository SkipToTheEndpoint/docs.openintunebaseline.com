---
title: BYOD included settings
description: How the BYOD App Protection policies differ from Level 2 of the Microsoft data protection framework.
sidebar:
  label: Included settings
  order: 2
appliesTo: '2.0'
lastReviewed: 2026-11-03
---

The policies are based on the Microsoft [Data protection framework using app protection policies](https://learn.microsoft.com/en-us/intune/app-management/protection/data-protection-framework). This page summarises where they differ from **Level 2**. The full list of changes between v1 and v2.0 is in the [changelog](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/BYOD/CHANGELOG.md).

## Differences from Level 2

### Targeted apps

The policies target **All Microsoft Apps** rather than only the framework's Core Microsoft Apps group. This protects every Intune SDK-enabled Microsoft app without the list needing manual maintenance. The list is maintained by Microsoft, so the apps it contains may change over time.

### Data protection

- **Printing org data: Block** (iOS and Android, raised to Level 3). Personal devices may be able to print to unmanaged or home printers.
- **iOS - Send org data to other apps:** *Policy managed apps with Open-In/Share filtering*. This is allowed at Level 2 and means the share sheet only shows managed apps.
- **Receive data from other apps** is set to **All apps** (Level 2). With this value Intune greys out *Open data into Org documents* and *Allow users to open data from selected services*, and does not enforce them. The exported JSON still contains values for these settings, but they only apply if you change *Receive data from other apps* to **Policy managed apps** (Level 3).
- **iOS - Apple Intelligence settings** (Genmoji, Writing Tools, Screen capture) and widget content sync are left at their default (not blocked), as the framework makes no recommendation for them.

### Access requirements

- **Simple PIN: Block** (iOS and Android, raised to Level 3).
- **Minimum PIN length: 6** (iOS and Android, raised from the Level 2 recommendation of 4).
- **Android - Class 3 Biometrics (Android 9.0+): Require**, with **Override Biometrics with PIN after biometric updates: Require** (raised to Level 3).

### Conditional launch

- **Jailbroken/rooted devices: Wipe data** (iOS and Android, raised to Level 3).
- **Min OS version** and **Min patch version** are recommended at Level 2 but not configured. See [minimum OS and patch version](/platforms/byod/#minimum-os-and-patch-version).
- **Mobile Threat Defense** (*Max allowed device threat level*) is not configured. It is a Level 3 setting and requires an MTD connector.

## Full settings

For a complete list of settings, see the [settings reference](/reference/settings/), which includes a searchable view of the baseline on [intunesettings.app](https://intunesettings.app/baseline/), and [SETTINGSOUTPUT.md](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/BYOD/SETTINGSOUTPUT.md) in the repo. The [policy list](/platforms/byod/policies/) lists every policy in the baseline.

:::note
`SETTINGSOUTPUT.md` is a generated export and doesn't include some settings, such as **Photo Library** in the save/open services lists and the Android device conditions (Play Integrity, threat scan on apps, device lock, Samsung Knox attestation). Use the JSON in [`BYOD/IntuneManagement/AppProtection`](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/tree/main/BYOD/IntuneManagement/AppProtection) as the source of truth.
:::
