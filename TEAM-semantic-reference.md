---
purpose: Condensed tension taxonomy for the shared team Claude project
audience: Designers, PMs — not the full SEMANTIC.md pipeline version
last_updated: 2026-05-05
facts: 231 · tensions: 25 · last audit: autoresearch_report_2026-05-05.md
---

# NA Research — Tension Reference

> 25 named patterns from Q1 2026 NA field research.
> Each tension links to a NAR opportunity in Jira and a Confluence analysis page.
> Strength: PATTERN = confirmed across ≥3 participants at ≥2 properties · SIGNAL = emerging, needs more evidence.

---

## Cluster: Pimp my Mews
*Core product UX — navigation, billing, rates, mobile, integrations, smart features, onboarding*

**T1 · Navigation restarts** · PATTERN  
Back navigation returns to the home screen; context lost between tasks. Staff restart mid-workflow constantly.  
Key participants: Phill (Hollywood) · Robert + MJ (StayPineapple) · Raymond (Chicago) · Jack (Neighborhood) · Megan (Salem)  
NAR: [NAR-47](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-47) · [NAR-54](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-54)

**T2 · Billing cleanup** · PATTERN  
Folios not auto-closed at checkout. Daily manual recovery required. One property reported a $3,000 gap.  
Key participants: MJ (StayPineapple) · Priscila (Uptown Oasis) · Jaya (Uptown Oasis) · Raymond (Chicago)  
NAR: [NAR-49](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-49) · [NAR-66](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-66)

**T3 · Rate rigidity** · PATTERN ⚠ Chicago-only breadth  
Bulk rate management hits a server-side limit of 100 rate IDs. Live rate plans require full delete and recreate.  
⚠ Quantitative note: RMS (Rate Management System) shows 0% engagement across 1,149 properties — staff have likely abandoned it.  
Key participants: Jill (Chicago) · Marianne (Chicago)  
NAR: [NAR-52](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-52) · [NAR-81](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-81)

**T4 · Mobile/desktop inconsistency** · PATTERN  
The same task requires different steps on each interface. Staff describe needing to train twice.  
⚠ Quantitative note: Mews Multi-Property app at 48% engagement — adoption problems confirmed.  
Key participants: Robert + MJ (StayPineapple) · Jaya (Uptown Oasis)  
NAR: [NAR-53](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-53) · [NAR-54](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-54)

**T5 · Integration gaps** · PATTERN  
Verification, cleaning status, and OTA payments require leaving the PMS entirely.  
Key participants: Jonathan (Neighborhood) · Phill + Jeff (Hollywood)  
NAR: [NAR-55](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-55) · [NAR-67](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-67)

**T6 · Automation noise** · PATTERN  
Smart features add noise instead of reducing it. AI assistant breaks mid-session.  
⚠ Active engineering issue: assistant-prod is throwing Unauthorized errors on every session. Staff complaints are accurate — this is a backend failure, not a UX problem. Do not design new AI-assisted features until this is resolved.  
Key participants: Priscila (Uptown Oasis) · Raymond (Chicago) · Jonathan + Jack (Neighborhood)  
NAR: [NAR-56](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-56) · [NAR-63](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-63) · [NAR-82](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-82)

**T7 · Onboarding debt** · PATTERN  
Rushed onboarding creates misconfigured systems staff work around silently for years. One property had 136 rooms at the wrong rate for months.  
Key participants: Jaya (Uptown Oasis) · Jeff (Hollywood) · Priscila (Uptown Oasis)  
NAR: [NAR-57](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-57) · [NAR-72](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-72)

---

## Cluster: Staff Efficiency
*Reservation prep · Payment workflows · Single-staff model*

**TA_eff · Reservation prep gap** · PATTERN  
Arrivals indistinguishable from prepped ones. Pre-auth status buried in multi-step navigation.  
Key participants: Mitchel (StayPineapple) · Megan (Salem) · Tom (Pioneertown) · Robert (StayPineapple)  
NAR: [NAR-47](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-47) · [NAR-64](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-64) · [NAR-70](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-70)

