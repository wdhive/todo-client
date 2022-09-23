import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@honkhonk/vite-plugin-svgr';
const isDevMode = process.env.NODE_ENV === 'development';

const config = {
  assestPath: 'assets',
};

const server = {
  port: 80,
};

const build = {
  rollupOptions: {
    output: {
      assetFileNames: file => {
        const ext = file.name.split('.').at(-1);
        const outputFolder = ext === 'css' || ext === 'js' ? '' : 'files/';
        return `${config.assestPath}/${outputFolder}[name]-[hash][extname]`;
      },
      chunkFileNames: `${config.assestPath}/chunk-[name]-[hash].js`,
      entryFileNames: `${config.assestPath}/[name]-[hash].js`,
    },
  },
};

const plugins = [react(), svgr.default()];

const css = {
  modules: {
    generateScopedName: isDevMode
      ? '[local]___[name]--[hash:base64:5]'
      : '[hash:base64]',
  },
};

export default defineConfig({ server, build, plugins, css });
