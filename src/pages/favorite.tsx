import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useFavorite } from '../hooks/useLocalStorage'

const IndexPage: NextPage = () => {
	const [favorite] = useFavorite()
	const router = useRouter()

	useEffect(() => {
		router.push(favorite)
	}, [favorite, router])

	return <div />
}

export default IndexPage
