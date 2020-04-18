import { NextPage } from 'next'
import { useRouter } from 'next/router'
import App from '../../src/components/App'
import Layout from '../../src/components/Layout'

function useQueryId(): [string, boolean] {
	const router = useRouter()
	const { id } = router.query

	if (typeof id !== 'string') return ['', true]
	return [id, false]
}

const IndexPage: NextPage = () => {
	const [id, loading] = useQueryId()

	if (loading) return null

	return (
		<Layout>
			<App id={id} />
		</Layout>
	)
}

export default IndexPage
