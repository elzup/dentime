import periods from '../components/Board/__tests__/testdata'

export type Time = {
	h: number
	m: number
}

export type PeriodInfoTerm = {
	period: string
	start: string
	end: string
}
export type PeriodInfoNote = {
	period: null
	text: string
}
export type PeriodInfo = PeriodInfoTerm | PeriodInfoNote

export const isPeriodTerm = (p: Period): p is PeriodTerm =>
	p.info.period !== null

export const isNonNll = <T,>(v: T | null): v is T => v !== null

export type PeriodStatusType = 'before' | 'progress' | 'finish'
export type PeriodStatusBefore = {
	type: 'before'
}

export type PeriodStatusProgress = {
	type: 'progress'
	progress: number
	rate: number
}

export type PeriodStatusFinish = {
	type: 'finish'
}
export type PeriodStatus =
	| PeriodStatusBefore
	| PeriodStatusProgress
	| PeriodStatusFinish
	| null

export type PeriodTerm = {
	readonly info: PeriodInfoTerm
	status: PeriodStatus
	study: boolean
}
export type PeriodNote = {
	readonly info: PeriodInfoNote
}
export const isPeriodInfoNote = (info: PeriodInfo): info is PeriodInfoNote =>
	info.period === null
export const isPeriodNote = (period: Period): period is PeriodNote =>
	isPeriodInfoNote(period.info)

export type Period = PeriodTerm | PeriodNote

export type Profile = {
	name: string
	times: PeriodInfo[]
}

export type WeekDay = number
export type Study = {
	[w: number]: {
		[pid: string]: boolean
	}
}
export type Book = {
	pid: string
	label: string
	studyCode: string
}

export type TimeResponse = Profile
