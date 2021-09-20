export function getHost() {
	if (typeof window === 'undefined') return ''
	return (
		window.location.protocol +
		'//' +
		window.location.host +
		window.location.pathname.split('/').slice(0, 3).join('/')
	)
}

export const disableTouch = () => {
	window.addEventListener(
		'touchmove',
		(event) => {
			event.preventDefault()
		},
		true,
	)
}
