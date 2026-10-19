---
title: Entra dynamic group examples
description: Example dynamic group rules for targeting OIB policies with Microsoft Entra ID.
sidebar:
  order: 1
lastReviewed: 2026-10-19
---

Below are some examples of dynamic group rules that can be used to create groups in Microsoft Entra ID.

:::tip
Please consult the Microsoft documentation, which has great guidance: [Create simpler and faster rules for dynamic groups](https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-rule-more-efficient).

Where you can, prefer [Intune filters](/guides/intune-filters/) over dynamic groups for targeting. They are far more performant.
:::

:::caution[Entra and Intune use different values]
Entra dynamic group rules and Intune filter rules are not interchangeable. For example, device ownership is `Company` in an Entra rule but `Corporate` in an Intune filter, and join type is `AzureAD` / `ServerAD` in an Entra rule but `Azure AD joined` / `Hybrid Azure AD joined` in an Intune filter.
:::

## Windows

### Global

#### All enabled, corporate, cloud-native or hybrid Windows devices managed by either Intune or ConfigMgr co-management

```text
(device.accountEnabled -eq True) and (device.deviceManagementAppId -in ["0000000a-0000-0000-c000-000000000000", "54b943f8-d761-4f8d-951e-9cea1846db5a"]) and (device.deviceTrustType -in ["AzureAD", "ServerAD"]) and (device.deviceOwnership -eq "Company") and (device.deviceOSType -eq "Windows")
```

### Autopilot

#### All Autopilot devices

```text
(device.devicePhysicalIDs -any (_ -startsWith "[ZTDID]"))
```

#### All Autopilot registered devices with no group tag

```text
(device.devicePhysicalIDs -any (_ -startsWith "[ZTDID]")) and (device.devicePhysicalIds -all (_ -notStartsWith "[OrderID]:"))
```

#### Autopilot registered devices with a specific group tag

```text
(device.devicePhysicalIDs -any (_ -startsWith "[ZTDID]")) and (device.devicePhysicalIds -any (_ -eq "[OrderID]:%GroupTag%"))
```

#### All Autopilot _and_ Autopilot Device Preparation devices

```text
(device.memberof -any (group.objectId -in ['APv1 Dynamic Group GUID','APv2 Assigned Group GUID']))
```

:::note
The `memberOf` attribute in dynamic membership rules is currently a **preview** feature, and isn't supported in the rule builder UI. Define the rule using the rule editor (advanced syntax). See [Configure dynamic membership groups with the memberOf operator](https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership).
:::

## macOS

#### All enabled, corporate, Intune-managed, Platform SSO-joined macOS devices

```text
(device.accountEnabled -eq True) and (device.managementType -eq "MDM") and (device.deviceTrustType -eq "AzureAD") and (device.deviceManufacturer -eq "Apple") and (device.deviceOSType -eq "MacMDM") and (device.deviceOwnership -eq "Company")
```
