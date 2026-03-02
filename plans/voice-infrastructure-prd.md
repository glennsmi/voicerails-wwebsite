# Voice Infrastructure Platform — Product Requirements Document

**Version:** 1.1
**Date:** February 2026
**Author:** Fueld AI Ltd
**Status:** Draft — Internal Review

---

## 0. Naming Candidates

The platform needs a name that signals speed, voice, developer tooling, and production readiness. It should appeal to engineering teams building voice-first AI products.

| Name | Rationale | Domain-Friendly |
|------|-----------|-----------------|
| **Vocable** | "Capable of being voiced" — technical, clean, memorable | vocable.dev |
| **Larynx** | The voice organ — anatomical, distinctive, nerdy in a good way | larynx.dev / larynx.io |
| **Callstack** | Developer-native term, repurposed for voice call infrastructure | callstack.ai |
| **Voxline** | Vox (voice) + line (telephony/pipeline) — clear and direct | voxline.dev |
| **SayStack** | Friendly, approachable, immediately communicates voice + infra | saystack.dev |
| **Resonance** | Premium feel, implies depth and continuity (memory engine) | resonance.ai |
| **Cadence** | Rhythm of speech, implies flow and orchestration | cadence.voice |
| **Utterance** | Core NLP term, signals technical depth to AI builders | utterance.dev |
| **VoiceRail** | Infrastructure metaphor — rails for voice apps | voicerail.dev |
| **Talkpipe** | Pipeline imagery, casual but clear | talkpipe.dev |

**Recommendation:** **Vocable** or **VoiceRail** — both immediately communicate what the platform does, feel developer-native, and have strong domain potential. Vocable leans premium; VoiceRail leans infrastructure-obvious.

> All references below use `[PLATFORM]` as a placeholder until the name is finalised.

---

## 1. Executive Summary

`[PLATFORM]` is a standalone developer infrastructure platform for building, deploying, and operating production-grade voice AI applications. It combines four capabilities that teams typically struggle to integrate reliably:

1. **Real-time voice model orchestration** across multiple providers with tool calling support
2. **Telephony infrastructure** for production inbound and outbound phone calls
3. **Configurable conversation workflows** with developer-defined processing logic
4. **Structured conversation memory and post-call analysis engine**

The commercial model is:
- base platform fee (by plan)
- seat-based team fee when multi-user collaboration is enabled
- included usage minutes with overage pricing
- transparent provider + telephony pass-through at cost + markup

The product moat is **fast setup + high reliability + extensibility**: developers can launch quickly, add custom workflows/tools without deep infra work, and keep scaling without migrating away.

**Core promise:** Go from zero to a live production voice agent — in-app or over the phone — in under 30 minutes.

---

## 2. Positioning

> `[PLATFORM]` is the fastest way for product teams to ship production-grade voice agents across app and phone — one API layer for real-time models, telephony routing, conversation workflows, and structured memory.

**What this is:**
- A developer infrastructure platform (like Twilio for voice AI orchestration)
- Provider-agnostic with clean model encapsulation and hot-swap capability
- Opinionated enough to be fast, flexible enough to be production-grade

**What this is not:**
- Not a vertical application (coaching, sales, support) — those are built *on* this
- Not a closed black-box voice bot with no developer control
- Not an outcome-based consulting service

---

## 3. Problem Statement

### 3.1 Developer Pain

Teams building voice AI products repeatedly hit the same walls:

**Fragmented provider landscape.** OpenAI Realtime, Google Gemini Live, ElevenLabs, Deepgram, Cartesia — each has a different session model, audio format, event schema, and tool-calling interface. When providers ship breaking changes or new capabilities, teams scramble.

**App voice and phone voice are separate engineering efforts.** In-app WebRTC sessions and Twilio media streams require different bridging logic, different deployment topologies, and different failure modes. Most teams build one well and bodge the other.

**Post-call processing is an afterthought.** Transcripts land in a bucket. Extraction of structured data, memory persistence, and downstream triggers are hand-rolled per project with no reusable pipeline.

**Infrastructure setup is slow and error-prone.** Cloud Run services, Secret Manager bindings, IAM roles, webhook configuration, scheduler setup — teams spend weeks on plumbing before writing any conversation logic.

