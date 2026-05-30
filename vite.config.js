import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects/index.html'),
        stats: resolve(__dirname, 'stats/index.html'),
        milestones: resolve(__dirname, 'milestones/index.html'),
        gallery: resolve(__dirname, 'gallery/index.html'),
        connect: resolve(__dirname, 'connect/index.html'),
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true
  }
})
