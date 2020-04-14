import { Period } from '../../../types'

const periodsData: Period[] = [
	{
		info: { period: null, text: ' 8:00' },
		status: null,
	},
	{
		info: { period: '1', start: ' 9:20', end: '11:00' },
		status: { type: 'finish' },
	},
	{
		info: { period: '2', start: '11:10', end: '12:50' },
		status: { type: 'finish' },
	},
	{
		info: { period: '3', start: '13:40', end: '15:20' },
		status: { type: 'progress', progress: 75, rate: 0.75 },
	},
	{
		info: { period: '4', start: '15:30', end: '17:10' },
		status: { type: 'before' },
	},
	{
		info: { period: '5', start: '17:20', end: '19:00' },
		status: { type: 'before' },
	},
	{
		info: { period: 'D5', start: '18:00', end: '19:40' },
		status: { type: 'before' },
	},
	{
		info: { period: 'D6', start: '19:50', end: '21:30' },
		status: { type: 'before' },
	},
	{
		info: { period: null, text: '閉館 22:30' },
		status: null,
	},
]

const periods = periodsData.map((p) => ({
	...p,
}))

export default periods
