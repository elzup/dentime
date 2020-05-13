import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFavorite } from '../src/utils/browser'

const IndexPage: NextPage = () => {
	const [favorite] = useFavorite()
	const router = useRouter()

	useEffect(() => {
		router.push(favorite)
	}, [])

	return <div />
}

export default IndexPage
