---
title: Windows security posture
description: How the Windows baseline relates to security frameworks, and where and why it deviates.
sidebar:
  label: Security posture
  order: 3
appliesTo: '4.0'
lastReviewed: 2026-10-19
---

The baseline was created with substantial analysis of NCSC Device Security Guidance, the CIS Windows Benchmarks, ACSC Essential Eight, the Intune Security Baselines and Microsoft best practice, but it does not simply apply their recommendations. See the [project README](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline#security-framework-adherence) for the background.

## Notable deviations

There are some notable deviations from security guidance frameworks:

| Policy | Setting name | Framework recommendation | Baseline setting | Rationale |
|---|---|---|---|---|
| Device Security - Local Security Policies | Accounts Enable Administrator Account Status | Disabled | Enabled | Allows usage of Windows LAPS without additional configuration or creating a new local user account. |
| Device Security - Local Security Policies | User Account Control Behavior Of The Elevation Prompt For Standard Users | Automatically deny elevation requests | Prompt for credentials on secure desktop | Maintains standard helpdesk remote support processes capabilities. |

## CIS Benchmark rationale

The rationale for not implementing specific settings is documented against the CIS Intune Benchmark: [OIB v4.0 vs CIS Intune v5.0.0 Deviation Rationale](https://github.com/SkipToTheEndpoint/OpenIntuneBaseline/blob/main/WINDOWS/OIB4.0-CIS5.0.0-DeviationRationale.csv) (CSV).

## Comparison against other baselines

A comparison against the Intune Security Baseline and CIS Benchmark is available: [Baseline comparison](/platforms/windows/baseline-comparison/).

:::note
That comparison was carried out against OIB Windows v3.3 and is due to be refreshed for v4.0.
:::

## Security tools reporting settings as not configured

**All** security tools, including Microsoft's own, seem to have problems with the fact that CSPs put settings in different registry key locations. This is not an issue with the baseline, and is something that needs to be addressed by the security tool vendors. See the [FAQ](/faq/#security-tool-y-says-setting-x-is-not-configured-but-intune-says-its-applied-correctly) for more information.
