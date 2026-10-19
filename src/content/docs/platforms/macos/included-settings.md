---
title: macOS included settings
description: What is included in the macOS baseline.
sidebar:
  label: Included settings
  order: 2
appliesTo: '1.0'
lastReviewed: 2026-10-19
---

Primary information regarding adherence to security frameworks can be found in the [project README](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline#security-framework-adherence).

## Included settings

- Entra join and authentication via Platform SSO Secure Enclave
- Core device security restrictions
- Device encryption via FileVault
- Microsoft Edge (split into multiple policies for easier management)
- Microsoft Office (including OneDrive Known Folder Move)
- Microsoft Defender for Endpoint
- Update configuration
- Compliance policies (device health, device security and password)

Most policies are Settings Catalog and will show in **Devices > Configuration profiles**. The compliance policies will show in **Devices > Compliance**.

For a complete list of settings, see the [settings reference](/reference/settings/), which includes a searchable view of the baseline on [intunesettings.app](https://intunesettings.app/baseline/), and [SETTINGSOUTPUT.md](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/MACOS/SETTINGSOUTPUT.md) in the repo. The full policy changelog is in [CHANGELOG.md](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/MACOS/CHANGELOG.md).