**Operationalisation is hard.** Latency tracking, cost attribution, retry logic, call diagnostics, and provider failover are all production requirements that most teams defer until they bite.

### 3.2 Market Context

The market is moving toward faster "voice feature shipping" with lower operational burden. Every AI-forward product team is evaluating voice. Very few have the infrastructure engineering depth to make it production-reliable. The gap between "cool demo" and "production voice agent handling 10,000 calls/month" is where `[PLATFORM]` sits.

---

## 4. Product Architecture

### 4.1 Core Modules

#### Module 1: Real-time Voice Model Orchestration

- Unified session API abstracting multiple real-time voice providers (OpenAI Realtime API, Gemini Live, ElevenLabs, etc.)
- Provider routing with configurable fallback chains
- Standardised session lifecycle: `create → configure → stream → finalise`
- Native tool-calling support with a unified schema that maps to each provider's format
- Hot-swappable provider selection — change model mid-deployment without code changes
- Provider extension layer for custom voice features (for example: ElevenLabs voice profiles/voice IDs) without breaking core workflow contracts
- Audio format normalisation across providers

#### Module 2: Telephony Infrastructure

- Twilio media stream bridge deployed as a Cloud Run container
- Inbound call handling with configurable routing rules
- Outbound call initiation via API or scheduled triggers
- Real-time audio bridge connecting telephony streams to the selected voice provider
- Full telephony number lifecycle via API/UI: search, reserve, provision, assign, and release
- Country/jurisdiction-aware number selection with staged allowlist and compliance gating
- DTMF handling and call transfer support
- Call recording and compliance controls

#### Module 3: Conversation Workflow Engine

- Developer-defined conversation workflows with configurable stages:
  - Session initialisation (context loading, persona selection)
  - Prompt orchestration and transition logic
  - Tool execution and side-effect handling
  - Session finalisation and handoff
- Trigger-based invocation: app event, API call, scheduled time, inbound phone call
- Workflow versioning and A/B deployment support
- JSON workflow definition format (n8n-style) for deterministic, portable configuration
- First-class tool/connector registration so teams can attach custom business logic rapidly
- Structured LLM composition blocks (prompt templates, tool schemas, guardrails, and response contracts) to make rapid workflow authoring reliable at scale
- Custom processing hooks at every stage — developers define their own logic, not ours

#### Module 4: Analysis + Structured Memory Engine

- Automated transcript finalisation pipeline
- Configurable extraction schemas: developers define what structured data to pull from each conversation
- Durable memory graph with per-user, per-session, and cross-session state
- Developer-facing webhook events for all post-call artifacts
- Integration hooks for downstream systems (CRM, analytics, custom backends, tenant-owned databases)

### 4.2 Platform Services Layer

Underpinning all four modules:

- **Observability dashboard:** Latency percentiles, cost per call, provider performance, error rates
- **Cost attribution engine:** Real-time cost tracking per call, per workflow, per provider with forecasting
- **Retry and failover logic:** Automatic provider failover, configurable retry policies
- **Security baseline:** Secret management, IAM scoping, encryption at rest and in transit
- **Developer console:** API key management, webhook configuration, environment controls, logs
- **Connector runtime:** Secure outbound connectors to tenant systems (DBs, APIs, queues) without forcing any single database

---

## 5. Technical Architecture

### 5.1 Stack

| Layer | Technology |
|-------|-----------|
| Control Plane | Firebase-first (Auth, Firestore, Functions v2) |
| Runtime | Google Cloud Run (telephony bridge containers) |
| Functions | Firebase Functions v2 (workflow orchestration, webhooks) |
| Secrets | Google Secret Manager |
| Messaging | Google Pub/Sub (async events, post-call pipeline) |
| Scheduling | Google Cloud Scheduler (outbound calls, recurring sessions) |
| Storage | Firebase / Firestore (session state, memory graph) |
| Analytics + Reporting | BigQuery (usage, cost, reliability rollups) |
| Billing | Stripe (subscriptions, seats, usage metering, invoices) |
| Container Registry | Google Artifact Registry |
| Telephony | Twilio first (media streams, phone numbers, SIP), adapter-ready for future providers |
| Voice Providers | OpenAI Realtime API, Gemini Live, ElevenLabs, Grok (extensible) |
| Connector Layer | Outbound connector gateway + per-tenant secrets for third-party systems |

