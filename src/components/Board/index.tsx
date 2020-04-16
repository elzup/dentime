import React from 'react'
import styled from 'styled-components'
import TimeRow from '../TimeRow'
import { Period } from '../../types'
import config from '../../config'

const Style = styled.div`
	padding: 10px;
	background: ${config.color.sub};

	display: flex;
	justify-content: center;
	> div {
		min-width: 300px;
		width: 100%;
		max-width: 600px;
		> p {
			font-weight: 800;
		}
	}
`

const Board = ({ periods }: { periods: Period[] }) => {
	return (
		<Style>
			<div>
				{periods.map((period, i) => (
					<TimeRow key={i} period={period} />
				))}
			</div>
		</Style>
	)
}

export default Board
