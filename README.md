# 🚀 Deadline Guardian AI

> Predict deadline risks before they slip — AI-powered action plans for every task.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)
![Express](https://img.shields.io/badge/Express-4-000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![Groq AI](https://img.shields.io/badge/AI-Groq%20Llama%203-F55036?logo=groq)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- **📊 Smart Dashboard** — Real-time stats, upcoming deadlines, productivity score, and AI insight
- **🤖 AI Risk Analysis** — Every task auto-analyzed with risk score (0-95%), level, and reason
- **📋 Action Plans** — AI-generated day-by-day plans proportional to remaining time
- **💬 AI Chat Assistant** — Ask to prioritize, check progress, or plan your schedule
- **✅ Task Management** — Create, edit, complete, delete with auto-reanalysis
- **📱 Responsive Design** — Mobile hamburger menu, fixed sidebar, clean Linear-style UI
- **🔐 JWT Authentication** — Secure register/login with bcrypt password hashing

---

## 🖥️ Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [ms-deadlineguardian.vercel.app](https://ms-deadlineguardian.vercel.app) |
| **Backend** | [deadline-guardian-production.up.railway.app](https://deadline-guardian-production.up.railway.app) |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with Hooks & Context API
- **Vite 6** for blazing-fast builds
- **Tailwind CSS** for utility-first styling
- **React Router** for client-side routing
- **Axios** for HTTP requests with JWT interceptors
- **Lucide React** for clean icons

### Backend
- **Express.js** REST API
- **MongoDB Atlas** for cloud database
- **Mongoose** ODM with schemas & validation
- **JWT** authentication (7-day tokens)
- **bcrypt** for password hashing
- **Groq AI** (Llama 3.3 70B) via OpenAI-compatible API

---

## 🎨 Design System

| Role | Color | Usage |
|------|-------|-------|
| Primary | `#112E81` | Main UI, buttons, links |
| Secondary | `#4647AE` | Secondary elements |
| Accent | `#4382DF` | Highlights |
| Light | `#AACCD6` | Backgrounds |
| Font | **Plus Jakarta Sans** | Modern SaaS aesthetic |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Groq API key (free: [console.groq.com](https://console.groq.com/keys))

### Installation

```bash
# Clone the repository
git clone https://github.com/maheshsthr/deadline-guardian.git
cd deadline-guardian

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Backend environment variables (backend/.env)
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/deadline-guardian
JWT_SECRET=your-secret-key
GROQ_API_KEY=gsk_your_groq_api_key
PORT=5000
```

### Run Locally

```bash
# Terminal 1 — Backend
cd backend && node src/index.js

# Terminal 2 — Frontend
npm run dev
```

Visit **http://localhost:5176** — register an account and start managing deadlines.

---

## 📁 Project Structure

```
deadline-guardian/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Auth, Task, AI controllers
│   │   ├── middleware/     # JWT auth middleware
│   │   ├── models/         # User & Task schemas
│   │   ├── routes/         # Express route definitions
│   │   ├── services/       # Groq AI service with fallback
│   │   └── index.js        # Server entry & MongoDB connect
│   ├── .env.example
│   └── package.json
├── src/
│   ├── components/         # AppLayout, Sidebar
│   ├── context/            # AuthContext, DataContext
│   ├── pages/              # Landing, Login, Register, Dashboard,
│   │                       # Tasks, Analysis, Chat, Profile
│   ├── services/           # Axios API service
│   └── main.jsx            # App entry
├── public/
├── .gitignore
├── index.html
├── vite.config.js
└── package.json
```

---

## 📡 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| GET | `/api/tasks` | ✅ | Get all user tasks |
| POST | `/api/tasks` | ✅ | Create task (auto-analyzed) |
| PUT | `/api/tasks/:id` | ✅ | Update task (auto-reanalyzed) |
| DELETE | `/api/tasks/:id` | ✅ | Delete task |
| POST | `/api/ai/analyze` | ✅ | Analyze task risk |
| POST | `/api/ai/chat` | ✅ | AI chat with task context |
| GET | `/api/health` | ❌ | Health check |

---

## 🤖 How AI Works

Each task is automatically analyzed on creation/update:

1. **Request** → Groq's Llama 3.3 70B (free, 30 req/min)
2. **Response** → Risk score (0-95), level (LOW/MEDIUM/HIGH), reason, recommendation, action plan
3. **Fallback** → Local algorithm if API key is missing: `riskScore = min(95, (difficulty × priority × 10) / daysRemaining)`

The chat assistant uses your actual task data to give personalized responses about prioritization, deadline tracking, and study planning.

---

## 🚢 Deployment

### Backend (Railway)
```bash
# Push to GitHub, then:
# Railway → New Project → Deploy from GitHub
# Root Directory: backend
# Add env vars: MONGO_URI, JWT_SECRET, GROQ_API_KEY
```

### Frontend (Vercel)
```bash
# Push to GitHub, then:
# Vercel → Import Project → Set env VITE_API_URL to backend URL
# Or via CLI:
vercel --prod --build-env VITE_API_URL=https://your-backend.railway.app/api
```

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/maheshsthr">Mahesh Suthar</a>
</div>
