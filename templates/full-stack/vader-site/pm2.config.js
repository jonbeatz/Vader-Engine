/**
 * PM2 production profile for Hostinger VPS (static VaderLabz site).
 * @see https://pm2.keymetrics.io/docs/usage/application-declaration/
 */
module.exports = {
  apps: [
    {
      name: 'vader-site',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3003 -H 0.0.0.0',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        ENABLE_PAYLOAD: 'false',
        PORT: '3003',
        HOSTNAME: '0.0.0.0',
      },
      env_file: '.env.production',
    },
  ],
};
