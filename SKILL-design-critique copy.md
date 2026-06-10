---
skill: design-critique
depends_on: CORE.md, PIPELINE.md
input: design artifact (mockup / prototype / spec / flow / wireframe) + optional NAR opportunity reference
output: structured critique grounded in NAR field evidence
epistemic_model: plural
last_updated: 2026-04-29
---

# Skill: Design Critique

> Evaluates a design artifact against NAR field evidence. Surfaces what is grounded, what is assumed, and what the evidence says the design gets right or wrong — for the specific staff role, property type, and market context the design targets.
>
> This skill accelerates critique. It does not replace a designer's judgment, a PM's prioritization call, or the researcher's knowledge of what happened in the room.

---

## When to invoke

Use this skill when:
- A design artifact exists and needs to be evaluated against NAR research before moving forward
- A feature spec or opportunity is being shaped and you want to check it against the facts before it becomes a brief
- A design decision is contested and you need to know what the evidence actually says
- A design is being proposed for NA and you want to verify it isn't silently inheriting EU patterns

Do not use this skill to:
- Generate design solutions (this skill reads evidence against designs, it does not produce designs)
- Post-launch validation of a shipped design (use the querying-research-knowledge skill instead — this tool is optimised for pre-decision critique)
- Replace participant feedback — if a design is at prototype stage, get it in front of staff

---

## What to provide

At minimum:
- The design artifact or a description of it specific enough to evaluate
- The staff role(s) it targets
- The NAR opportunity or hypothesis it is meant to address (e.g. `NAR-53`)

Optionally:
- Property type and tier it is optimised for
- Whether it targets current customers, non-customers, or both
- Any design decisions the team is already uncertain about

---

## Loading sequence

1. Read the design input
2. Use TEAM-semantic-reference.md (already in project context) to identify which tensions the design addresses or ignores
3. Check the Live quantitative signals section below — flag any that are relevant to the design area
4. Run the critique dimensions below
5. Produce output in the format specified below

---

## Critique dimensions

Run every dimension. If a dimension is not applicable, name it as not applicable and state why. Each dimension is mandatory — running only selected dimensions introduces blind spots the design team will discover post-launch instead of pre-decision. If the design input is incomplete, request the missing information before running.

### 1. Evidence grounding

For each major design decision, ask: **which specific NAR fact supports this?**

- List the `FD-NA-26-NNN` IDs that the design responds to
- List the `FD-NA-26-NNN` IDs that are directly relevant but the design does not address
- Flag any design decision that rests on an assumption not present in the facts — label it explicitly as an assumption
- A design decision supported by one fact is a design decision supported by a signal. A design decision supported by a pattern across multiple participants is stronger. State which is which.

### 2. Role and context fit

The design targets a specific staff role. Interrogate whether it actually fits how that role works:

- **Role**: Is this designed for the role stated, or does it implicitly serve a different role? (e.g. a feature described as "for GMs" that actually requires front desk agent action)
- **Operational context**: Would this work mid-shift? During check-out rush? On an understaffed day? In a noisy, interrupted environment?
- **Physical context**: Is there anything about the front desk layout, device availability, or workflow timing that would make this harder to use than it appears in a mockup?
- **Training recency**: Does this assume a trained, experienced user or does it work for someone two weeks in?

Reference: CORE.md §Audit Before Acting, §Context Before Compression

### 3. Property tier coverage

- What property tier does this design optimise for? (Simple 1–35 rooms / Moderate 36–200 / Complex 200+ / Enterprise multi-property group)
- Does it break for properties outside that tier — and if so, is that an acceptable scope decision or an unexamined assumption?
- If the design serves one tier at the expense of another, name that trade-off explicitly rather than letting it be discovered post-launch

Reference: CORE.md §Edge & Variance Scan

### 4. Ownership model fit

- Does this design assume independent owner-operator decision-making or centralized group management?
- If the design involves a configuration, permission, or workflow approval — who holds that authority in each ownership model?
- NA hospitality skews toward both extremes. A design that only works for one ownership model is a segmentation decision, not a universal solution. Name it as such.

