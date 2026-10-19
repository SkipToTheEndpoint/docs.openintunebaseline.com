---
title: Intune filter examples
description: Example Intune assignment filter rules for targeting OIB policies.
sidebar:
  order: 2
lastReviewed: 2026-10-19
---

:::tip
Please review the Microsoft documentation for all available properties and operators when creating filters: [App and device properties, operators, and rule editing when creating filters in Microsoft Intune](https://learn.microsoft.com/en-us/mem/intune/fundamentals/filters-device-properties).
:::

:::important
Not all workloads support filters. Please review the [list of platforms, policies, and app types supported by filters in Microsoft Intune](https://learn.microsoft.com/en-us/mem/intune/fundamentals/filters-supported-workloads).
:::

Using filters in Intune is **far** more performant than using dynamic Entra groups.

|  | **Do** | **Don't** |
|---|---|---|
| **Use the built-in virtual groups** | ✅ Use the All users and All devices virtual groups instead of creating your own version of all users/all devices using Microsoft Entra dynamic groups. | ❌ Don't create your own "All users" or "All devices" dynamic groups for policy and app targeting in Intune. |
| **Reuse groups** | ✅ Reuse the same group objects for assigning multiple policies. | ❌ Don't create duplicate copies of the same group to target different policies.<br>❌ Don't create dedicated "App groups" or "Policy groups". |
| **Make incremental group changes** | ✅ Be careful with large group nesting changes in Microsoft Entra ID. | ❌ Don't make large group nesting changes all at once. |
| **Use filters to include and exclude** | ✅ Use filters to achieve the correct user and device combination for targeting. | ❌ Don't mix user groups and device groups when using Include and Exclude groups. |

Source: [Performance recommendations for grouping, targeting, and filtering in large Microsoft Intune environments](https://learn.microsoft.com/en-us/mem/intune/fundamentals/filters-performance-recommendations).

:::caution[Intune filters and Entra rules use different values]
Intune filter rules are not interchangeable with [Entra dynamic group rules](/guides/entra-dynamic-groups/). For example, device ownership is `Corporate` in an Intune filter but `Company` in an Entra rule.
:::

## Generic

:::note
These are example filter syntaxes, not an exhaustive list. Filters can be combined to create more complex requirements.

Filters are created associated with a specific platform. You can't use a "Windows 10 and later" filter in an iOS scenario, for example.
:::

### Device ownership

**Corporate devices**

```text
(device.deviceOwnership -eq "Corporate")
```

**Personal devices**

```text
(device.deviceOwnership -eq "Personal")
```

:::tip
Do yourself a favour: keep personal devices out of Intune!
:::

### Device name

**Devices with a specific name**

```text
(device.deviceName -eq "%DeviceName%")
```

:::tip
Can be handy for quick troubleshooting or testing scenarios.
:::

### OS version

**Devices on a specific OS version**

```text
(device.operatingSystemVersion -eq "%OSVersion%")
```

Example: `(device.operatingSystemVersion -eq "17.6.1")`

**Devices greater than or equal to a minimum OS version**

```text
(device.operatingSystemVersion -ge "%MinimumOSVersion%")
```

Example: `(device.operatingSystemVersion -ge "15")`

### Manufacturer and model

**Devices from a specific manufacturer**

```text
(device.manufacturer -eq "%ManufacturerName%")
```

**Devices from a specific manufacturer with a specific model**

```text
(device.manufacturer -eq "%Manufacturer%") and (device.model -eq "%ModelName%")
```

Examples:

- `(device.manufacturer -eq "Samsung") and (device.model -eq "SM-S918B")`
- `(device.manufacturer -eq "Apple") and (device.model -eq "iPhone 13")`
- `(device.manufacturer -eq "Dell Inc.") and (device.model -eq "Latitude 7420")`

## Windows

### Device type

**Corporate Windows 10 devices**

```text
(device.deviceOwnership -eq "Corporate") and (device.operatingSystemVersion -le "10.0.22000.1000")
```

**Corporate Windows 11 devices**

```text
(device.deviceOwnership -eq "Corporate") and (device.operatingSystemVersion -ge "10.0.22000.1000")
```

**Windows 365 devices**

```text
(device.manufacturer -eq "Microsoft Corporation") and (device.model -startswith "Cloud PC")
```

**Dev Boxes**

```text
(device.manufacturer -eq "Microsoft Corporation") and (device.model -startswith "Dev Box")
```

**Hyper-V virtual machines**

```text
(device.manufacturer -eq "Microsoft Corporation") and (device.model -eq "Virtual Machine")
```

**AVD session hosts**

```text
(device.operatingSystemSKU -eq "ServerRdsh")
```

### Join type

**Entra joined devices**

```text
(device.deviceTrustType -eq "Azure AD joined")
```

**Hybrid joined devices**

```text
(device.deviceTrustType -eq "Hybrid Azure AD joined")
```

### Autopilot

**Devices with a specific Autopilot profile**

```text
(device.deviceOwnership -eq "Corporate") and (device.enrollmentProfileName -eq "%ProfileName%")
```

:::caution
This filter can break if you change the name of the Autopilot profile in the future.
:::

### Manufacturer

Popular manufacturer queries:

| Manufacturer | Rule |
|---|---|
| Microsoft | `(device.manufacturer -eq "Microsoft Corporation")` |
| Dell | `(device.manufacturer -eq "Dell Inc.")` |
| HP | `(device.manufacturer -in ["HP Inc.", "HP", "Hewlett-Packard"])` |
| Lenovo | `(device.manufacturer -eq "Lenovo")` |

## macOS

### Architecture

**Apple Silicon Macs**

```text
(device.cpuArchitecture -eq "arm64")
```

**Intel Macs**

```text
(device.cpuArchitecture -eq "x64")
```

## iOS/iPadOS

### Enrolment type

**Apple Business Manager devices enrolled with a specific enrolment profile**

```text
(device.enrollmentProfileName -eq "%EnrolmentProfileName%")
```

**Devices not enrolled via Apple Business Manager**

```text
(device.enrollmentProfileName -eq $null)
```

## Android Enterprise

### Enrolment type

**Personally-owned devices with work profile**

```text
(device.enrollmentProfileName -eq $null)
```

:::important
If you happen to have enrolled corporate-owned devices like this as well as personal, the **only** additional delineation you could make would be to add the `device.deviceOwnership -eq "Personal"` or `device.deviceOwnership -eq "Corporate"` properties.

It is recommended to enrol corporate devices using an appropriate corporate-owned enrolment method.
:::

**Corporate-owned dedicated devices, corporate-owned fully managed user devices, or corporate-owned devices with work profile**

```text
(device.enrollmentProfileName -eq "%EnrollmentProfileName%")
```
