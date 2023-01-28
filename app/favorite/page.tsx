import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { useFavorite } from '../../src/hooks/useLocalStorage'

const IndexPage: NextPage = () => {
	const [favorite] = useFavorite()
	redirect(favorite)

	return <div />
}

export default IndexPage
