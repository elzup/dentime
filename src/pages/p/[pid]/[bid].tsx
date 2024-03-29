/* eslint-disable @next/next/no-html-link-for-pages */
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import App from '../../../components/App'
import { useBook } from '../../../components/App/hooks'
import Layout from '../../../components/Layout'

const validQuery = (v: string | string[] | undefined) =>
	typeof v !== 'object' ? v : undefined

function useQueryId(): [
	string | undefined,
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
		if (!book) return
		console.log(book, router, id)

		setBook({ ...book, pid: id })
		setTimeout(() => {
			const path = id !== book.label ? `/p/${id}/${book.label}` : `/p/${id}`
			console.log('move', { path })
			router.push(path)
		}, 500)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [book])
}

const IndexPageQueryLoaded = ({
	id,
	registerTask,
	bookId,
}: {
	id: string
	registerTask: { studyCode: string; label: string } | undefined
	bookId?: string
}) => {
	useRegistoryBook(id, registerTask)

	if (registerTask) return <Layout />

	return (
		<Layout>
			<App id={id} bookId={bookId} />
		</Layout>
	)
}

const IndexPage: NextPage = () => {
	const [id, registerTask, loading, bookId] = useQueryId()
	console.log({ loading, id })
	// TODO: id is empty

	if (loading || !id)
		return (
			<p>
				loading <a href="/">top</a>
			</p>
		)

	return (
		<IndexPageQueryLoaded id={id} registerTask={registerTask} bookId={bookId} />
	)
}

export default IndexPage
