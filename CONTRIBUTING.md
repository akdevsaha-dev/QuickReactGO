# Contributing to create-reactgo-app

First off, thank you for taking the time to contribute! 🎉 

This document provides a comprehensive guide for setting up your environment, making changes, and testing the `create-reactgo-app` CLI tool locally.

---

## 🗺️ Codebase Overview

Before diving in, here is a high-level overview of the project structure:

```text
create-reactgo-app/
├── bin/
│   ├── cli.js           # CLI entry point, prompts user & handles copying
│   └── helpers/
│       └── docker.js     # Dynamically writes Docker configuration files
├── templates/
│   ├── backend/         # Go template files (pre-configured with Gin & CORS)
│   └── frontend/        # React template files (Vite, TS, TailwindCSS v4)
├── package.json         # Project metadata & Node configuration
└── LICENSE              # Project License
```

---

## 🛠️ Local Development Setup

To work on this project, you will need the following tools installed on your local machine:
*   **Node.js** (v18 or higher recommended)
*   **Go** (v1.22 or higher recommended)
*   **Docker** and **Docker Compose** (optional, but recommended for container verification)

### Steps:

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork locally:
    ```bash
    git clone https://github.com/YOUR_USERNAME/create-reactgo-app.git
    cd create-reactgo-app
    ```
3.  **Install dependencies** in the root project:
    ```bash
    npm install
    ```

---

## 🧪 Testing the CLI Locally

There are two primary methods to test your local CLI changes without publishing them.

### Method 1: Direct Execution (Fastest Feedback)
You can invoke the local script directly using Node from the project root. This is the quickest way to test edits in `bin/cli.js` or `bin/helpers/docker.js`.

To generate a test application in a temporary directory inside the project:
```bash
node bin/cli.js my-test-app
```

To test running it in the current directory:
```bash
mkdir test-dir && cd test-dir
node ../bin/cli.js .
```

---

### Method 2: Global Link (Realistic CLI Behavior)
To test how the executable behaves when invoked globally as a command, use `npm link`. This configures your local package system to point the global command `create-reactgo-app` to your local directory.

1.  **Link the package:**
    Run this command in the root folder of the repository:
    ```bash
    npm link
    ```
2.  **Invoke the command:**
    Navigate to any temporary directory outside of the project root and run:
    ```bash
    create-reactgo-app my-test-app
    ```
3.  **Unlink after testing:**
    Once you are done testing, clean up your global package registry by running the following command in the repository root:
    ```bash
    npm unlink
    ```
    *(Alternatively, you can run `npm unlink -g create-reactgo-app` from any folder).*

---

## 🔍 Verifying the Generated Template

After running the CLI and generating a test project (`my-test-app`), you must verify that the generated template files compile and run correctly.

### 🐳 Scenario A: Verifying Docker Setup
If you enabled Docker Compose configuration during CLI generation:

1.  Navigate to the generated folder:
    ```bash
    cd my-test-app
    ```
2.  Start the multi-container environment:
    ```bash
    docker compose up --build
    ```
3.  Ensure that:
    *   The Go backend has downloaded dependencies and started `Air` for hot reload on port `8080`.
    *   The Vite frontend builds successfully and starts on port `5173`.
    *   Access [http://localhost:5173](http://localhost:5173) in your browser and check if the frontend successfully communicates with [http://localhost:8080](http://localhost:8080).
4.  Edit a file in `frontend/src/` or `backend/main.go` and verify the changes automatically reload inside the containers.

---

### 💻 Scenario B: Verifying Manual Setup
If you did not enable Docker or prefer running bare-metal:

1.  **Test the Backend:**
    ```bash
    cd my-test-app/backend
    go mod tidy
    go run main.go
    ```
    Verify that the Gin server starts listening on port `8080`.

2.  **Test the Frontend:**
    ```bash
    cd my-test-app/frontend
    npm install
    npm run dev
    ```
    Verify that the Vite dev server starts and compiles properly.

---

## 📝 Editing Code Templates

When modifying the codebase, you will often need to update the templates that get copied to the user's workspace.

### Key Rules for Templates:
*   All template files live under the `templates/` directory.
*   **`.gitignore` Note:** Do **not** name the git ignore files `.gitignore` within the `templates/` directory. NPM strips `.gitignore` files when packing packages for registry publishing. Instead, name them `gitignore` (no leading dot). The CLI includes a helper function (`fixGitIgnores`) that automatically renames `gitignore` to `.gitignore` when installing on the user's computer.

---

## 🚀 Pull Request Guidelines

Before submitting a Pull Request, please ensure you have followed these steps:

1.  **Create a descriptive branch:**
    ```bash
    git checkout -b feature/your-feature-name
    # or
    git checkout -b bugfix/your-bug-name
    ```
2.  **Write clean, documented code:** Ensure your JS, Go, and TypeScript follow standard formatting rules.
3.  **Run local tests:** Run the CLI locally using `npm link` to make sure it functions as expected.
4.  **Commit your changes:** Write meaningful commit messages. E.g., `feat: add database support to backend template` or `fix: correct port handling in vite config`.
5.  **Submit the PR:** Describe what problem your PR solves, what changes you made, and how you tested them.

Thank you again for contributing!