Reference: CORE.md §Audit Before Acting

### 5. NA vs. EU calibration

- Does anything in this design assume a usage pattern that comes from EU deployments?
- NA-specific checks: labor flexibility (seasonal staff, high turnover), tech stack diversity (legacy PMS adjacency), ownership fragmentation, lower Mews tenure among staff
- If the design was validated in EU research but is being applied to NA: name the assumption transfer and what would need to be true for it to hold

Reference: CORE.md §Domain Context, §Plural Interpretations

### 6. Non-customer fit

If the design is intended to attract non-customers or support sales into new accounts:

- Does it address what non-customers actually described — or what current Mews customers find painful?
- These are different problems. Do not let customer data speak for the non-customer population.
- Flag if the design has no non-customer grounding at all — and whether that absence is acceptable given the stated goal

Reference: CORE.md §Hypothesis Tracking Integrity; PIPELINE.md §Non-Customer Rule

### 7. Opportunity and hypothesis traceability

- Which NAR Jira opportunity does this design address? Is that opportunity's hypothesis status Validated, Partial, Open, or Invalidated?
- If the hypothesis is Open or Partial: the design is ahead of the evidence. Name that clearly.
- If the hypothesis is Invalidated: escalate immediately — do not let a design move forward against contrary evidence without a deliberate human decision
- Does this design address the opportunity as stated in Jira, or a narrower or broader interpretation of it?

Reference: PIPELINE.md §Research Lifecycle

### 8. Binary and spectrum check

- Does the design treat a spectrum as a binary? Common examples:
  - "Trained / untrained" — tenure and recency form a spectrum
  - "Mobile / desktop" — staff shift between devices depending on task and context
  - "High-touch / self-service" — property type and guest segment move this
  - "Adopted / not adopted" — feature usage is partial and context-dependent
- If a binary is present: is it justified, or does it obscure a group of staff who fall in between and will experience the design badly?

Reference: CORE.md §Audit Before Acting

---

## Live quantitative signals

These findings come from Databricks feature adoption data and Coralogix production error logs. They are updated after each research session. Use them when reviewing any design that touches the areas below — they tell you what is failing in production right now, not just what staff find frustrating in the field.

**Rate management (T3)**
The rate API has a hard server-side limit of 100 rate IDs per request. Any design that asks staff to manage rates in bulk is proposing a workflow the backend will reject. A designer reviewing a rate management feature should know that the constraint is not in the interface — it is in the infrastructure. The interface cannot fix this alone.

**AI assistant and automation features (T6)**
The AI assistant service fails authentication on 45 out of every 50 errors logged in production. Staff who say the AI assistant gives broken or irrelevant responses are accurately describing what they see. A designer adding or improving an AI-assisted feature should treat the authentication failure as a live dependency, not a solved problem. Any design that depends on the assistant working reliably needs an engineering confirmation before it is treated as viable.

**Housekeeping sync — ecosystem and mobile (TD and TB_mob)**
Both the ecosystem housekeeping tension and the mobile housekeeping tension share the same root cause: the connector service cannot retrieve data from the Booking.com OTA XML feed. A designer proposing a housekeeping status view or sync feature should know that the data feed is failing at the source. A better interface does not fix a missing feed. The design question becomes: what should staff see when the data is unavailable, not just when it is present.

**Loyalty and guest messaging (TI and TG)**
Both loyalty programme disconnection and guest messaging fragmentation trace back to the same broken integration layer in the GuestExperience service. A designer working on loyalty recognition, guest communication, or personalisation features is working on top of a layer that is actively failing in production. Any design in this area should be stress-tested against the case where the integration layer is down — because it currently is, frequently.

**Reporting and analytics (TF_mob)**
Mews BI has a 42% engagement rate against 1,897 active users. More than half the people using it are not engaging with it. A designer adding reporting features should treat the engagement drop-off as a signal that the current reporting experience is creating a barrier, not that staff do not want data.

---

## Output format

