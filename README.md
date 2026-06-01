# EasyToVideo — AI Video Production Studio

A full-stack AI-powered video production platform that lets creators generate subtitles, text-to-speech voiceovers, sound effects, and video effects — all from a browser-based studio.

## Features

- **AI Subtitle Generation** — Whisper transcription produces accurate subtitles automatically from audio/video
- **Text-to-Speech** — Convert scripts to natural-sounding voiceovers
- **Text-to-SFX** — Generate custom sound effects from text prompts
- **AI Video Effects** — Apply AI-powered visual effects to projects
- **Project Management** — Full project lifecycle: create, manage, share, and export
- **Subscription & Billing** — Razorpay-powered plans with invoice history
- **PWA** — Installable as a desktop/mobile app via next-pwa
- **Auth** — Email + OAuth via NextAuth, session-protected API routes

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | Jotai |
| Auth | NextAuth v4 + Firebase |
| Payments | Razorpay |
| AI Processing | Beam Cloud (Whisper, TTS, SFX, Effects) |
| Database | Firebase Firestore |
| Deployment | Vercel |

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes (subtitle, effects, auth, payments)
│   ├── studio/       # Studio pages (text-to-speech, text-to-sfx, effects, subtitle)
│   ├── projects/     # Project management
│   ├── plans/        # Subscription plans
│   └── invoices/     # Billing history
├── services/         # Business logic (studio effects, Firebase, auth)
├── store/            # Jotai atoms and hooks
├── components/       # Shared UI components
└── types/            # TypeScript interfaces
```

## Getting Started

```bash
npm install
cp .env.example .env.local
# fill in .env.local values
npm run dev
```

## Environment Variables

```env
BACKEND_URL=          # Internal backend base URL
BEAM_CLOUD_TOKEN=     # Beam Cloud API token for AI processing
# NextAuth, Firebase, Razorpay keys also required — see .env.example
```

## Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```
