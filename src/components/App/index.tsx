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
import { usePeriods, useStudy, useBooksStorage } from './hooks'
import { useRouter } from 'next/router'
import { useMigration } from '../../hooks/useMigration'

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

type RegisterBook = { studyCode: string; name: string }
function useStudyPeriods(id: string, book?: RegisterBook) {
	const [study, setStudy, favoriteIds] = useStudy(id)
	const router = useRouter()
	const [periods, name] = usePeriods(id, study)
	const [books, setBooks] = useBooksStorage()

	useEffect(() => {
		console.log({ book })
		if (!book) return

		const periodIds = periods.filter(isPeriodTerm).map((v) => v.info.period)
		const study = decodeStudy(book.studyCode, periodIds)

		setStudy(study)
		console.log({ ...book, pid: id })

		setBooks((a) => ({ ...a, [`${id}_${book.name}`]: { ...book, pid: id } }))

		setTimeout(() => {
			router.push(`/p/${id}`)
		}, 500)
	}, [book, setStudy, study, periods, router, id, setBooks])

	return [study, favoriteIds, periods, name, setStudy] as const
}

type Props = { id: string; register?: RegisterBook }
function App({ id, register }: Props) {
	useMigration()
	const [study, favoriteIds, periods, name, setStudy] = useStudyPeriods(
		id,
		register,
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
