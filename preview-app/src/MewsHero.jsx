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
    status: "DONE",
    progress: 100,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1020",
  },
  {
    tab: "all",
    type: "product",
    title: "Allow hotels to see if automations ran and why they failed.",
    goal: "Provide enough visibility to debug runs and support operations.",
    successCriteria: "Pilot-ready logging: run list with filters (time/status/automation), run detail timeline with step outcomes + final status, and \"next step\" guidance from error_category/error_code for common failures.",
    feature: "Minimum Logs",
    status: "DONE",
    progress: 100,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1021",
  },
  {
    tab: "all",
    type: "product",
    title: "Allow hotels to automatically stop a failing automation and get a PMS alert to fix it.",
    goal: "Prevent silent failure cascades and protect hotel operations.",
    successCriteria: "Pilot-ready slice: system thresholds detect degraded runs, PMS shows a high-signal alert, breached thresholds auto-pause the flow, and the alert links to runs/logs with a clear remediation path.",
    feature: "Critical alerting",
    status: "DONE",
    progress: 100,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1143",
  },
  {
    tab: "all",
    type: "product",
    title: "Allow hotels to automatically upgrade loyal guests to a better room, with full control over inventory and limits.",
    goal: "Automate consistent upgrades with guardrails.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on demo property data, upgrades applied for eligible reservations, guardrails prevent inventory/conflict issues, and each run is traceable in logs.",
    feature: "Room upgrades",
    status: "DONE",
    progress: 100,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-940",
  },
  {
    tab: "all",
    type: "product",
    title: "Automation Hub Services production-ready",
    goal: "Harden the Automation Hub Service (AHS) and Gateway for production-readiness — security, scaling, environment separation, CI/CD pipeline, observability, and resilience.",
    successCriteria: null,
    feature: "Production-ready",
    status: "DONE",
    progress: 100,
    notes: null,
  },
  {
    tab: "all",
    type: "gtm",
    title: "Finalize pricing model and packaging",
    goal: "Select from 5 evaluated models (recommended: Atlassian-inspired product-linked pricing). Align with Commercial & Finance. Decision required by end of Cycle 2.",
    successCriteria: "Pricing decision made, communicated internally to Sales & CS, pilot pricing terms agreed.",
    feature: "Pricing",
    status: "DONE",
    progress: 100,
    notes: null,
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
    status: "DONE",
    progress: 100,
    notes: null,
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
    status: "DONE",
    progress: 100,
    notes: null,
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-950",
  },
  {
    tab: "revenue",
    type: "product",
    title: "Allow hotels without loyalty programs to offer soft benefits automations",
    goal: "Automatically identify loyal guests using soft behavioral signals and trigger benefit automations, without requiring a formal loyalty program.",
    successCriteria: "Pilot-ready end-to-end flow: publishable + runnable on property data.",
    feature: "Behavioral signals",
    status: "DONE",
    progress: 100,
    notes: "Already exposed in the Find Eligible Arrivals component.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1160",
  },
  {
    tab: "revenue",
    type: "product",
    title: "Enable hotels to send messages directly to their guests.",
    goal: "Enable SMS/WhatsApp as an action step inside any automation flow.",
    successCriteria: "\"Send message to guest\" action available in the Workflow Creator, working with Comms Hub templates.",
    feature: "Comms Hub integration",
    status: "ON TRACK",
    progress: 90,
    notes: "Blocker: if the customer hasn't set up Guest Messaging correctly, no error message is shown. Waiting for the Comms team to add the validation.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas?selectedIssue=GEX-1167",
  },
  {
    tab: "revenue",
    type: "product",
    title: "Event based triggers",
    goal: "Provide event based triggers and actions components, so our customers could build their own flows.",
    successCriteria: "Event based triggers and Zapier-like components available in Mews Automations.",
    feature: "Event based triggers",
    status: "DONE",
    progress: 100,
    notes: "Guest Profile Created, Reservation Checked In, Reservation Created, and Reservation Updated are all available in the demo environment.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas/view/11227217?selectedIssue=GEX-1170&atlOrigin=eyJpIjoiZTJhZWExNWI0MzQ4NDczYjgyNjFhNTQxOTAwMjU3ZTIiLCJwIjoiaiJ9",
  },
  {
    tab: "revenue",
    type: "product",
    title: "Usability enhancements based on QA findings",
    goal: "Resolve UX-UI abc content friction points discovered during QA sessions to ensure the automation builder meets pilot-readiness quality standards.",
    successCriteria: "All Prioritized usability issues from QA sessions are resolved. Pilot users complete the core flows without confusion or errors.",
    feature: "Usability",
    status: "ON TRACK",
    progress: 90,
    notes: "Reviewing copy and running blitz testing to close out remaining issues.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas/view/11227217?selectedIssue=GEX-1176",
  },
  {
    tab: "revenue",
    type: "product",
    title: "Mews Automations CoPilot — POC (Deployed in Demo Environment)",
    goal: "Explore the CoPilot proof of concept in parallel with Appmixer's development of AI-assisted automation creation and testing capabilities — without compromising the stability of the Unfold deliverable.",
    successCriteria: "A MEWS-integrated CoPilot POC is running on Appmixer and ready to demo at Unfold in DEMO environment.",
    feature: "CoPilot POC",
    status: "ON TRACK",
    progress: 75,
    notes: "It will be ready at the end of this week.",
  },
  {
    tab: "revenue",
    type: "gtm",
    title: "Mews Automations — Closed Beta Plan",
    goal: "Define and execute the Closed Beta plan for Mews Automations ahead of Unfold.",
    successCriteria: "Closed Beta plan documented, pilot properties onboarded, and success criteria instrumented.",
    feature: "Closed Beta",
    status: "DONE",
    progress: 100,
    notes: null,
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/edit-v2/1846640737",
  },
  {
    tab: "revenue",
    type: "gtm",
    title: "Technical enablement documentation",
    goal: "Build the full documentation and learning ecosystem so hotel staff, CS teams, and support channels can confidently enable and operate Mews Automations from day one.",
    successCriteria: "Mews Uni courses live with simulations and in-app learning. At least 5 outcome-based Help Center articles published (enable templates, create/edit automations, monitor performance, compiler, FAQ). Coming-soon and full release notes live in Beamer; in-app messages active in Gainsight PX. Ada pre-coached with likely questions via KB updates and playbooks.",
    feature: "Enablement",
    status: "ON TRACK",
    progress: 10,
    notes: null,
  },

  {
    tab: "revenue",
    type: "gtm",
    title: "Pre-Unfold MKT preparation",
    goal: "Create a waitlist landing page and QR code, define email flows, and plan a hands-on demo station at UNFOLD.",
    successCriteria: "All materials required for the awareness campaign and UNFOLD announcement are ready.",
    feature: "Pre-Unfold (Pilot Phase)",
    status: "ON TRACK",
    progress: 15,
    notes: "All product information and context has been handed off to the Marketing team. Product Marketing is now working on the content — copy, campaign materials, and assets are in progress.",
    url: "https://mews.atlassian.net/browse/GUS-75",
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
    title: "UNFOLD Announcement",
    goal: "Main stage presentation ready, with email sequence and community post sent.",
    successCriteria: "Successfully announce Automations at UNFOLD and begin receiving leads and onboarding customers.",
    feature: "Unfold Assets",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
    url: "https://mews.atlassian.net/browse/GUS-76",
  },

  // ── May 28 – Jun 30 ─────────────────────────────────────────────────────────
  {
    tab: "efficiency",
    type: "product",
    title: "Internal event source for PMS trigger events",
    goal: "Replace the Connector webhook — designed for external 3rd-party integrations — as our internal source of PMS trigger events. This causes non-realtime delivery, missing state data, forced monolith DB lookups, known classification bugs, and replica lag workarounds. A proper internal eventing source would eliminate all of this complexity.",
    successCriteria: "A reliable internal eventing source is in place for PMS trigger events, removing dependency on the Connector integration client webhook and resolving the known delivery, classification, and replica lag issues.",
    feature: "Internal Eventing",
    status: "ON TRACK",
    progress: 40,
    notes: "Event-producing part for the guest-profiles service is complete — will now use guest-created events instead of Connector webhooks. The service has also been upgraded to .NET 10 to use the latest event libraries. The event-consuming part (in the automations project) is still in progress.",
    url: "https://mews.atlassian.net/wiki/spaces/OPS/pages/2040693884/Tech+Debt+Internal+event+source+for+PMS+trigger+events",
  },
  {
    tab: "efficiency",
    type: "product",
    title: "Remaining GA blockers",
    goal: "Resolve the remaining infrastructure blockers before General Availability.",
    successCriteria: "Rate limiting deployed and tuned to production baselines. Action log correctly reflects multi-branch flow executions. Automatic enable/disable integration handles production load.",
    feature: "GA Readiness",
    status: "ON TRACK",
    progress: 30,
    notes: "Rate limiting live on gateway (100 req/sec per enterprise). Appmixer component limits ready but not yet deployed. Open: action log needs a redesign — multi-branch flows can't be shown as a single status row. Per-step expandable view proposed; waiting on Appmixer for technical details. Auto enable/disable: not yet started.",
  },
  {
    tab: "efficiency",
    type: "product",
    title: "New connectors and components",
    goal: "Broaden the range of workflows hotels can build by expanding the connector and component library.",
    successCriteria: "All defined connectors are developed and available in Mews Automations, enabling customers to automate a significantly wider range of hospitality flows.",
    feature: "Connectors",
    status: "BLOCKED",
    progress: 0,
    notes: "All connectors are already defined and shaped. Development is blocked until the internal event source problem is resolved.",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/2097119707/Connectors+Shaping",
  },
  {
    tab: "efficiency",
    type: "product",
    title: "Developer documentation for connectors, components and templates",
    goal: "Provide clear, high-quality documentation so internal and external developers can contribute connectors, components, and templates to Mews Automations.",
    successCriteria: "Documentation is published, reviewed with developers for quality, and officially available.",
    feature: "Developer Docs",
    status: "DONE",
    progress: 100,
    notes: "Documentation is complete. Shared with a group of engineers to gather feedback before official release.",
    url: "https://mews.atlassian.net/jira/polaris/projects/GEX/ideas/view/12481126?selectedIssue=GEX-1232&atlOrigin=eyJpIjoiZDJhNWM1N2ZhNzc3NGNkM2E2M2Q3YjQ4NTdkZGU3OWEiLCJwIjoiaiJ9",
  },
  // ── Jul 1 – Sep 30 ──────────────────────────────────────────────────────────
  {
    tab: "q3",
    type: "product",
    title: "Product UI Improvements",
    goal: "Address accumulated UI bugs and improvements to raise the overall quality of the automation builder experience.",
    successCriteria: "All tracked UI issues resolved and verified. Product quality meets the bar required for General Availability.",
    feature: "UI Quality",
    status: "NOT STARTED",
    progress: 0,
    notes: null,
    url: "https://mews.atlassian.net/browse/GX-26107",
    url2: "https://mews.atlassian.net/browse/GX-27111",
  },
  {
    tab: "q3",
    type: "product",
    title: "CoPilot integration",
    goal: "Integrate Appmixer's AI-assisted automation creation (CoPilot) into Mews Automations, depending on what Appmixer delivers by end of June.",
    successCriteria: "CoPilot is integrated and functional in the production environment. Scope and timeline confirmed once Appmixer's June delivery is assessed.",
    feature: "CoPilot",
    status: "NOT STARTED",
    progress: 0,
    notes: "Scope depends on Appmixer's delivery at the end of June.",
  },
  {
    tab: "q3",
    type: "product",
    title: "New connectors and components",
    goal: "Broaden the range of workflows hotels can build by expanding the connector and component library.",
    successCriteria: "All defined connectors are developed and available in Mews Automations, enabling customers to automate a significantly wider range of hospitality flows.",
    feature: "Connectors",
    status: "NOT STARTED",
    progress: 0,
    notes: "All connectors are already defined and shaped. Depends on the internal event source solution being in place.",
    url: "https://mews.atlassian.net/wiki/spaces/GX/pages/2097119707/Connectors+Shaping",
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
    progress: 65,
    notes: "Delivery is progressing smoothly, we expect to end the week with 80% of what we committed to",
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
    progress: 50,
    notes: "We had to slow down the progress on this due to an incident (not related to the team) but we expect a bump on the progress by the end of the week",
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
  { key: "revenue",    label: "Mar 27 – Apr 30",       product: "Launch extended loyalty automations — welcome gift and soft signals. Improve product quality with better information architecture, UX writing and usability improvements.",       gtm: "1. Onboard ≥ 2 pilot properties and instrument success metrics · 2. Start executing the pre-Unfold awareness campaign" },
  { key: "loyalty",    label: "May 1 – May 27 Unfold", product: "End-to-end tested and stable for live demonstration at Unfold",                     gtm: "Pilot flow defined, waitlist campaign launched, and UNFOLD announcement successfully executed" },
  { key: "efficiency", label: "May 28 – Jun 30",       product: "Resolve the infrastructure blocker limiting automation reliability, and expand the connector ecosystem — so hotels can automate more operations and the platform can scale beyond the core team.",                                                                               gtm: "" },
  { key: "q3",         label: "Jul 1 – Aug 31",        product: "Lower the barrier to automation creation through AI-assisted building (CoPilot), reduce friction with a polished UI, and expand what hotels can automate with more connectors — making Mews Automations accessible to the majority of properties, not just technical power users.",                        gtm: "" },
];

