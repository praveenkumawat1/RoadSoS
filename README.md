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

## Vercel deployment (root-based)

If you prefer Vercel, this repository is now set up so Vercel can build from the repository root. Vercel will run `npm run build` at the root which does:

- Installs and builds the frontend inside `roadsos-app`.
- Copies the produced `roadsos-app/dist` into repository root `dist/`.

Vercel settings to use:

- Framework Preset: Other (or leave auto-detected)
- Build Command: `npm run build`
- Output Directory: `dist`

Note: Backend (`server/`) is not deployed to Vercel; use Render/Fly/Railway or Docker for that.
