import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages（https://<ユーザー名>.github.io/task-board/）で公開するため base を指定
export default defineConfig({
  base: '/task-board/',
  plugins: [react()],
})
