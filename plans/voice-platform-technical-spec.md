# Voice Platform Technical Specification (Fork from Flank)

**Version:** 1.0  
**Date:** 2026-02-28  
**Status:** Draft for architecture review  
**Author:** Fueld AI / Flank engineering

---

## 1. Executive Take

The concept is strong and technically credible.

You already have most difficult primitives working in production-style form:
- multi-provider realtime voice session bootstrap
- frontend realtime transport handling and transcript capture
- telephony call initiation and scheduled calling
- phone bridge session lifecycle and post-call extraction
- append-only billing event patterns and pricing snapshots

The main challenge is not invention; it is **productization and multi-tenant hardening**.  
This spec defines how to fork the existing codebase and turn it into a provider-agnostic voice platform for third-party developers.

---

## 2. Scope and Objectives

### 2.1 Product Objective

Build a developer platform that enables customers to:
1. connect any supported realtime voice provider
2. compose custom AI workflows and tool-calling logic
3. connect to telephony providers for PSTN/phone-call channels
4. deploy and operate production voice services with hosted or customer-owned runtime

### 2.2 Technical Objectives

- Abstract provider differences behind stable platform contracts.
- Decouple Flank coaching logic from platform runtime.
- Introduce tenant-level isolation, auth, billing, and observability.
- Support both:
  - **Platform-hosted multi-tenant runtime** (fastest onboarding)
  - **Tenant-dedicated runtime in customer GCP** (enterprise posture)
- Export usage and cost telemetry into BigQuery for scale reporting and finance.

### 2.3 Non-Goals (v1)

- Full no-code visual flow editor in initial release (deliver JSON/YAML workflow DSL first).
- Auto failover across all providers for every session type on day 1.
- Marketplace/ecosystem features (public templates, revenue share) in initial milestone.

---

## 3. Existing Assets to Reuse from Flank

### 3.1 Reusable Components (High Reuse)

1. **Voice session bootstrap (`getVoiceToken`)**
   - provider selection, ephemeral token issuance, session record setup
2. **Realtime voice runtime (`useVoiceSession`)**
   - audio capture/playback, provider event parsing, transcript handling
3. **Telephony adapters (`telephony/twilio.ts`)**
   - outbound calling, Verify OTP, TwiML media stream generation
4. **Phone call orchestration handlers**
   - `initiatePhoneCall`, `triggerScheduledCalls`
5. **Bridge session handlers**
   - `bridgeStartSession`, `bridgeFinalizeSession`
6. **Billing primitives**
   - deterministic billing events, pricing snapshots, append-only ledger writer

### 3.2 Flank-Specific Components to Extract

1. **Coaching domain prompt assembly**
   - continuity brief + belief graph context
2. **Belief graph schemas**
   - nodes/edges/motifs specific to coaching app
3. **Flank-specific session types and outputs**
4. **Flank user preferences mixed with platform runtime preferences**

### 3.3 Extraction Strategy

- Keep runtime infrastructure as platform core.
- Move Flank coaching logic into a separate domain package/module:
  - `packages/domain-flank-coaching`
- Platform core should call a generic `workflowResolver` instead of direct coaching prompt logic.

---

## 4. Target Platform Architecture

## 4.1 Planes

### A) Control Plane (Platform-Owned)

Responsibilities:
- tenant lifecycle (signup, app creation, API key management)
- provider secret management and validation
- workflow definitions and versioning
- deploy/provision orchestration
- metering aggregation, billing, limits, and admin observability

Suggested services:
- `tenant-service` (authn/authz + org/app/env)
- `workflow-service` (definitions, versions, validation)
- `runtime-config-service` (provider/telephony/tool configs)
- `provisioning-service` (hosted + BYO runtime orchestration)
- `billing-service` (usage ingestion, pricing, invoices)
- `ops-service` (logs, alerts, health, incidents)

### B) Runtime Plane (Per Tenant Environment)

Responsibilities:
- realtime session start + media orchestration
- tool call execution path
- telephony bridge and call control
- transcript + post-session workflow execution

Runtime components:
- Functions v2 API handlers (region `europe-west2`)
- Cloud Run media bridge (WebSocket)
- Pub/Sub event bus
- Cloud Scheduler triggers
- Firestore runtime state
- BigQuery usage sink

---

## 4.2 Deployment Modes

### Mode 1: Hosted Multi-Tenant Runtime

