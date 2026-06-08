import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import App from '../components/App'
import { useBook } from '../components/App/hooks'
import Layout from '../components/Layout'

type RegisterBook = { studyCode: string; label: string }

function useRegisterBook(id: string, book: RegisterBook | null) {
	const navigate = useNavigate()
	const [, setBook] = useBook(id, book?.label ?? null)

	useEffect(() => {
		if (!book) return

		setBook({ ...book, pid: id })
		const timer = setTimeout(() => {
			if (id !== book.label) {
				navigate({ to: '/p/$pid/$bid', params: { pid: id, bid: book.label } })
			} else {
				navigate({ to: '/p/$pid', params: { pid: id } })
			}
		}, 500)

		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [book])
}

export function AppPage() {
	const { pid, bid } = useParams({ strict: false }) as {
		pid: string
		bid?: string
	}
	const { code, name } = useSearch({ strict: false }) as {
		code?: string
		name?: string
	}
	const registerTask = code && name ? { studyCode: code, label: name } : null

	useRegisterBook(pid, registerTask)

	if (registerTask) return <Layout />

	return (
		<Layout>
			<App id={pid} bookId={bid ?? null} />
		</Layout>
	)
}
