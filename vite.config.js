import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { meta } from '@eslint/js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: meta.env.VITE_BASE_PATH || "/movie-dc",
});
