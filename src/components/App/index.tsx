import React, { useEffect } from 'react'

import styled from 'styled-components'
import { GlobalStyle } from '../../config/initialize'
import { disableTouch } from '../../utils/browser'
import Board from '../Board'
import Footer from '../Footer'
import Header from '../Header'
import config from '../../config'
import StudyTable from '../StudyTable'
import { decodeStudy } from '../../utils/formats'
import { isPeriodTerm } from '../../types'
import { usePeriods, useStudy } from './hooks'

const MainWrap = styled.div`
	display: grid;
	grid-template-rows: auto 1fr auto;
	height: 100vh;
	.foot {
	}
	.main {
		background: ${config.color.sub};
		overflow: scroll;
	}
`

function useStudyPeriods(id: string, studyCode?: string) {
	const [study, setStudy, favoriteIds] = useStudy(id)

	const [periods, name] = usePeriods(id, study)

	useEffect(() => {
		if (!studyCode) return
		const periodIds = periods.filter(isPeriodTerm).map((v) => v.info.period)
		const study = decodeStudy(studyCode, periodIds)

		setStudy(study)
	}, [studyCode, JSON.stringify(study), periods])

	return [study, favoriteIds, periods, name, setStudy] as const
}

type Props = { id: string; studyCode?: string }
function App({ id, studyCode }: Props) {
	const [study, favoriteIds, periods, name, setStudy] = useStudyPeriods(
		id,
		studyCode,
	)

	useEffect(disableTouch, [])

	return (
		<MainWrap>
			<GlobalStyle />
			<div className="head">
				<Header name={name} />
			</div>
			<div className="main">
				<Board periods={periods} />
				<StudyTable
					periods={periods}
					study={study}
					setStudy={setStudy}
					favoriteIds={favoriteIds}
				/>
			</div>
			<div className="foot">
				<Footer />
			</div>
		</MainWrap>
	)
}

export default App
