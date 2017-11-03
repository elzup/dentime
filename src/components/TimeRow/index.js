// @flow

import React from 'react'
import type {
	Period,
	PeriodStatus,
	PeriodStatusBefore,
	PeriodStatusFinish,
	PeriodStatusProgress,
} from '../../types'

import styled from 'styled-components'

const Row = styled.div`
	display: flex;
	text-align: center;
	font-size: 1.5em;
	justify-content: center;
	padding: 2.5px 0;
`

const StRow = styled.div`
	display: flex;
`

const StatusLabel = styled.div`
	width: 100px;
	width: 3em;
	color: ${p => p.color};
	text-align: left;
`

const Opt = styled.span`
	font-size: 0.5em;
	width: 4em;
`

const TimeStatusBefore = ({ st }: { st: PeriodStatusBefore }) => (
	<StRow>
		<StatusLabel />
		<Opt>{st.fromNowStr}</Opt>
	</StRow>
)
const TimeStatusProgress = ({ st }: { st: PeriodStatusProgress }) => (
	<StRow>
		<StatusLabel color={'red'}>Now</StatusLabel>
		<Opt />
	</StRow>
)
const TimeStatusFinish = ({ st }: { st: PeriodStatusFinish }) => (
	<StRow>
		<StatusLabel color={'gray'}>Fin</StatusLabel>
		<Opt />
	</StRow>
)

function getStatus(st: PeriodStatus) {
	if (st === null) {
		return null
	}
	switch (st.type) {
		case 'before':
			return <TimeStatusBefore st={st} />
		case 'progress':
			return <TimeStatusProgress st={st} />
		case 'finish':
			return <TimeStatusFinish st={st} />
		default:
			return null
	}
}

const TimeRow = ({ period }: { period: Period }) => (
	<Row>
		<div>{period.info.period}限</div>
		<div>
			{period.start.format('HH:mm')} - {period.end.format('HH:mm')}
		</div>
		<div>{getStatus(period.status)}</div>
	</Row>
)
export default TimeRow
