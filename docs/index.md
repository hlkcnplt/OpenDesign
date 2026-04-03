# OpenDesign Documentation

Welcome to the OpenDesign documentation hub.

## Sections

- [ADR (Architecture Decision Records)](./ADR/): Formal records of key architectural decisions and their rationale.
- [Getting Started](./getting-started/): Developer setup and onboarding guide.
- [Architecture](./architecture/): Deep-dive diagrams and descriptions of system design.

## Steering Instructions (for AI Agents)

Project-wide rules and standards for AI coding assistants are found in `.agents/steering/`. These documents are the authoritative source of truth for coding standards, architecture decisions, and naming conventions.

| Document                                | Coverage                                   |
|-----------------------------------------|--------------------------------------------|
| `.agents/steering/architecture.md`      | System overview, data flow, service boundaries |
| `.agents/steering/frontend.md`          | React, Tailwind, Zustand, API key handling |
| `.agents/steering/backend.md`           | Java, Spring Boot, DTOs, JPA               |
| `.agents/steering/ai-bridge.md`         | Python, FastAPI, Adapter Pattern           |
| `.agents/steering/testing.md`           | Testing strategy per layer                 |
| `.agents/steering/infrastructure.md`    | Docker, CI/CD, environment variables       |
| `.agents/steering/naming.md`            | Naming conventions across the stack        |
| `.agents/steering/code-quality.md`      | Linting, security, code review standards   |
