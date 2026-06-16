# 🚀 create-reactgo-app

A powerful, developer-first CLI to bootstrap production-ready, fullstack **React + Go** applications in seconds.

[![npm version](https://img.shields.io/npm/v/create-reactgo-app.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/create-reactgo-app)
[![npm downloads](https://img.shields.io/npm/dm/create-reactgo-app.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/create-reactgo-app)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

---

## ✨ Overview

`create-reactgo-app` helps you skip repetitive boilerplate and configuration. It instantly provisions a scalable, container-friendly, fullstack ecosystem featuring:

*   ⚛️ **Modern React Frontend** (Vite, React 19, TypeScript, TailwindCSS v4)
*   🐹 **High-Performance Go Backend** (Gin Gonic Web Framework, CORS Pre-configured)
*   🐳 **Containerization Ready** (Docker Compose with Air Hot-Reloading for Go & Vite HMR for React)
*   📂 **Clean Project Structure** follows industry best-practices

---

## 🤔 Why This Exists

Setting up a fullstack project with React + Go sounds simple… until you actually do it. 

Every time you build a new app, you repeat the same ritual:
1. Create separate folders for frontend and backend.
2. Initialize React, Vite, TypeScript, and install UI dependencies.
3. Configure TailwindCSS (and resolve version-specific configuration issues).
4. Set up a Go server, install Gin, configure CORS, and map routes.
5. Create `.gitignore`, configure Dockerfiles, and compose configurations for development and production.

By the time you're done, you've spent **30–60 minutes** copy-pasting code and resolving setup friction, instead of writing your product's core logic.

`create-reactgo-app` was built to eliminate that friction:
> **Run one command and start building immediately.**

---

## 📦 Quick Start

No global installation is required. Run the CLI directly using `npx`:

```bash
npx create-reactgo-app my-app
```

Or initialize inside the current directory:

```bash
npx create-reactgo-app .
```

---

## 📂 Generated Project Structure

The generated boilerplate provides a clean separation of concerns:

```text
my-app/
├── backend/
│   ├── controllers/      # Route controllers (handlers)
│   ├── routes/           # API routes configuration
│   ├── services/         # Business logic
│   ├── Dockerfile        # Production Docker configuration
│   ├── Dockerfile.dev    # Development Docker configuration (with Air)
│   ├── go.mod            # Go module definition
│   └── main.go           # Go application entrypoint
├── frontend-react/       # React frontend code
│   ├── public/           # Static assets
│   ├── src/              # React components & application state
│   ├── Dockerfile        # Production Nginx frontend build configuration
│   ├── Dockerfile.dev    # Development Vite server configuration
│   ├── package.json      # Node dependency layout
│   └── vite.config.ts    # Vite configurations
├── docker-compose.yml    # Development multi-container environment
└── README.md
```

---

## 🚀 Running Your Generated Project

Once the project is scaffolded, navigate to your new directory (`cd my-app`) and choose one of the running environments:

### Method A: Docker Compose (Recommended)

Run the full stack with hot-reloading for both Go (using Air) and React (Vite HMR):

```bash
docker compose up --build
```
*   Frontend will be live at: [http://localhost:5173](http://localhost:5173)
*   Backend API will be live at: [http://localhost:8080](http://localhost:8080)

---

### Method B: Manual Setup

If you prefer running the processes bare-metal:

#### 1. Start Go Backend
```bash
cd backend
go mod tidy
go run main.go
```

#### 2. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Features Breakdown

*   **Interactive Setup Prompt:** Customizes settings such as directory overwrites and optional Docker setup automatically.
*   **Zero Configuration Docker Development:** Development containers utilize `Air` for live Go builds and bind volumes to persist your local updates directly into the container.
*   **Robust CORS Config:** Gin server is pre-configured with CORS policies, allowing local React components (`http://localhost:5173`) to call API endpoints (`http://localhost:8080`) out of the box.
*   **Tailwind v4 & React 19:** Ships with the latest versions of frontend libraries pre-packaged.

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please refer to the [Contributing Guide](CONTRIBUTING.md) (`CONTRIBUTING.md`) for detailed instructions on:
1. Setting up the repository locally.
2. Running the CLI tool for local testing.
3. Making changes to template files.
4. Formatting and pull request standards.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

Built with ❤️ by [Akdev](https://github.com/akdevsaha-dev)
