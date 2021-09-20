import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import App from '../../../components/App'
import { useBook } from '../../../components/App/hooks'
import Layout from '../../../components/Layout'
import { useFavorite } from '../../../hooks/useLocalStorage'

const validQuery = (v: string | string[] | undefined) =>
	typeof v !== 'object' ? v : undefined

function useQueryId(): [
	string,
	{ studyCode: string; label: string } | undefined,
	boolean,
	string | undefined,
] {
	const router = useRouter()
	const { pid, bid: bidq, code, name: nameq } = router.query

	const bid = validQuery(bidq)
	if (typeof pid !== 'string') return ['', undefined, true, bid]
	const studyCode = validQuery(code)
	const label = validQuery(nameq)
	if (studyCode && label) return [pid, { studyCode, label }, false, bid]
	return [pid, undefined, false, bid]
}

type RegisterBook = { studyCode: string; label: string }
function useRegistoryBook(id: string, book?: RegisterBook) {
	const router = useRouter()
	const [, setBook] = useBook(id, book?.label)

	useEffect(() => {
		console.log({ book })
		if (!book) return

		console.log({ ...book, pid: id })

		setBook({ ...book, pid: id })
		setTimeout(() => {
			router.push(`/p/${id}/${book.label}`)
		}, 500)
	}, [book, router, id, setBook])
}

const IndexPage: NextPage = () => {
	const [id, registerTask, loading, bookId] = useQueryId()
	const [, setFavorite] = useFavorite()
	useRegistoryBook(id, registerTask)

	useEffect(() => {
		setFavorite('/p/' + id)
	}, [id, setFavorite])

	if (registerTask) return <Layout />

	return (
		<Layout>
			<App id={id} bookId={bookId} />
		</Layout>
	)
}

export default IndexPage
