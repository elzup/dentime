export type Time = {
	h: number
	m: number
}

export type PeriodInfo = {
	period: string
	start: Time
	end: Time
}

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

export type Period = {
	readonly info: PeriodInfo
	status: PeriodStatus
}

export type Profile = {
	periods: {
		[key: string]: PeriodInfo
	}
}

export type TimeResponse = {
	base: Profile
	d: Profile
	j: Profile
}
