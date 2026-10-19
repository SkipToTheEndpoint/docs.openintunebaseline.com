---
title: Windows 365 overview
description: Intended use-case, licensing and scope of the OpenIntuneBaseline for Windows 365.
sidebar:
  label: Overview
  order: 1
appliesTo: '1.0'
lastReviewed: 2026-10-19
---

The baseline has been designed for, and tested on the following.

## Intended use-case

### Device

- Windows 11 Enterprise 23H2 gallery image
- W365 provisioning policy configuration:
  - License type: Enterprise
  - Join type: Microsoft Entra Joined
  - Network: Microsoft hosted network
  - Use Microsoft Entra single sign-on: Yes

### User

- Cloud-only or hybrid identity with Entra ID as IdP
- MFA configured via Conditional Access
- User is not an administrator

### Licensing

Either:

- M365 Business Premium, M365 E5/A5, or M365 E3/A3 + MDE P1/P2

**or**:

- Entra ID P1 or P2
- Office 365 E3/E5, A3/A5 or F3
- Intune P1
- Defender for Business or Endpoint P1/P2

Plus an appropriate Windows 365 Enterprise SKU.

Access to the W365 host has been tested using the Windows App via a client also running the Windows OIB.

:::note
The Windows 365 OIB is designed to work as **an addition** to the [Windows OIB](/platforms/windows/). It is recommended to assign the W365 host all Windows OIB policies with the exception of:

- BitLocker
- Device Health compliance policy

This can be achieved using group assignments or Intune filters.
:::

:::caution
The Windows 365 OIB is not designed to protect corporate data if accessed via a **non-corporate** device.
:::

## Where next

- [Importing the baseline](/getting-started/importing/)
- [Included settings](/platforms/windows365/included-settings/)
