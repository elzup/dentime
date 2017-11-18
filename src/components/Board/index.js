// @flow

import React from 'react'
import TimeRow from '../TimeRow'
import type { Period } from '../../types'

import styled from 'styled-components'

const Wrapper = styled.div`
	padding: 10px;
`
const BreakLine = styled.hr`
	height: 6px;
	border: #004;
	color: #004;
`

const Board = ({ periods }: { periods: Period[] }) => {
	return (
		<Wrapper>
			<p>開館 07:30</p>
			{periods.map(period => (
				<div>
					<TimeRow key={period.info.period} period={period} />
					{[2, 5].includes(period.info.period) && <BreakLine />}
				</div>
			))}
			<p>閉館 22:30</p>
		</Wrapper>
	)
}

export default Board
