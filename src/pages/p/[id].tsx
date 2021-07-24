import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import App from '../../components/App'
import Layout from '../../components/Layout'
import { useFavorite } from '../../hooks/useLocalStorage'

function useQueryId(): [string, string | undefined, boolean] {
	const router = useRouter()
	const { id, study } = router.query

	if (typeof id !== 'string') return ['', '', true]
	const studyq = typeof study !== 'object' ? study : undefined

	return [id, studyq, false]
}

const IndexPage: NextPage = () => {
	const [id, studyCode, loading] = useQueryId()
	const [, setFavorite] = useFavorite()

	useEffect(() => {}, [])

	useEffect(() => {
		setFavorite('/p/' + id)
	}, [id, setFavorite])

	if (loading) return null

	return (
		<Layout>
			<App id={id} studyCode={studyCode} />
		</Layout>
	)
}

export default IndexPage
