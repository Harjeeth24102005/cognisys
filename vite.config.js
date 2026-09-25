import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function resendKeyManagerPlugin() {
  return {
    name: 'resend-key-manager',
    configureServer(server) {
      server.middlewares.use('/api/save-resend-key', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { apiKey } = JSON.parse(body);
              if (apiKey && apiKey.trim().startsWith('re_')) {
                const key = apiKey.trim();
                const envPath = path.resolve(process.cwd(), '.env');
                let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
                if (content.includes('VITE_RESEND_API_KEY=')) {
                  content = content.replace(/VITE_RESEND_API_KEY=.*/, `VITE_RESEND_API_KEY=${key}`);
                } else {
                  content += `\nVITE_RESEND_API_KEY=${key}\n`;
                }
                fs.writeFileSync(envPath, content, 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, message: 'Key saved successfully to .env' }));
                return;
              }
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'Key must start with re_' }));
            } catch (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          res.writeHead(405);
          res.end();
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), resendKeyManagerPlugin()],
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
              const key = env.VITE_RESEND_API_KEY;
              if (key && !proxyReq.getHeader('Authorization')) {
                proxyReq.setHeader('Authorization', `Bearer ${key.trim()}`);
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
