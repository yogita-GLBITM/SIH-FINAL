import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// AVYSURE frontend build config — plain React + Vite, no backend wired in.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
