import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const useCustomDomain = process.env.GITHUB_PAGES_CUSTOM_DOMAIN === 'true'
const useGithubPages = process.env.GITHUB_PAGES === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: useCustomDomain ? '/' : useGithubPages ? '/QuickCart-/' : '/',
})
