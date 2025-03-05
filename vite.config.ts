import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
        {find: '@/', replacement: join(__dirname, "src")},
        {find: '@components', replacement: join(__dirname, "src", "components")},
        {find: '@public', replacement: join(__dirname, "public")},
        {find: '@assets', replacement: join(__dirname, "src", "assets")},
        {find: '@pages', replacement: join(__dirname, "src", "pages")},
    ],
},
})
