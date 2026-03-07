# Lumina3D Wallpapers

Production-ready wallpaper platform for Web (PWA) and Expo-compatible image picking flows.

## Project Structure

```
src/
  components/
  screens/
  navigation/
  services/
  config/
  hooks/
  store/
  utils/
```

## Setup

1. Copy `.env.example` to `.env` and fill Firebase values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Build production bundle:
   ```bash
   npm run build
   ```

## Firebase Collections

- `users/{uid}`
- `users/{uid}/favorites/{wallpaperId}`
- `wallpapers/{wallpaperId}`
- `favorites/{userId_wallpaperId}`
- `downloads/{downloadId}`
