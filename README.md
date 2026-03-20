# To-Do List (Next.js + TypeScript)

A simple **To‑Do list** web app built with **Next.js + TypeScript** that stores user accounts and to‑dos in the browser (localStorage) so you can log in and see your previous tasks.

This project is designed to be hosted on **GitHub Pages** as a static site.

---

## 🚀 Features

- **Sign up / Log in** — Create accounts and keep your data private (all stored locally)
- **Add / Complete / Delete tasks** — Manage your to-dos with a simple interface
- **Persistent storage** — Your tasks are saved in the browser (localStorage)
- **Static site** — Runs on **GitHub Pages** with no backend required

---

## 🚀 Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## ✅ Build & export for GitHub Pages

By default this project exports static files into the `docs/` folder.

```bash
npm run build
```

### GitHub Pages setup

1. In your repository settings, set GitHub Pages to serve from the `docs/` folder on the `main` branch.
2. (Optional) If your repository is not a user/organization site (e.g. `username.github.io`), set the `NEXT_PUBLIC_BASE_PATH` environment variable to your repository name before building.

Example (PowerShell):

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/To-Do-List'
npm run build
```

Example (UNIX/macOS):

```bash
NEXT_PUBLIC_BASE_PATH='/To-Do-List' npm run build
```

If you host at the root (username.github.io), you can build without setting `NEXT_PUBLIC_BASE_PATH`.

---

## 🧰 What's included

- **Next.js 16** (React framework) for fast client-side navigation
- **TypeScript** for type safety
- **React 18** for modern UI
- **Login / Signup** (stored in browser localStorage)
- **Persistent to-dos per user** (stored in browser localStorage)
- **Static site export** ready for GitHub Pages

---

## 📁 Project Structure

```
├── pages/
│   ├── index.tsx          # Login page
│   ├── signup.tsx         # Sign-up page
│   ├── todos.tsx          # Main to-do list page
│   └── _app.tsx           # Global app wrapper
├── lib/
│   ├── auth.ts            # User signup/login (localStorage)
│   └── todos.ts           # To-do CRUD operations
├── styles/
│   ├── globals.css        # Global styles
│   └── Home.module.css    # Component styles
├── scripts/
│   └── export-to-docs.js  # Static export helper
└── docs/                  # Generated static site (GitHub Pages)
```

---

## 🔒 Security Note

This project is for **educational purposes**. Passwords are stored in plaintext in localStorage. For a production app, use a backend API with proper authentication and encryption.

---

## 📝 Notes

- This project is intentionally backend-free so it can run on GitHub Pages. All data is stored locally in your browser.
- If you want a server-backed version (e.g. with NestJS), you can add a simple API to persist data in a database.


README file is made by ai idk what to say lol 