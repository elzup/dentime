import { useState } from 'react'

export const disableTouch = () => {
	window.addEventListener(
		'touchmove',
		(event) => {
			event.preventDefault()
		},
		true,
	)
}

export function useLocalStorage(key: string, initialValue: unknown) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key)

			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.log(error)
			return initialValue
		}
	})

	const setValue = (value: unknown) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value

			setStoredValue(valueToStore)
			window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.log(error)
		}
	}

	return [storedValue, setValue]
}
