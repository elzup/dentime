// @flow

import React from 'react'
import moment from 'moment'
import Header from '../Header'
import Clock from '../Clock'
import Board from '../Board'

import { loadData } from '../../api'
import type { Period, PeriodInfo } from '../../types'

type Props = {}

type State = {
	now: moment,
	intervalId: number,
	periods: Period[],
}

function initialPeriod(info: PeriodInfo): Period {
	const start = moment({ h: info.start.h, m: info.start.m })
	const end = moment({ h: info.end.h, m: info.end.m })
	const status = null
	return {
		info,
		status,
		start,
		end,
	}
}

function updatePeriod(period: Period, now: moment): Period {
	const status = {}
	return {
		...period,
		status,
	}
}

class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			now: moment(),
			intervalId: 0,
			periods: [],
		}
	}

	tick() {
		const now = this.state.now.add({ s: 1 })
		const periods = this.state.periods.map(period => updatePeriod(period, now))
		this.setState({ now })
	}

	async initialize() {
		const infos = await loadData()
		const intervalId = setInterval(this.tick.bind(this), 1000)
		const periods = infos.map(initialPeriod)
		// TDOO: Correct initialize
		this.setState({ intervalId, periods })
	}

	componentDidMount() {
		this.initialize()
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId)
	}

	render() {
		const { state } = this
		return (
			<div>
				<Header />
				<Clock now={state.now} />
				<Board periods={state.periods} />
			</div>
		)
	}
}

export default App
