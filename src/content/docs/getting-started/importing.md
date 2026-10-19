---
title: Importing the baseline
description: The ways to import the OpenIntuneBaseline into your Intune tenant.
sidebar:
  order: 1
appliesTo: '4.0'
lastReviewed: 2026-10-19
---

:::caution
Never import the baseline straight into a production tenant. Test in a dev or pilot tenant first and review every policy against your own requirements.
:::

There are four options to import the baseline.

## OIB Deployer

The [OIB Deployer](https://deploy.openintunebaseline.com/) supports platform-specific, granular deployment of the baseline. It can also check for existing OIB policies in your tenant and highlight missing or updated policies.

It only requires a single application permission (`DeviceManagementConfiguration.ReadWrite.All`).

## IntuneManagement

These files have been exported using the [IntuneManagement](https://github.com/Micke-K/IntuneManagement) tool by Mikael Karlsson and can be imported the same way. Consult the IntuneManagement documentation for import instructions.

You can import as much or as little of the baseline as you wish, but you need to change the **Root folder** to the folder for the platform (e.g. `WINDOWS`) or policy type (e.g. Settings Catalog) you want to import.

## TenuVault

[TenuVault](https://docs.tenuvault.com/baselines/quick-start/) can deploy, compare and validate OIB policies in your tenant, with the ability to undo each run. It downloads the policy files from the OIB repository, and matches existing policies using the OIBID.

Some features require a paid TenuVault plan. TenuVault is documented separately, so please consult the [TenuVault documentation](https://docs.tenuvault.com/baselines/quick-start/) for usage, supported features and issues.

## Native import

You can use the [native import/export functionality in Intune](https://learn.microsoft.com/en-us/mem/intune/configuration/settings-catalog?tabs=sc-search-filter%2Csc-reporting#import-and-export-a-profile).

:::note
Native import only supports Settings Catalog policies in the Device Configuration blade. Settings outside of that (for example Compliance and Endpoint Security) are not available.
:::