**TB_eff · Payment reconciliation** · SIGNAL ⚠ 2 participants only  
Stripe deducts fees before deposit, making reconciliation impossible. Billing actions hidden behind unintuitive navigation.  
⚠ Note: Mews Payments shows 98.4% engagement — but this is forced usage (every payment requires it), not satisfaction.  
Key participants: Jeff (Hollywood) · Tom (Pioneertown)  
NAR: [NAR-66](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-66) · [NAR-75](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-75)

**NEW_chargeback · Chargeback burden** · PATTERN  
Chargeback management is a daily task. One director described losing thousands annually. OTA distribution complexity makes disputes unwinnable.  
Key participants: Michael (Chicago) · Jeff (Hollywood)  
NAR: [NAR-71](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-71) · [NAR-83](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-83)

**TF_eff · Lean staffing cost** · PATTERN  
One person per shift is NA standard. Every PMS inefficiency has no buffer to absorb it. Cross-trained staff handle housekeeping and front desk simultaneously.  
Key participants: Phill (Hollywood) · Tom (Pioneertown) · Kayleigh (Merchant)  
NAR: [NAR-72](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-72) · [NAR-80](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-80)

---

## Cluster: Ecosystem Experience
*Groups · OTA · Channels · Housekeeping · Messaging · Automation · Loyalty*

**TA_eco · Group workflows manual** · PATTERN  
Group reservation entry is sequential — no bulk input. Annual group routing rebuilt from scratch each year.  
Key participants: Marianne (Chicago) · Tom (Pioneertown) · Priscila (Uptown Oasis)  
NAR: [NAR-61](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-61) · [NAR-81](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-81)

**TC_eco · OTA/channel integration gaps** · PATTERN  
Channel failures discovered after revenue damage. Expedia messages invisible inside Mews (12+ per day from a separate portal).  
⚠ Contradiction: Expedia shows 100% engagement in product data — but this is forced usage, not satisfaction. Field pain is the reliable signal here.  
Key participants: Jeff (Hollywood) · Jaya (Uptown Oasis) · Jared (Lark) · Jonathan (Neighborhood)  
NAR: [NAR-59](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-59) · [NAR-67](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-67) · [NAR-48](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-48)

**TD_eco · Housekeeping sync failure** · PATTERN  
Optii and Breezeway status not visible in the PMS. Root cause: Booking.com OTA XML feed failing in production.  
Key participants: Robert + MJ (StayPineapple) · Jonathan (Neighborhood)  
NAR: [NAR-58](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-58) · [NAR-68](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-68) · [NAR-77](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-77)

**TG_eco · Guest messaging fragmentation** · SIGNAL ⚠ 2 properties only  
No unified inbox. Akia data never flows back to Mews. Opted-out guests unreachable during emergencies.  
⚠ Quantitative note: Communications SMS at 48% engagement — confirms low adoption.  
Key participants: Jaya (Uptown Oasis) · Jared (Lark)  
NAR: [NAR-69](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-69) · [NAR-78](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-78)

**TH_eco · Automation/AI adoption blocked** · PATTERN  
Automation requires human ownership assignment before it will execute. AI support fails complex technical questions.  
Key participants: Jeff (Hollywood) · Michael (Chicago) · Jack (Neighborhood) · Tom (Pioneertown)  
NAR: [NAR-63](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-63) · [NAR-82](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-82)

**TI_eco · Loyalty disconnected** · PATTERN  
Loyalty recognition and upgrade triggers require manual staff discretion. Personalisation absent from all communications.  
Key participants: Jared (Lark) · Tom (Pioneertown) · Michael (Chicago) · Josh (Salem)  
NAR: [NAR-44](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-44) · [NAR-65](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-65)

---

## Cluster: Mobile & Contextual
*Multi-property ops · Housekeeping sync · Reporting*

**TA_mob · Multi-property mobile** · PATTERN  
Directors use mobile exclusively during property visits. Multi-Property Management product at 48% engagement — adoption gap confirmed.  
Key participants: Michael (Chicago) · Jack (Neighborhood)  
NAR: [NAR-53](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-53) · [NAR-74](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-74)

