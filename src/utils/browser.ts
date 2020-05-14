import { useState, Dispatch, SetStateAction } from 'react'

export const disableTouch = () => {
	window.addEventListener(
		'touchmove',
		(event) => {
			event.preventDefault()
		},
		true,
	)
}

export function useLocalStorage<T = unknown>(
	key: string,
	initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key)

			return item ? (JSON.parse(item) as T) : initialValue
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

export const useFavorite = () => useLocalStorage<string>('favorite', '/')
