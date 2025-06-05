import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ou outro framework que usar

export default defineConfig({
  plugins: [react()],
  // postcss: './postcss.config.cjs', // geralmente não precisa explicitar
})