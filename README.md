# PlatePeek

Food social media app where users share food photos, tag restaurants, track visits and spending, discover trending places, and interact through likes.

## Features
- Home page with a food-focused landing view
- Register and log in as a **guest** or a **host**
- Profile page with an Edit Profile screen

## Tech stack
- React 19
- Vite 8 (React Compiler enabled)
- React Router
- ESLint

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Open the local URL that Vite prints in the terminal.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Starts the dev server |
| `npm run build` | Builds for production |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs ESLint |

## Project structure
- `src/App.jsx`: switches between pages
- `src/Homepage.jsx`, `Login.jsx`, `Register.jsx`, `Profile.jsx`: the main screens
- `src/assets/`: food images