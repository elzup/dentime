// @flow

import React from 'react'
import moment from 'moment'
import { Header } from '../Header'
import { Clock } from '../Board'
import { Board } from '../Board'
import { loadData } from '../../api'
import type { Period } from '../../types'

type Props = {}

type State = {
	now: moment,
	intervalId: number,
	periods: Period[],
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
		const data = await loadData()
		const intervalId = setInterval(this.tick.bind, 1000)
		this.setState({ intervalId })
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
				<Clock />
				<Board periods={state.periods} />
			</div>
		)
	}
}

export default App
