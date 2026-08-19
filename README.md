# Admin Dashboard

A monorepo for an admin dashboard UI and its authentication API.

The **frontend** is a Next.js app with login, registration, email verification, and dashboard pages (products, users, recipes, sales, messages, help, and settings). The **backend** is an Express + MongoDB API that handles auth, profile updates, avatar uploads, and verification emails.

There is no root `package.json`. Install and run each app from its own folder.

## Tech stack

**Frontend** (`frontend/`)

- Next.js 16, React 19, TypeScript
- Tailwind CSS, Base UI / shadcn-style components
- TanStack Query, Axios, React Hook Form, Zod
- react-hot-toast, Recharts

**Backend** (`backend/`)

- Node.js 18+, Express, TypeScript
- MongoDB / Mongoose
- JWT auth, bcrypt, Multer, Nodemailer

Some dashboard lists (for example products) still load sample data from [DummyJSON](https://dummyjson.com/). Auth, profile, and avatars use the local backend.

## Folder structure

```text
.
├── frontend/                 # Next.js app (UI)
│   ├── app/                  # App Router pages
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── public/
│   └── package.json
├── backend/                  # Express API
│   ├── src/
│   ├── uploads/              # Local avatars (gitignored)
│   ├── package.json
│   └── .env                  # Local secrets (gitignored)
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js 18 or later
- npm
- MongoDB running locally (or a URI you can reach)
- SMTP credentials for verification emails (for example a Gmail app password)

## Installation

```bash
git clone https://github.com/mohamed-hamdy-mohamed/admin-dashboard.git
cd admin-dashboard

cd frontend
npm install

cd ../backend
npm install
```

## Environment variables

`.env` files are gitignored (`.env*` in the root `.gitignore`). Do not commit secrets.

### Backend (`backend/.env`)

Create `backend/.env` next to `backend/package.json`. Values below are placeholders.

| Variable | Purpose | Example / default |
| --- | --- | --- |
| `PORT` | API port | `4000` |
| `NODE_ENV` | Runtime mode | `development` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:3000` |
| `APP_URL` | Frontend URL used in verification links | `http://localhost:3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/admin_dashboard` |
| `JWT_SECRET` | Secret used to sign JWTs | *(required in production)* |
| `JWT_EXPIRES_IN` | Token lifetime | `7d` |
| `SMTP_HOST` | SMTP host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | SMTP username | your email |
| `SMTP_PASS` | SMTP password / app password | *(required to send mail)* |
| `SMTP_FROM` | Optional From address | defaults to `SMTP_USER` |

The sender display name is `Admin Dashboard <SMTP_USER>`.

### Frontend

Optional. If unset, the API base URL is `http://localhost:4000/api`.

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:4000/api` |

Create `frontend/.env.local` if you need to override it. That file is also gitignored.

## How to run the frontend

From `frontend/`:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run lint
```

## How to run the backend

MongoDB must be running first. From `backend/`, compile then start:

```bash
npm run build
npm start
```

This serves `dist/server.js` (default [http://localhost:4000](http://localhost:4000)).

Watch mode (TypeScript, no compile step):

```bash
npm run dev
```

Health check: `GET http://localhost:4000/api/health`

### Auth API (prefix `/api/auth`)

| Method | Path | Auth |
| --- | --- | --- |
| `POST` | `/register` | Public |
| `POST` | `/login` | Public |
| `POST` | `/forgot-password` | Public |
| `POST` | `/verify-email` | Public |
| `POST` | `/resend-verification` | Public |
| `GET` | `/me` | JWT |
| `PATCH` | `/me` | JWT |
| `POST` | `/avatar` | JWT |

Avatars are stored on disk at `backend/uploads/avatars/` and served from `/uploads`. MongoDB stores only the file path.

New accounts must verify email (link expires in 15 minutes) before they can sign in.

## Build / production commands

**Frontend**

```bash
cd frontend
npm run build
npm start
```

**Backend**

```bash
cd backend
npm run build
npm start
```

Set `NODE_ENV=production`, a strong `JWT_SECRET`, and production `CORS_ORIGIN` / `APP_URL` / `MONGODB_URI` / SMTP values before deploying.

## Deployment notes

There is no Docker, CI, or host-specific config in this repo yet.

- Frontend is a standard Next.js app (`next build` / `next start`).
- Backend is a Node process that needs MongoDB, SMTP, and a writable `uploads/` directory.
- Point `NEXT_PUBLIC_API_URL` at the deployed API, and set backend `CORS_ORIGIN` / `APP_URL` to the deployed frontend origin.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| `MONGODB_URI is not defined` or connection refused | MongoDB is running and `MONGODB_URI` in `backend/.env` is correct. |
| `Email service is not configured` | Set `SMTP_USER` and `SMTP_PASS`. Registration will not succeed without them. |
| `Cannot find module './dist/server.js'` | Run `npm run build` in `backend/` before `npm start`. |
| Frontend cannot call the API | Backend is on port 4000, `CORS_ORIGIN` matches the frontend origin, and `NEXT_PUBLIC_API_URL` is correct if you overrode the default. |
| Avatar images do not load | Backend is serving `/uploads`, and the frontend allows `localhost:4000/uploads/**` in `next.config.ts`. |
| Login blocked after register | Complete email verification first. Unverified users cannot sign in. |

## License

No license file is included in this repository yet.
