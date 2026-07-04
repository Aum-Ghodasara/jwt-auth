import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Whenever React tries to fetch these routes, Vite secretly forwards them to Express
      '/register': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/dashboard': 'http://localhost:3000'
    }
  }
})