- Platform operates runtime in shared projects.
- Tenant isolation is logical + policy-based.
- Fastest onboarding.

### Mode 2: Dedicated Runtime per Tenant (Customer GCP)

- Runtime stack deployed into tenant GCP project.
- Control plane remains centrally hosted.
- Strongest security and compliance posture.

---

## 5. Multi-Tenancy Model

## 5.1 Tenant Hierarchy

- `organization` (customer company)
- `application` (voice app/product within org)
- `environment` (`dev`, `staging`, `prod`)
- `end_user` (final user being spoken to)

## 5.2 Data Partitioning

All runtime data must include:
- `orgId`
- `appId`
- `envId`
- `endUserId` (where applicable)

For hosted mode, use strict namespace partitioning:
- `orgs/{orgId}/apps/{appId}/envs/{envId}/...`

For dedicated mode, same logical schema but physically isolated per tenant project.

## 5.3 Access Control

- Control plane auth: OAuth + API keys + service tokens.
- Runtime API auth: scoped environment API keys and signed client tokens.
- Secret access: per-tenant secret namespace with least-privilege IAM.

---

## 6. Data Model (Platform-Native)

## 6.1 Core Config

- `orgs/{orgId}`
- `orgs/{orgId}/members/{memberId}`
- `orgs/{orgId}/apps/{appId}`
- `orgs/{orgId}/apps/{appId}/environments/{envId}`
- `orgs/{orgId}/apps/{appId}/workflows/{workflowId}`
- `orgs/{orgId}/apps/{appId}/workflows/{workflowId}/versions/{versionId}`
- `orgs/{orgId}/apps/{appId}/providers/{providerConfigId}`
- `orgs/{orgId}/apps/{appId}/telephonyProviders/{telephonyConfigId}`
- `orgs/{orgId}/apps/{appId}/phoneNumberPools/{numberId}`
- `orgs/{orgId}/apps/{appId}/telephonyComplianceBundles/{bundleId}`

## 6.2 Runtime Records

- `runtimeSessions/{sessionId}`
- `runtimeSessions/{sessionId}/messages/{messageId}`
- `runtimeSessions/{sessionId}/toolEvents/{eventId}`
- `runtimeSessions/{sessionId}/realtimeExtractions/{eventId}` (optional feature)
- `callLogs/{callSid}`
- `bridgeSessions/{bridgeSessionId}`

## 6.3 Billing, Metering, and Account Balance

- canonical: `billingEvents/{eventId}` (append-only)
- tenant mirror: `orgs/{orgId}/billingEvents/{eventId}`
- rollups: `billingRollupsDaily/{YYYY-MM-DD}`
- balance: `orgs/{orgId}/balance` (current credit state, auto top-up config, overage policy)
- balance ledger: `orgs/{orgId}/balanceLedger/{entryId}` (immutable record of every credit/debit)
- payment methods: `orgs/{orgId}/paymentMethods/{methodId}`
- payments: `orgs/{orgId}/payments/{paymentId}`
- invoices: `orgs/{orgId}/invoices/{invoiceId}`

BigQuery datasets:
- `usage_events`
- `cost_events`
- `session_aggregates`
- `provider_quality_metrics`
- `balance_mutations`
- `payment_events`

---

## 7. API Contracts (v1)

## 7.1 Runtime API

1. `POST /v1/sessions`
   - starts session and returns normalized init payload
2. `POST /v1/sessions/{sessionId}/events`
   - accepts normalized transcript/tool/runtime events
3. `POST /v1/sessions/{sessionId}/finalize`
   - final transcript, outputs, usage
4. `POST /v1/calls/outbound`
   - on-demand phone calls
5. `POST /v1/phone/verify/start`
6. `POST /v1/phone/verify/check`

## 7.2 Control Plane API

1. `POST /v1/orgs`
2. `POST /v1/apps`
3. `POST /v1/apps/{appId}/environments`
4. `POST /v1/apps/{appId}/providers`
5. `POST /v1/apps/{appId}/workflows`
6. `POST /v1/apps/{appId}/deployments`
7. `GET /v1/apps/{appId}/metrics`
8. `GET /v1/apps/{appId}/billing`

## 7.3 Telephony Number Management API (Control Plane)

1. `GET /v1/apps/{appId}/telephony/number-capabilities`
   - provider + country/jurisdiction availability, number types, and required compliance
