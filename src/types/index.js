// @flow

export type Time = {|
	+h: number,
	+m: number,
|}

export type PeriodInfo = {|
	+period: number,
	+start: Time,
	+end: Time,
|}

export type PeriodStatusBefore = {
	type: 'before',
	until: number,
}

export type PeriodStatusProgress = {
	type: 'progress',
	until: number,
}

export type PeriodStatusFinish = {
	type: 'finish',
}
export type PeriodStatus =
	| PeriodStatusBefore
	| PeriodStatusProgress
	| PeriodStatusFinish

export type Period = {|
	+info: PeriodInfo,
	status: PeriodStatus,
|}
