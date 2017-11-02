// @flow

import React from 'react'

const Board = () => {
	const basicList = _.map(timeData, (e, k) => (
		<div className="time-row">
			<div>{k}限</div>
			<div>
				{e.start} - {e.end}
			</div>
			<div className="from-now">{this.renderStatus(e)}</div>
		</div>
	))

	return (
		<div className="basic-list">
			<p>開館 07:30</p>
			{basicList}
			<p>閉館 22:30</p>
		</div>
	)
}
