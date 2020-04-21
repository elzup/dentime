/* eslint-disable import/no-extraneous-dependencies */

import '../config/initialize'
import { storiesOf } from '@storybook/react'

import {
	Period,
	PeriodStatusBefore,
	PeriodStatusProgress,
	PeriodStatusFinish,
} from '../types'

import Header from '../components/Header'
import Clock from '../components/Clock'
import TimeRow from '../components/TimeRow'

storiesOf('Header', module).add('normal', () => <Header />)

storiesOf('Clock', module).add('00:00', () => <Clock />)
const pb: Period = {
	info: {
		start: '10:40',
		end: '12:10',
		period: '2',
	},
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

storiesOf('TimeRow', module).add('Progress', () => (
	<div>
		<TimeRow period={{ ...pb, status: statusBefore }} nextBreak={false} />
		<TimeRow period={{ ...pb, status: statusProgress1 }} nextBreak={false} />
		<TimeRow period={{ ...pb, status: statusProgress2 }} nextBreak={false} />
		<TimeRow period={{ ...pb, status: statusProgress3 }} nextBreak={false} />
		<TimeRow period={{ ...pb, status: statusFinish }} nextBreak={false} />
	</div>
))
