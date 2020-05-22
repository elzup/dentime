import React from 'react'
import styled from 'styled-components'
import ProgressBar from '../ProgressBar'
import { Period, PeriodStatus, isPeriodNote } from '../../types'

const Wrapper = styled.div`
	margin-top: 10px;
	.row {
		display: flex;
		font-size: 1.5em;
		font-weight: 700;
		padding: 2.5px 0;
		margin-left: 16px;
		.label {
			width: 50px;
			margin-left: 5px;
			color: #a6ccff;
		}
	}
	&[data-study='true'] {
		.row {
			&::before {
				content: '★';
				margin-left: -16px;
				font-size: 16px;
				margin-top: 4px;
				color: orange;
			}
		}
	}
`
const TimeRange = styled.span`
	font-weight: bold;
	flex: auto;
`
const Remain = styled.div`
	font-size: 0.6em;
	align-self: flex-end;
	padding-left: 5px;
`
const Status = styled.div`
	font-size: 0.6em;
	align-self: flex-end;
`

const Break = styled.p``

const StRow = styled.div<{ color: string }>`
	margin-left: 5px;
	display: flex;
	> div {
		color: ${(p) => p.color};
	}
`

function getStatus(st: PeriodStatus) {
	if (st === null) {
		return null
	}
	const { color, label } = {
		before: { color: 'black', label: '' },
		progress: { color: '#ebe971', label: 'Now' },
		finish: { color: 'gray', label: 'Fin' },
	}[st.type]

	return (
		<StRow color={color}>
			<div>{label}</div>
		</StRow>
	)
}

function remainLabel(st: PeriodStatus) {
	if (st === null || st.type !== 'progress') {
		return null
	}
	return <span>({100 - st.progress}min)</span>
}

function TimeRow({ period }: { period: Period }) {
	if (isPeriodNote(period)) return <Break>{period.info.text}</Break>

	return (
		<Wrapper data-study={period.study}>
			<div className="row">
				<div className="label">{period.info.period.toLowerCase()}.</div>
				<TimeRange>
					{period.info.start} - {period.info.end}
				</TimeRange>
				<Remain>{remainLabel(period.status)}</Remain>
				<Status>{getStatus(period.status)}</Status>
			</div>
			<ProgressBar status={period.status} />
		</Wrapper>
	)
}

export default TimeRow
