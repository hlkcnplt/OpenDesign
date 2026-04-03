# OpenDesign — Naming Conventions

Consistency in naming across a polyglot repo prevents confusion and makes the codebase immediately parseable regardless of which layer you are reading.

---

## General Principles

- Names must be descriptive and self-documenting. Abbreviations are forbidden unless universally understood (e.g. `id`, `url`, `dto`).
- Avoid Hungarian notation. No `strName`, `intCount`, `boolActive`.
- Boolean variables and fields must read as a question: `isActive`, `hasAnnotations`, `canEdit`.

---

## Frontend (TypeScript / React)

| Concern              | Convention             | Example                                  |
|----------------------|------------------------|------------------------------------------|
| Components           | PascalCase             | `ProviderSettings.tsx`, `CanvasBoard.tsx`|
| Hooks                | camelCase, `use` prefix| `useAIAnalysis.ts`, `useCanvasStore.ts`  |
| Zustand stores       | camelCase, `use` prefix| `useProviderStore.ts`                    |
| API client files     | camelCase              | `client.ts`, `analysisApi.ts`            |
| Types / Interfaces   | PascalCase             | `AnalysisRequest`, `ProviderState`       |
| Enums (use const)    | SCREAMING_SNAKE_CASE values | `export const Provider = { GEMINI: 'GEMINI' } as const` |
| CSS class names      | Tailwind utilities only; custom classes use kebab-case | `.canvas-overlay` |
| Event handlers       | `handle` prefix        | `handleProviderChange`, `handleDrop`     |
| API route constants  | SCREAMING_SNAKE_CASE   | `const ANALYZE_ENDPOINT = '/api/v1/analyze'` |
| Test files           | Same name + `.test.ts` | `useAIAnalysis.test.ts`                  |

---

## Backend — Java (server-core)

| Concern              | Convention             | Example                                   |
|----------------------|------------------------|-------------------------------------------|
| Packages             | lowercase, dot-separated | `com.opendesign.core.services`          |
| Classes              | PascalCase             | `AnalysisService`, `ScreenController`     |
| Interfaces           | PascalCase (no `I` prefix) | `AnalysisService` (impl: `AnalysisServiceImpl`) |
| Methods              | camelCase              | `triggerAnalysis()`, `findScreenById()`   |
| Record DTOs          | PascalCase + suffix    | `AnalysisRequest`, `AnalysisResponse`     |
| Entities             | PascalCase (no suffix) | `Screen`, `Project`, `AiReport`           |
| Repositories         | PascalCase + `Repository` | `ScreenRepository`, `AiReportRepository` |
| Controllers          | PascalCase + `Controller` | `AnalysisController`                  |
| Config classes       | PascalCase + `Config`  | `WebClientConfig`, `SecurityConfig`       |
| Test classes         | Same name + `Test`     | `AnalysisServiceTest`                     |
| Constants            | SCREAMING_SNAKE_CASE   | `MAX_FILE_SIZE_MB`                        |
| DB columns           | snake_case             | `project_id`, `image_url`, `created_at`  |
| REST endpoints       | kebab-case, plural resource | `/api/v1/screens`, `/api/v1/ai-reports` |

---

## AI Bridge — Python (server-ai)

| Concern              | Convention             | Example                                   |
|----------------------|------------------------|-------------------------------------------|
| Modules / files      | snake_case             | `gemini_provider.py`, `analyze.py`        |
| Classes              | PascalCase             | `GeminiProvider`, `BridgeAnalysisRequest` |
| Methods / functions  | snake_case             | `analyze_image()`, `get_provider()`       |
| Variables            | snake_case             | `image_url`, `api_key`, `model_name`      |
| Constants            | SCREAMING_SNAKE_CASE   | `DEFAULT_MODEL_NAME`                      |
| Pydantic models      | PascalCase             | `AnalysisResult`, `AnnotationResult`      |
| Test files           | `test_` prefix         | `test_analyze.py`, `test_gemini_provider.py` |
| Router files         | noun describing resource | `analyze.py` (for `/analyze` routes)   |

---

## Git & Branching

| Concern              | Convention                         | Example                                   |
|----------------------|------------------------------------|-------------------------------------------|
| Main branch          | `main`                             |                                           |
| Feature branches     | `feat/<short-description>`         | `feat/canvas-drag-drop`                   |
| Bug fixes            | `fix/<short-description>`          | `fix/provider-fallback-502`               |
| Documentation        | `docs/<short-description>`         | `docs/add-adr-provider-selection`         |
| Chores               | `chore/<short-description>`        | `chore/update-dependencies`               |
| Commit messages      | Conventional Commits               | `feat(ai-bridge): add gemini adapter`     |

### Conventional Commit Types

| Type     | When to use                                        |
|----------|----------------------------------------------------|
| `feat`   | New feature                                        |
| `fix`    | Bug fix                                            |
| `docs`   | Documentation only changes                         |
| `chore`  | Build, tooling, dependency updates                 |
| `test`   | Adding or fixing tests                             |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf`   | Performance improvement                            |

---

## Database

- Table names: `snake_case`, plural (e.g. `screens`, `ai_reports`, `annotations`).
- Column names: `snake_case` (e.g. `project_id`, `image_url`).
- Index names: `idx_{table}_{column(s)}` (e.g. `idx_screens_project_id`).
- Foreign key constraints: `fk_{table}_{referenced_table}` (e.g. `fk_screens_projects`).
- Primary keys: always `id UUID`.
- Timestamps: `created_at`, `updated_at` on every table.