2. `POST /v1/apps/{appId}/telephony/numbers/search`
   - search available numbers by country, locality, number type, features, and provider
3. `POST /v1/apps/{appId}/telephony/numbers/reserve`
   - reserve a selected number for short hold window before purchase/provisioning
4. `POST /v1/apps/{appId}/telephony/numbers/provision`
   - purchase/provision number via provider API and register it to app environment
5. `POST /v1/apps/{appId}/telephony/numbers/{numberId}/assign`
   - assign number to workflow route, inbound profile, or outbound caller strategy
6. `POST /v1/apps/{appId}/telephony/numbers/{numberId}/release`
   - release/deprovision number
7. `POST /v1/apps/{appId}/telephony/compliance-bundles`
   - upload/attach required regulatory identity docs and business information
8. `GET /v1/apps/{appId}/telephony/numbers`
   - list provisioned numbers with status, jurisdiction, monthly cost, and assignment

---

## 8. Voice Provider Abstraction

## 8.1 Adapter Interfaces

### Backend Init Adapter

```ts
interface VoiceProviderInitAdapter {
  provider: 'openai' | 'gemini' | 'elevenlabs' | 'grok' | string;
  startSession(input: StartVoiceSessionInput): Promise<VoiceInitPayload>;
}
```

### Runtime Event Normalizer

```ts
type NormalizedVoiceEvent =
  | { type: 'user_transcript_partial'; text: string }
  | { type: 'user_transcript_final'; text: string }
  | { type: 'assistant_transcript_partial'; text: string }
  | { type: 'assistant_transcript_final'; text: string }
  | { type: 'assistant_audio'; audioBase64: string; sampleRate: number }
  | { type: 'tool_call'; name: string; args: Record<string, unknown> }
  | { type: 'turn_complete' }
  | { type: 'error'; code: string; message: string; recoverable: boolean };
```

## 8.2 Capability Flags

Per provider, persist capabilities:
- realtime audio in/out
- server-side VAD
- tool calling support
- transcript events (partial/final)
- text-only fallback

Runtime orchestration must branch on capabilities, not provider name.

---

## 9. Telephony Abstraction

## 9.1 Telephony Adapter Contract

```ts
interface TelephonyAdapter {
  provider: 'twilio' | 'telnyx' | 'vonage' | 'sip' | 'meta_whatsapp';
  createOutboundCall(input: OutboundCallInput): Promise<OutboundCallResult>;
  startPhoneVerification?(input: VerifyStartInput): Promise<VerifyStartResult>;
  checkPhoneVerification?(input: VerifyCheckInput): Promise<VerifyCheckResult>;
  buildMediaStreamConnectPayload(input: MediaStreamInput): string;
}
```

## 9.2 v1 and v2 Support

- **v1:** Twilio first-class.
- **v2:** Telnyx/Vonage/SIP adapters.
- **v3:** WhatsApp voice channel where provider APIs and market availability support call media streaming.

Note: WhatsApp voice support is capability-dependent and should be treated as a dedicated channel adapter, not assumed Twilio-equivalent behavior.

## 9.3 Number Lifecycle Management (Platform-Controlled)

To keep developers out of provider consoles, the platform must own number lifecycle end-to-end:
1. **Discover:** query provider inventory APIs for available numbers by jurisdiction.
2. **Reserve:** hold selected number for short TTL where provider supports reservation.
3. **Provision:** purchase/provision number and attach webhook/media routing.
4. **Assign:** map number to inbound workflow, outbound policy, and environment.
5. **Operate:** monitor status, renewal state, capability changes, and health.
6. **Release/Port:** release number or trigger porting workflow when applicable.

## 9.4 Number Inventory and Routing Data

Each managed number record should include:
- `numberId` (platform id) and `providerResourceId`
- `e164Number`
- `provider` and `accountScope`
- `countryCode`, `jurisdiction`, and `regulatoryRegion`
- `numberType` (`local`, `mobile`, `national`, `toll_free`)
- `capabilities` (`voice_inbound`, `voice_outbound`, `sms`, `whatsapp_voice` as available)
- `monthlyRecurringCostMicros` and `currency`
- `lifecycleStatus` (`available`, `reserved`, `provisioning`, `active`, `suspended`, `releasing`, `released`)
- `assignment` (env + workflow + route profile)
- `complianceBundleId` and compliance status

