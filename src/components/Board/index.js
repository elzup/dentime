// @flow

import React from 'react'
import TimeRow from '../TimeRow'
import type { Period } from '../../types'

const Board = ({ periods }: { periods: Period[] }) => {
	return (
		<div className="basic-list">
			<p>開館 07:30</p>
			{periods.map(period => <TimeRow period={period} />)}
			<p>閉館 22:30</p>
		</div>
	)
}

export default Board
