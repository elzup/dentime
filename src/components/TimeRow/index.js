// @flow

import React from 'react'

const TimeRow = () => (
	<div className="time-row">
		<div>{k}限</div>
		<div>
			{e.start} - {e.end}
		</div>
		<div className="from-now">{this.renderStatus(e)}</div>
	</div>
)
