import { useMemo } from 'react'
import useSWR from 'swr'
import { fetcher } from '../../api'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import {
	Book,
	isPeriodInfoNote,
	Period,
	PeriodInfo,
	PeriodInfoTerm,
	PeriodStatus,
	PeriodStatusType,
	Profile,
	Study,
	Time,
	TimeResponse,
} from '../../types'
import { useTimeHm } from '../../utils/hooks'

const compare = (bt: number, et: number, nt: number): PeriodStatusType => {
	if (nt < bt) return 'before'
	if (nt < et) return 'progress'
	return 'finish'
}

const parseHm = (hm: string): [number, number] => {
	const a = hm.split(':').map(Number)

	return [a[0], a[1]]
}

function diffStatus(info: PeriodInfoTerm, now: Time): PeriodStatus {
	const [startH, startM] = parseHm(info.start)
	const [endH, endM] = parseHm(info.end)
	const bt = startH * 60 + startM
	const et = endH * 60 + endM
	const nt = now.h * 60 + now.m
	const statusType = compare(bt, et, nt)

	switch (statusType) {
		case 'before':
			return {
				type: 'before',
			}
		case 'progress':
			const progress = nt - bt

			return {
				type: 'progress',
				progress,
				rate: progress / (et - bt),
			}

		default:
			return { type: 'finish' }
	}
}

const updatePeriod = (info: PeriodInfo, now: Time, study: Study): Period => {
	if (isPeriodInfoNote(info)) return { info, status: null }

	return {
		info,
		status: diffStatus(info, now),
		study: !!study[new Date().getDay()]?.[info.period],
	}
}

export function useProfile(id: string): Profile | null {
	const { data } = useSWR<TimeResponse>(`/static/${id}.json`, fetcher)

	return data || null
}

export function usePeriods(profile: Profile, study: Study): Period[] {
	const now = useTimeHm()

	return useMemo(
		() => profile.times.map((period) => updatePeriod(period, now, study)),
		[now, profile, study],
	)
}

export function useStudy(id: string): [Study, (s: Study) => void, string[]] {
	const [studies, setStudies] = useStudiesStorage()

	return [
		studies[id] || {},
		(s: Study) => setStudies((ss) => ({ ...ss, [id]: s })),
		Object.keys(studies),
	]
}
type Studies = { [id: string]: Study }
export const useStudiesStorage = () =>
	useLocalStorage<Studies>('study-list', {})

export function useBook(
	pid: string,
	bookId?: string,
): [Book, (s: Book) => void, string[]] {
	const [books, setBooks] = useBooksStorage()
	const id = pid !== bookId ? `${pid}_${bookId}` : pid
	const initialBook = { pid, label: pid, studyCode: '' }

	console.log(books[id])
	console.log(books)

	return [
		books[id] || initialBook,
		(s: Book) => setBooks((ss) => ({ ...ss, [id]: s })),
		Object.keys(books),
	]
}
export const useBooksStorage = () =>
	useLocalStorage<Record<string, Book>>('books', {})
