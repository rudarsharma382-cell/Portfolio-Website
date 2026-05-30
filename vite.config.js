import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        skills: resolve(__dirname, 'skills/index.html'),
        milestones: resolve(__dirname, 'milestones/index.html'),
        connect: resolve(__dirname, 'connect/index.html'),
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true
  }
})
