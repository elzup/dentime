import { useEffect, useState } from 'react'
import { Time } from '../types'

const toHm = (d: Date): Time => ({ h: d.getHours(), m: d.getMinutes() })

function useNow(intervalMs: number): Date {
	const [now, setNow] = useState(() => new Date())

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), intervalMs)

		return () => clearInterval(id)
	}, [intervalMs])

	return now
}

export function useTime(): [Time, number] {
	const now = useNow(1000)

	return [toHm(now), now.getSeconds()]
}

export function useTimeHm(): Time {
	const now = useNow(60 * 1000)

	return toHm(now)
}
