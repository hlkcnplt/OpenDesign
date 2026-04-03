# OpenDesign

**Hybrid AI-Agnostic UI/UX Auditing Platform**

OpenDesign is a powerful, open-source tool built to help designers and developers refine user interfaces. It provides a Figma-like infinite canvas where users can upload application screens, and it leverages AI to analyze these screens based on UX heuristics. 

It supports various AI backends to fit your workflow and privacy needs: Cloud models like Google Gemini or OpenAI GPT-4o, or Local models using Ollama/LM Studio.

## Architecture & Tech Stack

This repository is a polyglot monorepo containing three distinct services:

1. **Client (`/client`)**
   - React 18+ leveraging Vite.
   - UI styled with Tailwind CSS.
   - Figma-like map managed by React-Konva.
   - Global state driven by Zustand.

2. **Server-Core (`/server-core`)**
   - Java 21 powered by Spring Boot 3.3+.
   - Robust orchestration and persistent metadata storage inside PostgreSQL.

3. **Server-AI Bridge (`/server-ai`)**
   - Python 3.10+ using FastAPI.
   - Implements abstract adapters to connect seamlessly with diverse AI Vision models.

## Local Setup Using Docker

The easiest way to run the entire stack locally is utilizing Docker Compose.

```bash
# 1. Copy the environment variables template
cp .env.example .env

# 2. Fill in the relevant API keys inside .env

# 3. Spin up the containers
docker-compose up -d --build
```
    
- Frontend Client: `http://localhost:5173`
- Java Backend: `http://localhost:8080`
- Python AI Bridge: `http://localhost:8000`

## Contributing

We welcome community contributions! Please view our [CONTRIBUTING.md](CONTRIBUTING.md) to understand our branching strategy and code standards.
