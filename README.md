# AVYSURE — SIH Tourism Frontend

Frontend-only React/Vite prototype for the Seven Sister states of Northeast India.

## Run
```bash
npm install
npm run dev
```

## Structure
- `src/components/Login` — cinematic landing/login form
- `src/components/Navbar` — profile information dropdown
- `src/pages/ExplorePage.jsx` — main experience
- `src/data/states.js` — Northeast India + hidden gem content/image URLs
- `src/pages/explore.css` — main visual system

## Backend hand-off
The UI intentionally uses local React state only. Your backend team can later connect:
- login/profile persistence
- itinerary generation API
- live weather API
- expense persistence/analytics
- geofencing/location services
- hidden-gem database

## Imagery
The prototype uses remote image URLs for easy demo setup. Replace the image URLs in `src/data/states.js` with your team's licensed/approved photography before final submission.

## Design direction
The visual language takes inspiration from the cinematic travel presentation and Northeast India focus of Northeast Odyssey, but the AVYSURE interface, copy, layout and interactions are original.
