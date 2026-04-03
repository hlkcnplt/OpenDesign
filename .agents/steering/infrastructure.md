# OpenDesign — Infrastructure

## Local Development Stack

All services are orchestrated via Docker Compose for local development. A developer must be able to run the entire stack with a single command after configuring `.env`.

```bash
cp .env.example .env
# Edit .env with your API keys if using cloud providers
docker-compose up -d --build
```

### Service URLs (Local)

| Service       | URL                      |
|---------------|--------------------------|
| React Client  | http://localhost:5173    |
| Java Core API | http://localhost:8080    |
| Python AI API | http://localhost:8000    |
| PostgreSQL    | localhost:5432           |
| API Docs (AI) | http://localhost:8000/docs |

### Docker Compose Rules

- Use named volumes for PostgreSQL data persistence across container restarts.
- Services depend on each other using `depends_on` with `condition: service_healthy` where possible.
- The `client` service in Docker Compose is for integration use only. During development, run Vite locally (`npm run dev`) for hot module replacement.
- The `server-core` and `server-ai` Dockerfiles use multi-stage builds to keep production images lean.

### Development Without Docker (Fast Iteration)

For faster iteration on a single service:

**Frontend:**
```bash
cd client
npm install
npm run dev
```

**Java Core:**
```bash
cd server-core
./mvnw spring-boot:run
```
Requires PostgreSQL running locally or via `docker-compose up postgres -d`.

**AI Bridge:**
```bash
cd server-ai
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## CI/CD (GitHub Actions)

Pipeline file: `.github/workflows/ci.yml`

### Pipeline Stages

```
PR / Push to main
       │
       ├─── client-build ──── npm install → npm run test → npm run build
       │
       ├─── server-core-build ── ./mvnw test → ./mvnw verify
       │
       └─── server-ai-check ── pip install → pytest → python -m py_compile
```

### Rules

- All three jobs must pass before a PR can be merged.
- The workflow uses GitHub's dependency caching (`actions/cache`) for `node_modules`, Maven local repository, and pip.
- Secrets (`OPENAI_API_KEY`, `GEMINI_API_KEY`) must be stored in GitHub Actions Secrets and never hardcoded in workflow files.
- The integration test job (`./mvnw verify`) only runs on pushes to `main`, not on PRs, to avoid Testcontainers overhead on every PR.

---

## Environment Variables

All environment variables are documented in `.env.example`. No service may read a configuration value that is not listed there.

### Root-level (consumed by docker-compose)

| Variable           | Description                                  |
|--------------------|----------------------------------------------|
| `POSTGRES_USER`    | Database user                                |
| `POSTGRES_PASSWORD`| Database password                            |
| `POSTGRES_DB`      | Database name                                |
| `AI_PROVIDER`      | Default provider for dev: `LOCAL`            |
| `OPENAI_API_KEY`   | Dev default key for OpenAI (optional)        |
| `GEMINI_API_KEY`   | Dev default key for Gemini (optional)        |
| `LOCAL_AI_ENDPOINT`| Ollama / LM Studio URL                       |
| `LOCAL_AI_MODEL_NAME` | Default model name for local AI          |

### server-core (`application.yml`)

| Property                          | Source              |
|-----------------------------------|---------------------|
| `spring.datasource.url`           | `SPRING_DATASOURCE_URL` |
| `spring.datasource.username`      | `SPRING_DATASOURCE_USERNAME` |
| `spring.datasource.password`      | `SPRING_DATASOURCE_PASSWORD` |
| `opendesign.ai-service.url`       | `AI_SERVICE_URL`    |

### server-ai (`.env` via python-dotenv)

| Variable           | Description                                  |
|--------------------|----------------------------------------------|
| `AI_PROVIDER`      | Dev default provider fallback                |
| `OPENAI_API_KEY`   | Dev default (request.api_key takes priority) |
| `GEMINI_API_KEY`   | Dev default (request.api_key takes priority) |
| `LOCAL_AI_ENDPOINT`| Dev default endpoint                         |

---

## Docker Image Strategy

### server-core Dockerfile

Uses a two-stage build:
1. `eclipse-temurin:21-jdk-jammy` builds the JAR with Maven.
2. `eclipse-temurin:21-jre-jammy` serves as the minimal runtime image.

### server-ai Dockerfile

Uses `python:3.10-slim` single-stage. Dependencies are installed from `requirements.txt`.

### client Dockerfile

Uses `node:20-alpine` to install and build, then `nginx:alpine` to serve the static bundle.

---

## Observability (Future)

- Spring Boot Actuator endpoints will be exposed at `/actuator/health` for Docker health checks.
- Structured logging with JSON format will be adopted before production deployment.
- A `docker-compose.observability.yml` overlay will add Prometheus + Grafana stack for local metrics viewing.
