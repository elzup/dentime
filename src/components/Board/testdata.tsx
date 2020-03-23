import moment from 'moment'

const periodsData = [
	{
		info: {
			period: '1',
			start: { h: 9, m: 20 },
			end: { h: 11, m: 0 },
		},
		status: { type: 'finish' },
		start: '2018-04-17T00:20:00.000Z',
		end: '2018-04-17T02:00:00.000Z',
	},
	{
		info: {
			period: '2',
			start: { h: 11, m: 10 },
			end: { h: 12, m: 50 },
		},
		status: { type: 'finish' },
		start: '2018-04-17T02:10:00.000Z',
		end: '2018-04-17T03:50:00.000Z',
	},
	{
		info: {
			period: '3',
			start: { h: 13, m: 40 },
			end: { h: 15, m: 20 },
		},
		status: { type: 'progress', progress: 75, rate: 0.75 },
		start: '2018-04-17T04:40:00.000Z',
		end: '2018-04-17T06:20:00.000Z',
	},
	{
		info: {
			period: '4',
			start: { h: 15, m: 30 },
			end: { h: 17, m: 10 },
		},
		status: { type: 'before', fromNowStr: '35分後' },
		start: '2018-04-17T06:30:00.000Z',
		end: '2018-04-17T08:10:00.000Z',
	},
	{
		info: {
			period: '5',
			start: { h: 17, m: 20 },
			end: { h: 19, m: 0 },
		},
		status: { type: 'before', fromNowStr: '2時間後' },
		start: '2018-04-17T08:20:00.000Z',
		end: '2018-04-17T10:00:00.000Z',
	},
	{
		info: {
			period: 'D5',
			start: { h: 18, m: 0 },
			end: { h: 19, m: 40 },
		},
		status: { type: 'before', fromNowStr: '3時間後' },
		start: '2018-04-17T09:00:00.000Z',
		end: '2018-04-17T10:40:00.000Z',
	},
	{
		info: {
			period: 'D6',
			start: { h: 19, m: 50 },
			end: { h: 21, m: 30 },
		},
		status: { type: 'before', fromNowStr: '5時間後' },
		start: '2018-04-17T10:50:00.000Z',
		end: '2018-04-17T12:30:00.000Z',
	},
]

const periods = periodsData.map(p => ({
	...p,
	start: moment(p.start),
	end: moment(p.end),
}))

export default periods
