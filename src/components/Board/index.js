// @flow

import React from 'react'
import TimeRow from '../TimeRow'
import type { Period } from '../../types'

import styled from 'styled-components'

const Wrapper = styled.div`
	text-align: center;
	padding: 10px;
`

const Board = ({ periods }: { periods: Period[] }) => {
	return (
		<Wrapper>
			<p>開館 07:30</p>
			{periods.map(period => (
				<TimeRow key={period.info.period} period={period} />
			))}
			<p>閉館 22:30</p>
		</Wrapper>
	)
}

export default Board
