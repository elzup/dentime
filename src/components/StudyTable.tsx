import { useRouter } from 'next/router'
import React from 'react'
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
			gap: 4px;
			margin: 4px;
			padding: 4px;
			&[data-active='true'] {
				background: #ffffff44;
			}

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
							<input type="radio" checked={active} onChange={() => {}} />
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
				<p>
					<code>{shareLink}</code>
				</p>
			</div>
			<div>
				Board Patterns
				<div>
					<p>
						<Link href={`/p/tdu`}>tdu</Link>
					</p>
					<p>
						<Link href={`/p/nue`}>nue</Link>
					</p>
					<p>
						<Link
							href={`https://github.com/elzup/dentime#%E4%BB%96%E5%A4%A7%E5%AD%A6%E3%81%AA%E3%81%A9%E5%88%A5%E3%81%AE%E6%96%BD%E8%A8%AD%E3%81%AE%E3%82%B9%E3%82%B1%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E8%BF%BD%E5%8A%A0%E4%BE%9D%E9%A0%BC`}
						>
							Other Request
						</Link>
					</p>
				</div>
			</div>
		</Style>
	)
}
export default StudyTable
