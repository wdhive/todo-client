import path from 'path'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
const isDevMode = process.env.NODE_ENV !== 'production'
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
    host: 'localhost',
    port: 3000,
  },

  resolve: {
    alias: {
      '@src': path.resolve('./src'),
      '@hooks': path.resolve('./src/hooks'),
      '@store': path.resolve('./src/store'),
      '@com': path.resolve('./src/components'),
      '@lay': path.resolve('./src/layouts'),
      '@ass': path.resolve('./src/assests'),
      '@abs': path.resolve('./src/styles/abstracts'),
      '@pages': path.resolve('./src/pages'),
      '@api': path.resolve('./src/api'),
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
        chunkFileNames: `${config.static}/[name]-chunk-[hash].js`,
        entryFileNames: `${config.static}/[name]-[hash].js`,
      },
    },
  },
})
