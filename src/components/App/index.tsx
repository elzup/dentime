
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import fetch from 'unfetch'
import { useSeconds } from 'use-seconds'
import { GlobalStyle } from '../../config/initialize'
import type { Period, PeriodInfo, PeriodStatus, TimeResponse, Time, PeriodStatusType } from '../../types'
import Board from '../Board'
import Footer from '../Footer'
import Header from '../Header'
import { disableTouch } from '../../utils/browser'


async function fetcher <JSON = unknown>(url: string): Promise<JSON> {
	const r = await fetch(url)

	return r.json()
}

type Props = {}

const MainWrap = styled.div``

function initialPeriod(info: PeriodInfo): Period {
	const status = null

	return {
		info,
		status,
	}
}

const compare = (bt: number, et: number, nt: number): PeriodStatusType => {

	if (nt < bt) return 'before'
	if (nt < et) return 'progress'
	return 'finish'
}

function diffStatus(period: Period, now: Time): PeriodStatus {
	const bt = period.info.start.h * 60 + period.info.start.m
	const et = period.info.end.h * 60 + period.info.end.m
	const nt = now.h * 60 + now.m
	const statusType = compare(bt, et, nt)

	switch(statusType) {
		case 'before':
			return {
			type: 'before',
			}
		case 'progress':
			const progress = nt - bt

		return {
			type: 'progress',
			progress,
			rate: progress / (et - bt),
		}

	default:
		return { type: 'finish', }
	}
}

const updatePeriod = (period: Period, now: Time): Period => 
	({ ...period, status: diffStatus(period, now) })

function App (props: Props) {
	const [now] = useSeconds()
	const { data } = useSWR<TimeResponse>('/time.json', fetcher)
	const [periods, setPeriods] = useState<Period[]>([])

	console.log({periods});
	
	useEffect(() => disableTouch(), [])
	useEffect(() => {
		if (!data) return
	
		const periods = _.map({ ...data.base.periods, ...data.d.periods })
			.map(initialPeriod)
			.map(period => updatePeriod(period, now))

			setPeriods(periods)
	}, [now, data])

		return (
			<MainWrap>
				<GlobalStyle />
				<Header />
				<Board periods={periods} />
				<Footer now={now} />
			</MainWrap>
		)
}

export default App
