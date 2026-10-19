---
title: Windows included settings
description: What is included in the Windows baseline, supporting configuration and known limitations.
sidebar:
  label: Included settings
  order: 2
appliesTo: '4.0'
lastReviewed: 2026-10-19
---

## Included settings

- Core device security hardening
- Device encryption via BitLocker
- Google Chrome (note: policies are quite "anti-Chrome" to encourage the use of Edge)
- Microsoft Edge (split into multiple policies for easier management)
- Microsoft Office (including OneDrive Known Folder Move)
- Microsoft Defender for Endpoint (AV, Firewall, ASR Rules)
- Windows LAPS
- Windows Update for Business (Delivery Optimisation, Telemetry and WUfB Reports)
- Windows Update Rings (3-ring model of Pilot, UAT and Production)
- Windows Hello for Business

Almost all policies are Settings Catalog-backed and will show in **Devices > Configuration profiles**. The following appear in the **Endpoint security** section of Intune instead:

- Defender Antivirus
- BitLocker Encryption
- Windows Firewall
- Windows Hello for Business
- Windows LAPS

For a complete list of settings, see the [settings reference](/reference/settings/), which includes a searchable view of the baseline on [intunesettings.app](https://intunesettings.app/baseline/), and [SETTINGSOUTPUT.md](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS/SETTINGSOUTPUT.md) in the repo. The full policy changelog is in [CHANGELOG.md](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS/CHANGELOG.md).

## Known limitations

Due to the wildly differing nature of environments, it is not possible to create a "baseline" for AppLocker or Windows Defender Application Control (WDAC). While the baseline ensures standard users cannot elevate to install applications, apps that do not require elevation or install to a user's AppData folder may not be blocked.

## Supporting configuration

- **Windows Autopatch** - If your licensing supports it, I would **strongly** recommend implementing Autopatch for management of your Windows quality, driver and feature updates. See the [Autopatch overview](https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-overview).
- **Windows Update for Business Reports** - With an appropriate Azure subscription, a Log Analytics workspace can be created to monitor update compliance of devices. See the [WUfB reports overview](https://learn.microsoft.com/en-us/windows/deployment/update/wufb-reports-overview).
- **M365 Apps updates** - Enabling [Cloud Update](https://learn.microsoft.com/en-us/deployoffice/admincenter/cloud-update) through [config.office.com](https://config.office.com/officeSettings/serviceprofile) can ensure Office apps for Business/Enterprise remain up-to-date on the Monthly Enterprise Channel. Settings in the "Office - Update Settings" policy can remain as Cloud Update takes priority over any other Office management. Ensure the [Inventory](https://config.office.com/officeSettings/inventory) is enabled.

:::note
Further guidance on update configuration can be found in [Settings guidance](/platforms/windows/settings-guidance/).
:::
