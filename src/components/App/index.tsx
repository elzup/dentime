import { useEffect } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../../config/initialize'
import { disableTouch } from '../../utils/browser'
import Board from '../Board'
import Footer from '../Footer'
import Header from '../Header'
import { usePeriods, useStudy } from './hooks'

const MainWrap = styled.div``

type Props = { id: string }
function App({ id }: Props) {
	const [study, setStudy] = useStudy()
	const periods = usePeriods(id, study)

	useEffect(disableTouch, [])

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
