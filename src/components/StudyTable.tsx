import React, { useState } from 'react'
import styled from 'styled-components'
import config from '../config'
import { Book, isPeriodTerm, Period } from '../types'
import { getHost } from '../utils/browser'
import { bookId, decodeStudy, encodeStudy } from '../utils/formats'
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
	.booklist {
		> div {
			display: flex;
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
	const [newBookLabel, setNewBookLabel] = useState<string>('')

	return (
		<Style>
			<h3>Your Schedule</h3>
			<div className="booklist">
				{Object.entries(books).map(([id, b]) => (
					<div key={id} data-active={bookId(b) === bookId(book)}>
						<Link href={`/p/${b.pid}`}>
							{b.pid === b.label ? b.label : `${b.pid} - ${b.label}`}
						</Link>
						{bookId(b) === bookId(book) && (
							<>
								<input value={book.label} />
								<button>Delete</button>
							</>
						)}
					</div>
				))}
				<input
					value={newBookLabel}
					onChange={(e) => setNewBookLabel(e.target.value)}
				/>
				<button>Create</button>
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
