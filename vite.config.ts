import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  root: 'client',
  envDir: '../',
  build: {
    outDir: '../dist-client',
    emptyOutDir: true,
  },
  optimizeDeps: { // <-- ADD THIS ENTIRE BLOCK
    include: [
      '@solana/kit',
      '@solana-program/system',
      '@solana-program/token',
      '@solana-program/memo',
    ],
  },
  server: {
    port: 5173,
    proxy: {
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@common': '/src/common',
      '@components': '/src/components',
      '@game': '/src/game',
      '@hooks': '/src/hooks',
      '@services': '/src/services',
      '@types': '/src/types',
      '@utils': '/src/utils',
    },
  },
})
