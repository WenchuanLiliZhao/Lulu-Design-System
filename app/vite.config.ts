import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 分离 React 相关库
          'react-vendor': ['react', 'react-dom'],
          // 分离路由库
          'router': ['react-router'],
          // 分离大型第三方库
          'd3': ['d3'],
          'jszip': ['jszip'],
          // 分离 Lucide 图标库
          'icons': ['lucide-react'],
        },
      },
    },
    // 提高 chunk 大小警告阈值到 1000kb，给优化后一些缓冲
    chunkSizeWarningLimit: 1000,
    // 启用压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
      },
    },
  },
  // 开发服务器优化
  server: {
    hmr: {
      overlay: false
    }
  }
})
