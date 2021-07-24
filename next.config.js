const withPWA = require('next-pwa')

const settings = {
	pwa: { dest: 'public' },
}

module.exports =
	process.env.NODE_ENV === 'development' ? settings : withPWA(settings)
