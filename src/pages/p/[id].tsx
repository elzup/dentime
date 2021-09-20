import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import App from '../../components/App'
import Layout from '../../components/Layout'
import { useFavorite } from '../../hooks/useLocalStorage'

function useQueryId(): [
	string,
	{ studyCode: string; name: string } | undefined,
	boolean,
] {
	const router = useRouter()
	const { id, book, name: nameq } = router.query

	if (typeof id !== 'string') return ['', undefined, true]
	const studyCode = typeof book !== 'object' ? book : undefined
	const name = typeof nameq !== 'object' ? nameq : undefined
	if (studyCode && name) return [id, { studyCode, name }, false]
	return [id, undefined, false]
}

const IndexPage: NextPage = () => {
	const [id, register, loading] = useQueryId()
	const [, setFavorite] = useFavorite()

	useEffect(() => {
		setFavorite('/p/' + id)
	}, [id, setFavorite])

	if (loading) return null

	return (
		<Layout>
			<App id={id} register={register} />
		</Layout>
	)
}

export default IndexPage
