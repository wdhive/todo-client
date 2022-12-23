// vite.config.js
import fs from "fs";
import path from "path";
import { defineConfig } from "file:///main/Todo-Frontend/node_modules/vite/dist/node/index.js";
import vitePWA from "file:///main/Todo-Frontend/node_modules/vite-pwa/dist/mjs/index.js";
import react from "file:///main/Todo-Frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import viteVSCode from "file:///main/Todo-Frontend/node_modules/vite-vscode/dist-mjs/index.js";
import svgr from "file:///main/Todo-Frontend/node_modules/@honkhonk/vite-plugin-svgr/dist/index.js";
var isDevMode = process.env.NODE_ENV !== "production";
var srcDir = path.resolve("./src");
var config = {
  static: "static",
  assets: "assets"
};
var plugins = [
  react(),
  svgr.default(),
  vitePWA({
    map: true,
    spa: true,
    preCacheFiles: ["/", "/sw.js", "/swRegister.js", "/manifest.json"]
  }),
  viteVSCode()
];
var css = {
  modules: {
    generateScopedName: isDevMode ? "[local]___[name]--[hash:base64:5]" : "[hash:base64]"
  },
  preprocessorOptions: {
    scss: {
      additionalData: `@use '$styles/abstracts/core' as *;
`
    }
  }
};
var resolve = {
  alias: {
    $slice: path.join(srcDir, "/store/slice"),
    $ui: path.join(srcDir, "/components/UI"),
    ...Object.fromEntries(
      fs.readdirSync(srcDir).filter((t) => fs.lstatSync(path.join(srcDir, t)).isDirectory()).map((t) => [`$${t}`, path.join(srcDir, t)])
    ),
    $src: srcDir
  }
};
var server = {
  host: "localhost",
  port: 3e3
};
var build = {
  rollupOptions: {
    output: {
      assetFileNames: (file) => {
        const ext = file.name.split(".").at(-1);
        const outputFolder = ext === "css" || ext === "js" ? "" : config.assets + "/";
        return `${config.static}/${outputFolder}[name]-[hash][extname]`;
      },
      entryFileNames: `${config.static}/[name]-[hash].js`,
      chunkFileNames: `${config.static}/chunk-[name]-[hash].js`
    }
  }
};
var vite_config_default = defineConfig({ plugins, css, resolve, server, build });
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbWFpbi9Ub2RvLUZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbWFpbi9Ub2RvLUZyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tYWluL1RvZG8tRnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2aXRlUFdBIGZyb20gJ3ZpdGUtcHdhJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHZpdGVWU0NvZGUgZnJvbSAndml0ZS12c2NvZGUnXG5pbXBvcnQgc3ZnciBmcm9tICdAaG9ua2hvbmsvdml0ZS1wbHVnaW4tc3ZncidcblxuY29uc3QgaXNEZXZNb2RlID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuY29uc3Qgc3JjRGlyID0gcGF0aC5yZXNvbHZlKCcuL3NyYycpXG5jb25zdCBjb25maWcgPSB7XG4gIHN0YXRpYzogJ3N0YXRpYycsXG4gIGFzc2V0czogJ2Fzc2V0cycsXG59XG5cbmNvbnN0IHBsdWdpbnMgPSBbXG4gIHJlYWN0KCksXG4gIHN2Z3IuZGVmYXVsdCgpLFxuICB2aXRlUFdBKHtcbiAgICBtYXA6IHRydWUsXG4gICAgc3BhOiB0cnVlLFxuICAgIHByZUNhY2hlRmlsZXM6IFsnLycsICcvc3cuanMnLCAnL3N3UmVnaXN0ZXIuanMnLCAnL21hbmlmZXN0Lmpzb24nXSxcbiAgfSksXG4gIHZpdGVWU0NvZGUoKSxcbl1cblxuY29uc3QgY3NzID0ge1xuICBtb2R1bGVzOiB7XG4gICAgZ2VuZXJhdGVTY29wZWROYW1lOiBpc0Rldk1vZGVcbiAgICAgID8gJ1tsb2NhbF1fX19bbmFtZV0tLVtoYXNoOmJhc2U2NDo1XSdcbiAgICAgIDogJ1toYXNoOmJhc2U2NF0nLFxuICB9LFxuICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgc2Nzczoge1xuICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlICckc3R5bGVzL2Fic3RyYWN0cy9jb3JlJyBhcyAqO1xcbmAsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgcmVzb2x2ZSA9IHtcbiAgYWxpYXM6IHtcbiAgICAkc2xpY2U6IHBhdGguam9pbihzcmNEaXIsICcvc3RvcmUvc2xpY2UnKSxcbiAgICAkdWk6IHBhdGguam9pbihzcmNEaXIsICcvY29tcG9uZW50cy9VSScpLFxuICAgIC4uLk9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIGZzXG4gICAgICAgIC5yZWFkZGlyU3luYyhzcmNEaXIpXG4gICAgICAgIC5maWx0ZXIoKHQpID0+IGZzLmxzdGF0U3luYyhwYXRoLmpvaW4oc3JjRGlyLCB0KSkuaXNEaXJlY3RvcnkoKSlcbiAgICAgICAgLm1hcCgodCkgPT4gW2AkJHt0fWAsIHBhdGguam9pbihzcmNEaXIsIHQpXSlcbiAgICApLFxuICAgICRzcmM6IHNyY0RpcixcbiAgfSxcbn1cblxuY29uc3Qgc2VydmVyID0ge1xuICBob3N0OiAnbG9jYWxob3N0JyxcbiAgcG9ydDogMzAwMCxcbn1cblxuY29uc3QgYnVpbGQgPSB7XG4gIHJvbGx1cE9wdGlvbnM6IHtcbiAgICBvdXRwdXQ6IHtcbiAgICAgIGFzc2V0RmlsZU5hbWVzOiAoZmlsZSkgPT4ge1xuICAgICAgICBjb25zdCBleHQgPSBmaWxlLm5hbWUuc3BsaXQoJy4nKS5hdCgtMSlcbiAgICAgICAgY29uc3Qgb3V0cHV0Rm9sZGVyID1cbiAgICAgICAgICBleHQgPT09ICdjc3MnIHx8IGV4dCA9PT0gJ2pzJyA/ICcnIDogY29uZmlnLmFzc2V0cyArICcvJ1xuICAgICAgICByZXR1cm4gYCR7Y29uZmlnLnN0YXRpY30vJHtvdXRwdXRGb2xkZXJ9W25hbWVdLVtoYXNoXVtleHRuYW1lXWBcbiAgICAgIH0sXG4gICAgICBlbnRyeUZpbGVOYW1lczogYCR7Y29uZmlnLnN0YXRpY30vW25hbWVdLVtoYXNoXS5qc2AsXG4gICAgICBjaHVua0ZpbGVOYW1lczogYCR7Y29uZmlnLnN0YXRpY30vY2h1bmstW25hbWVdLVtoYXNoXS5qc2AsXG4gICAgfSxcbiAgfSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHsgcGx1Z2lucywgY3NzLCByZXNvbHZlLCBzZXJ2ZXIsIGJ1aWxkIH0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJPLE9BQU8sUUFBUTtBQUMxUCxPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFVBQVU7QUFFakIsSUFBTSxZQUFZLFFBQVEsSUFBSSxhQUFhO0FBQzNDLElBQU0sU0FBUyxLQUFLLFFBQVEsT0FBTztBQUNuQyxJQUFNLFNBQVM7QUFBQSxFQUNiLFFBQVE7QUFBQSxFQUNSLFFBQVE7QUFDVjtBQUVBLElBQU0sVUFBVTtBQUFBLEVBQ2QsTUFBTTtBQUFBLEVBQ04sS0FBSyxRQUFRO0FBQUEsRUFDYixRQUFRO0FBQUEsSUFDTixLQUFLO0FBQUEsSUFDTCxLQUFLO0FBQUEsSUFDTCxlQUFlLENBQUMsS0FBSyxVQUFVLGtCQUFrQixnQkFBZ0I7QUFBQSxFQUNuRSxDQUFDO0FBQUEsRUFDRCxXQUFXO0FBQ2I7QUFFQSxJQUFNLE1BQU07QUFBQSxFQUNWLFNBQVM7QUFBQSxJQUNQLG9CQUFvQixZQUNoQixzQ0FDQTtBQUFBLEVBQ047QUFBQSxFQUNBLHFCQUFxQjtBQUFBLElBQ25CLE1BQU07QUFBQSxNQUNKLGdCQUFnQjtBQUFBO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFNLFVBQVU7QUFBQSxFQUNkLE9BQU87QUFBQSxJQUNMLFFBQVEsS0FBSyxLQUFLLFFBQVEsY0FBYztBQUFBLElBQ3hDLEtBQUssS0FBSyxLQUFLLFFBQVEsZ0JBQWdCO0FBQUEsSUFDdkMsR0FBRyxPQUFPO0FBQUEsTUFDUixHQUNHLFlBQVksTUFBTSxFQUNsQixPQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQzlELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQUEsSUFDL0M7QUFBQSxJQUNBLE1BQU07QUFBQSxFQUNSO0FBQ0Y7QUFFQSxJQUFNLFNBQVM7QUFBQSxFQUNiLE1BQU07QUFBQSxFQUNOLE1BQU07QUFDUjtBQUVBLElBQU0sUUFBUTtBQUFBLEVBQ1osZUFBZTtBQUFBLElBQ2IsUUFBUTtBQUFBLE1BQ04sZ0JBQWdCLENBQUMsU0FBUztBQUN4QixjQUFNLE1BQU0sS0FBSyxLQUFLLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUN0QyxjQUFNLGVBQ0osUUFBUSxTQUFTLFFBQVEsT0FBTyxLQUFLLE9BQU8sU0FBUztBQUN2RCxlQUFPLEdBQUcsT0FBTyxVQUFVO0FBQUEsTUFDN0I7QUFBQSxNQUNBLGdCQUFnQixHQUFHLE9BQU87QUFBQSxNQUMxQixnQkFBZ0IsR0FBRyxPQUFPO0FBQUEsSUFDNUI7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWEsRUFBRSxTQUFTLEtBQUssU0FBUyxRQUFRLE1BQU0sQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
