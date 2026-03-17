import { useState } from "react";
import CardComments from "./CardComments";

const COLORS = {
  pink: "#FF8EDA",
  orange: "#FF5303",
  chartreuse: "#E2FF00",
  paleMint: "#D9F8D6",
  paleLime: "#E5FFD0",
  paleLavender: "#F7EBF7",
  charcoal: "#2D2C37",
  nearBlack: "#0C0D0D",
  cream: "#FFFCF6",
};

// Full Unfold plan automations — tab field controls which tab each card appears on
const unfoldAutomations = [
  // ── Mar 3 – Mar 27 ──────────────────────────────────────────────────────────
  {
    tab: "all",
    type: "product",
    title: "Allow hotels to activate pre-built automations instead of building from scratch.",
    goal: "Launch from prebuilt starters.",
    successCriteria: "Pilot-ready templates: Room Upgrades template exists, is editable, and can be published to a working flow on the demo property with minimal changes.",
    feature: "Templates",
    status: "ON TRACK",
    progress: 75,
    notes: "On schedule",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1020",
  },
  {
    tab: "all",
    type: "product",
    title: "Allow hotels to see if automations ran and why they failed.",
    goal: "Provide enough visibility to debug runs and support operations.",
    successCriteria: "Pilot-ready logging: run list with filters (time/status/automation), run detail timeline with step outcomes + final status, and \"next step\" guidance from error_category/error_code for common failures.",
    feature: "Minimum Logs",
    status: "ON TRACK",
    progress: 50,
    notes: "Delivery is progressing smoothly, we just need to refine one final piece of the logs",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1021",
  },
  {
    tab: "all",
    type: "product",
    title: "Allow hotels to automatically stop a failing automation and get a PMS alert to fix it.",
    goal: "Prevent silent failure cascades and protect hotel operations.",
    successCriteria: "Pilot-ready slice: system thresholds detect degraded runs, PMS shows a high-signal alert, breached thresholds auto-pause the flow, and the alert links to runs/logs with a clear remediation path.",
    feature: "Critical alerting",
    status: "ON TRACK",
    progress: 50,
    notes: "AppMixer notifies the PMS already and we are working on PMS reading that information.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1143",
  },
  {
    tab: "all",
    type: "product",
    title: "Allow hotels to automatically upgrade loyal guests to a better room, with full control over inventory and limits.",
    goal: "Automate consistent upgrades with guardrails.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on demo property data, upgrades applied for eligible reservations, guardrails prevent inventory/conflict issues, and each run is traceable in logs.",
    feature: "Room upgrades",
    status: "ON TRACK",
    progress: 90,
    notes: "Missing notification component; doing usability improvements.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-940",
  },
  {
    tab: "all",
    type: "product",
    title: "Automation Hub Services production-ready",
    goal: "Harden the Automation Hub Service (AHS) and Gateway for production-readiness — security, scaling, environment separation, CI/CD pipeline, observability, and resilience.",
    successCriteria: null,
    feature: "Production-ready",
    status: "ON TRACK",
    progress: 40,
    notes: null,
  },
  {
    tab: "all",
    type: "gtm",
    title: "Finalize pricing model",
    goal: "Select from 5 evaluated models (recommended: Atlassian-inspired product-linked pricing). Align with Commercial & Finance. Decision required by end of Cycle 2.",
    successCriteria: "Pricing decision made, communicated internally to Sales & CS, pilot pricing terms agreed.",
    feature: "Pricing",
    status: "ON TRACK",
    progress: 90,
    notes: "We will enable Automations for everyone who has the Advanced Guest Experience module/package (for existing contracts).",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1164",
    url2: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#7.Pricing-%26-Packaging-Options",
  },
  {
    tab: "all",
    type: "gtm",
    title: "Identify pilot candidates and start onboarding",
    goal: "Pipeline for pilot.",
    successCriteria: "Ideal pilot customer criteria defined. Shortlist of ≥ 10 prospects agreed with Sales.",
    feature: "Pilots",
    status: "DONE",
    progress: 100,
    notes: "Pilot shortlisting and onboarding have been completed. Strawberry starts Pilot Friday the 20th.",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#14.Pilot-Customer-Onboarding-Template",
  },
  {
    tab: "all",
    type: "gtm",
    title: "Product Marketing messaging hierarchy",
    goal: "Establish core positioning and competitive narrative.",
    successCriteria: "1-page product brief (internal), customer-facing overview page drafted, competitive battle card (vs Akia, Zapier, Opera automation), press release draft reviewed.",
    feature: "Marketing Assets",
    status: "ON TRACK",
    progress: 75,
    notes: "Product marketing manager is reviewing and finishing the final content.",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#6.GTM-Workstreams",
  },

  // ── Mar 27 – Apr 30 ─────────────────────────────────────────────────────────
  {
    tab: "revenue",
    type: "product",
    title: "Allow hotels to automatically recognize loyal guests with a personalized welcome gift on arrival.",
    goal: "Automatically create a staff task to deliver a personalized welcome gift to loyal guests.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on property data.",
    feature: "Amenity gift",
    status: "NOT STARTED",
    progress: 0,
    notes: "Evaluating going with smart tips engine vs our own agent",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-950",
  },
  {
    tab: "revenue",
    type: "product",
    title: "Allow hotels to automatically reward loyal guests with a spending allowance on arrival.",
    goal: "Automatically issue a per-stay or per-day spending allowance to eligible loyalty guests.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on property data.",
    feature: "Allowances",
    status: "BLOCKED",
    progress: 0,
    notes: "The Allowance PMS feature is still in its early stages, so we will wait to integrate it once it's ready for general availability (GA).",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1007",
  },
  {
    tab: "revenue",
    type: "product",
    title: "Allow hotels without loyalty programs to offer soft benefits automations",
    goal: "Automatically identify loyal guests using soft behavioral signals and trigger benefit automations, without requiring a formal loyalty program.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on property data.",
    feature: "Behavioral signals",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1160",
  },
  {
    tab: "revenue",
    type: "product",
    title: "Enable hotels to send messages directly to their guests.",
    goal: "Enable SMS/WhatsApp as an action step inside any automation flow.",
    successCriteria: "\"Send message to guest\" action available in the Workflow Creator, working with Comms Hub templates.",
    feature: "Comms Hub integration",
    status: "NOT STARTED",
    progress: 0,
    notes: "Comms Hub not available for an integration.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1167",
  },
  {
    tab: "revenue",
    type: "product",
    title: "Resilience – Rate Limiting",
    goal: "Implement rate limiting across the AH to ensure fair usage, prevent misuse, and protect platform performance at scale.",
    successCriteria: "Rate limits enforced per customer and/or per plan tier consistently across all platform entry points.",
    feature: "Rate Limiting",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
  },
  {
    tab: "revenue",
    type: "product",
    title: "Resilience – Availability",
    goal: "Ensure the AH stays operational when AppMixer is down, with a clear contingency plan that minimises customer impact.",
    successCriteria: "Documented contingency plan, customers informed when automations are affected, failed automations recoverable once library is back.",
    feature: "Availability",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
  },
  {
    tab: "revenue",
    type: "gtm",
    title: "Pilot customers onboarded (≥ 2 properties by Unfold)",
    goal: "Managed pilot with real properties running live flows.",
    successCriteria: "≥ 2 properties onboarded with CS-led kickoff, first flow live per property, health check cadence running, escalation path defined.",
    feature: "Production Pilot",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
  },
  {
    tab: "revenue",
    type: "gtm",
    title: "Success Metrics & KPIs",
    goal: "Instrument KPIs before pilot launch.",
    successCriteria: "Product instrumentation to track KPIs in place before Cycle 3 ends.",
    feature: "Pre-Unfold (Pilot Phase)",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#8.Success-Metrics-%26-KPIs",
  },

  // ── May 1 – May 27 Unfold ───────────────────────────────────────────────────
  {
    tab: "loyalty",
    type: "product",
    title: "End-to-end testing of the UNFOLD experience to validate stability, usability, and operational readiness.",
    goal: "Systematically test key flows, configurations, and edge cases to ensure the product works reliably before UNFOLD.",
    successCriteria: "All critical flows validated, major issues identified and resolved, and a stable version ready for live demonstration and pilot use.",
    feature: "Testing",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1165",
  },
  {
    tab: "loyalty",
    type: "gtm",
    title: "Onboarding playbook, quick-start guide & Help Centre",
    goal: "Fast time-to-first-value for pilot customers.",
    successCriteria: "Pilot onboarding playbook, 1–2 page admin guide, recipe cards for templates, Help Centre getting-started article, video walkthrough (5–10 min), escalation route defined.",
    feature: "Playbook",
    status: "NOT STARTED",
    progress: 0,
    notes: "Template: 20–40 min setup · Custom: 1–3 hours · Must be ready before pilot kick-off",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#11.Onboarding-%26-Setup",
  },
  {
    tab: "loyalty",
    type: "gtm",
    title: "Begin Sales & CS enablement",
    goal: "Equip Sales and CS for pilot conversations.",
    successCriteria: "Sales pitch deck built, objection-handling guide (vs. Akia/Zapier) complete, internal Sales training run. CS lead assigned for pilot.",
    feature: "Enablement",
    status: "NOT STARTED",
    progress: 0,
    notes: "Enablement training request for Sales and CS has been submitted.",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#6.GTM-Workstreams",
  },
  {
    tab: "loyalty",
    type: "gtm",
    title: "Press release drafted & Unfold session narrative",
    goal: "Launch content ready for Unfold.",
    successCriteria: "\"Mews Launches Automation Hub\" press release approved (PMM + Comms). Unfold main-stage demo script complete. Customer video/demo reel produced.",
    feature: "Unfold Assets",
    status: "NOT STARTED",
    progress: 0,
    notes: "6–8 week lead time — must start early Cycle 3. Already working on Unfold session narrative — it's going to be Pepa's keynote.",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#6.GTM-Workstreams",
  },
  {
    tab: "loyalty",
    type: "gtm",
    title: "Mews University: Automation Hub Module",
    goal: "Deliver structured education to drive sustainable adoption and reduce CS/support load.",
    successCriteria: "Modules 1–4 live on Mews University before Unfold (22 May). Module 6 (internal CS/Support depth) delivered before pilot launch.",
    feature: "Enablement",
    status: "NOT STARTED",
    progress: 0,
    notes: "PMM (content) + CS lead (review) + SA (Module 5)",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#6.GTM-Workstreams",
    url2: "https://mews.atlassian.net/jira/polaris/projects/AN/ideas?selectedIssue=AN-1133",
  },
  {
    tab: "loyalty",
    type: "gtm",
    title: "Unfold Automations Video",
    goal: "Create a competitive narrative. One video ready for Unfold showing the benefits of the product.",
    successCriteria: null,
    feature: "Unfold Assets",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#6.GTM-Workstreams",
  },

  // ── May 28 – Jun 30 ─────────────────────────────────────────────────────────
  {
    tab: "efficiency",
    type: "gtm",
    title: "Sales deck finalized & all AEs trained",
    goal: "100% of qualified prospects see a live demo.",
    successCriteria: "Sales pitch deck complete (discovery → demo → close), objection-handling guide finalized, 100% of AEs trained.",
    feature: "Enablement",
    status: "NOT STARTED",
    progress: 0,
    notes: "Depends on pricing decision from Cycle 2",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#6.GTM-Workstreams",
  },
  {
    tab: "efficiency",
    type: "gtm",
    title: "Post-Unfold awareness campaign (Apr–May)",
    goal: "Build demand ahead of Unfold.",
    successCriteria: "Teaser content on socials, thought-leadership blog post, Community \"Coming Soon\" post, segmented email to existing customers, partner brief to Marketplace partners.",
    feature: "Marketing Assets",
    status: "NOT STARTED",
    progress: 0,
    notes: "PMM + CRM ownership — feeds into Unfold launch activation",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/1581023427/Mews+Automations+Go-to-Market+Rollout+Plan+for+Unfold+2026+Launch#6.GTM-Workstreams",
  },

  // ── Jul 1 – Sep 30 ──────────────────────────────────────────────────────────
  {
    tab: "q3",
    type: "product",
    title: "Allow hotels without loyalty programs to create a lightweight, automated loyalty tier system using behavioral data Mews already captures.",
    goal: "Automatically assign and update guest loyalty tiers based on stay count, revenue, and recency — no external system required.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on property data.",
    feature: "Tier Automator",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1166",
  },
  {
    tab: "q3",
    type: "product",
    title: "Allow hotels to automatically recognize reservations eligible for early check-in based on availability and predefined conditions.",
    goal: "Automatically enable early check-in for eligible reservations without requiring staff intervention.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on property data.",
    feature: "Early Check-In",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-943",
  },
  {
    tab: "q3",
    type: "product",
    title: "Allow hotels to automatically recognize reservations eligible for late check-out based on availability and predefined conditions.",
    goal: "Automatically enable late check-out for eligible reservations without requiring staff intervention.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on property data.",
    feature: "Late Check-Out",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1168",
  },
];

