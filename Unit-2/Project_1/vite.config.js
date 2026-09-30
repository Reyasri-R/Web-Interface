import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Web-Interface/Unit-2/Project_1/',
  plugins: [react()],
})
