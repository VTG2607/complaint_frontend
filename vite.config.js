import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/complaint_frontend/", // Only repo name
  plugins: [react()],
})