// Emergency plan — included items
const emergencyIncluded = [
  {
    type: "product",
    title: "Allow hotels to activate pre-built automations instead of building from scratch.",
    goal: "Launch from prebuilt starters.",
    successCriteria: "Pilot-ready templates: Room Upgrades template exists, is editable, and can be published to a working flow on the demo property with minimal changes.",
    feature: "Templates",
    status: "ON TRACK",
    progress: 75,
    notes: "On schedule",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1020",
  },
  {
    type: "product",
    title: "Allow hotels to see if automations ran and why they failed.",
    goal: "Provide enough visibility to debug runs and support operations.",
    successCriteria: "Pilot-ready logging: run list with filters (time/status/automation), run detail timeline with step outcomes + final status, and \"next step\" guidance from error_category/error_code for common failures.",
    feature: "Minimum Logs + Critical alerting",
    status: "ON TRACK",
    progress: 50,
    notes: "Delivery is progressing smoothly, we just need to refine one final piece of the logs",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1021",
  },
  {
    type: "product",
    title: "Allow hotels to automatically stop a failing automation and get a PMS alert to fix it.",
    goal: "Prevent silent failure cascades and protect hotel operations.",
    successCriteria: "Pilot-ready slice: system thresholds detect degraded runs, PMS shows a high-signal alert, breached thresholds auto-pause the flow, and the alert links to runs/logs with a clear remediation path.",
    feature: "Minimum Logs + Critical alerting",
    status: "ON TRACK",
    progress: 50,
    notes: "AppMixer notifies the PMS already and we are working on PMS reading that information.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1143",
  },
  {
    type: "product",
    title: "Allow hotels to automatically upgrade loyal guests to a better room, with full control over inventory and limits.",
    goal: "Automate consistent upgrades with guardrails.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on demo property data, upgrades applied for eligible reservations, guardrails prevent inventory/conflict issues, and each run is traceable in logs (steps + outcome).",
    feature: "Room Upgrades",
    status: "ON TRACK",
    progress: 90,
    notes: "Missing notification component; doing usability improvements.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-940",
  },
  {
    type: "product",
    title: "Automation Hub Services production-ready",
    goal: "Harden the Automation Hub Service (AHS) and Gateway for production-readiness — security, scaling, environment separation, CI/CD, observability, and resilience.",
    successCriteria: "AHS and Gateway meet production standards: security hardened, environments separated, CI/CD pipeline in place, observability instrumented, and resilience patterns applied.",
    feature: "Services production-ready",
    status: "ON TRACK",
    progress: 40,
    notes: null,
  },
  {
    type: "product",
    title: "Existing services \"Send message to guest\"",
    goal: "Enable SMS as an action step inside any automation flow.",
    successCriteria: "\"Send message to guest\" action available in the Workflow Creator, working with PMS existing services.",
    feature: "PMS",
    status: "NOT STARTED",
    progress: 0,
    notes: "Consulted the Comms team — refinement meeting scheduled before development starts.",
  },
  {
    type: "product",
    title: "Resilience — Rate Limiting",
    goal: "Implement rate limiting across the AH to ensure fair usage, prevent misuse, and protect platform performance and stability at scale.",
    successCriteria: "Rate limits enforced per customer and/or per plan tier consistently across all platform entry points.",
    feature: "Rate limiting",
    status: "NOT STARTED",
    progress: 0,
    notes: "Not started",
  },
  {
    type: "product",
    title: "Resilience — Availability",
    goal: "Ensure the AH stays operational when AppMixer is down, with a clear contingency plan that minimises customer impact.",
    successCriteria: "Documented contingency plan, customers informed when automations are affected, and failed automations can be recovered once the library is back.",
    feature: "Availability",
    status: "NOT STARTED",
    progress: 0,
    notes: "Not started",
  },
];

