const fs = require("fs-extra");
const path = require("path");

async function generateDockerFiles(targetDir) {
  const composeContent = `
services:
  backend:
    build:
      context: ./backend
      # Development: uses Dockerfile.dev with Air for hot reload
      # Production: change this to "Dockerfile"
      dockerfile: Dockerfile.dev
    volumes:
      # Development only: mounts source code for live reload
      # Remove this block in production so the container runs the compiled binary
      - ./backend:/app
    ports:
      - "8080:8080"
    environment:
      - PORT=8080

  frontend:
    build:
      context: ./frontend
      # Development: uses Dockerfile.dev for Vite HMR
      # Production: change this to "Dockerfile" for Nginx static hosting
      dockerfile: Dockerfile.dev
    volumes:
      # Development only: enables hot reload for Vite
      # Remove this block in production builds
      - ./frontend:/app
      # Prevent container node_modules from being overwritten
      - /app/node_modules
    ports:
      # Production:
      #   Nginx serves the built app on port 80 inside the container
      #   Change this to "5173:80" so the app is accessible at http://localhost:5173
      - "5173:5173"
    depends_on:
      - backend
`;

  const goDockerContentDev = `
# Development Dockerfile
# Uses Air to enable hot reload during development

FROM golang:1.26-alpine

WORKDIR /app

RUN go install github.com/air-verse/air@latest
ENV PATH="/go/bin:$PATH"

COPY go.mod go.sum ./
RUN go mod download

COPY . .

EXPOSE 8080

CMD ["air"]
`;

  const goDockerContentProd = `
# Production Dockerfile

FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o main .

FROM alpine:3.21

WORKDIR /app

COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
`;

  const reactDockerContentDev = `
# Development Dockerfile for Vite + React frontend
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
`;

  const reactDockerContentProd = `
# Production Dockerfile using multi-stage build

# Stage 1: Build the React application
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the static files with Nginx
FROM nginx:alpine

# Copy built assets from Vite's default output folder (dist) to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
`;

  const frontendDockerIgnore = `
node_modules
.git
.gitignore
Dockerfile*
docker-compose*.yml
npm-debug.log
dist
build
`;

  const backendDockerIgnore = `
.git
.gitignore
Dockerfile*
docker-compose*.yml
# Ignore Air's temp directory and local binaries
tmp/
main
*.exe
`;

  // Write docker-compose
  await fs.outputFile(
    path.join(targetDir, "docker-compose.yml"),
    composeContent.trim(),
  );

  // Write Backend Dockerfiles
  await fs.outputFile(
    path.join(targetDir, "backend", "Dockerfile.dev"),
    goDockerContentDev.trim(),
  );
  await fs.outputFile(
    path.join(targetDir, "backend", "Dockerfile"),
    goDockerContentProd.trim(),
  );
  await fs.outputFile(
    path.join(targetDir, "backend", ".dockerignore"),
    backendDockerIgnore.trim(),
  );

  // Write Frontend Dockerfiles
  await fs.outputFile(
    path.join(targetDir, "frontend", "Dockerfile.dev"),
    reactDockerContentDev.trim(),
  );
  await fs.outputFile(
    path.join(targetDir, "frontend", "Dockerfile"),
    reactDockerContentProd.trim(),
  );
  await fs.outputFile(
    path.join(targetDir, "frontend", ".dockerignore"),
    frontendDockerIgnore.trim(),
  );
}

module.exports = {
  generateDockerFiles,
};
