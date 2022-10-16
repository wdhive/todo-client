import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'
const isDevMode = process.env.NODE_ENV === 'development'

const config = {
  assestPath: 'assets',
}

export default defineConfig({
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@com': path.resolve(__dirname, './src/components'),
      '@lay': path.resolve(__dirname, './src/layouts'),
      '@ass': path.resolve(__dirname, './src/assests'),
      '@abs': path.resolve(__dirname, './src/styles/abstracts'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: file => {
          const ext = file.name.split('.').at(-1)
          const outputFolder = ext === 'css' || ext === 'js' ? '' : 'files/'
          return `${config.assestPath}/${outputFolder}[name]-[hash][extname]`
        },
        chunkFileNames: `${config.assestPath}/chunk-[name]-[hash].js`,
        entryFileNames: `${config.assestPath}/[name]-[hash].js`,
      },
    },
  },
  plugins: [react(), svgr.default()],
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
})
