import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// define base of gh-pages
export default defineConfig({
  plugins: [react()],
  base: '/finanzauto-test/',
})
