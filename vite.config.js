import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/complaint_frontend/", // change to "/complaint_frontend/" for GitHub Pages deployment
  plugins: [react()],
})
