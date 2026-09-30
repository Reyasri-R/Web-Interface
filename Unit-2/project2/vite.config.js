import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Web-Interface/Unit-2/project2/',
  plugins: [react()],
})