## 9.5 Jurisdiction and Compliance Workflow

Number procurement in many countries requires KYC/regulatory artifacts.  
Platform requirements:
- show requirements per country/provider before purchase attempt
- collect and store required legal/business fields in control plane
- upload and bind compliance artifacts via provider APIs
- track verification states (`pending_review`, `approved`, `rejected`, `expired`)
- block assignment/use when regulatory state is not valid

## 9.6 Provider Capability Matrix for Number Procurement

Control plane keeps a live capability matrix per provider:
- searchable inventory availability by jurisdiction
- reservation support and TTL rules
- compliance bundle API support vs manual review fallback
- webhook/programmatic assignment support
- port-in/port-out support

Fallback policy:
- if provider API cannot complete a step (for a jurisdiction), surface clear in-product status and guided manual fallback path without breaking app routing abstractions.

## 9.7 UI Requirements (Developer Console)

Add a **Telephony Numbers** console with:
1. **Search panel:** country/jurisdiction, type, capability, provider filters.
2. **Availability table:** number, locality, monthly cost, features, regulatory requirements.
3. **Provision wizard:** compliance checks, reserve/provision actions, error recovery.
4. **Assignment UI:** bind number to environment + workflow route.
5. **Operations view:** health, recent calls, webhook status, release/replace actions.

---

## 10. Workflow Engine

## 10.1 Runtime Stages

1. `SESSION_INIT`
2. `PROMPT_RESOLVE`
3. `LIVE_TURN_LOOP`
4. `TOOL_EXECUTION`
5. `SESSION_FINALIZE`
6. `POST_PROCESS`

## 10.2 Workflow Definition

Store workflow definitions as versioned JSON with:
- prompt templates
- tool schema declarations
- tool routing rules
- guardrails and limits
- post-processing hooks

## 10.3 Tool Calling

- Tenant-defined tool registry.
- Signed outbound calls to tenant systems.
- Retries + idempotency keys.
- Per-tool timeout/circuit breaker.
- Full audit logs for arguments and results.

---

## 11. Billing, Metering, and Pricing

## 11.1 Event Ingestion

Reuse append-only event design already present in Flank:
- deterministic event IDs
- immutable write model
- estimated vs final amount status
- pricing snapshot at write time

## 11.2 BigQuery Pipeline

### Step 1 (MVP)
- Firestore canonical ledger + mirror collections.
- Scheduled export job to BigQuery.

### Step 2
- Pub/Sub streaming of usage events to BigQuery sink.
- Near-real-time cost dashboards.

## 11.3 Required Cost Dimensions

- org/app/env
- provider/model
- channel (`voice_web`, `voice_phone`)
- session/call IDs
- workflow version
- region
- phone number jurisdiction/country

## 11.4 Account Balance and Credit Model

Each organization maintains a prepaid credit balance tracked in real time:
- `orgs/{orgId}/balance` stores current credit balance in micros (USD).
- Balance is decremented on each finalized billing event.
- Balance is incremented by manual top-ups, auto top-ups, and plan renewals.
- All balance mutations are recorded as immutable ledger entries in `orgs/{orgId}/balanceLedger/{entryId}`.

### Balance Record Schema

```ts
interface OrgBalance {
  orgId: string;
  balanceMicros: number;           // current available credit
  reservedMicros: number;          // held for in-progress sessions
  lowBalanceThresholdMicros: number;
  autoTopUp: AutoTopUpConfig | null;
  overagePolicy: OveragePolicy;
  lastUpdated: Timestamp;
}
```

## 11.5 Pricing Tiers and Plans

### Plan Structure

Each plan defines:
- monthly base fee (platform access)
- included minutes per billing period (voice_web and voice_phone counted separately or pooled)
- per-minute overage rate by channel
- per-minute provider pass-through markup percentage
- telephony per-minute and per-SMS rates (pass-through + platform margin)
- phone number monthly recurring fees (pass-through + platform margin)

### Example Tiers (Illustrative)

| Tier | Monthly Fee | Included Minutes | Overage Rate | Provider Markup |
|------|-------------|------------------|--------------|-----------------|
| Starter | $49 | 500 | $0.08/min | 15% |
| Growth | $199 | 2,500 | $0.06/min | 10% |
| Scale | $499 | 10,000 | $0.04/min | 8% |
| Enterprise | Custom | Custom | Custom | Custom |

