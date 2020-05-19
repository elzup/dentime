import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import App from '../../src/components/App'
import Layout from '../../src/components/Layout'
import { useFavorite } from '../../src/utils/browser'

function useQueryId(): [string, string | undefined, boolean] {
	const router = useRouter()
	const { id, study } = router.query

	console.log(router.query)

	if (typeof id !== 'string') return ['', '', true]
	const studyq = typeof study !== 'object' ? study : undefined

	return [id, studyq, false]
}

const IndexPage: NextPage = () => {
	const [id, studyCode, loading] = useQueryId()
	const [_favorite, setFavorite] = useFavorite()

	useEffect(() => {
		setFavorite('/p/' + id)
	}, [id])

	if (loading) return null

	return (
		<Layout>
			<App id={id} studyCode={studyCode} />
		</Layout>
	)
}

export default IndexPage
