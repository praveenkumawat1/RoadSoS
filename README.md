# RoadSoS

This repository contains RoadSoS frontend (`roadsos-app/`) and backend (`server/`).

Instructions to push this workspace to GitHub are available in `push_to_github.sh`.

## Deploy instructions

Frontend (GitHub Pages via Actions)

- The workflow `.github/workflows/frontend-pages.yml` builds `roadsos-app` and publishes `roadsos-app/dist` to GitHub Pages automatically on push to `main`.

Backend (Docker image)

- The workflow `.github/workflows/backend-image.yml` builds a Docker image from `server/` and pushes it to GitHub Container Registry `ghcr.io/<your-user>/roadsos-server:latest` on push to `main`.
- You can then deploy this image to any container host (Render, Fly, DigitalOcean, etc.) and set environment variables in that host.

Next steps for you:

1. Confirm the repository on GitHub at `https://github.com/praveenkumawat1/RoadSoS` (or create it if missing).
2. Push your `main` branch to GitHub (if not already pushed).
3. In GitHub repo settings → Pages, ensure Pages is enabled for the repository (the Actions workflow will deploy automatically).
4. For backend deployment, pick a host and configure environment variables (TWILIO, OPENAI, GEMINI keys) and pull the image from GHCR.

## Vercel deployment (frontend only)

Use Vercel for the frontend and a separate host for the backend. This is the cleanest setup for this project.

Vercel settings to use:

- Root Directory: `roadsos-app`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

Backend deployment:

- Deploy `server/` to Render, Fly.io, Railway, or a VPS using Docker.
- Set `VITE_API_BASE_URL` in Vercel to the backend URL, for example `https://your-backend.onrender.com`.

Environment files:

- `server/.env.example` contains the backend keys and `CLIENT_ORIGIN`/`CORS_ORIGIN`.
- `roadsos-app/.env.example` contains `VITE_API_BASE_URL` for the deployed backend URL.
- For local development, copy those templates into real `.env` files and fill the values.

Frontend code now reads `VITE_API_BASE_URL` for API/socket calls, so the deployed frontend will talk to the deployed backend instead of `localhost:5000`.

If you want a single-host deployment, use Docker on a VPS. Vercel is not a good fit for the long-running Node backend and Socket.IO server.