### Pricing Snapshots

Every billing event captures the pricing rule that applied at write time. Plan changes take effect at next billing period; mid-cycle upgrades are prorated.

## 11.6 Service Continuity -- Never Cut Off a Live Service

**Design principle:** A customer's production voice service must never hard-stop due to a billing shortfall. Abrupt service termination destroys end-user trust and is unacceptable for production voice workloads.

### Auto Top-Up

Tenants can configure automatic balance replenishment:

```ts
interface AutoTopUpConfig {
  enabled: boolean;
  triggerThresholdMicros: number;   // replenish when balance drops below this
  topUpAmountMicros: number;        // amount to add per top-up
  paymentMethodId: string;          // stored payment method reference
  maxTopUpsPerDay: number;          // safety cap (default: 5)
  maxTopUpsPerMonth: number;        // safety cap (default: 30)
  notifyOnTopUp: boolean;
}
```

Flow:
1. After each billing event finalization, check balance against `triggerThresholdMicros`.
2. If below threshold and auto top-up enabled, charge stored payment method for `topUpAmountMicros`.
3. On success, credit balance immediately; record ledger entry.
4. On payment failure, notify org admins; do **not** suspend service (enter grace period instead).

### Overage Billing

When included plan minutes are exhausted:
1. Continue service without interruption.
2. Meter all additional usage at the plan's overage rate.
3. Deduct overage cost from prepaid balance if available.
4. If balance insufficient, accrue overage as a receivable and charge at end of billing period or on next successful auto top-up.
5. Overages are itemized on the invoice with full session-level detail.

### Grace Period and Soft Limits

| Condition | Action | Service Impact |
|-----------|--------|----------------|
| Balance drops below low threshold | Notify admins, trigger auto top-up if configured | **None** |
| Balance reaches zero | Notify admins urgently, attempt auto top-up, begin grace period | **None** |
| Grace period active (configurable, default 72 hours) | Continue service, accrue usage as receivable, escalate notifications every 24h | **None** |
| Grace period expired + no payment resolution | Degrade to soft limits (reduced concurrency, no new phone number provisioning) | **Partial -- existing sessions unaffected** |
| 7 days past grace expiry + no payment | Suspend new session starts; existing active sessions allowed to complete | **New sessions blocked** |
| 30 days past grace expiry | Full suspension with data retention per contract | **Full** |

Hard kill-switch should only engage on explicit admin action or fraud detection -- never automatically from a billing shortfall alone.

### Overage Policy Configuration

```ts
interface OveragePolicy {
  mode: 'auto_charge' | 'accrue_and_invoice' | 'hard_limit';
  hardLimitAction?: 'notify_only' | 'degrade' | 'suspend';
  gracePeriodHours: number;           // default: 72
  maxAccruedOverageMicros: number;    // safety cap on unbilled overage
  notificationChannels: ('email' | 'webhook' | 'in_app')[];
}
```

`hard_limit` mode is available for tenants who explicitly opt in, but it is never the default. Default overage policy is `auto_charge` with a 72-hour grace period.

### Session-Level Balance Reservation

To prevent balance from going deeply negative during long sessions:
1. On session start, reserve an estimated cost hold based on expected duration (configurable per workflow, default: 10 minutes equivalent).
2. Extend reservation periodically for long-running sessions.
3. On session finalize, settle reservation against actual usage.
4. If balance is insufficient for reservation, still start the session but flag for immediate auto top-up attempt.

## 11.7 Payment Processing

### Supported Payment Methods
- Credit/debit card via Stripe
- Direct debit / SEPA (enterprise)
- Invoice/PO (enterprise, manual approval)

### Payment Events Data Model

```
orgs/{orgId}/paymentMethods/{methodId}
orgs/{orgId}/payments/{paymentId}
orgs/{orgId}/invoices/{invoiceId}
```

### Invoice Generation
- Monthly invoices generated at billing period close.
- Include: base plan fee, included usage summary, itemized overages, phone number fees, taxes.
- Invoices reference all underlying billing events for full auditability.

## 11.8 Spending Controls and Alerts

Tenants can configure:
- **Monthly spend cap:** hard or soft ceiling on total monthly spend (soft = notify; hard = apply overage policy).
- **Per-session cost cap:** terminate session if estimated cost exceeds threshold (tenant opt-in).
- **Per-provider spend alerts:** notify when spend on a specific provider exceeds threshold.
- **Anomaly detection:** alert on usage spikes exceeding 3x rolling 7-day average.

