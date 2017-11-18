// @flow

import React from 'react'
import ProgressBar from '../ProgressBar'
import type { Period, PeriodStatus } from '../../types'

import styled from 'styled-components'

const Wrapper = styled.div`
	border-bottom: ${p => (p.nextBreak ? '#25252e solid' : 'none')};
	padding-bottom: ${p => (p.nextBreak ? '20px' : '0px')};
	margin-bottom: ${p => (p.nextBreak ? '20px' : '0px')};
`

const Row = styled.div`
	display: flex;
	font-size: 1.5em;
	justify-content: left;
	padding: 2.5px 0;
`

const RowBetween = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 2.5px 0;
`

const StRow = styled.div`
	margin-left: 5px;
	display: flex;
`

const PeriodLabel = styled.div`
	width: 2em;
	margin-left: 5px;
`

const StatusLabel = styled.div`
	width: 100px;
	width: 3em;
	color: ${p => p.color};
	text-align: left;
`

function getStatus(st: PeriodStatus) {
	if (st === null) {
		return null
	}
	const { color, label } = {
		before: { color: 'black', label: '' },
		progress: { color: 'red', label: 'Now' },
		finish: { color: 'gray', label: 'Fin' },
	}[st.type]
	return (
		<StRow>
			<StatusLabel color={color}>{label}</StatusLabel>
		</StRow>
	)
}

function remainLabel(st: PeriodStatus) {
	if (st === null || st.type !== 'progress') {
		return null
	}
	return <span>{90 - st.progress}min</span>
}

const TimeRow = ({
	period,
	nextBreak,
}: {
	period: Period,
	nextBreak: boolean,
}) => (
	<Wrapper nextBreak={nextBreak}>
		<Row>
			<PeriodLabel>{period.info.period}限</PeriodLabel>
			<div>
				{period.start.format('HH:mm')} - {period.end.format('HH:mm')}
			</div>
			<div>{getStatus(period.status)}</div>
		</Row>
		<ProgressBar status={period.status} />
		<RowBetween>
			<div />
			<div>{remainLabel(period.status)}</div>
		</RowBetween>
	</Wrapper>
)
export default TimeRow
