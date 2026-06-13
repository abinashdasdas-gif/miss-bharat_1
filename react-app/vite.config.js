import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// relative base so the build works on GitHub Pages project subpaths and locally
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: 'dist' }
});