// Emergency plan — not included
const emergencyNotIncluded = [
  {
    type: "product",
    title: "Allow hotels to automatically recognize loyal guests with a personalized welcome gift on arrival, with full control over budget and selection.",
    goal: "Automatically create a staff task to deliver a personalized welcome gift to loyal guests.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on property data.",
    feature: "Amenity Gift",
    status: "not-included",
    progress: 0,
    notes: "Full flow dropped from emergency scope — not ready for Unfold under this plan.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-950",
  },
  {
    type: "product",
    title: "Allow hotels to automatically reward loyal guests with a spending allowance on arrival, with full control over budget, outlets, and expiry.",
    goal: "Automatically issue a per-stay or per-day spending allowance to eligible loyalty guests.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on property data.",
    feature: "Allowance Flow",
    status: "not-included",
    progress: 0,
    notes: "Full flow dropped from emergency scope — not ready for Unfold under this plan.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1007",
  },
  {
    type: "product",
    title: "Comms Hub integration — \"Send message to guest\"",
    goal: "Enable SMS/WhatsApp as an action step inside any automation flow.",
    successCriteria: "\"Send message to guest\" action available in the Workflow Creator, working with Comms Hub templates.",
    feature: "Comms Hub",
    status: "not-included",
    progress: 0,
    notes: "Comms Hub not available for integration — cut from emergency plan.",
  },
  {
    type: "product",
    title: "Soft signals only — Behavioral signals for hotels without formal loyalty programs",
    goal: "The ability to trigger automations based on behavioral data instead of structured loyalty membership is dropped.",
    successCriteria: "Min stay count (e.g. ≥ 3 stays) · Min nights stayed (e.g. ≥ 10 nights) · Min total spent (e.g. ≥ €500)",
    feature: "Room Upgrades",
    status: "not-included",
    progress: 0,
    notes: "Hotels without a formal loyalty program cannot use this trigger — limits automation to a subset of customers.",
  },
];


