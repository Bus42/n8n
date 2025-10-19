# n8n + Postgres MCP Docker Container

This repository provides a pre-configured [n8n](https://n8n.io/) automation platform with its own dedicated PostgreSQL database and an integrated [Postgres MCP](https://github.com/crystaldba/postgres-mcp) server for AI-powered database operations. The setup is designed for easy deployment, minimal configuration, and robust automation workflows.

## Features

- **Pre-configured n8n**: Ready-to-use n8n instance with all required environment variables and database settings.
- **Integrated PostgreSQL**: Dedicated database container with automatic user and schema initialization.
- **Postgres MCP Server**: AI-powered database operations server, pre-wired to the n8n database for advanced use cases.
- **Easy Initialization**: `init-data.sh` script for automatic database user and privilege setup.
- **One-Command Update**: `update.sh` script to update n8n and restart all services safely.
- **Persistent Storage**: Docker volumes for both database and n8n data.
- **Traefik-ready**: Labels included for easy integration with Traefik reverse proxy.

## Quick Start

### 1. Clone the Repository

```bash
git clone <this-repo-url>
cd n8n
```

### 2. Configure Environment Variables

Copy the sample environment file and edit as needed:

```bash
cp .env.sample .env
# Edit .env to set your domain, database passwords, etc.
```

**Key variables:**
- `DOMAIN_NAME`, `SUBDOMAIN`: Where n8n will be accessible (e.g., `n8n.example.com`).
- `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: Main Postgres credentials.
- `POSTGRES_NON_ROOT_USER`, `POSTGRES_NON_ROOT_PASSWORD`: Non-root user for n8n and MCP.

### 3. Start the Stack

```bash
docker compose up -d
```

- n8n will be available at `http://<N8N_HOST>:5678` (default: `192.168.50.63:5678`).
- Postgres MCP server will be available at `http://<N8N_HOST>:7777/sse`.

### 4. Update n8n and Services

To update the n8n image and restart all services:

```bash
./update.sh
```

## File Overview

- `docker-compose.yml`: Defines all services (n8n, postgres, postgres-mcp) and their configuration.
- `init-data.sh`: Initializes the Postgres database with a non-root user and grants privileges.
- `update.sh`: Safely updates the n8n image and restarts the stack.
- `.env.sample`: Example environment configuration.
- `postgres-mcp/Dockerfile`: Custom build for the Postgres MCP server.

## Advanced Usage

- **Customizing n8n**: Edit environment variables in `.env` to adjust timezone, domain, or database settings.
- **Reverse Proxy**: Traefik labels are included for easy HTTPS setup. Adjust as needed for your environment.
- **Persistent Data**: Data is stored in Docker volumes (`db_storage`, `n8n_storage`).
- **Database Access**: Use the non-root user for application/database connections.

## Troubleshooting

- Ensure all environment variables are set in your `.env` file.
- Check container logs with `docker compose logs <service>` for errors.
- The `init-data.sh` script will print a message if required variables are missing.

## Credits

- [n8n](https://n8n.io/)
- [Postgres MCP](https://github.com/crystaldba/postgres-mcp)

---

For questions or support, please open an issue in this repository.
