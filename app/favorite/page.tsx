'use client'
import { NextPage } from 'next'
import { useFavorite } from '../../src/hooks/useLocalStorage'
import { Redirect } from '../lib/redirect'

const IndexPage: NextPage = () => {
	const [favorite] = useFavorite()

	return <Redirect path={favorite} />
}

export default IndexPage
