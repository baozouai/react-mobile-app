import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'
import createImportPlugin from 'vite-plugin-import'
import enhanceLog from 'vite-plugin-enhance-log'
const isProd = process.env.NODE_ENV === 'production'
const base =  isProd ? '/react-mobile-app': undefined

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    enhanceLog(),
    react(),
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
          sourcefile: id,
          jsx: 'automatic', // 👈 this is important
        });
      },
  },
  createImportPlugin({
    onlyBuild: false,
    babelImportPluginOptions: [
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css', // or 'css'
      },
    ],
  }),
],
  resolve: {
    alias: {
      "@": "/src",
    }
  },
  define: {
    'process.env': {
      PUBLIC_URL: base,
    }
  },
  server: {
    port: 2002
  },
  base,
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
