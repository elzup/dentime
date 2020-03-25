import React from 'react'
import { Moment } from 'moment'
import styled from 'styled-components'
import config from '../../config'

const Wrapper = styled.div`
	background: ${config.color.main};
	text-align: center;
`

const Frame = styled.h2`
	font-size: 2em;
	font-weight: 400;
	margin: 0;
`

const SubSecond = styled.span`
	font-size: 0.7em;
	font-weight: 700;
	color: gray;
`

type Props = {
	now: Moment
}

const Clock = ({ now }: Props) => (
	<Wrapper>
		<Frame>
			{now.format('HH:mm')}
			<SubSecond>{now.format('.ss')}</SubSecond>
		</Frame>
	</Wrapper>
)

export default Clock
