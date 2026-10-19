---
title: Windows known issues
description: Known issues reported by Intune for the Windows baseline, and their causes.
sidebar:
  label: Known issues
  order: 4
appliesTo: '4.0'
lastReviewed: 2026-10-19
---

:::note[Last verified against v4.0]
The policies and settings below were checked against the v4.0 policy files. The reported runtime behaviour (65000 errors and similar) is as originally observed and has not been re-tested.
:::

## Defender Antivirus - Additional Configuration

**Policy:** Win - OIB - Defender Antivirus - D - Additional Configuration

### Reporting shows 65000 errors

The setting "Oobe Enable Rtp And Sig Update" throws a 65000 error for a while following an Autopilot deployment but it does eventually resolve.

:::note
"Intel TDT Enabled" previously behaved the same way, but the setting was deprecated by Microsoft and removed from the baseline in v3.8.
:::

## Device Guard, Credential Guard and HVCI

**Policy:** Win - OIB - Device Security - U - Device Guard, Credential Guard and HVCI

### Reporting shows 65000 errors

It has been reported in [#30](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/issues/30) that this may be due to Windows licensing.

## Location and Privacy

**Policy:** Win - OIB - Device Security - D - Location and Privacy

### The setting "Let Apps Access Location Force Allow These Apps" may report an error

I added the new Outlook client (`Microsoft.OutlookForWindows_8wekyb3d8bbwe`) into the allow list. If you have this explicitly disabled in your environment, you may want to remove it from the list.

## Microsoft Store

**Policy:** Win - OIB - Microsoft Store - U - Configuration

### Reporting on the "Turn off the Store application" policy shows 65000 error or as Not Applicable

This setting does not function on Windows Pro/Business SKUs as per the [CSP documentation](https://learn.microsoft.com/en-gb/windows/client-management/mdm/policy-csp-admx-windowsstore?WT.mc_id=Portal-fx#removewindowsstore_2).
