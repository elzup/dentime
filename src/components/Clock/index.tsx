import React from 'react'
import styled from 'styled-components'
import config from '../../config'
import { pad, pad2 } from '../../utils/formats'
import { useTime } from '../../utils/hooks'

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
	const [hm, sec] = useTime()

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
