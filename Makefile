.PHONY: up down prod-up prod-down logs ps clean

up:
	docker compose up --build -d

down:
	docker compose down

prod-up:
	docker compose -f docker-compose.yml -f infra/docker/docker-compose.prod.yml up --build -d

prod-down:
	docker compose -f docker-compose.yml -f infra/docker/docker-compose.prod.yml down

logs:
	docker compose logs -f

ps:
	docker compose ps

clean:
	docker compose down -v --remove-orphans
