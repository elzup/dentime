import { NextPage } from 'next'
import { useRouter } from 'next/router'
import App from '../../src/components/App'
import Layout from '../../src/components/Layout'

const IndexPage: NextPage = () => {
	const router = useRouter()

	if (!router) return null

	console.log(router.query)

	const queryId = router.query['id']
	const id = typeof queryId === 'string' ? queryId : queryId[0]

	return (
		<Layout>
			<App id={id} />
		</Layout>
	)
}

export default IndexPage
