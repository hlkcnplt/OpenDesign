# Production Deployment Guide

This guide is for deploying oux.ai as a ready-to-use SaaS platform on a public domain.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v24+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2+)
- A public domain name (e.g., `oux.yourdomain.com`).
- A reverse proxy that handles SSL (e.g., [Cloudflare](https://www.cloudflare.com/)).

## Production Architecture

In the production stack, a dedicated Nginx reverse proxy (Gateway) acts as the single point of entry for all incoming traffic on port 80.

| URL Path | Backend Service | Internal Port |
|----------|-----------------|---------------|
| `/` | `client` | 80 |
| `/api/` | `server-core` | 8080 |
| `/ai/` | `server-ai` | 8000 |

> [!IMPORTANT]
> To ensure maximum security, all internal service ports are blocked from the public web and only accessible through the Nginx gateway.

## Setup Process

### 1. Preparation

Create a dedicated production environment file:

```bash
cp .env.example .env.prod
```

Configure `.env.prod`:
- Ensure `VITE_API_BASE_URL` is set to your full public domain (e.g., `https://oux.yourdomain.com`).
- Change `POSTGRES_PASSWORD` and `SPRING_DATASOURCE_PASSWORD` to something long and random.
- Confirm `POSTGRES_DB` and other JDBC settings match.

### 2. Launch Production Stack

Use the included `Makefile` to launch the multi-layered compose file:

```bash
make prod-up
```

This merges the base `docker-compose.yml` with the production-specific overrides in `infra/docker/docker-compose.prod.yml`.

### 3. DNS & SSL Configuration

1. Point your A record (e.g., `oux.yourdomain.com`) to your server's IP address.
2. If using Cloudflare, ensure the "Proxy" status is set to **Proxied** (the orange cloud icon).
3. Confirm that SSL is enabled (Full/Flexible) in your Cloudflare dashboard.

## Monitoring and Maintenance

### Viewing Logs

```bash
# To view all logs
make logs

# To view only the gateway
docker compose logs -f nginx-gateway
```

### Updates

When a new version is released:

```bash
git pull
make prod-up
```

The stack will pull updated source code and rebuild only the necessary images.

---

*Note: For issues or advanced configuration, please visit the [Self-Hosted Guide](self-hosted.md).*