function Lozenge({ children, bg, color, className = "", style = {} }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: "9999px",
        padding: "8px 16px",
        background: bg || COLORS.pink,
        color: color || COLORS.nearBlack,
        fontWeight: 600,
        fontSize: "0.75rem",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function AutomationCard({ item, index, T }) {
  const [hovered, setHovered] = useState(false);
  const dimmed = item.status === "not-included" || item.status === "next-sprint";

  // Use readable accent tokens — bright in dark mode, WCAG-compliant darks in light
  const accentColor = item.type === "product" ? T.accentPink : T.accentChartreuse;
  // Keep original bright colors for backgrounds/borders (tints only, not text)
  const bgAccentColor = item.type === "product" ? COLORS.pink : COLORS.chartreuse;

  const statusColor =
    item.status === "ON TRACK"    ? T.statusOnTrack :
    item.status === "DONE"        ? T.statusOnTrack :
    item.status === "NOT STARTED" ? T.textFaint :
    T.accentOrange; // BLOCKED, DECISION NEEDED, etc.

  const statusLabel =
    item.status === "not-included" ? "Not included" :
    item.status === "next-sprint"  ? "Next sprint" :
    item.status;

  const statusBadgeColor =
    dimmed ? T.textGhost :
    item.status === "NOT STARTED" ? T.textFaint :
    statusColor;

  const cardId = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60);

  return (
    <div
      onMouseEnter={() => !dimmed && setHovered(true)}
      onMouseLeave={() => !dimmed && setHovered(false)}
      style={{
        background: dimmed
          ? T.surface
          : hovered
          ? T.surfaceHover
          : T.surface,
        borderRadius: "16px",
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        cursor: "default",
        border: `1px solid ${dimmed ? T.borderFaint : hovered ? bgAccentColor + "55" : T.borderSubtle}`,
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 8px 32px ${bgAccentColor}22` : T.cardShadow,
        opacity: 0,
        animation: `fadeSlideUp 0.7s ${0.3 + index * 0.08}s forwards`,
      }}
    >
      {/* Two-column row: Initiative + Progress */}
      <div style={{ display: "flex", flexDirection: "row", gap: "28px" }}>
      {/* Left: Initiative */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: dimmed ? T.textGhost : accentColor,
              background: dimmed ? T.borderGhost : bgAccentColor + T.badgeAlpha,
              border: `1px solid ${dimmed ? T.borderFaint : bgAccentColor + "44"}`,
              borderRadius: "9999px",
              padding: "4px 12px",
            }}
          >
            {item.type === "product" ? "Product" : "GTM"}
          </span>
        </div>
        <h3
          style={{
            color: dimmed ? T.textGhost : T.text,
            fontSize: "1.15rem",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {item.title}
        </h3>
        <div style={{ fontSize: "0.82rem", color: dimmed ? T.textGhost : T.textMuted, lineHeight: 1.5 }}>
          <span style={{ fontWeight: 700, color: dimmed ? T.textFaint : T.text }}>Goal: </span>
          {item.goal}
        </div>
        {item.successCriteria && (
          <div style={{ fontSize: "0.82rem", color: dimmed ? T.textGhost : T.textDim, lineHeight: 1.5 }}>
            <span style={{ fontWeight: 700, color: dimmed ? T.textGhost : T.textSub }}>Success criteria: </span>
            {item.successCriteria}
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ width: "1px", background: dimmed ? T.borderGhost : T.divider, flexShrink: 0 }} />

      {/* Right: Progress Tracking */}
      <div style={{ width: "220px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: dimmed ? T.textGhost : T.textLabel }}>
          Progress Tracking
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: "0.85rem", color: dimmed ? T.textGhost : T.text, lineHeight: 1.3 }}>
            {item.feature}
          </span>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: statusBadgeColor, display: "flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: "0.5rem" }}>●</span> {statusLabel}
          </span>
        </div>
        <div style={{ height: "8px", borderRadius: "9999px", background: T.progressBg, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${item.progress}%`,
              minWidth: item.progress > 0 ? "6px" : "0",
              borderRadius: "9999px",
              background: dimmed ? T.borderFaint : statusColor,
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <div style={{ fontSize: "0.75rem", color: dimmed ? T.textGhost : T.textDim, lineHeight: 1.4 }}>
          {item.progress > 0 && (
            <span style={{ color: dimmed ? T.textFaint : T.textSub, fontWeight: 600 }}>
              {item.progress}% complete
            </span>
          )}
          {item.notes && (
            <>{item.progress > 0 ? " · " : ""}{item.notes}</>
          )}
        </div>
        {(item.url || item.url2) && (
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: dimmed ? T.textGhost : accentColor,
                  textDecoration: "none",
                  opacity: dimmed ? 0.4 : 0.7,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = dimmed ? "0.4" : "0.7")}
              >
                {item.url.includes("jira") ? "↗ Jira" : "↗ Confluence"}
              </a>
            )}
            {item.url2 && (
              <a
                href={item.url2}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  color: dimmed ? T.textGhost : accentColor,
                  textDecoration: "none",
                  opacity: dimmed ? 0.4 : 0.7,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = dimmed ? "0.4" : "0.7")}
              >
                {item.url2.includes("jira") ? "↗ Jira" : "↗ Confluence"}
              </a>
            )}
          </div>
        )}
      </div>
      </div>{/* end two-column row */}

      {/* Comments — full width below */}
      <CardComments cardId={cardId} T={T} accentColor={accentColor} />
    </div>
  );
}

