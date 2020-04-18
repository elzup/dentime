import useSWR from 'swr'
import { fetcher } from '../../api'
import {
	Period,
	PeriodInfo,
	PeriodStatus,
	PeriodInfoTerm,
	PeriodStatusType,
	Time,
	TimeResponse,
	isPeriodInfoNote,
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

const updatePeriod = (info: PeriodInfo, now: Time): Period => {
	if (isPeriodInfoNote(info)) return { info, status: null }

	return {
		info,
		status: diffStatus(info, now),
	}
}

export function usePeriods(id: string): Period[] {
	const now = useTimeHm()

	const { data } = useSWR<TimeResponse>(`/static/${id}.json`, fetcher)

	if (!data) return []

	const periods = data.times.map((period) => updatePeriod(period, now))

	return periods
}
