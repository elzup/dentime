import { useEffect, useState } from 'react'
import { useSeconds } from 'use-seconds'
import { Time } from '../types'

const toHm = (d: Date): Time => ({ h: d.getHours(), m: d.getMinutes() })

export function useTimeHm(): [Time, number] {
	const [now] = useSeconds()
	const [hm, setHm] = useState<Time>(toHm(now))
	const [sec, setSec] = useState<number>(now.getSeconds())

	useEffect(() => {
		setHm(toHm(now))
		setSec(now.getSeconds())
	}, [+now])

	return [hm, sec]
}
