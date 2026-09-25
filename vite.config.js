import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/cognisys/',
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/docs/**', '**/dist/**']
    }
  }
});
