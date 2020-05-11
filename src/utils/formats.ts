import { Time } from '../types'

export const pad2 = (n: number) => `${n}`.padStart(2, '0')

export const pad = (t: Time) => {
	return `${pad2(t.h)}:${pad2(t.m)}`
}

export const bools2Hex = <T>(bools: T[]) => {
	arrayChunk(bools, 4).map((bls) =>
		parseInt(bls.map(Number).map(String).join(''), 2).toString(16),
	)
}

function arrayChunk<T>(arr: T[], chunk: number): T[][] {
	const res: T[][] = []

	arr.forEach((v, i) => {
		const k = i % chunk

		if (!res[k]) res[k] = []
		res[k].push(v)
	})
	return res
}
