#!/bin/bash

# OpenDesign Local Development Orchestrator
# Starts: Postgres (Docker), AI Bridge (Python), Core (Java), Client (React/Vite)

# Kill all background processes on exit (including those in subshells)
trap "kill 0" EXIT SIGINT SIGTERM

cleanup_conflicts() {
    echo "Ensuring no conflicting processes or Docker containers are running..."
    docker compose stop server-ai server-core client 2>/dev/null
    # Kill any native processes on target ports (8000, 8080, 5173)
    lsof -ti :8000,8080,5173 | xargs kill -9 2>/dev/null
}

# 1. Environment Setup
if [ ! -f .env ]; then
    echo "Creating .env from .env.example..."
    cp .env.example .env
fi

# Load .env (Docker-centric)
source .env

# Mandatory Overrides for LOCAL (Native) Development
export SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5433/${POSTGRES_DB:-opendesign}"
export AI_SERVICE_URL="http://localhost:8000"
export VITE_API_BASE_URL="http://localhost:8080"

# 2. Preparation
cleanup_conflicts

# 3. Infrastructure (PostgreSQL)
echo "Starting PostgreSQL..."
docker compose up postgres -d

# Robust wait for PostgreSQL
echo "Waiting for PostgreSQL to be fully ready..."
MAX_RETRIES=30
COUNT=0
while ! docker exec opendesign-db pg_isready -U "${POSTGRES_USER:-postgres}" >/dev/null 2>&1; do
    echo "Database is initializing... ($((COUNT+1))/$MAX_RETRIES)"
    sleep 2
    COUNT=$((COUNT+1))
    if [ $COUNT -ge $MAX_RETRIES ]; then
        echo "PostgreSQL failed to start in time."
        exit 1
    fi
done

# Extra 2s for engine stabilization
sleep 2
echo "PostgreSQL is ready!"

# 4. AI Bridge (Python FastAPI)
echo "Starting AI Bridge (server-ai)..."
(
    cd server-ai
    if [ ! -d venv ]; then
        echo "Initializing Python venv..."
        python3 -m venv venv
    fi
    source venv/bin/activate
    pip install -r requirements.txt --quiet
    uvicorn main:app --reload --port 8000
) &

# 5. Core Service (Java Spring Boot)
echo "Starting Java Core (server-core)..."
(
    cd server-core
    # Explicitly pass properties to avoid Docker hostname conflicts
    ./mvnw spring-boot:run -Dspring-boot.run.arguments="--spring.datasource.url=$SPRING_DATASOURCE_URL --spring.datasource.username=${POSTGRES_USER:-postgres} --spring.datasource.password=${POSTGRES_PASSWORD:-postgres} --opendesign.ai-service.url=$AI_SERVICE_URL"
) &

# 6. Client Service (React Vite)
echo "Starting Client (client)..."
(
    cd client
    npm install --no-audit --no-fund --quiet
    npm run dev
) &

echo -e "\nDevelopment environment is starting up..."
echo "AI Bridge: http://localhost:8000"
echo "Java Core: http://localhost:8080"
echo "Client UI: http://localhost:5173"
echo "Press Ctrl+C to stop all services."

# Keep the script running and wait for all background processes
wait
