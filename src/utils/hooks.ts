import { useSeconds } from 'use-seconds'
import { Time } from '../types'

const toHm = (d: Date): Time => ({ h: d.getHours(), m: d.getMinutes() })

export function useTime(): [Time, number] {
	const [now] = useSeconds()

	return [toHm(now), now.getSeconds()]
}

export function useTimeHm(): Time {
	const [now] = useSeconds(0, 60 * 1000)

	return toHm(now)
}
