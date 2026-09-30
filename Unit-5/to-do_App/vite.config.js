import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/Web-Interface/Unit-5/to-do_App/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
