import React from 'react'
import styled from 'styled-components'
import { Study, Period, isPeriodTerm, Book } from '../types'
import config from '../config'
import { encodeStudy, decodeStudy } from '../utils/formats'
import { getHost } from '../utils/browser'
import { useBooksStorage } from './App/hooks'

type Props = {
	book: Book
	setBook: (book: Book) => void
	periods: Period[]
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const Style = styled.div`
	width: 100%;
	max-width: 600px;
	margin: 0 auto 32px;
	table {
		width: 100%;
	}
	th {
		width: calc(100% / 8);
		text-align: center;
	}
	th,
	td {
		padding: 8px;
		/* border: solid 1px #a6c0bf; */
		div {
			display: grid;
			justify-content: center;
			button {
				background: ${config.color.main};
				width: 2rem;
				height: 2rem;
				margin: 0 auto;
				text-align: center;
				background: ${config.color.main};
				color: white;
				border-radius: 8px;

				&[data-on='true'] {
				}
			}
		}
	}
`
const Link = styled.a`
	color: #a6ccff;
	margin-left: 1rem;
`

function StudyTable({ periods, book, setBook }: Props) {
	const periodIds = periods
		.filter(isPeriodTerm)
		.map((period) => period.info.period)
	const [books] = useBooksStorage()
	const times = decodeStudy(book.studyCode, periodIds)
	const shareLink = `${getHost()}?code=${
		book.studyCode
	}&name=${encodeURIComponent(book.label)}`

	return (
		<Style>
			<h3>Your Schedule</h3>
			<div>
				{Object.entries(books).map(([id, book]) => (
					<Link key={id} href={`/p/${book.pid}`}>
						{book.label}
					</Link>
				))}
			</div>
			<table>
				<thead>
					<tr>
						<th></th>
						{weekDays.map((wd, k) => (
							<th key={k}>{wd}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{periodIds.map((pid) => (
						<tr key={pid}>
							<th>{pid}</th>
							{weekDays.map((wd, k) => (
								<td key={k}>
									<div>
										<button
											data-on={times[k]?.[pid]}
											onClick={() => {
												const newStudy = { ...times }
												newStudy[k][pid] = !times[k]?.[pid]
												setBook({
													...book,
													studyCode: encodeStudy(newStudy, periodIds),
												})
											}}
										>
											{times[k]?.[pid] ? '★' : ''}
										</button>
									</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<div>
				ShareLink
				<p>{shareLink}</p>
			</div>
		</Style>
	)
}
export default StudyTable
