// @flow
import moment from 'moment'

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
	until: moment,
}

export type PeriodStatusProgress = {
	type: 'progress',
	rate: number,
	remain: number,
}

export type PeriodStatusFinish = {
	type: 'finish',
}
export type PeriodStatus =
	| PeriodStatusBefore
	| PeriodStatusProgress
	| PeriodStatusFinish
	| null

export type Period = {|
	+info: PeriodInfo,
	status: PeriodStatus,
	+start: moment,
	+end: moment,
|}
