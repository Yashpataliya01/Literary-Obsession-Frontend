import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://literary-obsession-backend.vercel.app',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
