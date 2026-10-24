import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages は https://<ユーザー名>.github.io/task-board/ で配信されるため、ビルド時だけ base を合わせる
  base: command === 'build' ? '/task-board/' : '/',
}))
