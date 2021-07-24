import { useState, Dispatch, SetStateAction } from 'react'

export function getHost() {
	if (typeof window === 'undefined') return ''
	return (
		window.location.protocol +
		'//' +
		window.location.host +
		window.location.pathname
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
