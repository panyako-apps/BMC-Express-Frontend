import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    '@/': path.resolve(__dirname, 'src'),
    '@/Components': path.resolve(__dirname, 'src/Components'),
    '@/Layouts': path.resolve(__dirname, 'src/Layouts'),
    '@/Pages': path.resolve(__dirname, 'src/Pages'),
  },
})