### 5.2 Deployment Modes

**Phase 1 (Launch): Hosted `[PLATFORM]` Cloud only**
- Customer provides API keys for chosen voice providers and telephony setup inputs
- `[PLATFORM]` hosts control plane + runtime
- Fastest onboarding and tightest reliability feedback loop

**Phase 2 (Post-Launch): Customer GCP runtime option**
- Terraform module deploys runtime into customer project
- `[PLATFORM]` remains orchestration control plane
- Targeted at enterprise data-boundary needs after hosted mode stabilises

### 5.3 Terraform Module Blueprint (Customer GCP, Phase 2)

```hcl
module "platform_voice_stack" {
  source = "github.com/[platform]/terraform-voice-stack"

  project_id       = var.gcp_project_id
  region           = var.region  # default: europe-west2
  voice_providers  = ["openai", "gemini"]
  enable_telephony = true
  enable_scheduler = true
}
```

**Provisions:**
- API enablement (Cloud Run, Secret Manager, Pub/Sub, Scheduler, Cloud Build, Artifact Registry)
- Service accounts with minimum-privilege IAM roles
- Artifact Registry repository for bridge container images
- Cloud Run service for the telephony bridge
- Secret Manager entries for all provider keys and shared secrets
- Optional Pub/Sub topics + Cloud Scheduler jobs for scheduled calls

**Outputs:**
- Bridge URL
- Webhook endpoints
- Service account identifiers
- Health check URLs

### 5.4 Telephony Number Provisioning APIs (Twilio First)

`[PLATFORM]` must allow developers to manage numbers in-platform rather than in provider consoles for supported regions:

- Search available numbers by country/jurisdiction, capability, type
- Reserve and provision/purchase numbers through provider APIs
- Assign numbers to workflows and environments
- Enforce staged country allowlist and compliance prerequisites
- Expose full audit trail for provisioning actions

Initial launch posture:
- **Provider:** Twilio only
- **Countries:** US, G7, and selected European countries via staged allowlist
- **Porting:** Not in v1 (planned phase 2+)

### 5.5 CLI Developer Experience

```bash
# Initialise — collects project, region, provider choices, telephony config
platform init

# Dry-run — validates infrastructure plan and configuration
platform plan

# Deploy — applies Terraform, deploys containers, prints endpoints
platform deploy

# Verify — runs health checks across all deployed services
platform verify
```

**Target: <30 minutes from empty GCP project to first live call.**

### 5.6 Secure Connector Access to Tenant Systems

To support writes into tenant-owned infrastructure (databases, queues, APIs), `[PLATFORM]` provides:

- Tenant-scoped connector definitions (JSON schema + auth type + endpoint)
- Secret storage in Secret Manager (never exposed to client runtime)
- Egress controls (allowlists, TLS-only, optional static egress IP)
- Per-connector IAM scopes and per-workflow permissions
- Signed connector invocation with idempotency keys and audit logs
- Retry policies, circuit breakers, and dead-letter handling

Initial connector support focus:
- HTTPS/webhook connectors (custom APIs and internal services)
- Database connectors for tenant-owned stores (via secure service credentials and network controls)
- Queue/event connectors for async integration patterns

---

## 6. Ideal Customer Profile

### 6.1 Primary ICP

Product teams with 2–20 engineers shipping voice features in:

- **Health and wellness coaching** — AI coaches, therapy support, nutrition guidance
- **Recruiting and interview automation** — screening calls, structured interviews
- **Sales enablement and call QA** — AI SDRs, call scoring, coaching nudges
- **Learning and tutoring** — language practice, exam prep, interactive courses
- **Support triage and intake** — first-line voice agents, appointment scheduling
- **Internal tooling** — voice-driven data entry, field reporting, compliance checks

### 6.2 Buying Signals

