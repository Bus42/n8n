FROM node:20-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Clone the postgres-mcp repository
RUN git clone https://github.com/crystaldba/postgres-mcp.git .

# Install Node.js dependencies
RUN npm install

# Build the TypeScript application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose SSE endpoint port
EXPOSE 8000

# Run the MCP server with SSE transport
CMD ["node", "build/index.js", "--transport=sse", "--access-mode=unrestricted"]