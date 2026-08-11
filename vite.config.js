import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'accountOrdersMFE',
      filename: 'remoteEntry.js',
      exposes: {
        './AccountApp': './src/App.jsx',
        './AppRoutes': './src/routes/AppRoutes.jsx',
        './eventBus': './src/services/eventBus.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@mui/material', '@emotion/react', '@emotion/styled'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5003,
  },
})