All alerts delivered via configured notification channels (email, webhook, in-app).

---

## 12. Provisioning and Infrastructure Automation

## 12.1 Provisioning Service Responsibilities

For each tenant environment:
1. create or attach GCP project
2. enable APIs (Cloud Run, Functions, Secret Manager, Pub/Sub, Scheduler, Artifact Registry, BigQuery)
3. create service accounts + IAM bindings
4. provision secret placeholders
5. deploy runtime artifacts
6. create scheduler jobs and topics
7. run health checks and mark environment `ready`
8. configure telephony callback endpoints and signature validation secrets

## 12.2 Terraform Modules

Create module families:
- `modules/runtime-core`
- `modules/telephony-bridge`
- `modules/billing-observability`
- `modules/bigquery-exports`

Root compositions:
- `stacks/hosted-multi-tenant`
- `stacks/customer-dedicated`

---

## 13. Security and Compliance

## 13.1 Baseline

- Functions v2 and Cloud Run in `europe-west2`.
- Secret Manager for all provider and telephony credentials.
- No long-lived provider secrets to browser clients.
- Signed bridge-to-functions communications (`x-bridge-secret` pattern upgraded to rotated secret or JWT).
- WAF/rate limits at public ingress.

## 13.2 Tenant Safety Controls

- per-app and per-user usage quotas
- per-provider spending caps
- call concurrency caps
- emergency kill switch per environment

## 13.3 Auditability

- immutable billing events
- deployment change logs
- workflow version promotion audit trail
- provider credential change history

## 13.4 Telephony Regulatory Controls

- maintain auditable record of compliance bundle submissions and approvals
- enforce jurisdiction restrictions at provisioning and assignment time
- alert before compliance artifact expiry or provider suspension
- separate PII/doc storage from runtime call data with strict access policies

---

## 14. Observability and SLOs

## 14.1 Golden Signals

- session start success rate
- time to first assistant audio
- turn completion latency
- call connect success rate
- call drop/failure rate
- extraction finalize success rate

## 14.2 SLO Targets (Initial)

- session start success: >= 99.5%
- call connect success: >= 98%
- call-to-finalize success: >= 95%
- p95 platform overhead on turn: <= 250ms (excluding model generation latency)

## 14.3 Telemetry Stack

- structured logs with correlation IDs (`orgId`, `appId`, `envId`, `sessionId`, `callSid`)
- traces across Functions + Cloud Run + provider calls
- metrics dashboard per tenant and global

---

## 15. Fork and De-Verticalization Plan

## 15.1 Repository Refactor

### Current
- Flank app + infra in one monorepo.

### Target
- `platform-core/` (new product)
- `examples/flank-reference/` (reference implementation)

### Proposed Package Layout

- `packages/runtime-core`
- `packages/provider-adapters`
- `packages/telephony-adapters`
- `packages/workflow-engine`
- `packages/billing-core`
- `packages/control-plane-sdk`
- `packages/domain-flank-coaching` (optional reference)

## 15.2 Code Extraction Mapping

- Move `getVoiceToken` logic into `runtime-core/session-init`.
- Move provider-specific branches into `provider-adapters/*`.
- Move Twilio logic to `telephony-adapters/twilio`.
- Keep existing bridge handlers as initial runtime bridge API.
- Remove direct belief graph dependencies from core runtime paths.

---

## 16. Delivery Roadmap (Technical)

## Phase 0 - Architecture Freeze (1-2 weeks)

- lock contracts (session init, normalized events, workflow definitions)
- lock tenant model and auth model
- finalize hosted vs dedicated deployment posture for beta

## Phase 1 - Core Extraction (3-4 weeks)

- fork repo
- extract provider adapters and telephony adapters
- replace Flank-specific prompt path with workflow resolver
- maintain parity with current OpenAI/Gemini/Twilio runtime

## Phase 2 - Control Plane MVP (4-6 weeks)

- org/app/env model
- API key issuance
- provider and telephony config UI/API
- deployment pipeline for hosted mode

## Phase 3 - Metering, Billing, and Service Continuity (3-5 weeks)

- canonical billing ingestion service
- account balance and credit ledger
- auto top-up flow with Stripe integration
- overage metering, accrual, and grace period engine
- session-level balance reservation and settlement
- tenant billing summaries and invoice generation
- spending controls, alerts, and anomaly detection
- BigQuery export and baseline dashboards

