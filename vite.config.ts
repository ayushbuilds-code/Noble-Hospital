import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'bolna-session-api',
        configureServer(server) {
          server.middlewares.use('/api/bolna-session', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method Not Allowed' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                let parsedBody: Record<string, any> = {};
                if (body) {
                  try {
                    parsedBody = JSON.parse(body);
                  } catch (e) {
                    // ignore JSON parse error
                  }
                }

                const apiKey = parsedBody.apiKey || env.BOLNA_API_KEY || process.env.BOLNA_API_KEY || 'bn-6c178c13ca9845c49dc08dfa2547f4d7';
                const agentId = parsedBody.agentId || env.BOLNA_AGENT_ID || process.env.BOLNA_AGENT_ID || '5ac1996a-3a8f-4097-9e9f-e5d48641776b';

                if (!apiKey || !agentId) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      error: 'BOLNA_NOT_CONFIGURED',
                      message:
                        'Bolna credentials are missing. Please provide BOLNA_API_KEY and BOLNA_AGENT_ID in .env or the Settings panel.'
                    })
                  );
                  return;
                }

                // Call official Bolna minting API
                const bolnaRes = await fetch('https://api.bolna.ai/web-call/freeswitch-session', {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    agent_id: agentId,
                    user_data: parsedBody.user_data || {}
                  })
                });

                const data = await bolnaRes.json();
                res.statusCode = bolnaRes.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: 'BOLNA_MINT_ERROR',
                    message: err?.message || 'Failed to mint Bolna session'
                  })
                );
              }
            });
          });
        }
      }
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-supabase': ['@supabase/supabase-js'],
            'vendor-bolna': ['@bolna/web-call'],
            'vendor-icons': ['lucide-react']
          }
        }
      }
    },
    server: {
      port: 8080,
      strictPort: true,
      host: true
    }
  };
});