function SectionDivider({ label, T }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "8px 0" }}>
      <div style={{ height: "1px", flex: 1, background: T.borderFaint }} />
      <span style={{
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: T.border,
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
      <div style={{ height: "1px", flex: 1, background: T.borderFaint }} />
    </div>
  );
}

function FloatingLozenge({ top, left, width, height, color, delay, rotate }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        height,
        borderRadius: "9999px",
        background: color,
        opacity: 0,
        transform: `rotate(${rotate || 0}deg)`,
        animation: `floatIn 1.2s ${delay}s forwards, floatBob 6s ${delay + 1.2}s infinite ease-in-out`,
        pointerEvents: "none",
      }}
    />
  );
}

function GoalBlock({ label, value, color, T }) {
  return (
    <div
      style={{
        background: "transparent",
        borderRadius: "12px",
        padding: "16px 20px",
        border: `1px solid ${color}66`,
        cursor: "default",
      }}
    >
      <div style={{ marginBottom: "12px" }}>
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: color,
            background: color + T.badgeAlpha,
            border: `1px solid ${color}55`,
            borderRadius: "9999px",
            padding: "4px 12px",
          }}
        >
          {label}
        </span>
      </div>
      <div style={{ fontSize: "0.9rem", color: T.textMuted, lineHeight: 1.5, fontWeight: 400 }}>
        {value}
      </div>
    </div>
  );
}

