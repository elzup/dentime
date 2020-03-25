import { Period } from '../../types'

const periodsData: Period[] = [
	{
		info: {
			period: '1',
			start: { h: 9, m: 20 },
			end: { h: 11, m: 0 },
		},
		status: { type: 'finish' },
	},
	{
		info: {
			period: '2',
			start: { h: 11, m: 10 },
			end: { h: 12, m: 50 },
		},
		status: { type: 'finish' },
	},
	{
		info: {
			period: '3',
			start: { h: 13, m: 40 },
			end: { h: 15, m: 20 },
		},
		status: { type: 'progress', progress: 75, rate: 0.75 },
	},
	{
		info: {
			period: '4',
			start: { h: 15, m: 30 },
			end: { h: 17, m: 10 },
		},
		status: { type: 'before' },
	},
	{
		info: {
			period: '5',
			start: { h: 17, m: 20 },
			end: { h: 19, m: 0 },
		},
		status: { type: 'before' },
	},
	{
		info: {
			period: 'D5',
			start: { h: 18, m: 0 },
			end: { h: 19, m: 40 },
		},
		status: { type: 'before' },
	},
	{
		info: {
			period: 'D6',
			start: { h: 19, m: 50 },
			end: { h: 21, m: 30 },
		},
		status: { type: 'before' },
	},
]

const periods = periodsData.map(p => ({
	...p,
}))

export default periods