## Phase 4 - Dedicated Runtime Provisioning (4-6 weeks)

- Terraform modules + provisioning orchestrator
- customer-project deployment flow
- health verification and rollback logic

## Phase 5 - Beta Hardening (3-4 weeks)

- reliability testing under load
- incident playbooks
- SLA instrumentation and runbooks

---

## 17. Initial Backlog by Workstream

## 17.1 Runtime Core

- [ ] `startVoiceSession` provider-agnostic callable/API
- [ ] normalized runtime event schema package
- [ ] session lifecycle state machine abstraction

## 17.2 Provider Layer

- [ ] OpenAI adapter extraction
- [ ] Gemini adapter extraction
- [ ] ElevenLabs adapter stabilization
- [ ] Grok adapter hardening + capability matrix

## 17.3 Telephony Layer

- [ ] Twilio adapter contract compliance
- [ ] bridge auth hardening (signed JWT)
- [ ] call status callback ingestion and reconciliation
- [ ] number search/reserve/provision adapter contracts
- [ ] telephony capability matrix service (by provider + jurisdiction)
- [ ] number inventory model + assignment engine
- [ ] compliance bundle ingestion + provider sync workflows
- [ ] developer console Telephony Numbers UI

## 17.4 Control Plane

- [ ] org/app/env data model
- [ ] API key and RBAC service
- [ ] deployment job runner

## 17.5 Data and Billing

- [ ] usage event schema registry
- [ ] BigQuery export job
- [ ] daily rollup generation
- [ ] account balance and credit ledger model
- [ ] auto top-up configuration and payment charging flow
- [ ] overage metering and accrual engine
- [ ] grace period state machine and escalation notifications
- [ ] session-level balance reservation and settlement
- [ ] Stripe payment method storage and charging integration
- [ ] monthly invoice generation with itemized overages
- [ ] spending controls and anomaly detection alerting
- [ ] overage policy configuration API and developer console UI

---

## 18. Major Risks and Mitigations

1. **Provider protocol churn**
   - mitigate with adapter boundaries and integration test suites per provider
2. **Cross-tenant blast radius in hosted mode**
   - strict tenant isolation keys + quotas + progressive traffic controls
3. **Billing disputes at scale**
   - immutable event ledger + reconciliation jobs + pricing version snapshots
4. **Telephony reliability variance by geography**
   - provider abstraction + regional routing + fallback providers
5. **Over-coupling to Flank semantics**
   - enforce generic runtime contracts and keep Flank as reference package only
6. **Billing-induced service outage**
   - mitigate with auto top-up, grace periods, and overage accrual so service never hard-stops on billing shortfall
   - default overage policy is `auto_charge` with 72-hour grace; hard cutoff requires explicit tenant opt-in
   - session-level balance reservations prevent deep negative balances without blocking sessions

---

## 19. Decisions Required Before Build Starts

1. Hosted-only beta or hosted + dedicated from day one?
2. Minimum provider set at GA (recommended: OpenAI + Gemini + Twilio, with ElevenLabs optional path).
3. Workflow definition format for v1 (JSON DSL recommended).
4. Billing product shape at launch (platform fee + usage + pass-through markup).
5. Control plane stack choice (Firebase-first vs separate service stack) for long-term scale.
6. Number lifecycle scope at launch: full API provisioning vs hybrid with manual fallback for restricted jurisdictions.
7. Which jurisdictions are GA-supported in self-serve (recommended: staged country allowlist).
8. Porting strategy: v1 deferred or include managed port-in/out for launch accounts.

---

## 20. Definition of Done for Platform v1

Platform v1 is complete when a third-party developer can:
1. sign up, create app/environment, and add provider + telephony credentials
2. deploy runtime in under 30 minutes
3. run in-app voice session and phone call session using same workflow
4. receive tool-calling events into their own webhook/system
5. view session logs, provider latency, and usage/cost breakdown
6. rotate credentials and promote workflow versions without downtime
7. search, provision, and assign phone numbers by jurisdiction from platform UI/API without needing provider consoles for supported regions
8. configure auto top-up or overage billing so their production service is never interrupted by a billing shortfall
9. view current balance, spending alerts, and invoice history from the developer console

---

*End of technical spec.*

