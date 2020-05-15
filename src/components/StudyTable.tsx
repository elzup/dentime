import React from 'react'
import styled from 'styled-components'
import { Study, Period, isPeriodTerm } from '../types'

type Props = {
	study: Study
	setStudy: (study: Study) => void
	periods: Period[]
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const Style = styled.div`
	width: 100%;
	max-width: 600px;
	margin: 0 auto 32px;
	table {
		width: 100%;
	}
	th {
		width: calc(100% / 8);
		text-align: center;
	}
	th,
	td {
		height: 2em;
		border: solid 1px #a6c0bf;
		button {
			width: 100%;
			height: 100%;
			text-align: center;
			&[data-on='true'] {
				background: white;
			}
		}
	}
`

function StudyTable({ periods, study, setStudy }: Props) {
	return (
		<Style>
			<h3>Your Schedule</h3>
			<table>
				<thead>
					<tr>
						<th></th>
						{weekDays.map((wd, k) => (
							<th key={k}>{wd}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{periods
						.filter(isPeriodTerm)
						.map((period) => period.info.period)
						.map((pid) => (
							<tr key={pid}>
								<th>{pid}</th>
								{weekDays.map((wd, k) => (
									<td key={k}>
										<button
											data-on={study[k]?.[pid]}
											onClick={() => {
												setStudy({
													...study,
													[k]: {
														...study[k],
														[pid]: !study[k]?.[pid],
													},
												})
											}}
										>
											{study[k]?.[pid] ? '★' : ''}
										</button>
									</td>
								))}
							</tr>
						))}
				</tbody>
			</table>
		</Style>
	)
}
export default StudyTable
