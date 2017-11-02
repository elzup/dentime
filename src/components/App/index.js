// @flow

import React from 'react'
import moment from 'moment'
import _ from 'lodash'
import { loadData } from '../../api'

type Props = {}

type State = {
	now: any,
	intervalId: number,
}

class App extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			now: moment(),
			intervalId: 0,
		}
	}

	tick() {
		this.setState({ now: this.state.now.add({ s: 1 }) })
	}

	componentDidMount() {
		this.initialize()
	}

	async initialize() {
		const data = await loadData()
		const intervalId = setInterval(this.tick.bind, 1000)
		this.setState({ intervalId })
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId)
	}

	renderStatus(term) {
		const { now } = this.state
		const start = moment(term.start, 'HH:mm')
		const end = moment(term.end, 'HH:mm')
		if (now < start) {
			return <span style={{ color: 'black' }}>({start.fromNow()})</span>
		}
		if (start <= now && now < end) {
			return <span style={{ color: 'red' }}>ON AIR</span>
		}
		return <span style={{ color: 'gray' }}>FINISH</span>
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h1>Dendai Time's Gate</h1>
					<h2>時間を統べる</h2>
				</div>
				<h2 className="head-time">
					{this.state.now.format('HH:mm')}
					<span className="sub-second">{this.state.now.format('.ss')}</span>
				</h2>
			</div>
		)
	}
}

export default App