export default function MewsAutomationHubHero() {
  const [activeTab, setActiveTab] = useState("revenue");
  const [activeLevel, setActiveLevel] = useState(4);
  const [nextLevelOpen, setNextLevelOpen] = useState(false);
  const [activePlan, setActivePlan] = useState("unfold");
  const [activeWeek, setActiveWeek] = useState("2026-06-16");

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
              { key: "unfold", label: "Full Unfold Plan", color: COLORS.pink },
              { key: "emergency", label: "Emergency Plan", color: COLORS.pink },
              { key: "beta", label: "Beta Insights", color: COLORS.chartreuse },
            ].map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => setActivePlan(key)}
                style={{
                  background: activePlan === key ? color : "transparent",
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
          {activePlan === "unfold" && <>
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
        {activePlan === "unfold" && (
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
        {activePlan === "unfold" && <>

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
                  { n: "1", title: "Event-based triggers", desc: "The new triggers implementation gives us a more reliable and stable execution model — reducing the risk of breaking existing flows and increasing our confidence in shipping to production." },
                  { n: "2", title: "30+ connectors", desc: "Expanding the connector library to 30+ options will give customers solid data integrations to automate a much wider range of real-world hospitality flows — making the product genuinely useful across diverse property setups." },
                  { n: "3", title: "CoPilot", desc: "An AI-assisted automation builder will dramatically lower the barrier to entry — democratising automation creation and driving adoption beyond power users." },
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
          <div style={{ display: "grid", gridTemplateColumns: currentTab.gtm ? "1fr 1fr" : "1fr", gap: "24px", marginBottom: "24px" }}>
            <GoalBlock label="Product Goal" value={currentTab.product} color={T.accentPink} T={T} />
            {currentTab.gtm && <GoalBlock label="GTM Goal" value={currentTab.gtm} color={T.accentChartreuse} T={T} />}
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

        {/* Beta Insights & Metrics — standalone plan view */}
        {activePlan === "beta" && (
          <div style={{ opacity: 0, animation: "fadeSlideUp 0.7s 0.3s forwards" }}>

            {/* Week selector */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
              {[
                { key: "2026-06-16", label: "Week of June 16" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setActiveWeek(key)}
                  style={{
                    background: activeWeek === key ? COLORS.chartreuse : "transparent",
                    color: activeWeek === key ? COLORS.nearBlack : T.textDim,
                    border: `1px solid ${activeWeek === key ? COLORS.chartreuse : T.borderFaint}`,
                    borderRadius: "9999px", padding: "8px 20px",
                    fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                    transition: "all 0.2s",
                  }}>
                  {label}
                </button>
              ))}
            </div>

            {/* Section heading */}
            <div style={{
              fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px",
              backgroundImage: `linear-gradient(135deg, ${COLORS.chartreuse} 0%, ${COLORS.blue} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              display: "inline-block",
            }}>
              Beta
            </div>
            <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em", margin: "0 0 28px", color: T.textHeading }}>
              Insights & Metrics
            </h2>

            {/* KPI tiles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" }}>
              {[
                { value: "326", label: "Automations / week", sub: "↑ across 2 live partners", color: COLORS.chartreuse },
                { value: "100%", label: "Success rate", sub: "0 failed steps", color: COLORS.pink },
                { value: "5", label: "Beta partners", sub: "2 live · 3 ramping", color: COLORS.blue },
              ].map(({ value, label, sub, color }) => (
                <div key={label} style={{ background: T.surface, border: `1px solid ${color}33`, borderRadius: "14px", padding: "20px 24px" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 800, color, lineHeight: 1, marginBottom: "6px", letterSpacing: "-0.02em" }}>{value}</div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.text, marginBottom: "2px" }}>{label}</div>
                  <div style={{ fontSize: "0.7rem", color: T.textDim }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Cohort cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
              {[
                {
                  name: "Strawberry", badge: "Live", badgeColor: COLORS.chartreuse,
                  desc: "Room upgrade template running across 2 of 6 properties. Daily loyalty upgrades live on Clarion Draken and Clarion Sign.",
                  runs: "~40 runs/week", success: "100%",
                },
                {
                  name: "WestCord", badge: "Live", badgeColor: COLORS.chartreuse,
                  desc: "First flow built independently by their ICT team: when a guest books via Booking.com, Mews creates a staff task and sends a heads-up automatically.",
                  runs: "~286 runs/week", success: "100%",
                },
              ].map(p => (
                <div key={p.name} style={{ background: T.surface, border: `1px solid ${p.badgeColor}33`, borderRadius: "14px", padding: "20px 24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: T.text }}>{p.name}</span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.nearBlack, background: p.badgeColor, borderRadius: "9999px", padding: "2px 9px" }}>{p.badge}</span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: T.textDim, lineHeight: 1.6, margin: "0 0 12px" }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <span style={{ fontSize: "0.72rem", color: T.textMuted }}><span style={{ color: T.text, fontWeight: 600 }}>{p.runs}</span></span>
                    <span style={{ fontSize: "0.72rem", color: T.textMuted }}>Success <span style={{ color: COLORS.chartreuse, fontWeight: 700 }}>{p.success}</span></span>
                  </div>
                </div>
              ))}

              {/* Ramping partners */}
              <div style={{ background: T.surface, border: `1px solid ${T.borderSubtle}`, borderRadius: "14px", padding: "20px 24px", gridColumn: "1 / -1" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem", color: T.text }}>Ramping — 3 partners</span>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.textDim, background: T.borderSubtle, borderRadius: "9999px", padding: "2px 9px" }}>Enrolled</span>
                </div>
                <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                  {[
                    { name: "Stay Collection", scope: "9 properties" },
                    { name: "YHA Australia", scope: "~19 properties" },
                    { name: "Llanoregroup / Cactus Cove Inn", scope: "1 property" },
                  ].map(p => (
                    <div key={p.name}>
                      <div style={{ fontSize: "0.78rem", fontWeight: 600, color: T.text }}>{p.name}</div>
                      <div style={{ fontSize: "0.7rem", color: T.textDim }}>{p.scope} · First feedback session scheduled</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key learnings */}
            <div style={{ background: T.surface, border: `1px solid ${T.borderSubtle}`, borderRadius: "14px", padding: "20px 24px", marginBottom: "16px" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: T.textDim, marginBottom: "14px" }}>Key Learnings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { tag: "Fix", color: COLORS.chartreuse, text: "Upgrade logic: availability calculation defect in the loyalty upgrade flow — fixed, PR ready. Also corrected a secondary bug where availability was only checked for the current day, not the full reservation range." },
                  { tag: "Feature gap", color: COLORS.orange, text: "Booking-source filtering: arrivals trigger needs an OTA filter. Hotels with OTA-specific contracts (e.g. welcome drink) need to identify arrivals from specific channels and trigger staff tasks accordingly." },
                  { tag: "Feature gap", color: COLORS.orange, text: "Availability restrictions: multiple partners want Automations to interact with min-night stays, arrival blocks, and closed dates. Not yet supported — discovery sessions planned to scope the solution." },
                ].map(({ tag, color, text }, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: COLORS.nearBlack, background: color, borderRadius: "9999px", padding: "2px 9px", marginTop: "1px", minWidth: "84px", textAlign: "center", display: "inline-block" }}>{tag}</span>
                    <span style={{ fontSize: "0.78rem", color: T.textMuted, lineHeight: 1.6 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic signal */}
            <div style={{ background: T.surface, border: `1px solid ${T.borderSubtle}`, borderRadius: "14px", padding: "20px 24px" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: T.textDim, marginBottom: "14px" }}>Strategic Signal</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { tag: "Signal", color: COLORS.pink, text: <><strong>#1 ask across Strawberry, Stay Collection and YHA:</strong> set-once-deploy-many across properties — the key adoption lever for chains, and a strong signal to shape the Phase 2 roadmap.</> },
                ].map(({ tag, color, text }, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: COLORS.nearBlack, background: color, borderRadius: "9999px", padding: "2px 9px", marginTop: "1px", minWidth: "84px", textAlign: "center", display: "inline-block" }}>{tag}</span>
                    <span style={{ fontSize: "0.78rem", color: T.textMuted, lineHeight: 1.6 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
