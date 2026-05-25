import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const enablePayload = process.env.ENABLE_PAYLOAD === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ENABLE_PAYLOAD: enablePayload ? 'true' : 'false',
  },
};

/** @type {import('next').NextConfig | Promise<import('next').NextConfig>} */
async function buildConfig() {
  if (!enablePayload) {
    return {
      ...nextConfig,
      webpack: (config, { webpack }) => {
        config.plugins.push(
          new webpack.IgnorePlugin({
            resourceRegExp: /^payload$|^@payloadcms\/|load-site-data-payload|@payload-config/,
          }),
        );
        return config;
      },
    };
  }

  const { withPayload } = await import('@payloadcms/next/withPayload');
  return withPayload(nextConfig, {
    configPath: path.resolve(__dirname, 'payload.config.ts'),
  });
}

export default buildConfig();
