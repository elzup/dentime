import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: false,
			workbox: { globPatterns: ['**/*.{js,css,html,png,ico,json}'] },
		}),
	],
	test: {
		globals: true,
		environment: 'node',
	},
})