- Already tested one voice model (OpenAI Realtime, Gemini Live) and want production infrastructure
- Need both in-app and phone call experiences from the same platform
- Have a strong domain model and need structured post-call data flowing back into their system
- Currently spending engineering time on infrastructure plumbing instead of conversation design
- Evaluating Twilio, Vonage, or Vapi but want more control over the AI layer

### 6.3 Anti-Patterns (Not Our Customer Yet)

- Teams wanting a no-code chatbot builder with zero engineering involvement
- Companies looking for a fully managed, outcome-guaranteed service
- One-person projects with no production deployment target

---

## 7. Packaging and Pricing

### 7.1 Account Model

- **Individual account (default):** one builder can create and operate services.
- **Team account (upgrade trigger):** required when inviting collaborators; includes seat-based pricing per added team member.
- Team features (RBAC, audit logs, multi-user workflows) are locked to Team+ plans.
- Upgrade rule: adding a second platform member triggers Team billing model and seat pricing.

### 7.2 Tiers

| Capability | **Starter (Individual)** | **Build (Individual/Small Team)** | **Launch (Team)** | **Scale (Enterprise Team)** |
|-----------|----------------------------|-----------------------------------|--------------------|-----------------------------|
| Real-time voice API abstraction | ✓ | ✓ | ✓ | ✓ |
| Single voice provider | ✓ | Multi-provider | Multi-provider | Multi-provider |
| Basic telephony bridge templates | — | ✓ | ✓ | ✓ |
| In-platform number provisioning (Twilio) | — | ✓ | ✓ | ✓ |
| Team collaboration + member seats | — | Limited | ✓ | ✓ |
| Standard logs + dashboard | ✓ (basic) | ✓ | ✓ | ✓ |
| Managed workflow engine | — | — | ✓ | ✓ |
| Structured memory + extraction | — | — | ✓ | ✓ |
| Alerts, retries, cost analytics | — | — | ✓ | ✓ |
| Multi-environment deployments | — | — | — | ✓ |
| Dedicated throughput | — | — | — | ✓ |
| SSO, audit exports, enterprise controls | — | — | — | ✓ |
| Support | Docs only | Community | SLA-backed | Dedicated |

### 7.3 Pricing Components

| Component | Description |
|-----------|-------------|
| **Platform fee** | Monthly fee by tier |
| **Team seat fee** | Per added collaborator on Team+ plans |
| **Usage fee** | Included minutes by tier; overage per minute and optional per-workflow-run pricing |
| **Infrastructure pass-through** | Telephony + voice provider costs passed through at **cost + markup** (baseline 20%, validated by tier economics) |

### 7.4 Illustrative Pricing (Subject to Validation)

| Tier | Platform Fee | Team Seat Fee | Included Minutes | Overage |
|------|-------------|---------------|------------------|---------|
| Starter | $9.99/mo | N/A | 60 real-time minutes | $0.12/min |
| Build | $99/mo | $0–$10/seat (limited seats) | 500 real-time minutes | $0.08/min |
| Launch | $499/mo | $20/seat | 3,000 real-time minutes | $0.06/min |
| Scale | Custom | Custom | Custom | Custom |

*All prices in USD. Excludes infrastructure pass-through costs.*

### 7.5 Billing Infrastructure (Stripe-First)

- Stripe Billing for subscriptions, seat billing, and invoice lifecycle
- Stripe Meters for usage-based billing (minutes, workflow runs, overages)
- Webhook-driven entitlements sync into `[PLATFORM]` control plane
- Add-on pricing support for premium connectors or dedicated throughput
- Global tax handling via Stripe Tax where required

### 7.6 Billing Mechanics (How Charges Are Calculated)

Each invoice combines four components:

1. **Base platform subscription fee** (tier-dependent)
2. **Team seat charges** (for Team+ plans, per active collaborator)
3. **Usage overages** (minutes/workflow runs above included plan allowance)
4. **Pass-through usage with markup** (voice provider + telephony costs)

Target implementation approach:
- Use Stripe subscription items for base plan + seats
- Use Stripe metered billing for overage events
- Maintain provider/telephony canonical cost ledger in-platform, then sync billable aggregates into Stripe invoice items
- Keep pass-through line items transparent so customers can see provider cost and markup logic

### 7.7 Commercial Principles

