import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sandboxRoot = path.dirname(fileURLToPath(import.meta.url));
/** Lean Boundary: trace shared Shield CSS from repo root without hoisting deps */
const repoRoot = path.join(sandboxRoot, '../..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: repoRoot,
};

export default nextConfig;
