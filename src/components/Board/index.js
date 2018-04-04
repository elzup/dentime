// @flow

import React from 'react'
import TimeRow from '../TimeRow'
import type { Period } from '../../types'
import config from '../../config'

import styled from 'styled-components'

const Wrapper = styled.div`
	padding: 10px;
	background: ${config.color.sub};

	display: flex;
	justify-content: center;
`
const BoardFrame = styled.div`
	width: 90%;
	max-width: 600px;
`

const Board = ({ periods }: { periods: Period[] }) => {
	return (
		<Wrapper>
			<BoardFrame>
				<p>開館 08:00</p>
				{periods.map(period => (
					<TimeRow
						nextBreak={[2].includes(period.info.period)}
						key={period.info.period}
						period={period}
					/>
				))}
				<p>閉館 22:30</p>
			</BoardFrame>
		</Wrapper>
	)
}

export default Board
