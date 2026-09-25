import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: '/cognisys/',
    server: {
      port: 5173,
      host: true,
      proxy: {
        '/api/resend': {
          target: 'https://api.resend.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/resend/, ''),
          configure: (proxy, _options) => {
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              if (env.VITE_RESEND_API_KEY && !proxyReq.getHeader('Authorization')) {
                proxyReq.setHeader('Authorization', `Bearer ${env.VITE_RESEND_API_KEY.trim()}`);
              }
            });
          }
        }
      },
      watch: {
        ignored: ['**/docs/**', '**/dist/**']
      }
    }
  };
});
