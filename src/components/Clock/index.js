// @flow

import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

const Wrapper = styled.div``
const SubSecond = styled.span``

type Props = {
	now: moment,
}

const Clock = ({ now }: Props) => (
	<Wrapper>
		{now.format('HH:mm')}
		<SubSecond>{now.format('.ss')}</SubSecond>
	</Wrapper>
)
export default Clock
