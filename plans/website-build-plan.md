# VoiceRails Website Delivery Plan

## Goal
Launch a production-ready Next.js marketing + docs website on Firebase, with Stripe lifecycle webhook foundation and an initial workflow builder demo.

## Phase 1: Foundation (Complete)

- Next.js App Router scaffold
- Brand system with matte black + alert orange palette
- Firebase Hosting static export configuration
- Firebase Functions scaffold for backend webhooks

## Phase 2: Marketing Site (Complete)

- Hero, product module sections, architecture, roadmap, and pricing
- Stripe billing lifecycle messaging and event coverage
- CTA layout ready for logos and brand assets later

## Phase 3: Documentation Hub (Complete)

- `/docs` landing page
- Getting started, runtime API, telephony, Stripe billing, and workflow docs routes
- Code snippets and endpoint contracts aligned with PRDs

## Phase 4: Builder Experience (Complete - Demo Scope)

- `/workflow-builder` interactive drag/drop proof-of-concept
- Block palette + flow canvas + JSON DSL preview
- Positioning for semi-technical users and engineering handoff

## Phase 5: Stripe Webhook Backend (Complete - Foundation Scope)

- `POST /api/stripe/webhook` with signature verification
- Idempotent event persistence in Firestore
- Tenant billing state mirror updates for supported lifecycle events

## Post-Launch Build Queue (Recommended)

1. Real auth + org context, then secure Checkout/Portal creation endpoints.
2. MDX docs engine with search, versioning, and changelog pages.
3. Persistent workflow entities, approvals, and publish/rollback controls.
4. Operational dashboards for webhook failures and billing reconciliation.
