import React, { useEffect } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../../config/initialize'
import { disableTouch } from '../../utils/browser'
import Board from '../Board'
import Footer from '../Footer'
import Header from '../Header'
import { usePeriods } from './hooks'

type Props = {}

const MainWrap = styled.div``

function App() {
	const [periods] = usePeriods()

	useEffect(() => disableTouch(), [])

	return (
		<MainWrap>
			<GlobalStyle />
			<Header />
			<Board periods={periods} />
			<Footer />
		</MainWrap>
	)
}

export default App
