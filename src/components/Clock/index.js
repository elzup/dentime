// @flow

import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import config from '../../config'

const Wrapper = styled.div`
	background: ${config.color.main};
	text-align: center;
`

const Frame = styled.h2`
	font-size: 2em;
	margin: 0;
`

const SubSecond = styled.span`
	font-size: 0.7em;
	color: gray;
`

type Props = {
	now: moment,
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
