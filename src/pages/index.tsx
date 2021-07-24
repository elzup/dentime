import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const IndexPage: NextPage = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('/p/tdu')
	}, [])

	return <div />
}

export default IndexPage
