import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // ⚛️ React core separado
          react: ['react', 'react-dom', 'react-router-dom'],

          // cuando se use firebase o algo pesado, se separa aquí
          // firebase: ['firebase/app', 'firebase/auth'],

          // opcional: utilidades grandes
          // utils: ['lodash', 'axios']
        },
      },
    },

    // opcional (solo para quitar warning si quieres)
    // chunkSizeWarningLimit: 800,
  },
})