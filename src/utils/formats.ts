import { Time } from '../types'

export const pad2 = (n: number) => `${n}`.padStart(2, '0')

export const pad = (t: Time) => {
	return `${pad2(t.h)}:${pad2(t.m)}`
}
