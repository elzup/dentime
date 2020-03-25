import React from 'react'
import { Moment } from 'moment'
import styled from 'styled-components'
import config from '../../config'
import { useTimeHm } from '../../utils/hooks'
import { pad, pad2 } from '../../utils/formats'

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

const Clock = () => {
	const [hm, sec] = useTimeHm()

	return (
		<Wrapper>
			<Frame>
				{pad(hm)}
				<SubSecond>.{pad2(sec)}</SubSecond>
			</Frame>
		</Wrapper>
	)
}

export default Clock