**TB_mob · Housekeeping mobile sync** · PATTERN  
Same root cause as TD_eco — Booking.com XML feed failing. Housekeeping status not visible on mobile or desktop. Maintenance task history invisible in reservations.  
Key participants: Robert + MJ (StayPineapple) · Jonathan + Jack (Neighborhood)  
NAR: [NAR-58](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-58) · [NAR-68](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-68)

**TF_mob · Reporting gap** · SIGNAL ⚠ 2 properties only  
Native reports need manual reformatting before anyone can use them. No consolidated contingency report.  
⚠ Quantitative note: Mews BI at 42% engagement (797 of 1,897 properties) — more than half of users are not engaging.  
Key participants: Marianne (Chicago) · MJ (StayPineapple)  
NAR: [NAR-60](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-60) · [NAR-81](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-81)

---

## Cluster: Guest Experience
*Operational coordination · Guest profiles · Loyalty · Staff knowledge*

**T4_gx · Operational coordination** · PATTERN  
Shift handover lives entirely outside the PMS. Guest notes written in reservations never reach the guest profile.  
Key participants: Megan (Salem) · Kayleigh (Merchant) · Phill (Hollywood) · Tom (Pioneertown)  
NAR: [NAR-45](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-45) · [NAR-47](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-47)

**T8_gx · Guest profile fragmentation** · PATTERN  
Profile entry is the most time-consuming screen in the PMS. Merge errors cause staff to skip email capture entirely.  
Key participants: Priscila (Uptown Oasis) · Mitchel (StayPineapple)  
NAR: [NAR-43](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-43) · [NAR-59](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-59)

**T9_gx · Loyalty threshold alerts** · SIGNAL ⚠ No facts mapped yet  
No alerts for loyalty thresholds or upgrade triggers. Recognition entirely at staff discretion.  
Key participants: Tom (Pioneertown) · Jared (Lark) · Michael (Chicago)  
NAR: [NAR-44](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-44) · [NAR-65](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-65)

**T13_gx · Tribal knowledge** · SIGNAL ⚠ Single property only  
Critical operational knowledge held by one person. Room assignment logic carried by a 13-year supervisor. Last-sell room designation not supported in Mews.  
Key participants: MJ + Robert (StayPineapple)  
NAR: [NAR-41](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-41) · [NAR-80](https://mews.atlassian.net/jira/polaris/projects/NAR/ideas/view/11060812?selectedIssue=NAR-80)

**T14_gx · Guest-reading skills** · SIGNAL ⚠ No facts mapped · No NAR yet  
40 years of visual guest assessment that cannot be encoded or supported by the PMS.  
Key participants: Tom (Pioneertown) · Phill (Hollywood)  
NAR: needs new opportunity

---

## Properties referenced

| Staff | Role | Property | City | Tier |
|-------|------|----------|------|------|
| Michael Ward | Director of Operations | Chicago Hotel Collection Magnificent Mile + Suites | Chicago | 200+ |
| Jill | GM | NBD Hotels | Chicago | 200+ |
| Marianne | Operations | Chicago South Loop | Chicago | 200+ |
| Raymond | Front desk | Chicago South Loop | Chicago | 200+ |
| Robert | GM | StayPineapple Boston | Boston | 36–200 |
| MJ | Front desk supervisor | StayPineapple Boston | Boston | 36–200 |
| Mitchel | Front desk | StayPineapple Boston | Boston | 36–200 |
| Megan | Front desk | StayPineapple Salem | Boston area | 36–200 |
| Jared | GM | Lark Hotels (4 properties) | Boston | Multi |
| Phill | GM | Hollywoodland Hotel | Los Angeles | 36–200 |
| Jeff | Director of Operations | Hollywoodland Hotel | Los Angeles | 36–200 |
| Jaya | GM | Uptown Oasis | Los Angeles | 36–200 |
| Priscila | Front desk | Uptown Oasis | Los Angeles | 36–200 |
| Jonathan | GM | Neighborhood Hotel | Los Angeles | 1–35 |
| Jack | Director | Neighborhood Hotel | Los Angeles | 1–35 |
| Tom | Owner/GM | Pioneertown Motel | California desert | 1–35 |
| Kayleigh | Front desk | Merchant Hotel | California | 1–35 |
| Josh | Staff | Salem property | Boston area | 36–200 |
