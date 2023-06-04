import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'; //这个path用到了上面安装的@types/node
import viteCompression from 'vite-plugin-compression';
import postCssPxToRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    plugins: [
      vue(),
      {
        ...viteCompression(),
        apply: 'build',
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @代替src
        '#': path.resolve('./types'), // #代替types
      },
    },
    server: {
      proxy: {
        '/api': {
          target: loadEnv(mode, process.cwd()).VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 16,
            propList: ['*'],
            exclude: './node_modules/',
          }),
        ],
      },
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/index.scss";',
        },
      },
    },
  });
};
