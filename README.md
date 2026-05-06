<div align="center">

# 🎓 The Graduation Zine

**A beautiful, animated graduation gift — built with love.**

*An intimate digital experience featuring an envelope animation, a personalized flipbook, and a romantic Spotify widget.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://the-graduation-zine.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

</div>

---

## ✨ Features

- **📩 Interactive Envelope** — Tap to open a wax-sealed envelope with smooth Framer Motion animation
- **💌 Animated Love Letter** — Words appear one by one with elegant staggered reveal
- **📖 Flipbook** — An embedded HeyZine flipbook that unfolds "Our Story"
- **🎵 Spotify Widget** — A floating, minimal Spotify player with autoplay
- **🌾 Film Grain Aesthetic** — Warm beige tones with subtle grain texture for that vintage, editorial feel
- **📱 Fully Responsive** — Works beautifully on mobile and desktop

## 🛠️ Tech Stack

| Tech | Version | Purpose |
|------|---------|---------|
| React | ^19 | UI Framework |
| Vite | ^6 | Build Tool |
| TypeScript | ~5.8 | Type Safety |
| Framer Motion (motion) | ^12 | Animations |
| Tailwind CSS | ^4 | Styling |
| Lucide React | ^0.546 | Icons |

## 🚀 Running Locally

**Prerequisites:** Node.js 18+

```bash
# 1. Clone the repository
git clone https://github.com/fattahmaulana/the-graduation-zine.git
cd the-graduation-zine

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start the dev server
npm run dev
```

App will be running at `http://localhost:3000`

## 🌐 Deploy to Vercel

This project is configured to deploy seamlessly with Vercel.

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel
```

Or simply connect the GitHub repo to [vercel.com](https://vercel.com) and it will auto-deploy on every push.

> **Note:** No environment variables are required for the base experience. The `GEMINI_API_KEY` is only needed if you extend the app with AI features.

## 📁 Project Structure

```
the-graduation-zine/
├── src/
│   ├── App.tsx          # Main app component (envelope, letter, flipbook)
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles & design tokens
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── .env.example         # Environment variable template
```

## 💖 Made with Love

*"How lucky am I to have something so special, that makes saying goodbye so hard."*

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/fattahmaulana">fattahmaulana</a>
</div>
