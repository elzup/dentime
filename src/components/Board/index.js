// @flow

import React from 'react'

const Board = () => {
	const basicList = _.map(timeData, (e, k) => (
	))

	return (
		<div className="basic-list">
			<p>開館 07:30</p>
			{basicList}
			<p>閉館 22:30</p>
		</div>
	)
}
