import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useLocalStorage } from '../src/utils/browser'

const IndexPage: NextPage = () => {
	const [favorite] = useLocalStorage('favorite', '/')
	const router = useRouter()

	useEffect(() => {
		router.push(favorite)
	}, [])

	return <div />
}

export default IndexPage
