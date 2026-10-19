---
title: Windows supporting scripts
description: Optional scripts that supplement the Windows baseline.
sidebar:
  label: Scripts
  order: 7
appliesTo: '4.0'
lastReviewed: 2026-10-19
---

The [Scripts folder](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/tree/main/WINDOWS/Scripts) contains a few scripts that supplement the OIB, but are not requirements for the OIB to function.

All scripts create logs that can be found in the `%ProgramData%\Microsoft\IntuneManagementExtension\Logs` folder.

## Enable-AutoTimezone

### Purpose

I have tried to utilise available settings to make this work as part of the Timezone and Privacy policies, however it seems that the only way to get this to work is to run a script. This script enables the "Set time zone automatically" switch in **Settings > Time & language > Date & time**.

### Usage

- **Script type:** Platform script
- **Assign to:** Users
- **Script settings:**
  - Run this script using the logged on credentials: No
  - Enforce script signature check: No
  - Run script in 64-bit PowerShell host: Yes

## Trigger-PostOOBEUpdates

### Purpose

One big security concern with OOBE is that it doesn't ([currently](https://techcommunity.microsoft.com/blog/windows-itpro-blog/coming-soon-quality-updates-during-the-out-of-box-experience/4374291)) install updates. This means that most devices will be at least a month out of date when they are first used.

This script automatically triggers the following to update once a device gets to the desktop:

- Defender
- Microsoft Store
- Windows Update

The end result of this is that pretty shortly after, any pending updates will be installed, and the user notified a reboot is required, reducing the time between OOBE and the device being secure.

### Usage

- **Script type:** Platform script
- **Assign to:** Users
- **Script settings:**
  - Run this script using the logged on credentials: No
  - Enforce script signature check: No
  - Run script in 64-bit PowerShell host: Yes
