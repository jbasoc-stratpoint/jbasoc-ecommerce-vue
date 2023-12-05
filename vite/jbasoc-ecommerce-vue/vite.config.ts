// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   base: '',
// })
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import terser from "@rollup/plugin-terser";

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path
  base: "",

  // Plugins
  plugins: [
    vue(),

    // If you need to customize the terser options for minification
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    }),
  ],

  // Resolve aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Build-specific configurations
  build: {
    // Target specific browsers
    target: "es2015",

    // Minify with 'terser' - Vite defaults to 'esbuild' which is faster but terser is more thorough
    minify: "terser",

    // Produces smaller builds but can be slower and isn't suited for large projects
    // cssCodeSplit: true,

    // JS and CSS sourcemaps for debugging
    sourcemap: false,

    // Chunk size optimization
    chunkSizeWarningLimit: 500, // in KB

    // Manual chunks for vendor code splitting
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },

  // Optimize specific dependencies (optional)
  optimizeDeps: {
    include: ["axios", "vue", "vue-router", "vuex"],
  },

  // Server configurations for local development (can be omitted in production config)
  server: {
    port: 3000, // default is 3000
    strictPort: true, // if port is occupied, don't try another port
    open: true, // open in browser on server start
  },
});
