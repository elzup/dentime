import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import config from '../../config'
import { GlobalStyle } from '../../config/initialize'
import { useMigration } from '../../hooks/useMigration'
import { Book, isPeriodTerm, Profile, isNonNll } from '../../types'
import { disableTouch } from '../../utils/browser'
import { decodeStudy } from '../../utils/formats'
import Board from '../Board'
import Footer from '../Footer'
import Header from '../Header'
import StudyTable from '../StudyTable'
import { useBook, usePeriods, useStudy, useProfile } from './hooks'

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

function useStudyPeriods(profile: Profile, book: Book) {
	const periodIds = profile.times.map((v) => v.period).filter(isNonNll)
	const study = decodeStudy(book.studyCode, periodIds)
	const periods = usePeriods(profile, study)
	return { periodIds, study, periods }
}

type Props = { id: string; bookId?: string }
function App({ id, bookId }: Props) {
	const profile = useProfile(id)
	if (!profile) return <p>loading profile</p>
	return <AppGuard id={id} profile={profile} bookId={bookId} />
}
function AppGuard({ profile, id, bookId }: Props & { profile: Profile }) {
	useMigration()
	const [book, setBook] = useBook(id, bookId)
	const { periods } = useStudyPeriods(profile, book)
	console.log({ book, bookId, id })

	useEffect(disableTouch, [])

	return (
		<MainWrap>
			<GlobalStyle />
			<div className="head">
				<Header name={profile.name} />
			</div>
			<div className="main">
				<Board periods={periods} />
				<StudyTable periods={periods} book={book} setBook={setBook} />
			</div>
			<div className="foot">
				<Footer />
			</div>
		</MainWrap>
	)
}

export default App
