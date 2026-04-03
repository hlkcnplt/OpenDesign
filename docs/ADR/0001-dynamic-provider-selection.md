# ADR 0001: Dynamic AI Provider Selection via Frontend

**Date:** 2026-04-03
**Status:** Accepted

---

## Context

OpenDesign's core value proposition is AI-agnosticism. Users must be able to use Cloud providers (Gemini, OpenAI) or local models (Ollama, LM Studio) without the platform forcing a single vendor.

The simplest implementation would be to configure the active provider via a server-side `.env` file, requiring a service restart to switch providers. This approach is incompatible with OpenDesign's UX goal of being a flexible, demo-ready tool.

The alternative is to allow the **end user** to select their provider and supply their API key directly from the **React Frontend**, per session, via a settings panel.

---

## Decision

The AI provider and API key are selected and entered by the user in the **React Frontend settings panel** (`ProviderSettings` component). This information is:

1. Held exclusively in **Zustand** in-memory state (`useProviderStore`). It is never persisted to localStorage, sessionStorage, or cookies.
2. Sent as part of the **JSON request body** (never as a query parameter or header) when the user triggers an AI analysis.
3. Forwarded by **server-core** to **server-ai** as part of the bridge analysis payload. It is not stored in PostgreSQL at any point.
4. Consumed by **server-ai** at the adapter level to instantiate the correct SDK client with the provided key for that single request.

### Request Flow

```
React (ProviderSettings → useProviderStore)
  │
  │  POST /api/v1/analysis
  │  { screenId, provider, apiKey, localEndpoint?, modelName? }
  ▼
server-core (AnalysisController → AnalysisService)
  │ Fetches screen's image_url and project description from DB.
  │ Forwards enriched payload. Does NOT store apiKey.
  │
  │  POST http://server-ai:8000/analyze
  │  { imageUrl, projectContext, provider, apiKey, localEndpoint?, modelName? }
  ▼
server-ai (analyze router → provider factory → adapter)
  │ Selects adapter based on provider.
  │ Passes apiKey to SDK client for this request only.
  │ Returns structured AnalysisResult.
  ▼
server-core
  │ Persists AI_Report (without apiKey) and Annotations to PostgreSQL.
  │ Returns AnalysisResponse.
  ▼
React (renders annotations on canvas)
```

---

## Consequences

### Positive

- Zero configuration required on the server to add or switch providers.
- Works offline with local models without any server restart.
- Easy to demonstrate and share with different API keys.
- Provider logic stays fully isolated in `server-ai`.

### Negative / Mitigations

- **API keys travel over the wire.** Mitigation: HTTPS must be enforced in any deployed environment. The key is short-lived in memory and never logged.
- **No key persistence.** The user must re-enter their key after a page refresh. Mitigation: A future enhancement may offer opt-in browser keychain integration via the Web Credentials API, but this is explicitly out of scope for v1.
- **No server-side rate limiting per key.** Mitigation: Provider APIs enforce their own rate limits. This is tracked as a future enhancement.

---

## Alternatives Considered

**A. Server-only `.env` configuration.**
Rejected. Requires a restart to switch providers, incompatible with the multi-user and demo use case.

**B. Frontend → AI Bridge directly (bypass server-core).**
Rejected. This would remove Java Core's ability to log analysis runs, attach project context, and enforce screen-level authorization in future versions.

**C. Store encrypted keys in the database per user.**
Deferred. Appropriate for a multi-user SaaS version but introduces significant complexity (KMS, encryption-at-rest) that is out of scope for v1.
