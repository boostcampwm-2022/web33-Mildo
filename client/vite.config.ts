import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [react(), viteCompression({ algorithm: 'gzip' })],
  server: {
    open: true,
    port: 3000
  }
});
