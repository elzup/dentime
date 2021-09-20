import { Book, Study, Time } from '../types'

export const pad2 = (n: number) => `${n}`.padStart(2, '0')

export const pad = (t: Time) => {
	return `${pad2(t.h)}:${pad2(t.m)}`
}

export const hex2Bools = (str: string): boolean[] => {
	return str
		.split('')
		.reduce(
			(p: boolean[], v) =>
				p.concat(
					parseInt(v, 16)
						.toString(2)
						.padStart(4, '0')
						.split('')
						.map(Number)
						.map(Boolean),
				),
			[],
		)
}
export const bools2Hex = (bools: boolean[]) => {
	return arrayChunk(bools, 4)
		.map((bls) => {
			return parseInt(bls.map(Number).map(String).join(''), 2).toString(16)
		})
		.join('')
}

function arrayChunk<T>(arr: T[], chunk: number): T[][] {
	const res: T[][] = []

	arr.forEach((v, i) => {
		const k = Math.floor(i / chunk)

		if (!res[k]) res[k] = []
		res[k].push(v)
	})
	return res
}
const wds = [...Array(7).keys()]

export function encodeStudy(study: Study, periodKeys: string[]): string {
	const bools = wds
		.map((wi) => study[wi] || {})
		.reduce((p: boolean[], c) => p.concat(periodKeys.map((pk) => !!c[pk])), [])

	return bools2Hex(bools)
}

export function decodeStudy(key: string, periodKeys: string[]): Study {
	const bools = hex2Bools(key)
	const study: Study = {}

	wds.forEach((w, wi) => {
		study[w] = {}
		periodKeys.forEach((pk, pi) => {
			study[w][pk] = bools[wi * periodKeys.length + pi] || false
		})
	})
	return study
}

export const bookId = (book: Book) => bookIdFormat(book.pid, book.label)
export const bookIdFormat = (pid: string, bid: string) => `${pid}/${bid}`