- Pricing is infrastructure-native and easy to forecast — no surprises
- Pass-through markup is transparent and stated upfront
- No outcome-based pricing in v1 — the platform sells reliability, not results
- Annual plans offered once reliability KPIs stabilise (target: 6 months post-launch)

---

## 8. Competitive Landscape

| Competitor | Strength | `[PLATFORM]` Advantage |
|-----------|----------|----------------------|
| **Vapi** | Quick voice agent setup, growing ecosystem | Deeper workflow customisation, structured memory, self-hosted option |
| **Retell AI** | Good telephony integration | Multi-provider orchestration, tool-calling abstraction, transparent pricing |
| **Bland AI** | Enterprise telephony focus | Developer control, provider flexibility, not locked to one model |
| **Vocode** | Open-source voice framework | Managed infrastructure, deployment automation, production ops tooling |
| **Raw Provider APIs** (OpenAI, Google) | Maximum flexibility | Abstraction layer saves months of integration work, telephony included |

**Defensibility comes from:**
- Provider abstraction that survives model drift and breaking changes
- Telephony-runtime reliability under real production call volumes
- Structured memory schema depth and extraction quality
- Deployment automation with secure-by-default infrastructure templates
- Operational tooling (cost visibility, latency tracking, call diagnostics) that competitors treat as afterthoughts
- High-quality developer UX for quick setup, stable scaling, and low migration pressure once integrated
- Deep connector + workflow customisation without locking customers into one data backend

---

## 9. Go-To-Market Strategy

### 9.1 Launch Wedge

> "Ship production voice + phone agents in days, not quarters."

### 9.2 Channel Strategy

**Developer-first:**
- Comprehensive docs site with quickstart guides for each vertical
- Open-source reference implementations and starter templates
- Active presence in AI/voice developer communities (Discord, Twitter/X, Hacker News)
- Technical blog content: "How we handle provider failover" / "Structured memory for voice agents"

**Partner-led:**
- AI consultancies and product agencies as referral partners
- Voice provider partnerships (featured in OpenAI/Google ecosystems)
- Integration partnerships with CRM and health platforms

**Content + community:**
- "Build a production voice agent in 30 minutes" video series
- Monthly office hours / live builds
- Case studies from design partners

### 9.3 Sales Motion

| Tier | Motion |
|------|--------|
| Starter | Self-serve signup, docs-only, credit card checkout |
| Build | Self-serve signup, docs-driven onboarding |
| Launch | Founder-led or solutions-engineer-assisted onboarding |
| Scale | Direct sales, custom SLA negotiation |

### 9.4 Design Partner Programme (Pre-Launch)

Recruit 5–8 design partners across at least 3 verticals. Offer:
- Free Launch-tier access for 6 months
- Direct Slack channel with engineering team
- Influence on API design and feature prioritisation
- Case study rights upon launch

---

## 10. 90-Day Execution Plan

### Days 0–30: Foundation

| Track | Deliverable |
|-------|------------|
| API | Finalise contracts for realtime sessions, telephony, JSON workflows, connector actions |
| Infrastructure | Harden hosted runtime for launch (customer GCP mode deferred to phase 2) |
| Docs | Publish onboarding documentation and reference architecture |
| Design Partners | Identify and recruit first 3 design partners |
| Brand | Finalise platform name, secure domain, create initial brand assets |

### Days 31–60: Tooling + First Users

| Track | Deliverable |
|-------|------------|
| CLI | Ship CLI wrapper (`init` / `plan` / `deploy` / `verify`) |
| Observability | Launch baseline dashboard: latency, cost, error rates |
| Billing | Stripe subscriptions + seat billing + usage metering + markup pass-through |
| Telephony | Ship Twilio number search/provision/assign APIs with staged country allowlist |
| Partners | Onboard 3–5 design partners across two verticals |
| Docs | Publish vertical-specific quickstart guides |

### Days 61–90: Productisation

| Track | Deliverable |
|-------|------------|
| Reliability | Harden deployment rollback and upgrade flows |
| Pricing | Publish pricing page and tier comparison |
| Launch | Open self-serve Build tier with gated Launch onboarding |
| Connectors | General availability for secure tenant-owned DB/API connectors |
| Marketing | Ship landing page, first case study, launch blog post |
| Metrics | Instrument all success metrics (see Section 11) |

