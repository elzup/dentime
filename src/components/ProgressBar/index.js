// @flow
import React from 'react'

import styled from 'styled-components'

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
	rate: number,
}

const ProgressBar = ({ rate }: Props) => (
	<Wrapper>
		<Bar rate={rate} />
	</Wrapper>
)

export default ProgressBar
