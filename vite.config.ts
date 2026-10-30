import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // VITE_BASE_PATH can be customized (e.g., '/' or '/portfolio/')
  // Default to './' for portable relative assets that work on both user pages and project pages
  const basePath = env.VITE_BASE_PATH || process.env.BASE_PATH || './';

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
      },
    },
  };
});
