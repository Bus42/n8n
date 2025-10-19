#!/usr/bin/env bash
set -euo pipefail

# Function to run commands and check result
run_cmd() {
  echo "👉 Running: $*"
  if "$@"; then
    echo "✅ Success: $*"
  else
    echo "❌ Error: $*"
    exit 1
  fi
}

# Step 1: Shut down running containers
run_cmd docker compose down

# Step 2: Pull latest n8n image
run_cmd docker pull docker.n8n.io/n8nio/n8n

# Step 3: Bring containers back up
run_cmd docker compose up -d --remove-orphans

echo "🎉 All steps completed successfully. n8n is up and running with Postgres and Postgres MCP server!"
