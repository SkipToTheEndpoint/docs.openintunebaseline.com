---
title: macOS settings guidance
description: Post-import configuration and guidance for the macOS baseline, including OneDrive Known Folder Move and Defender for Endpoint.
sidebar:
  label: Settings guidance
  order: 3
appliesTo: '1.0'
lastReviewed: 2026-10-19
---

All policies follow the same [naming convention](/getting-started/naming-convention/), and as such should be applied to Devices if the policy is denoted by **D**, or Users if denoted by **U**.

That being said, I _**highly**_ recommend reading the following Microsoft article for more general information around applying policies to user or device groups: [Assign device profiles in Microsoft Intune - User groups vs. device groups](https://learn.microsoft.com/en-us/mem/intune/configuration/device-profile-assign#user-groups-vs-device-groups).

## OneDrive Known Folder Move

After import, the following settings need to be amended from `%OrganizationId%` to your tenant ID:

- Automatically and silently enable the Folder Backup feature (Known Folder Move)
- Prompt users to enable the Folder Backup feature (Known Folder Move)

## Defender for Endpoint - MDE configuration

The [official documentation](https://learn.microsoft.com/en-us/defender-endpoint/mac-install-with-intune) for deploying MDE on macOS via Intune says you have to deploy [8 individual .mobileconfig profiles](https://github.com/microsoft/mdatp-xplat/tree/master/macos/mobileconfig/profiles) to set all the necessary configuration.

I thought this was ridiculous, so was determined to try and get it down to 2: one to replicate the behaviour of all of the `.mobileconfig` files, and a second which is the MDE onboarding configuration, which you will still need to manually create as per the [documentation](https://learn.microsoft.com/en-us/defender-endpoint/mac-install-with-intune#step-15-download-the-onboarding-package).

Hopefully in the future Microsoft will enable the ability to use an EDR policy in Endpoint security to do "Auto from connector" like you can on Windows.

### Why does it mention JAMF in the policy?

The keen-eyed among you may look at the MDE Configuration policy and spot that one of the settings mentions "JAMF Software". I too was confused at first, but that's exactly what's defined in the official [netfilter.mobileconfig](https://github.com/microsoft/mdatp-xplat/blob/master/macos/mobileconfig/profiles/netfilter.mobileconfig) file!
