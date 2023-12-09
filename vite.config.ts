import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
const isProd = process.env.NODE_ENV === 'production'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: 'load+transform-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) {
          return null;
        }

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic', // 👈 this is important
        });
      },
  },
],
  resolve: {
    alias: {
      "@": "/src",
    }
  },
  server: {
    port: 3002
  },
  base: isProd ? '/react-mobile-app': undefined,
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