---

## 11. Success Metrics

### Product Metrics

| Metric | Target |
|--------|--------|
| Time to first successful call after signup | < 30 minutes |
| Call-to-extraction success rate | > 95% |
| Median end-to-end call latency | Within provider SLA + < 200ms platform overhead |
| Provider failover success rate | > 99% |

### Business Metrics

| Metric | Target (6-month) |
|--------|------------------|
| Design partner retention | 100% through programme |
| Starter → Build conversion | > 30% |
| Build → Launch conversion | > 25% |
| Launch account expansion (MoM usage growth) | > 15% |
| Gross margin after provider + telephony pass-through | > 65% |
| Team plan expansion (seats/account) | > 20% growth in qualifying cohorts |
| 90-day paid retention | > 85% |

### Operational Metrics

| Metric | Target |
|--------|--------|
| Incident frequency | < 5 per 1,000 calls |
| Mean time to detect call failures | < 60 seconds |
| Mean time to resolve | < 15 minutes |
| Cost variance vs projected usage | < 10% |

---

## 12. Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|-----------|
| Voice provider breaking changes | High | High | Abstraction layer with versioned adapters; automated integration tests per provider |
| Twilio pricing changes or outages | Medium | Medium | Abstract telephony layer to support alternative providers (Vonage, Telnyx) |
| Low initial demand / slow adoption | High | Medium | Design partner programme validates product-market fit before public launch |
| Pricing perceived as expensive vs DIY | Medium | Medium | ROI calculator showing engineering time saved; free Build tier for adoption |
| Security incident in hosted mode | Critical | Low | SOC 2 readiness from day one; customer GCP mode as alternative |
| Team capacity (small team, big scope) | High | High | Ruthless scope control in 90-day plan; defer Scale tier features |
| Connector misuse / data exfiltration via external integrations | Critical | Medium | Connector sandboxing, egress controls, scoped secrets, audit logs, tenant-level policy enforcement |

---

## 13. v1 Decision Log

### 13.1 Locked Decisions (Confirmed)

1. **Deployment posture at launch:** Hosted `[PLATFORM]` Cloud only (self-hosted customer GCP later).
2. **Control plane stack:** Firebase-first.
3. **Launch voice provider set:** OpenAI Realtime + Gemini Live + ElevenLabs + Grok.
4. **Launch telephony provider:** Twilio only, with adapter pattern for future providers.
5. **Workflow definition format:** JSON (n8n-style).
6. **Billing stack:** Stripe for subscriptions, seats, usage metering, and invoicing.
7. **Commercial shape:** platform fee + team seat fees + usage overage + provider/telephony pass-through markup.
8. **Telephony number management:** full API/UI-based number provisioning in-platform for supported regions.
9. **Country rollout strategy:** staged allowlist starting with US, G7, and selected European countries.
10. **Number porting:** not in v1; evaluate in phase 2.

### 13.2 Remaining Decisions

1. **Platform name** — select from candidates and secure domain.
2. **Exact markup policy** — fixed percentage vs tier-dependent percentage.
3. **Final country allowlist** — exact country-by-country list and compliance requirements.
4. **Support SLA matrix** — response times and escalation by tier.
5. **Timeline for customer-GCP mode** — entry criteria and milestone definition.
6. **Initial connector catalog for GA** — final list of first-party supported connectors vs BYO webhook-only baseline.

---

## 14. Relationship to Flank

`[PLATFORM]` is the infrastructure layer. Flank is a vertical application (AI coaching) built on top of it.

This separation is strategic:

- Flank validates the platform under real production load with real users
- `[PLATFORM]` captures value from every team building voice AI, not just coaching
- Flank becomes a reference implementation and case study for `[PLATFORM]`
- Revenue diversification: Flank earns from end-user subscriptions; `[PLATFORM]` earns from developer infrastructure

Over time, Flank's coaching-specific features (cognitive profiling, biometric integration, health memory schemas) remain proprietary while the underlying voice infrastructure becomes the developer platform.

---

*End of document.*
