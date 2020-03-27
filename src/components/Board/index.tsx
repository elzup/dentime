import React from 'react'
import styled from 'styled-components'
import TimeRow from '../TimeRow'
import { Period } from '../../types'
import config from '../../config'

const Wrapper = styled.div`
	padding: 10px;
	background: ${config.color.sub};

	display: flex;
	justify-content: center;
`
const BoardFrame = styled.div`
	min-width: 300px;
	width: 100%;
	max-width: 600px;
	> p {
		font-weight: 800;
	}
`

const Board = ({ periods }: { periods: Period[] }) => {
	return (
		<Wrapper>
			<BoardFrame>
				<p>開館 08:00</p>
				{periods.map(period => (
					<TimeRow
						nextBreak={['2', '5'].includes(period.info.period)}
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
