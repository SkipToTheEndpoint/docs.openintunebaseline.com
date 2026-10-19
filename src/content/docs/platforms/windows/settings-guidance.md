---
title: Windows settings guidance
description: Guidance on assigning Windows baseline policies, and on Windows Update configuration with Autopatch or the OIB update rings.
sidebar:
  label: Settings guidance
  order: 5
appliesTo: '4.0'
lastReviewed: 2026-10-19
---

All policies follow the same [naming convention](/getting-started/naming-convention/), and as such should be applied to Devices if the policy is denoted by **D**, or Users if denoted by **U**.

That being said, I _**highly**_ recommend reading the following Microsoft article for more general information around applying policies to user or device groups: [Assign device profiles in Microsoft Intune - User groups vs. device groups](https://learn.microsoft.com/en-us/mem/intune/configuration/device-profile-assign#user-groups-vs-device-groups).

## Windows updates

### Windows Autopatch

Windows Autopatch, included with M365 E3/F3 licensing, massively simplifies the management of updates, as well as providing enhanced reporting. I would strongly suggest using this service if you have access to it.

The following settings are what I would recommend for a standard, flat organisation. If you have a more complex structure, you may need to adjust settings or groups to suit your individual needs.

| Deployment ring | Group | Deferral period | Deadline | Grace period |
|:--|:--|:-:|:-:|:-:|
| Windows Autopatch - Test | Assigned | 0 days | 0 days | 1 day |
| Windows Autopatch - Ring1 | Dynamic - 5% | 3 days | 0 days | 1 day |
| Windows Autopatch - Ring2 | Dynamic - 15% | 6 days | 1 day | 2 days |
| Windows Autopatch - Ring3 | Dynamic - 80% | 9 days | 1 day | 2 days |
| Windows Autopatch - Last | Assigned | 13 days | 0 days | 1 day |

I'm also unhappy with the lack of reporting on M365 Apps updates that Autopatch currently provides, so would personally disable Autopatch doing M365 Apps and instead configure Cloud Update (previously Servicing Profiles) via the [Microsoft 365 Apps admin center](https://config.office.com/), which provides incredible reporting and rollback capabilities. You can create "waves" which can act like WUfB update rings, and align these to your existing Autopatch groups.

Full information on Cloud Update can be found here: [Overview of cloud update in the Microsoft 365 Apps admin center](https://learn.microsoft.com/en-us/microsoft-365-apps/admin-center/cloud-update).

### Windows Update for Business (WUfB) rings

The baseline uses a 3-ring update model of Pilot, UAT and Production. This is designed to allow for a staged rollout of updates to ensure any issues are caught before they reach the majority of users.

Rings use deferral, deadline and grace period settings to control when updates are offered, installed and when devices are forced to reboot. These are cumulative, so a device in the Production ring will have a 10-day deferral, 2-day deadline and 1-day grace period, resulting in a 13-day delay between release and devices being up to date.

This time period was chosen to adhere to UK NCSC/Cyber Essentials guidelines, which state that updates should be applied within 14 days of release.

| Ring | Quality update deferral | Deadline | Grace period |
|:--|:-:|:-:|:-:|
| Pilot | 0 days | 0 days | 1 day |
| UAT | 3 days | 0 days | 2 days |
| Production | 10 days | 2 days | 1 day |

#### Common settings

All three rings share the following settings.

**Update settings**

- Microsoft product updates: Allow
- Windows drivers: Allow
- Feature update deferral period (days): 0
- Upgrade Windows 10 devices to latest Windows 11 release: No
- Set feature update uninstall period (2 - 60 days): 30
- Servicing channel: General Availability channel

**User experience settings**

- Automatic update behaviour: Reset to default (thus utilises Intelligent Active Hours)
- Restart checks: Allow
- Option to pause Windows updates: Disable
- Option to check for Windows updates: Enable
- Change notification update level: Not configured
- Use deadline settings: Allow
- Deadline for feature updates: 0
- Auto reboot before deadline: No

#### Pilot

**Purpose:** Designed to act as a first line of defence against potential issues with updates. This is usually IT staff and early adopters, though be aware they generally have a higher tolerance for issues than the average user. Aim to include 1-5% of total devices in this ring.

**Behaviour:** Devices in this ring receive updates immediately after release with a 1-day grace period before a forced reboot.

**Assignments:**

- Include: manually-assigned group of either users **or** devices.
- Exclude: group(s) that drive the UAT ring.

#### UAT

**Purpose:** By far the most important ring. UAT should involve key users across the business to ensure appropriate testing across business applications. Ideally, users in this ring should _know_ they're part of this testing and be encouraged to report issues immediately. Aim to include 5-15% of total devices in this ring.

**Behaviour:** Devices in this ring receive updates 3 days after release and have a 0-day deadline on install with a 2-day grace period before a forced reboot.

**Assignments:**

- Include: manually-assigned group of either users **or** devices.
- Exclude: group(s) that drive the Pilot ring.

#### Production

**Purpose:** All remaining devices.

**Behaviour:** Devices in this ring receive updates 10 days after release and have a 2-day deadline on install with a 1-day grace period before a forced reboot.

**Assignments:**

- Include: built-in "All Users" or "All Devices" virtual group.
- Exclude: group(s) that drive the Pilot and UAT rings.
