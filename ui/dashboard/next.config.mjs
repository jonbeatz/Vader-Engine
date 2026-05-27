import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/** Repo root (…/Vader-Engine); allows `@import` of `ui/msc-shield.css` while silencing wrong-root lockfile warnings. */
const repoRoot = path.join(__dirname, '..', '..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: repoRoot,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
