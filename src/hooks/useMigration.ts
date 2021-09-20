import { useEffect } from 'react'
import { useBooksStorage, useStudiesStorage } from '../components/App/hooks'
import { Book } from '../types'
import { encodeStudy } from '../utils/formats'
import { useLocalStorage } from './useLocalStorage'

export function useMigration() {
	const [version, setVersion] = useLocalStorage<number>('version', 0)
	const [studies, setStudies] = useStudiesStorage()
	const [books, setBooks] = useBooksStorage()

	useEffect(() => {
		if (version < 1) {
			const recover: Record<string, string[]> = {
				tdu: ['1', '2', '3', '4', '5', 'D5', 'D6'],
				nue: ['1', '2', '3', '4', '5'],
			}
			const books: Book[] = Object.entries(studies).map(([name, study]) => ({
				studyCode: encodeStudy(study, recover[name]),
				name,
				pid: name,
			}))
			setBooks(books)
		}
		if (version < 2) {
			setBooks(books.map((book) => ({ ...book, pid: book.name })))
		}
		setVersion(2)
	}, [version, setBooks, setVersion, studies, books])
}
