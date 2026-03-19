🚀 create-reactgo-app

A powerful CLI to bootstrap a fullstack React + Go application in seconds.

⸻

✨ Overview

create-reactgo-app helps you skip repetitive setup and instantly generate a production-ready project structure with:
• ⚛️ React frontend
• 🐹 Go backend
• 📁 Clean project structure
• ⚡ Ready-to-run setup

No more manual boilerplate — just one command and you’re ready to build.

⸻

📦 Installation

You don’t need to install anything globally.

Run directly using:

```
npx create-reactgo-app
```

⸻

⚡ Usage

Create a new project

```
npx create-reactgo-app my-app
```

Or use current directory

```
npx create-reactgo-app .
```

📁 Project Structure

```
my-app/
├── backend/        # Go server
├── frontend/       # React app
├── .gitignore
└── README.md
```

🧠 How It Works

1.  Prompts for a project name
2.  Creates a directory (or uses current one)
3.  Copies a prebuilt template
4.  Sets up your fullstack environment

⸻

🛠️ Features

- ✅ Interactive CLI prompts
- ✅ Smart directory handling (. support)
- ✅ Fast and minimal setup
- ✅ Cross-platform support

<br/>

🚀 Getting Started

After creating your project:

```
cd my-app
```

Start backend

```
cd backend
go run main.go
```

Start frontend

```
cd frontend
npm install
npm run dev
```

<br/>

🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a PR

<br/>

📜 License

This project is licensed under the MIT License.

<br/>

🤔 Why This Exists

Setting up a fullstack project with React + Go sounds simple… until you actually do it.

You start with an idea, open your terminal, and then:

- Create separate folders for frontend and backend
- Initialize React manually
- Set up a Go server from scratch
- Configure routing, ports, and structure
- Add .gitignore, scripts, and basic boilerplate

By the time you’re done, you’ve spent 30–60 minutes…
and written almost no actual product code.

<br/>

⚠️ The Real Problem

The issue isn’t complexity — it’s repetition.

Every project starts the same way:
-	same folder structure
-	same setup steps
-	same boilerplate

Yet we keep doing it manually, over and over again.

<br/>

💡 The Idea

create-reactgo-app was built to eliminate that friction.

Instead of wasting time on setup, you should be able to:

> Run one command and start building immediately.

<br/>
<br/>

🚀 The Solution

This CLI automates the entire setup process:
-	Instantly scaffolds a fullstack project
-	Provides a clean, scalable structure
-	Removes repetitive boilerplate work
-	Lets you focus on what actually matters — building your idea

<br/>
🌱 Bigger Vision

This is just the beginning.

The long-term goal is to evolve this into a developer-friendly toolkit that:
-	speeds up fullstack development
-	enforces good structure by default
-	helps developers ship faster with confidence

<br/>
<br/>
👨‍💻 Author

Built with ❤️ by Akdev
