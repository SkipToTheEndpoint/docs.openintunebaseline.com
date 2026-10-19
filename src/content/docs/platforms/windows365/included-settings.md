---
title: Windows 365 included settings
description: What is included in the Windows 365 baseline, and the Microsoft guidance it was built from.
sidebar:
  label: Included settings
  order: 2
appliesTo: '1.0'
lastReviewed: 2026-10-19
---

Primary information regarding adherence to security frameworks can be found in the [project README](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline#security-framework-adherence).

The Windows 365 OIB has been created with the following Microsoft documentation as guidance:

- [Configure single sign-on](https://learn.microsoft.com/en-us/windows-365/enterprise/configure-single-sign-on)
- [Security guidelines](https://learn.microsoft.com/en-us/windows-365/enterprise/security-guidelines)
- [Manage RDP device redirections](https://learn.microsoft.com/en-us/windows-365/enterprise/manage-rdp-device-redirections)
- [RDP Shortpath for public networks](https://learn.microsoft.com/en-us/windows-365/enterprise/rdp-shortpath-public-networks)

## Included settings

- Connectivity configuration
- Resource redirection, including restricting clipboard transfer from server to client
- W365-specific Device Health compliance policy

The connectivity and resource redirection policies are Settings Catalog and will show in **Devices > Configuration profiles**. The compliance policy will show in **Devices > Compliance**.

For a complete list of settings, see the [settings reference](/reference/settings/), which includes a searchable view of the baseline on [intunesettings.app](https://intunesettings.app/baseline/), and [SETTINGSOUTPUT.md](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS365/SETTINGSOUTPUT.md) in the repo. The policy changelog is in [CHANGELOG.md](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS365/CHANGELOG.md).
