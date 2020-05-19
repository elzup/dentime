import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import App from '../../src/components/App'
import Layout from '../../src/components/Layout'
import { useFavorite } from '../../src/utils/browser'

function useQueryId(): [string, string, boolean] {
	const router = useRouter()
	const { id, study } = router.query

	if (typeof id !== 'string') return ['', '', true]
	if (typeof study !== 'string') return ['', '', true]
	return [id, study, false]
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