Structure the critique as follows. Use these section headers exactly as written — each serves a distinct role in the design decision process. Do not merge, rename, or omit sections. If a section yields no findings, write "None identified" rather than skipping it entirely. Produce all sections in the order shown below.

### Artifact summary
One paragraph. What the design is, who it targets, and what opportunity it is meant to address. State the hypothesis status — Validated, Partial, Open, or Invalidated. If the design input is ambiguous about the target role or opportunity, state what you can infer and flag the ambiguity before proceeding.

### Grounded decisions
List design decisions that are directly supported by NAR facts. Cite `FD-NA-26-NNN` IDs. State whether support comes from a signal (single fact) or a pattern (multiple participants). If no design decision has direct fact support, say so explicitly — this is diagnostic information, not a failure of the critique process.

### Gaps
Design decisions or staff needs present in the facts that the design does not address. Not an accusation — a prioritization input. Distinguish between gaps that affect core functionality for the primary role and gaps that affect secondary roles or less-frequent workflows. Both matter, but they carry different urgency for the design decision.

### Assumptions
Design decisions not traceable to any fact. Label each one explicitly. Distinguish between:
- **Reasonable assumption** — plausible given domain knowledge, low risk
- **Untested assumption** — plausible but could be wrong in NA context, worth validating
- **High-risk assumption** — contradicts or is absent from evidence, flag for human decision before proceeding

### Tensions
Places where what the design proposes conflicts with what participants actually described. Be specific — cite the fact ID and the design decision that conflicts with it. A tension is not the same as a gap — a tension is an active conflict between the design's premise and observed participant reality. Treat tensions as higher priority than gaps.

### Plural readings
For the design's central claim (e.g. "this will reduce friction for front desk agents at check-in"):

1. **Primary reading**: the most direct case for why it works, grounded in evidence
2. **Alternative reading**: a plausible case for why it doesn't work, or works for a different population than intended, or fails under operational conditions the design does not account for

### Uncertainty zones
Observations where more data would meaningfully change the critique. Be specific about what data is missing and why it matters. Prioritise uncertainties that would change the critique's verdict, not just add nuance — an uncertainty that doesn't affect the bottom-line recommendation can be noted briefly rather than given equal weight.

### Questions for the designer
No more than five. Specific, resolvable questions — not open-ended prompts. Each question should point at a dimension above that cannot be resolved without designer input. Frame each question so the designer knows exactly what evidence or decision would resolve it — avoid questions the designer could answer simply by re-reading their own design.

---

## Anti-patterns to flag

If any of the following appear in the design rationale or briefing materials, name them explicitly before proceeding. Name the anti-pattern, quote the language that triggered it, and explain why it matters for this specific design. Do not proceed with the full critique without resolving any flagged anti-pattern with the design team.

| Anti-pattern | What it looks like | Why it matters |
|---|---|---|
| **EU-to-NA transfer** | "We validated this in [EU property]" used as NA evidence | EU patterns do not automatically hold in NA market |
| **Role conflation** | Design for "hotel staff" without specifying which role | GM needs ≠ front desk agent needs ≠ night auditor needs |
| **Single-quote opportunity** | One participant quote used to justify a feature | A signal, not a pattern — label the difference |
| **Clean story pressure** | Design rationale omits the inconvenient findings | Flattening evidence produces roadmap risk downstream |
| **Non-customer erasure** | Non-customer findings averaged into customer data | Non-customer data carries disproportionate NA strategic weight |
| **Tier universalism** | Design tested on one property size, presented as universal | Property tier shapes what counts as friction, speed, and success |
| **Assumption laundering** | Team intuition presented as a research finding | Intuition is a valid input — label it as such, not as evidence |

---

## Output defaults

Apply CORE.md §Language Policy throughout:
- Staff roles named specifically, not "users"
- Market context explicit — NA, EU, or cross-market
- Property type named when it affects the critique
- Gender-neutral language throughout
- Binary classifications justified or replaced with a spectrum

All outputs are draft intelligence. Human judgment governs what gets actioned.

