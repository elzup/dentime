
import _ from 'lodash'
import moment, { Moment } from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import fetch from 'unfetch'
import { useSeconds } from 'use-seconds'
import { GlobalStyle } from '../../config/initialize'
import type { Period, PeriodInfo, PeriodStatus, TimeResponse } from '../../types'
import Board from '../Board'
import Footer from '../Footer'
import Header from '../Header'


async function fetcher <JSON = unknown>(url: string): Promise<JSON> {
	const r = await fetch(url)

	return r.json()
}

type Props = {}

const MainWrap = styled.div``

function initialPeriod(info: PeriodInfo): Period {
	const start = moment({ h: info.start.h, m: info.start.m })
	const end = moment({ h: info.end.h, m: info.end.m })
	// TODO: correct
	const status = null

	return {
		info,
		status,
		start,
		end,
	}
}

function diffStatus(period: Period, now: Moment): PeriodStatus {
	if (now.isBefore(period.start)) {
		return {
			type: 'before',
			fromNowStr: period.start.from(now),
		}
	} else if (now.isBefore(period.end)) {
		const progress = now.diff(period.start, 'minutes')

		return {
			type: 'progress',
			progress,
			rate: progress / 100,
		}
	} else {
		return {
			type: 'finish',
		}
	}
}

function updatePeriod(period: Period, now: Moment): Period {
	const status = diffStatus(period, now)

	return Object.assign(period, { status })
}

function App (props: Props) {
	const [now] = useSeconds()
	const { data } = useSWR<TimeResponse>('/time.json', fetcher)
	const [periods, setPeriods] = useState<Period[]>([])

	console.log({periods});
	
	useEffect(() => {

		window.addEventListener(
			'touchmove',
			event => {
				event.preventDefault()
			},
			true,
		)

	}, [])
	useEffect(() => {
		if (!data) return
	
		const periods = _.map({ ...data.base.periods, ...data.d.periods })
			.map(initialPeriod)
			.map(period => updatePeriod(period, moment(now)))

			setPeriods(periods)
	}, [now, data])

		return (
			<MainWrap>
				<GlobalStyle />
				<Header />
				<Board periods={periods} />
				<Footer now={moment(now)} />
			</MainWrap>
		)
}

export default App
