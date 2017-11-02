// @flow

import type { PeriodInfo } from '../types'

export async function loadData(): Promise<PeriodInfo[]> {
	return [
		{
			period: 1,
			start: { h: 9, m: 0 },
			end: { h: 10, m: 30 },
		},
		{
			period: 2,
			start: { h: 10, m: 40 },
			end: { h: 12, m: 10 },
		},
		{
			period: 3,
			start: { h: 13, m: 10 },
			end: { h: 14, m: 40 },
		},
		{
			period: 4,
			start: { h: 14, m: 50 },
			end: { h: 16, m: 20 },
		},
		{
			period: 5,
			start: { h: 16, m: 30 },
			end: { h: 18, m: 0 },
		},
		{
			period: 6,
			start: { h: 18, m: 10 },
			end: { h: 19, m: 40 },
		},
		{
			period: 7,
			start: { h: 19, m: 50 },
			end: { h: 21, m: 20 },
		},
	]
}
