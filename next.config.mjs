import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(process.cwd(), 'app/.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    DOMAIN_BASE_URL: process.env.DOMAIN_BASE_URL,
  },
};

export default nextConfig;

