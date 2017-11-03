// @flow
import React from 'react'

import styled from 'styled-components'
import type { PeriodStatus } from '../../types'

const Wrapper = styled.div`
	width: 100%;
	height: 5px;
	background: #ccc;
	border-radius: 5px;
`

const Bar = styled.div`
	width: ${p => p.rate * 100}%;
	height: 100%;
	background: green;
	border-radius: 5px;
`

type Props = {
	status: PeriodStatus,
}

const ProgressBar = ({ status }: Props) => {
	if (status === null) {
		return <Wrapper />
	}
	switch (status.type) {
		case 'before':
			return (
				<Wrapper>
					<Bar rate={0} />
				</Wrapper>
			)
		case 'progress':
			return (
				<Wrapper>
					<Bar rate={status.rate} />
				</Wrapper>
			)
		case 'finish':
			return (
				<Wrapper>
					<Bar rate={1} />
				</Wrapper>
			)
		default:
			return null
	}
}

export default ProgressBar
