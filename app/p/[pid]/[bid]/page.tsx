'use client'

import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import App from '../../../../src/components/App'
import { useBook } from '../../../../src/components/App/hooks'
import Layout from '../../../../src/components/Layout'

function useQueryId({
	pid,
	bid,
}: {
	pid: string
	bid?: string
}): [{ studyCode: string; label: string } | null, boolean] {
	const params = useSearchParams()
	const studyCode = params.get('code')
	const label = params.get('name')

	if (typeof pid !== 'string') return [null, true]
	if (studyCode && label) return [{ studyCode, label }, false]
	return [null, false]
}

type RegisterBook = { studyCode: string; label: string }
function useRegistoryBook(id: string, book: RegisterBook | null) {
	const router = useRouter()
	const [, setBook] = useBook(id, book?.label ?? null)

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
	registerTask: { studyCode: string; label: string } | null
	bookId: string | null
}) => {
	useRegistoryBook(id, registerTask)

	if (registerTask) return <Layout />

	return (
		<Layout>
			<App id={id} bookId={bookId} />
		</Layout>
	)
}

const IndexPage: NextPage<{ params: { pid: string; bid?: string } }> = ({
	params: { pid, bid },
}) => {
	const [registerTask, loading] = useQueryId({ pid, bid })

	if (loading || !pid)
		return (
			<p>
				loading <Link href="/">top</Link>
			</p>
		)

	return (
		<IndexPageQueryLoaded
			id={pid}
			registerTask={registerTask}
			bookId={bid || null}
		/>
	)
}

export default IndexPage
