const withPWA = require('next-pwa')({
	disable: process.env.NODE_ENV === 'development',
	dest: 'public',
})

/** @type {import('next').NextConfig} */
const settings = {
	experimental: {
		appDir: true,
	},
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
