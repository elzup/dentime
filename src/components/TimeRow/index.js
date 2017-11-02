// @flow

import React from 'react'
import type { Period } from '../../types'

const TimeRow = ({ period }: { period: Period }) => (
	<div className="time-row">
		<div>{period.info.period}限</div>
		<div>
			{period.start.format('HH:mm')} - {period.end.format('HH:mm')}
		</div>
	</div>
)
export default TimeRow
