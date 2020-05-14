import React from 'react'
// import '../src/config/initialize'
import TimeRow from '../src/components/TimeRow'
import {
	Period,
	PeriodStatusBefore,
	PeriodStatusFinish,
	PeriodStatusProgress,
} from '../src/types'

export default { title: 'TimeRow' }

const pb: Period = {
	info: {
		start: '10:40',
		end: '12:10',
		period: '2',
	},
	study: false,
	status: null,
}

const statusBefore: PeriodStatusBefore = {
	type: 'before',
}

const statusProgress1: PeriodStatusProgress = {
	type: 'progress',
	progress: 0,
	rate: 0.0 / 100,
}

const statusProgress2: PeriodStatusProgress = {
	type: 'progress',
	progress: 40,
	rate: 40.0 / 100,
}

const statusProgress3: PeriodStatusProgress = {
	type: 'progress',
	progress: 85,
	rate: 85.0 / 100,
}

const statusFinish: PeriodStatusFinish = {
	type: 'finish',
}

export const Progress = () => (
	<div>
		<TimeRow period={{ ...pb, status: statusBefore }} />
		<TimeRow period={{ ...pb, status: statusProgress1, study: true }} />
		<TimeRow period={{ ...pb, status: statusProgress2, study: true }} />
		<TimeRow period={{ ...pb, status: statusProgress3 }} />
		<TimeRow period={{ ...pb, status: statusFinish }} />
	</div>
)
