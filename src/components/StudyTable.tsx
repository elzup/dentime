import React, { useState } from 'react'
import styled from 'styled-components'
import config from '../config'
import { Book, isPeriodTerm, Period } from '../types'
import { getHost } from '../utils/browser'
import { bookId, decodeStudy, encodeStudy } from '../utils/formats'
import { useBooksStorage } from './App/hooks'
import { useRouter } from 'next/router'
import { encode } from 'querystring'

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
			gap: 4px;
			margin: 4px;
			[type='radio'] {
				margin: 4px;
			}
		}
	}
`
const Link = styled.a`
	color: #a6ccff;
`
const makeLink = (book: Book) =>
	`${getHost()}?code=${book.studyCode}&name=${encodeURIComponent(book.label)}`

function StudyTable({ periods, book, setBook }: Props) {
	const periodIds = periods
		.filter(isPeriodTerm)
		.map((period) => period.info.period)
	const [books, setBooks] = useBooksStorage()
	const deleteBook = (bookId: string) => {
		setBooks((books) => {
			const newBooks = { ...books }
			delete newBooks[bookId]
			return newBooks
		})
	}

	const times = decodeStudy(book.studyCode, periodIds)
	const shareLink = makeLink(book)
	const router = useRouter()

	return (
		<Style>
			<h3>Your Schedule</h3>
			<div className="booklist">
				{Object.entries(books)
					.map(([id, b]) => [id, b, bookId(b) === bookId(book)] as const)
					.map(([id, b, active]) => (
						<div key={id} data-active={active}>
							<input
								type="radio"
								defaultChecked={active}
								contentEditable={false}
							/>
							<Link href={`/p/${b.pid}/${encodeURIComponent(b.label)}`}>
								{b.pid === b.label ? b.label : `${b.pid} - ${b.label}`}
							</Link>
							{active && (
								<>
									<button
										onClick={() => {
											if (!confirm('Are you sure?')) return
											deleteBook(bookId(b))
											router.push('/')
										}}
									>
										Delete
									</button>
								</>
							)}
						</div>
					))}
				<div>
					<button
						onClick={() => {
							const label = window.prompt(
								'スケジュール名を入力してください.input name.',
							)
							if (label) {
								location.replace(makeLink({ ...book, label }))
							}
						}}
					>
						Create
					</button>
				</div>
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