const tabs = [
  { key: "all",        label: "Mar 3 – Mar 27",        product: "Pilot with a Property on Demo + Moderated User Testing",                           gtm: "Finalize pricing, identify pilot candidates & lay product marketing foundations" },
  { key: "revenue",    label: "Mar 27 – Apr 30",       product: "Launch extended loyalty automations — welcome gift, allowances, soft signals",       gtm: "Onboard ≥ 2 pilot properties and instrument success metrics" },
  { key: "loyalty",    label: "May 1 – May 27 Unfold", product: "End-to-end tested and stable for live demonstration at Unfold",                     gtm: "Sales, CS, and marketing assets ready for Unfold launch" },
  { key: "efficiency", label: "May 28 – Jun 30",       product: "TBD",                                                                               gtm: "Full sales team enabled and post-Unfold awareness campaign live" },
  { key: "q3",         label: "Jul 1 – Sep 30",        product: "Launch tier automator, early and late check-out automations",                        gtm: "TBD" },
];

export default function MewsAutomationHubHero() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeLevel, setActiveLevel] = useState(3);
  const [nextLevelOpen, setNextLevelOpen] = useState(false);
  const [activePlan, setActivePlan] = useState("unfold");

  const T = {
    bg:            COLORS.nearBlack,
    surface:       "#181818",
    surfaceHover:  "#262626",
    text:          COLORS.cream,
    textHeading:   COLORS.cream + "BB",
    textMuted:     COLORS.cream + "CC",
    textSub:       COLORS.cream + "99",
    textDim:       COLORS.cream + "77",
    textFaint:     COLORS.cream + "55",
    textLabel:     COLORS.cream + "88",
    textGhost:     COLORS.cream + "44",
    border:        COLORS.cream + "33",
    borderFaint:   COLORS.cream + "15",
    borderSubtle:  COLORS.cream + "11",
    borderGhost:   COLORS.cream + "08",
    divider:       COLORS.cream + "22",
    progressBg:    COLORS.cream + "15",
    collapseText:  COLORS.cream + "30",
    collapseArrow: COLORS.cream + "55",
    accentPink:       COLORS.pink,
    accentChartreuse: COLORS.chartreuse,
    accentOrange:     COLORS.orange,
    cardShadow:       "none",
    collapseBg:       "#181818",
    statusOnTrack:    "#4ADE80",
    badgeAlpha:       "18",
  };

  const levels = [
    { level: 1, name: "No Confidence",  desc: "Not happening — stop and reassess",              color: "#FF3B3B" },
    { level: 2, name: "Low Confidence",  desc: "Unlikely without major changes — escalate",      color: COLORS.orange },
    { level: 3, name: "Moderate",        desc: "Possible, but risks need active management",     color: "#FFD700" },
    { level: 4, name: "High Confidence", desc: "On track, minor risks remain — stay the course", color: COLORS.chartreuse },
    { level: 5, name: "Full Confidence", desc: "Ready to launch",                               color: COLORS.pink },
  ];
  const currentLevel = levels.find((l) => l.level === activeLevel);
  const levelColorMap = { 1: "#FF3B3B", 2: COLORS.orange, 3: "#FFD700", 4: COLORS.chartreuse, 5: COLORS.pink };
  const currentLevelColor = levelColorMap[activeLevel];

  const currentTab = tabs.find((t) => t.key === activeTab);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        color: T.text,
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        position: "relative",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes floatIn {
          from { opacity: 0; transform: translateY(20px) rotate(var(--rot, 0deg)); }
          to { opacity: var(--op, 0.08); transform: translateY(0) rotate(var(--rot, 0deg)); }
        }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--rot, 0deg)); }
        }
        @keyframes pulseBar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>

      {/* Floating lozenges background */}
      <FloatingLozenge top="8%" left="5%" width="180px" height="48px" color={COLORS.pink + "0D"} delay={0.5} rotate={-12} />
      <FloatingLozenge top="20%" left="80%" width="140px" height="36px" color={COLORS.chartreuse + "0A"} delay={0.8} rotate={8} />
      <FloatingLozenge top="60%" left="90%" width="100px" height="28px" color={COLORS.orange + "0D"} delay={1.1} rotate={-5} />
      <FloatingLozenge top="75%" left="3%" width="160px" height="40px" color={COLORS.pink + "08"} delay={1.4} rotate={15} />
      <FloatingLozenge top="40%" left="88%" width="60px" height="60px" color={COLORS.paleLavender + "0A"} delay={0.6} rotate={0} />

      {/* Top bar */}
      <div style={{ height: "4px", width: "100%", background: T.surface, position: "relative", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: "100%",
          background: `linear-gradient(90deg, ${COLORS.pink}, ${COLORS.orange}, ${COLORS.chartreuse})`,
          transformOrigin: "left",
          animation: "pulseBar 1.2s 0.2s forwards",
          transform: "scaleX(0)",
        }} />
      </div>

      {/* Hero Section */}
      <div style={{ padding: "64px 48px 96px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Plan switcher */}
        <div style={{ display: "flex", marginBottom: "36px", opacity: 0, animation: "fadeSlideUp 0.7s 0.4s forwards" }}>
          <div style={{
            display: "inline-flex",
            background: T.surface,
            borderRadius: "9999px",
            padding: "4px",
            gap: "4px",
            border: `1px solid ${T.borderFaint}`,
          }}>
            {[
              { key: "unfold", label: "Full Unfold Plan" },
              { key: "emergency", label: "Emergency Plan" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActivePlan(key)}
                style={{
                  background: activePlan === key ? COLORS.pink : "transparent",
                  color: activePlan === key ? COLORS.nearBlack : T.textDim,
                  border: "none",
                  borderRadius: "9999px",
                  padding: "8px 16px",
                  fontSize: "0.75rem",
                  fontWeight: activePlan === key ? 700 : 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { if (activePlan !== key) e.currentTarget.style.color = T.text; }}
                onMouseLeave={(e) => { if (activePlan !== key) e.currentTarget.style.color = T.textDim; }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* H1 */}
        <div style={{ margin: "0 0 24px", opacity: 0, animation: "fadeSlideUp 0.8s 0.5s forwards" }}>
          <h1 style={{
            fontSize: "clamp(4.5rem, 9vw, 8.5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            margin: "0 0 56px",
            backgroundImage: `linear-gradient(90deg, ${COLORS.pink} 0%, #FF5580 42%, ${COLORS.orange} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            MEWS Automations
          </h1>
          {activePlan !== "emergency" && <>
            <div style={{
              fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px",
              backgroundImage: `linear-gradient(135deg, ${COLORS.pink} 0%, ${COLORS.orange} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              display: "inline-block",
            }}>
              Confidence
            </div>
            <h2 style={{
              fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              margin: 0,
              color: T.textHeading,
            }}>
              Launch Scale
            </h2>
          </>}
        </div>

        {/* Confidence Level Scale */}
        {activePlan !== "emergency" && (
          <div style={{ margin: "0 0 20px", opacity: 0, animation: "fadeSlideUp 0.7s 0.7s forwards" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", fontSize: "0.72rem", letterSpacing: "0.08em", fontWeight: 500 }}>
              <span style={{ color: T.textSub, textTransform: "uppercase" }}>Current Status</span>
              <span style={{ color: currentLevel.color, fontWeight: 600 }}>Level {currentLevel.level} — {currentLevel.name}</span>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {levels.map(({ level, name, desc, color }) => {
                const isActive = level === activeLevel;
                return (
                  <div
                    key={level}
                    style={{ flex: 1, textAlign: "center" }}
                  >
                    <div style={{ fontSize: "0.8rem", fontWeight: 800, color: isActive ? color : T.textFaint, marginBottom: "8px", transition: "color 0.3s" }}>
                      {level}
                    </div>
                    <div style={{ height: "8px", borderRadius: "9999px", background: isActive ? color : color + "30", marginBottom: "12px", transition: "background 0.3s", boxShadow: isActive ? `0 0 12px ${color}88` : "none" }} />
                    <div style={{ fontWeight: 700, fontSize: "0.8rem", color: isActive ? color : T.textDim, marginBottom: "4px", transition: "color 0.3s" }}>
                      {name}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: isActive ? T.textMuted : T.textGhost, lineHeight: 1.4, minHeight: "36px", transition: "color 0.3s" }}>
                      {desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Collapse + Timeline + Tabs + Goals — Unfold only */}
        {activePlan !== "emergency" && <>

          {/* Collapse — next level */}
          <div style={{ marginBottom: "32px", opacity: 0, animation: "fadeSlideUp 0.6s 0.75s forwards" }}>
            <button
              onClick={() => setNextLevelOpen((o) => !o)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "transparent",
                border: `1px solid ${T.collapseText}`,
                borderRadius: "12px", padding: "12px 20px",
                cursor: "pointer", outline: "none", width: "100%",
                textAlign: "left", color: T.text, transition: "border-color 0.2s ease",
              }}
            >
              <span style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.01em", color: T.text, flex: 1 }}>
                What gets us to the next level?
              </span>
              <span style={{ fontSize: "1rem", color: T.collapseArrow, transition: "transform 0.3s", display: "inline-block", transform: nextLevelOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                ▾
              </span>
            </button>
            {nextLevelOpen && (
              <div style={{ marginTop: "4px", background: T.collapseBg, borderRadius: "12px", border: `1px solid ${T.borderSubtle}`, overflow: "hidden" }}>
                {[
                  { n: "1", title: "Pilot running on demo property", desc: "At least one automation (Room Upgrade template) is live, published, and working end-to-end on the demo property before April. This is the single most critical signal." },
                  { n: "2", title: "Automation Hub Services production-ready", desc: "Core services are stable, tested, and ready for real traffic — not just demo conditions. This is the foundation everything else runs on." },
                  { n: "3", title: "Notification through existing services", desc: "The \"Send message to guest\" service is connected and working reliably within the hub. Hotels need to trust that automations actually communicate — this closes that loop." },
                ].map(({ n, title, desc }, i, arr) => (
                  <div key={n} style={{ display: "flex", gap: "16px", padding: "20px 24px", borderBottom: i < arr.length - 1 ? `1px solid ${T.borderGhost}` : "none" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: currentLevelColor, opacity: 0.7, minWidth: "16px", paddingTop: "4px" }}>{n}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, color: T.text, lineHeight: 1.3 }}>{title}</div>
                      <div style={{ fontSize: "0.78rem", color: T.textDim, lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timeline heading */}
          <div style={{ paddingTop: "8px", opacity: 0, animation: "fadeSlideUp 0.7s 0.8s forwards" }}>
            <div style={{
              fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px",
              backgroundImage: `linear-gradient(135deg, ${COLORS.pink} 0%, ${COLORS.orange} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              display: "inline-block",
            }}>
              Planning
            </div>
            <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", margin: "0 0 24px", color: T.textHeading }}>
              Initiatives Timeline
            </h2>
          </div>

          {/* Date tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", opacity: 0, animation: "fadeSlideUp 0.6s 0.85s forwards", overflowX: "auto", flexWrap: "nowrap" }}>
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                style={{
                  background: activeTab === key ? T.surface : "transparent",
                  color: activeTab === key ? T.text : T.textDim,
                  border: `1px solid ${activeTab === key ? T.border : T.borderFaint}`,
                  borderRadius: "9999px", padding: "8px 20px",
                  fontSize: "0.85rem", fontWeight: 600,
                  cursor: "pointer", transition: "all 0.3s ease",
                  outline: "none", whiteSpace: "nowrap",
                  boxShadow: "none",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Goal blocks */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
            <GoalBlock label="Product Goal" value={currentTab.product} color={T.accentPink} T={T} />
            <GoalBlock label="GTM Goal"     value={currentTab.gtm}     color={T.accentChartreuse} T={T} />
          </div>

        </>}

        {/* Cards — Unfold plan */}
        {activePlan === "unfold" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} key={activeTab + "-unfold"}>
            {unfoldAutomations.filter(item => item.tab === activeTab).map((item, i) => (
              <AutomationCard key={item.title} item={item} index={i} T={T} />
            ))}
          </div>
        )}

        {/* Cards — Emergency plan */}
        {activePlan === "emergency" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} key={activeTab + "-emergency"}>

            {/* Warning banner */}
            <div style={{
              background: COLORS.orange + "0C",
              border: `1px solid ${COLORS.orange}22`,
              borderLeft: `3px solid ${COLORS.orange}`,
              borderRadius: "12px",
              padding: "20px 24px",
            }}>
              {/* Header row */}
              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: T.textSub }}>
                  Here's what we're choosing to defer
                </span>
              </div>

              {/* Summary */}
              <p style={{ fontSize: "0.8rem", color: T.textDim, lineHeight: 1.7, margin: "0 0 16px", paddingLeft: "0" }}>
                Keeps the core Room Upgrade flow ready for Unfold — but drops three product initiatives and limits the loyalty trigger reach.
              </p>

              {/* Deferred items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  { label: "Amenity Gift", detail: "No automated welcome gift for loyal guests" },
                  { label: "Allowance Flow", detail: "No spending allowance automation for loyalty guests" },
                  { label: "Comms Hub", detail: "SMS/WhatsApp actions unavailable inside automation flows" },
                  { label: "Soft signals", detail: "Hotels without formal loyalty programs can't trigger automations" },
                  { label: "Rate Limiting + Availability", detail: "Moved to next four weeks — not in scope for Unfold" },
                ].map(({ label, detail }, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "baseline" }}>
                    <span style={{ fontSize: "0.65rem", color: COLORS.orange + "88", flexShrink: 0, lineHeight: 1.6 }}>✕</span>
                    <span style={{ fontSize: "0.78rem", color: T.textDim, lineHeight: 1.5 }}>
                      <span style={{ fontWeight: 600, color: T.textSub }}>{label}</span>
                      {" — "}{detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included items */}
            {emergencyIncluded.map((item, i) => (
              <AutomationCard key={item.title} item={item} index={i} T={T} />
            ))}

            <SectionDivider label="Not included in this plan" T={T} />
            {emergencyNotIncluded.map((item, i) => (
              <AutomationCard key={item.title} item={item} index={emergencyIncluded.length + i} T={T} />
            ))}


          </div>
        )}

      </div>
    </div>
  );
}
