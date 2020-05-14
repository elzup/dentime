import React from 'react'
import styled from 'styled-components'
import config from '../../config'

const { color } = config

const Wrapper = styled.div`
	background: ${color.main};
	color: white;
	text-align: center;
	padding: 10px;
`
const Title = styled.h2`
	margin: 0;
	padding: 0;
	font-size: 20px;
`

type Props = {
	name: string
}
const Header = ({ name }: Props) => (
	<Wrapper>
		<Title>{name} Time</Title>
	</Wrapper>
)

export default Header
