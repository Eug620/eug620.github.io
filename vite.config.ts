import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    visualizer({
      filename: "visualizer.html",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: "assets",
    //设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //启用/禁用 brotli 压缩大小报告
    // brotliSize: true,
    //chunk 大小警告的限制
    chunkSizeWarningLimit: 1000,
    // 移除console
    minify: "terser",
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // 拆分js
        manualChunks: {
          three: ["three"],
          lowdb: ["lowdb"],
          lodash: ["lodash"],
          localforage: ["localforage"],
        },
      },
    },
  },
  //调整控制台输出的级别 'info' | 'warn' | 'error' | 'silent'
  logLevel: "info",
  //设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
  clearScreen: true,
});
