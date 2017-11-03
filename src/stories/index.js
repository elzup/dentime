// @flow
import React from 'react'
import moment from 'moment'

import '../initialize'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import type {
	Period,
	PeriodStatusBefore,
	PeriodStatusProgress,
	PeriodStatusFinish,
} from '../types'

import Header from '../components/Header'
import Clock from '../components/Clock'
import TimeRow from '../components/TimeRow'

storiesOf('Header', module).add('normal', () => <Header />)

storiesOf('Clock', module)
	.add('00:00', () => <Clock now={moment({ h: 0, m: 0 })} />)
	.add('12:59', () => <Clock now={moment({ h: 12, m: 59 })} />)
	.add('09:09', () => <Clock now={moment({ h: 9, m: 9 })} />)
const pb: Period = {
	start: moment({ h: 10, m: 40 }),
	end: moment({ h: 12, m: 10 }),
	info: {
		start: { h: 10, m: 40 },
		end: { h: 12, m: 10 },
		period: 2,
	},
	status: null,
}

const statusBefore: PeriodStatusBefore = {
	type: 'before',
	fromNowStr: '2時間前',
}

const statusProgress: PeriodStatusProgress = {
	type: 'progress',
	progress: 40,
	rate: 40 / 90,
}

const statusFinish: PeriodStatusFinish = {
	type: 'finish',
}

storiesOf('TimeRow', module)
	.add('Before', () => (
		<TimeRow period={Object.assign(pb, { status: statusBefore })} />
	))
	.add('Progress', () => (
		<TimeRow period={Object.assign(pb, { status: statusProgress })} />
	))
	.add('Finish', () => (
		<TimeRow period={Object.assign(pb, { status: statusFinish })} />
	))
