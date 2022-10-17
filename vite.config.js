import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
const isDevMode = process.env.NODE_ENV === 'development'
const config = {
  static: 'static',
}

const plugins = [react(), svgr.default()]
isDevMode ||
  plugins.push(
    VitePWA({
      manifest: false,
      workbox: {
        globPatterns: ['/'],
        runtimeCaching: [
          {
            handler: 'CacheFirst',
            urlPattern: ({ sameOrigin }) => sameOrigin,
            options: { cacheName: 'static-files' },
          },
        ],
      },
    })
  )

export default defineConfig({
  plugins,

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@com': path.resolve(__dirname, './src/components'),
      '@lay': path.resolve(__dirname, './src/layouts'),
      '@ass': path.resolve(__dirname, './src/assests'),
      '@abs': path.resolve(__dirname, './src/styles/abstracts'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },

  css: {
    modules: {
      generateScopedName: isDevMode
        ? '[local]___[name]--[hash:base64:5]'
        : '[hash:base64]',
    },

    preprocessorOptions: {
      scss: {
        additionalData: `@use '@abs/core' as *;\n`,
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        assetFileNames: file => {
          const ext = file.name.split('.').at(-1)
          const outputFolder = ext === 'css' || ext === 'js' ? '' : 'assests/'
          return `${config.static}/${outputFolder}[name]-[hash][extname]`
        },
        chunkFileNames: `${config.static}/chunk-[name]-[hash].js`,
        entryFileNames: `${config.static}/[name]-[hash].js`,
      },
    },
  },
})
