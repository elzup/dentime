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
	// TDOO: fill 0
	const startStr = `${info.start.h}:${info.start.m}`
	const endStr = `${info.end.h}:${info.end.m}`
	const status = null
	return {
		info,
		status,
		startStr,
		endStr,
	}
}

function updatePeriod(period: Period, now: moment): Period {
	return {
		...period,
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
		this.setState({ now: this.state.now.add({ s: 1 }) })
	}

	async initialize() {
		const infos = await loadData()
		const intervalId = setInterval(this.tick.bind, 1000)
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
