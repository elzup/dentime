const withPWA = require('next-pwa')

const settings = {
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
}

module.exports =
	process.env.NODE_ENV === 'development' ? settings : withPWA(settings)
