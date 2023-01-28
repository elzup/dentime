const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const settings = {
	experimental: {
		appDir: true,
	},
	pwa: { dest: 'public' },
	async redirects() {
		return [
			{
				source: '/p/:pid',
				destination: '/p/:pid/:pid',
				permanent: false,
			},
		]
	},
	compiler: {
		styledComponents: true,
	},
}

module.exports =
	process.env.NODE_ENV === 'development' ? settings : withPWA(settings)
