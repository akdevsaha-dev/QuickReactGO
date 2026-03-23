const fs = require("fs-extra");
const path = require("path");

async function generateDockerFiles(targetDir) {
  const composeContent = `
services:
  backend:
    build:
      context: ./backend
      # Use Dockerfile.dev for development (hot reload with Air)
      # Change to "Dockerfile" for production builds
      dockerfile: Dockerfile.dev
    volumes:
      - ./backend:/app
    ports:
      - "8080:8080"
    environment:
      - PORT=8080

  frontend:
    build: ./frontend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    environment:
      - BACKEND_URL=http://backend:8080
    depends_on:
      - backend
`;

  const goDockerContentDev = `
FROM golang:1.26-alpine

WORKDIR /app

# Install Air for hot reload
RUN go install github.com/air-verse/air@latest
ENV PATH="/go/bin:$PATH"

COPY go.mod go.sum ./
RUN go mod download

EXPOSE 8080

CMD ["air"]
`;

  const goDockerContent = `
FROM golang:1.26-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/main .

EXPOSE 8080

CMD ["./main"]
`;

  const reactDockerContent = `
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
`;

  const dockerIgnore = `
node_modules
.git
.gitignore
Dockerfile
docker-compose.yml
`;

  // docker-compose
  await fs.outputFile(
    path.join(targetDir, "docker-compose.yml"),
    composeContent.trim(),
  );

  // backend dockerfiles
  await fs.outputFile(
    path.join(targetDir, "backend", "Dockerfile.dev"),
    goDockerContentDev.trim(),
  );

  await fs.outputFile(
    path.join(targetDir, "backend", "Dockerfile"),
    goDockerContent.trim(),
  );

  // frontend dockerfile
  await fs.outputFile(
    path.join(targetDir, "frontend", "Dockerfile"),
    reactDockerContent.trim(),
  );

  // dockerignore
  await fs.outputFile(
    path.join(targetDir, "frontend", ".dockerignore"),
    dockerIgnore.trim(),
  );
}

module.exports = {
  generateDockerFiles,
};
