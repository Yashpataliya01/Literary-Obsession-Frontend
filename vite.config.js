import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://literary-obsession-backend-1.onrender.com/',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
