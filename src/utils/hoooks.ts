import { useSeconds } from 'use-seconds'
import { useState, useEffect } from 'react'
import { Time } from '../types'

const toHm = (d: Date): Time => ({ h: d.getHours(), m: d.getMinutes() })

export function useTimeHm() {
	const [now] = useSeconds()
	const [hm, setHm] = useState<Time>(toHm(now))

	useEffect(() => {
		setHm(toHm(now))
	}, [+now])
	return [hm]
}
