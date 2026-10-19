---
title: Windows baseline comparison
description: A point-in-time comparison of the OIB against the Intune Security Baseline and the CIS Intune Benchmark.
sidebar:
  label: Baseline comparison
  order: 6
lastReviewed: 2026-10-19
---

:::caution[Historical report - August 2024]
This comparison was carried out against **OIB Windows v3.3**, the Intune Security Baselines available at the time and CIS Microsoft Intune for Windows 11 Benchmark v3.0.1. All of them have changed since. It is kept as a record of the approach and findings, and is due to be re-tested for v4.0.
:::

Documented below are the results of some tests of other baseline configurations available for Intune-managed devices. I documented the experience seen during an Autopilot deployment, the general post-provisioning user experience, and any policy or security issues identified.

To conduct the tests I took an approach that is widely seen in this space, that being:

- Baselines were imported "as-is" with no modifications made.
- All policies were targeted at devices, rather than users.

OIB data has been presented from **direct feedback from community members** who have implemented the baseline **in their own environments**. Other baseline tests have been conducted to map against those same feedback points to provide a reasonable and unbiased comparison.

## OpenIntuneBaseline

### Test details

- Baseline version tested: [OpenIntuneBaseline - Windows v3.3](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/releases/tag/windows-v3.3)
- Tested on: Windows 11 Enterprise 23H2 - 2024.08 B Security Update

### Autopilot user experience

- No reboot seen between Device and User phase.
- User required to pass a 2nd MFA challenge to configure WHfB (not seen if skipping user ESP or ESP takes less than 15 minutes).

### General user experience

- Edge automatically configured and signed-in.
- Great productivity experience:
  - Outlook auto sign-in using primary SMTP address
  - OneDrive KFM automatically configured and signed-in
  - Office apps do not prompt first-run wizard

### Helpdesk support experience

- UAC allowed within the user session, able to use LAPS to diagnose or resolve issues.

### Policy issues seen

- Two transient policy errors due to Defender Additional Configuration and Defender Tamper Protection (see [known issues](/platforms/windows/known-issues/)). Resolved after reboot.

### Security issues identified

- None

### Admin impact summary

- Simple and quick implementation of a secure, "known-good" baseline.
- Known issues are well documented.
- Policies are granular and easy to understand and expand on.
- Community-driven feedback and support available.

## Intune Security Baseline

### Comparison rationale

In blogs, documentation, and presentations, Microsoft regularly states that the Intune Security Baseline is the recommended starting point for securing Windows devices.

### Test details

- Baseline versions tested:
  - [Security Baseline for Windows 10 and later - Version 23H2](https://learn.microsoft.com/en-gb/mem/intune/protect/security-baseline-settings-mdm-all?pivots=mdm-23h2)
  - [Microsoft Defender for Endpoint Security Baseline - Version 24H1](https://learn.microsoft.com/en-gb/mem/intune/protect/security-baseline-settings-defender?pivots=mde-v24h1)
  - [Security Baseline for Microsoft Edge - Version 117](https://learn.microsoft.com/en-gb/mem/intune/protect/security-baseline-v2-edge-settings?pivots=edge-v117)
- Tested on: Windows 11 Enterprise 23H2 - 2024.08 B Security Update

### Autopilot user experience

- Reboot seen between Device and User phase:
  - User needs to re-input user credentials.
  - User required to re-pass MFA (if not skipping user ESP).
- User required to pass a 3rd MFA challenge to configure WHfB (or 2nd if skipping user ESP).
- Default password length of 14, which also impacts the WHfB PIN.

### General user experience

- You've been forced to use a 14 character PIN which you've probably set the same as your password.
- Poor initial Edge user experience:
  - Account automatically identified but user asked to sign in
  - Large number of initial setup wizard prompts
- Suboptimal productivity experience:
  - Outlook identifies the user account but does not get automatically configured
  - No OneDrive configuration, user has to sign in and configure manually
  - Prompted by Office first-run wizard to set file types

### Helpdesk support experience

- UAC blocked within the user session, making it difficult to diagnose or resolve issues.

### Policy issues seen

- Windows and Defender Security Baselines (still) conflict with each other.

### Security issues identified

- No BitLocker configuration, leaving the device unencrypted.

### Admin impact

- Applying other policies is difficult due to the monolithic nature of the security baseline.
- Tracking down and resolving conflicts between the security baselines is time-consuming.
- Support relies on Microsoft documentation or available paid support channels.

## Center for Internet Security (CIS) Benchmark

### Comparison rationale

The CIS Benchmarks are widely used across the industry and are considered a "gold standard" for device security configuration.

### Test details

- Baseline version tested: [CIS Microsoft Intune for Windows 11 Benchmark v3.0.1](https://workbench.cisecurity.org/benchmarks/16853) (CIS Workbench login required). The Build Kit requires a CIS SecureSuite subscription.
- Tested on: Windows 11 Enterprise 23H2 - 2024.08 B Security Update

### Autopilot user experience

- Reboot seen between Device and User phase:
  - User had to press CTRL+ALT+DEL.
  - User needs to re-input user credentials.
  - User required to re-pass MFA (if not skipping user ESP).
- User required to pass a 3rd MFA challenge to configure WHfB (or 2nd if skipping user ESP).

### General user experience

- Configured to not remember user credentials, so every logon requires full credential input even if WHfB is configured.
- Poor initial Edge user experience:
  - Account automatically identified but user asked to sign in
  - Large number of initial setup wizard prompts
- Suboptimal productivity experience:
  - Outlook identifies the user account but does not get automatically configured
  - No OneDrive configuration, user has to sign in and configure manually
  - Prompted by Office first-run wizard to set file types

### Helpdesk support experience

- UAC blocked within the user session, making it difficult to diagnose or resolve issues.

### Policy issues seen

- **CIS (L1) Section 1 - 3.9.1.1 - Windows 11 Intune 3.0** - _(L1) Ensure 'MSS: (AutoAdminLogon) Enable Automatic Logon (not recommended)' is set to 'Disabled'_
  - Setting completely breaks Autopilot if not removed.
- **CIS (L1) Windows Update - Windows 11 Intune 3.0.1**
  - Conflicted with pre-existing Windows Update for Business ring settings.

### Security issues identified

- BitLocker policy does not function, leaving the device unencrypted.
- Some security gaps without implementing additional benchmarks (e.g. Edge, Internet Explorer).
- Conflicts in Windows Update settings lead to unpredictable update behaviour.

### Admin impact

- Does not work out-of-the-box with Autopilot!
- Applying other policies potentially difficult due to haphazard existing policy groupings.
- Tracking down and resolving conflicts between the security baselines is time-consuming.
- Support relies on vendor documentation or available paid support channels.
