# 🌟 WeWIN Education -- Fullstack Platform

A modern full-stack system for education management, IELTS testing, class management, and student workflows.

This project includes:

-   **Frontend:** Next.js 14+, App Router, Tailwind CSS, Framer Motion,
    Google OAuth, Lucide Icons\
-   **Backend:** NestJS, pnpm workspace-friendly\
-   **Architecture:** Clean, modular, modern
------------------------------------------------------------------------

## 📁 Folder Structure

    wewin-education/
    │
    ├── frontend/          # Next.js App
    │   ├── app/
    │   ├── components/
    │   ├── lib/
    │   ├── hooks/
    │   ├── public/
    │   └── ...
    │
    ├── backend/           # NestJS API
    │   ├── src/
    │   ├── prisma/ or entities/
    │   ├── modules/
    │   └── ...
    │
    └── .gitignore
    └── README.md

------------------------------------------------------------------------

# ⚡ Frontend (Next.js + Tailwind + OAuth)

### ▶️ Run development

``` bash
cd frontend
pnpm install
pnpm run dev
```

### ✨ Features

-   Next.js App Router\
-   Tailwind CSS\
-   Framer Motion animations\
-   Google OAuth (NextAuth)\
-   Global Layout + Navbar + Sidebar\
-   Lucide React icons\
-   API clients, reusable components, hooks

------------------------------------------------------------------------

# 🔥 Backend (NestJS)

### ▶️ Run development

``` bash
cd backend
pnpm install
pnpm run start:dev
```

### ✨ Features

-   Modular architecture (Controller, Service, Module)
-   TypeScript 100%
-   Validation pipes
-   Ready for TypeORM / Prisma integration\
-   Environment-based configuration\
-   API ready for integration with frontend

------------------------------------------------------------------------

# 🧪 Environment Variables

### Frontend (`frontend/.env.local`)

    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-secret

    GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET=xxxx

### Backend (`backend/.env`)

    PORT=3001
    DATABASE_URL=your-db-url-here
    JWT_SECRET=your-secret

------------------------------------------------------------------------

# 🛠️ Commands Summary

### Frontend

``` bash
pnpm i
pnpm dev
pnpm build
pnpm start
```

### Backend

``` bash
pnpm i
pnpm start:dev
pnpm build
pnpm start
```

------------------------------------------------------------------------

# 🚀 Deployment

### Frontend

-   Vercel (recommended)\
-   Netlify or Docker

### Backend

-   Docker\
-   Render\
-   Railway\
-   VPS

------------------------------------------------------------------------

# 🤝 Contributing

If you want to contribute:

    git checkout -b feature/my-feature
    git commit -m "Add new feature"
    git push origin feature/my-feature

------------------------------------------------------------------------

# 📄 License

MIT License --- free to modify & use.
