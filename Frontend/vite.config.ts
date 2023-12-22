import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// vite.config.js
export default defineConfig({
  server: {
    port: 4173,
    host: '0.0.0.0', // Make sure to set this to 0.0.0.0 for external access
  },
  plugins: [react()],
});
