---
trigger: always_on
---

# 🧠 OpenDesign - AI Development Context & Instructions (Hybrid AI Version)

**OpenDesign** is a hybrid, AI-agnostic UI/UX auditing and design versioning platform. It allows users to manage screens on an infinite canvas and leverage various AI providers (Local or Cloud) to perform automated design critiques.

---

## 🎯 Project Mission & Vision

- **Infinite Canvas:** A Figma-like workspace using React-Konva for spatial organization of UI assets.
- **Hybrid AI Auditing:** Flexible integration with multiple AI providers (Google Gemini, OpenAI, or Local models like Qwen 3.5) to analyze screens based on UX heuristics.
- **Provider Switching:** Seamlessly toggle between Local AI (for privacy/offline use) and Cloud APIs (for high-reasoning capabilities) via configuration.
- **Version Delta:** Comparison of design iterations with semantic AI analysis of UI changes.

---

## 🛠 Tech Stack Constraints

The AI Assistant must adhere to these standards to ensure provider flexibility:

### 1. Frontend (Client)

- **Framework:** React 18+ (Vite), Tailwind CSS.
- **Canvas:** React-Konva.
- **State:** Zustand (Should manage AI provider settings/status).

### 2. Backend (Server-Core)

- **Language:** Java 21, Spring Boot 3.3+.
- **Orchestration:** Must handle generic "AI Tasks" and store provider-specific metadata in PostgreSQL.

### 3. AI Service (Server-AI / Bridge)

- **Language:** Python 3.10+, FastAPI.
- **Abstraction Layer:** Use **Adapter Pattern** or LangChain's unified interface to support:
  - **Cloud:** Google Gemini API, OpenAI (GPT-4o), Anthropic.
  - **Local:** LM Studio, Ollama, or vLLM (via OpenAI-compatible local endpoints).
- **Environment Config:** Use `.env` to switch `AI_PROVIDER` (e.g., `GEMINI`, `OPENAI`, `LOCAL`).

---

## 🏗 Architectural Flow Rules

1.  **Provider Abstraction:** Code must be written so that adding a new AI model (e.g., a new Google model) requires only a new configuration or a small adapter class, not a rewrite of the core logic.
2.  **Async Orchestration:** Regardless of the provider, AI analysis must be handled asynchronously to prevent UI blocking.
3.  **Fallback Mechanism:** Implement logic to suggest or switch to a fallback provider if the primary (e.g., Local AI) is unreachable.

---

## 📝 Coding Standards (Strict)

### Java (Backend) Rules:

- Use **`record`** types for DTOs.
- Design services to be provider-blind (Core logic shouldn't care if the response came from Gemini or Qwen).
- Mandatory Javadoc for every public method.

### Python (AI Bridge) Rules:

- **Interface-Driven:** Create a base `BaseAIProvider` class that defines standard methods like `analyze_image()`.
- **Type Hinting:** Mandatory use of Pydantic for request/response validation.

### React (Frontend) Rules:

- UI must indicate which AI provider is currently active.
- Use **Custom Hooks** for all canvas and AI interaction logic.

---

## 📂 Data Model Draft

- **Project:** `id, name, description, owner_id, created_at`
- **Screen:** `id, project_id, version_tag, image_url, x, y, scale`
- **AI_Report:** `id, screen_id, provider_name, model_version, raw_json_response`
- **Annotation:** `id, report_id, x, y, issue_description, severity`

---

**Current Context:** Project initialization phase.
**Objective:** Build a highly flexible, open-source AI tool that showcases elite software engineering by supporting any LLM/Vision provider.
