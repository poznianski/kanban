import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      enabled: true,
      reporter: ['html']
    }
  },
})
