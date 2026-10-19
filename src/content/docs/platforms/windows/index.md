---
title: Windows overview
description: Intended use-case, licensing and scope of the OpenIntuneBaseline for Windows.
sidebar:
  label: Overview
  order: 1
appliesTo: '4.0'
lastReviewed: 2026-10-19
---

The baseline has been designed for, and tested on the following.

## Intended use-case

### Device

- Windows 11 Enterprise (though it should also work on Windows 10 Enterprise)
- Enrolled into Autopilot
- Autopilot configuration:
  - Deployment mode: User Driven
  - Join type: Microsoft Entra Joined
  - User account type: Standard
- Single-user device

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

:::note
Some settings may report errors or as "Not Applicable" if the device is running Pro/Business rather than Enterprise.
:::

:::caution
While many policies should work fine on a multi-user (shared) device, there are additional considerations required for these that are not covered by this baseline.
:::

## Hybrid join

The Windows OIB has **not** been designed for hybrid scenarios, and will likely **not work as expected or intended** on hybrid-joined devices.

It is _**Microsoft's recommendation**_ that you [move to cloud-native for new devices](https://aka.ms/CloudNativeEndpoints).

I would personally recommend maintaining GPO for on-prem devices, and using Intune for cloud-native devices, with the exception of things like Endpoint Analytics, Windows Update for Business and Application Deployment. Applying Intune policy over the top of GPO can cause unexpected results, and should be avoided where possible. Similarly, GPOs may well leave registry keys behind that can cause unexpected results when applying Intune policy.

:::important
Successful application of the baseline outside of this configuration cannot be guaranteed.
:::

## Where next

- [Importing the baseline](/getting-started/importing/)
- [Included settings](/platforms/windows/included-settings/)
- [Security posture and framework deviations](/platforms/windows/security-posture/)
- [Settings guidance](/platforms/windows/settings-guidance/)
- [Known issues](/platforms/windows/known-issues/)
- [Baseline comparison](/platforms/windows/baseline-comparison/)
- [Supporting scripts](/platforms/windows/scripts/)
- [Frequently asked questions](/faq/)
