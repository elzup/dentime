// @flow

import React from 'react'
import TimeRow from '../TimeRow'
import type { Period } from '../../types'
import config from '../../config'

import styled from 'styled-components'

const Wrapper = styled.div`
	padding: 10px;
	background: ${config.color.sub};
`
const Board = ({ periods }: { periods: Period[] }) => {
	return (
		<Wrapper>
			<p>開館 07:30</p>
			{periods.map(period => (
				<div>
					<TimeRow
						nextBreak={[2, 5].includes(period.info.period)}
						key={period.info.period}
						period={period}
					/>
				</div>
			))}
			<p>閉館 22:30</p>
		</Wrapper>
	)
}

export default Board
