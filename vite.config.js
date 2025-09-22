import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "https://vtg2607.github.io/complaint_frontend/", // <-- trailing slash required for GH Pages
  plugins: [react()],
})
