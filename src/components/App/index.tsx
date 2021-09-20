import React, { useEffect } from 'react'
import styled from 'styled-components'
import config from '../../config'
import { GlobalStyle } from '../../config/initialize'
import { isPeriodTerm } from '../../types'
import { disableTouch } from '../../utils/browser'
import { decodeStudy } from '../../utils/formats'
import Board from '../Board'
import Footer from '../Footer'
import Header from '../Header'
import StudyTable from '../StudyTable'
import { usePeriods, useStudy } from './hooks'
import { useRouter } from 'next/router'

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
	const router = useRouter()
	const [periods, name] = usePeriods(id, study)

	useEffect(() => {
		if (!studyCode) return

		const periodIds = periods.filter(isPeriodTerm).map((v) => v.info.period)
		const study = decodeStudy(studyCode, periodIds)
		setStudy(study)
		setTimeout(() => {
			router.push(`/p/${id}`)
		}, 500)
	}, [studyCode, setStudy, study, periods, router, id])

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
